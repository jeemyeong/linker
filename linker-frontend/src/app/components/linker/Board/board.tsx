import * as React from 'react';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import { Column } from './column';
import styled from 'styled-components';

const ParentContainer = styled.div`
  height: ${({ height }: { height }) => height};
  overflow-x: auto;
  overflow-y: auto;
`;

const Container = styled.div`
  min-height: 100vh;
  /* like display:flex but will allow bleeding over the window width */
  min-width: 100vw;
  display: inline-flex;
`;

export interface BoardItem {
  id: number
}

export interface ColumnModel {
  id: number
  title: string
}

export interface RenderItemToJSXElement<T> {
  (item: T): JSX.Element
}

export interface ColumnItemMap<T> {
  [key: string] : Array<T>
}

export interface BoardProps<T, K> {
  containerHeight?: string
  columnItemMap: ColumnItemMap<T>
  columns: Array<K>
  render: RenderItemToJSXElement<T>
  reorderColumn: { ({ originIndex, newIndex }: { originIndex: number, newIndex: number}): void }
  reorderItem: { ({ itemId, newColumnId, newIndex }: {itemId: number, newColumnId: number, newIndex: number}): void }
  addItem: { ({ item, columnId }: { item: T, columnId: number}): void }
}

export interface BoardState<T> {
  columnItemMap: ColumnItemMap<T>
  ordered: Array<string>
}

export class Board<T extends BoardItem, K extends ColumnModel> extends React.Component<BoardProps<T, K>, BoardState<T>> {
  onDragStart = (initial) => {
  };

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
      itemId: this.props.columnItemMap[source.droppableId][source.index].id,
      newColumnId: destination.droppableId,
      newIndex: destination.index
    });
  };

  render() {
    const columnItemMap = this.props.columnItemMap;
    const columns = this.props.columns;
    const addItem = this.props.addItem;
    const { containerHeight, render } = this.props;
    const board = (
      <Droppable droppableId="board" type="COLUMN" direction="horizontal">
        {(provided) => (
          <Container innerRef={provided.innerRef} {...provided.droppableProps}>
            {columns.map((column: K, index: number) => (
              <Column
                key={column.id}
                columnId={column.id}
                index={index}
                title={column.title}
                items={columnItemMap[column.id]}
                render={render}
                addItem={addItem}
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
