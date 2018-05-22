import * as React from 'react';
import { DragDropContext, DraggableProvidedDragHandleProps, Droppable } from 'react-beautiful-dnd';
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
  width: 95vw;
  display: inline-flex;
`;

export interface BoardItem {
  id: number;
}

export interface BoardColumn {
  id: number;
  title: string;
}

export interface RenderItemToJSXElement<T> {
  (item: T): JSX.Element;
}

export interface RenderAddItemToJSXElement {
  (listId: number): JSX.Element;
}


export interface RenderColumnTitleToJSXElement<K> {
  (column: K, isDragging, dragHandleProps: DraggableProvidedDragHandleProps): JSX.Element;
}

export interface BoardProps<T, K> {
  containerHeight?: string;
  items: Array<T>;
  columns: Array<K>;
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
        itemId,
        newColumnId,
        newIndex
      }: { itemId: number; newColumnId: number; newIndex: number }
    ): void;
  };
}

export interface BoardState<T> {
  ordered: Array<string>;
}

export class Board<
  T extends BoardItem,
  K extends BoardColumn
> extends React.Component<BoardProps<T, K>, BoardState<T>> {
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
      itemId: this.props.items.filter(item => item["category"].id == source.droppableId)[source.index].id,
      newColumnId: destination.droppableId,
      newIndex: destination.index
    });
  };

  render() {
    const { columns, items } = this.props;
    const { containerHeight, renderItem, renderAddItemButton, renderColumnTitle } = this.props;
    const board = (
      <Droppable droppableId="board" type="COLUMN" direction="horizontal">
        {(provided) => (
          <Container innerRef={provided.innerRef} {...provided.droppableProps}>
            {columns.map((column: K, index: number) => (
              <Column
                key={column.id}
                column={column}
                index={index}
                items={items.filter(item => item["category"].id == column.id)}
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
