import * as React from 'react';
import { Draggable, DraggableStateSnapshot } from 'react-beautiful-dnd';
import ItemList from './item-list';
import styled from 'styled-components';
import {
  borderRadius,
  colors,
  grid
} from './constants';
import { BoardItem } from './board';
import {RenderAddItemToJSXElement, RenderItemToJSXElement} from 'app/components/linker/Board/board';
import { CategoryId } from 'app/models';

const Container = styled.div`
  margin: ${grid}px;
  display: flex;
  flex-direction: column;
`;
const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  border-top-left-radius: ${borderRadius}px;
  border-top-right-radius: ${borderRadius}px;
  background-color: ${({ isDragging }: DraggableStateSnapshot) =>
    isDragging ? colors.apricot : colors.blue.light};
  transition: background-color 0.1s ease;
  &:hover {
    background-color: ${colors.apricot};
  }
`;
const Title = styled.h4`
  padding: ${grid}px;
  transition: background-color ease 0.2s;
  flex-grow: 1;
  user-select: none;
  position: relative;
  &:focus {
    outline: 2px solid ${colors.purple};
    outline-offset: 2px;
  }
`;

export interface ColumnProps<T> {
  renderItem: RenderItemToJSXElement<T>
  renderAddItem: RenderAddItemToJSXElement
  index: number
  title: string
  items: Array<T>
  columnId: CategoryId
}

export interface ColumnState {

}

export class Column<T extends BoardItem> extends React.Component<ColumnProps<T>, ColumnState> {
  render() {
    const title: string = this.props.title;
    const items = this.props.items;
    const index: number = this.props.index;
    const columnId = this.props.columnId;
    return (
      <Draggable draggableId={title} index={index}>
        {(provided, snapshot) => (
          <Container innerRef={provided.innerRef} {...provided.draggableProps}>
            <Header isDragging={snapshot.isDragging}>
              <Title
                // isDragging={snapshot.isDragging}
                {...provided.dragHandleProps}
              >
                {title}
              </Title>
            </Header>
            <ItemList
              listId={columnId}
              listType="ITEM"
              items={items}
              renderItem={this.props.renderItem}
              renderAddItem={this.props.renderAddItem}
            />
          </Container>
        )}
      </Draggable>
    );
  }
}
