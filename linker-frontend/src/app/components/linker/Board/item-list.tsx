import * as React from 'react';
import {
  Draggable,
  Droppable, DroppableProvided,
  DroppableStateSnapshot,
} from 'react-beautiful-dnd';
import Item from './item';
import { grid, colors } from './constants';
import styled from 'styled-components';
import { BoardItem, RenderItemToJSXElement } from './board';
import { ColumnId } from 'app/models';
import AddItem from 'app/components/linker/Board/add-item';

const Wrapper: any = styled.div`
  background-color: ${({ isDraggingOver }: DroppableStateSnapshot) =>
    isDraggingOver ? colors.blue.lighter : colors.blue.light};
  display: flex;
  flex-direction: column;
  opacity: ${({ isDropDisabled }: { isDropDisabled? }) =>
    isDropDisabled ? 0.5 : 'inherit'};
  padding: ${grid}px;
  border: ${grid}px;
  padding-bottom: 0;
  transition: background-color 0.1s ease, opacity 0.1s ease;
  user-select: none;
  width: 250px;
`;

const DropZone = styled.div`
  /* stop the list collapsing when empty */
  min-height: 30px;
  /* not relying on the items for a margin-bottom
  as it will collapse when the list is empty */
  margin-bottom: ${grid}px;
`;

const ScrollContainer = styled.div`
  overflow-x: hidden;
  overflow-y: auto;
  max-height: 300px;
`;

const Container = styled.div``;

export interface InnerItemListProps<T> {
  render: RenderItemToJSXElement<T>
  items: Array<T>
}

export interface InnerItemListState {

}

class InnerItemList<T extends BoardItem> extends React.Component<InnerItemListProps<T>, InnerItemListState> {
  shouldComponentUpdate(nextProps) {
    if (nextProps.items !== this.props.items) {
      return true;
    }

    return false;
  }

  render() {
    return this.props.items.map((item, index) => (
      <Draggable key={item.id} draggableId={(item.id).toString()} index={index}>
        {(dragProvided, dragSnapshot) => (
          <Item
            render={this.props.render}
            key={item.id}
            item={item}
            isDragging={dragSnapshot.isDragging}
            provided={dragProvided}
          />
        )}
      </Draggable>
    ));
  }
}

export interface InnerListProps<T> {
  render: RenderItemToJSXElement<T>
  items: Array<T>
  title?: string
  dropProvided: DroppableProvided
}

export interface InnerListState {

}

class InnerList<T extends BoardItem> extends React.Component<InnerListProps<T>, InnerListState> {
  render() {
    const { items, dropProvided, render } = this.props;
    const title = this.props.title ? <div>{this.props.title}</div> : null;

    return (
      <Container>
        {title}
        <DropZone innerRef={dropProvided.innerRef}>
          <InnerItemList items={items} render={render} />
          {dropProvided.placeholder}
        </DropZone>
      </Container>
    );
  }
}

export interface ItemListProps<T> {
  render: RenderItemToJSXElement<T>
  internalScroll?: boolean
  isDropDisabled?: boolean
  listId: ColumnId
  listType?: string
  items: Array<T>
  title?: string
  style?
  addItem?: { ({ item, columnId }: { item: T, columnId: number}): void }
}

export interface ItemListState {

}

export default class ItemList<T extends BoardItem> extends React.Component<ItemListProps<T>, ItemListState> {
  render() {
    const {
      render,
      internalScroll,
      isDropDisabled,
      listId,
      listType,
      items,
      title,
      style,
      addItem
    } = this.props;

    return (
      <Droppable
        droppableId={""+listId}
        type={listType}
        direction="vertical"
        isDropDisabled={false}
      >
        {(dropProvided, dropSnapshot) => (
          <Wrapper
            {...dropProvided.droppableProps}
            style={style}
            isDraggingOver={dropSnapshot.isDraggingOver}
            isDropDisabled={isDropDisabled}
            {...dropProvided.droppableProps}
          >
            {internalScroll ? (
              <ScrollContainer>
                <InnerList
                  render={render}
                  items={items}
                  title={title}
                  dropProvided={dropProvided}
                />
              </ScrollContainer>
            ) : (
              <InnerList
                render={render}
                items={items}
                title={title}
                dropProvided={dropProvided}
              />
            )}
            {addItem &&
              <AddItem
                addItem={addItem}
                listId={listId}
              />
            }
          </Wrapper>
        )}
      </Droppable>
    );
  }
}
