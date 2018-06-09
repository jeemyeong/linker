import * as React from 'react';
import {
  DragDropContext, DraggableProvidedDragHandleProps,
  Droppable
} from 'react-beautiful-dnd';
import { Column } from './column';
import styled from 'styled-components';

const ParentContainer = styled.div`
  height: ${({ height }: { height }) => height};
  overflow-x: auto;
  overflow-y: auto;
`;

const Container = styled.div`
  height: 100%;
  /* like display:flex but will allow bleeding over the window width */
  display: inline-flex;
`;

export interface BoardItem {
  id: number;
}

export interface BoardColumn<T> {
  id: number;
  title: string;
  items?: Array<T>
}

export interface RenderItemToJSXElement<T> {
  (item: T, isDragging: boolean): JSX.Element;
}

export interface RenderAddItemToJSXElement {
  (index: number): JSX.Element;
}


export interface RenderColumnTitleToJSXElement<K> {
  (column: K, isDragging, dragHandleProps: DraggableProvidedDragHandleProps): JSX.Element;
}

export interface BoardProps<T, K> {
  containerHeight?: string;
  board: {
    id: number
    title: string
    categories?: Array<K>
  };
  itemKey: string;
  renderItem: RenderItemToJSXElement<T>;
  renderAddItemButton: RenderAddItemToJSXElement;
  renderColumnTitle: RenderColumnTitleToJSXElement<K>;
  reorderColumn: {
    (
      { originIndex, newIndex }: { originIndex: number; newIndex: number }
    ): void;
  };
  reorderItem: {
    (
      {
        originColumnIndex,
        originIndex,
        newColumnIndex,
        newIndex
      }: { originColumnIndex: number; originIndex: number; newColumnIndex: number; newIndex: number }
    ): void;
  };
}

export interface BoardState<T> {
  ordered: Array<string>;
}

export class Board<
  T extends BoardItem,
  K extends BoardColumn<T>
> extends React.Component<BoardProps<T, K>, BoardState<T>> {

  componentWillReact() {
    console.log("Board: I will re-render, since the props has changed!");
  }

  onDragStart = (initial) => {};

  onDragEnd = (result) => {
    if (!result.destination) {
      return;
    }

    const source = result.source;
    const destination = result.destination;

    // did not move anywhere - can bail early
    if (
      source.droppableId === destination.droppableId &&
      source.index === destination.index
    ) {
      return;
    }

    // reordering column
    if (result.type === 'COLUMN') {
      this.props.reorderColumn({
        originIndex: source.index,
        newIndex: destination.index
      });

      return;
    }
    this.props.reorderItem({
      originColumnIndex: source.droppableId,
      originIndex: source.index,
      newColumnIndex: destination.droppableId,
      newIndex: destination.index
    });
  };

  render() {
    console.log("Board is rendering")
    const { itemKey } = this.props;
    const { categories } = this.props.board;
    const { containerHeight, renderItem, renderAddItemButton, renderColumnTitle } = this.props;
    const board = (
      <Droppable droppableId="board" type="COLUMN" direction="horizontal">
        {(provided) => (
          <Container innerRef={provided.innerRef} {...provided.droppableProps}>
            {categories.map((column: K, index: number) => (
              <Column
                key={column.id}
                column={column}
                index={index}
                items={column[itemKey]}
                renderItem={renderItem}
                renderAddItemButton={renderAddItemButton}
                renderColumnTitle={renderColumnTitle}
              />
            ))}
          </Container>
        )}
      </Droppable>
    );

    return (
      <DragDropContext
        onDragStart={this.onDragStart}
        onDragEnd={this.onDragEnd}
      >
        {this.props.containerHeight ? (
          <ParentContainer height={containerHeight}>{board}</ParentContainer>
        ) : (
          board
        )}
      </DragDropContext>
    );
  }
}
