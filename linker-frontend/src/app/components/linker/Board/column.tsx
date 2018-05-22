import * as React from 'react';
import { Draggable, DraggableStateSnapshot } from 'react-beautiful-dnd';
import ItemList from './item-list';
import styled from 'styled-components';
import { borderRadius, colors, grid } from './constants';
import { BoardItem } from './board';
import {
  BoardColumn,
  RenderAddItemToJSXElement, RenderColumnTitleToJSXElement,
  RenderItemToJSXElement
} from 'app/components/linker/Board/board';

const Container = styled.div`
  padding: ${grid}px;
  display: flex;
  flex-direction: column;
  height: 100%;
`;
const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  border-top-left-radius: ${borderRadius}px;
  border-top-right-radius: ${borderRadius}px;
  background-color: ${({ isDragging }: DraggableStateSnapshot) =>
    isDragging ? colors.apricot : colors.red.light};
  transition: background-color 0.1s ease;
  &:hover {
    background-color: ${colors.apricot};
  }
`;

export interface ColumnProps<T, K> {
  renderItem: RenderItemToJSXElement<T>;
  renderAddItemButton: RenderAddItemToJSXElement;
  renderColumnTitle: RenderColumnTitleToJSXElement<K>;
  index: number;
  items: Array<T>;
  column: K
}

export interface ColumnState {}

export class Column<T extends BoardItem, K extends BoardColumn> extends React.Component<
  ColumnProps<T, K>,
  ColumnState
> {

  render() {
    const { items, index, renderColumnTitle, column, renderAddItemButton } = this.props;
    return (
      <Draggable draggableId={column.id.toString()} index={index}>
        {(provided, snapshot) => (
          <Container innerRef={provided.innerRef} {...provided.draggableProps}>
            <Header isDragging={snapshot.isDragging}>
              {renderColumnTitle(column, snapshot.isDragging, provided.dragHandleProps)}
            </Header>
            {renderAddItemButton(column.id)}
            <ItemList
              listId={column.id}
              listType="ITEM"
              items={items}
              renderItem={this.props.renderItem}
            />
          </Container>
        )}
      </Draggable>
    );
  }
}
