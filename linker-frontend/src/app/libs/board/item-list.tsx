import * as React from 'react';
import {
  Draggable,
  Droppable,
  DroppableProvided,
} from 'react-beautiful-dnd';
import Item from './item';
import styled from 'styled-components';
import { BoardItem, RenderItemToJSXElement } from './board';

const Wrapper: any = styled.div`
  background-color: 'transparent';
  display: flex;
  flex-direction: column;
  padding-bottom: 0;
  transition: background-color 0.1s ease, opacity 0.1s ease;
  user-select: none;
`;

const DropZone = styled.div`
  /* stop the list collapsing when empty */
  min-height: 180px;
  /* not relying on the items for a margin-bottom
  as it will collapse when the list is empty */
  margin-bottom: 300px;
`;

const ScrollContainer = styled.div`
  overflow-x: hidden;
  overflow-y: auto;
  max-height: 300px;
`;

const Container = styled.div``;

export interface InnerItemListProps<T> {
  renderItem: RenderItemToJSXElement<T>;
  items: Array<T>;
}

export interface InnerItemListState {}

class InnerItemList<T extends BoardItem> extends React.Component<
  InnerItemListProps<T>,
  InnerItemListState
> {

  render() {
    return this.props.items.map((item, index) => (
      <Draggable key={item.id} draggableId={item.id.toString()} index={index}>
        {(dragProvided, dragSnapshot) => (
          <Item
            renderItem={this.props.renderItem}
            key={"item|"+item.id}
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
  renderItem: RenderItemToJSXElement<T>;
  items: Array<T>;
  title?: string;
  dropProvided: DroppableProvided;
}

export interface InnerListState {}

class InnerList<T extends BoardItem> extends React.Component<
  InnerListProps<T>,
  InnerListState
> {
  render() {
    const { items, dropProvided, renderItem } = this.props;
    const title = this.props.title ? <div>{this.props.title}</div> : null;

    return (
      <Container>
        {title}
        <DropZone innerRef={dropProvided.innerRef}>
          <InnerItemList items={items} renderItem={renderItem} />
          {dropProvided.placeholder}
        </DropZone>
      </Container>
    );
  }
}

export interface ItemListProps<T> {
  renderItem: RenderItemToJSXElement<T>;
  internalScroll?: boolean;
  isDropDisabled?: boolean;
  droppableId: string;
  listType?: string;
  items: Array<T>;
  title?: string;
  style?;
}

export interface ItemListState {}

export default class ItemList<T extends BoardItem> extends React.Component<
  ItemListProps<T>,
  ItemListState
> {
  render() {
    const {
      renderItem,
      internalScroll,
      isDropDisabled,
      droppableId,
      listType,
      items,
      title,
      style
    } = this.props;

    return (
      <Droppable
        droppableId={droppableId}
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
                  renderItem={renderItem}
                  items={items}
                  title={title}
                  dropProvided={dropProvided}
                />
              </ScrollContainer>
            ) : (
              <InnerList
                renderItem={renderItem}
                items={items}
                title={title}
                dropProvided={dropProvided}
              />
            )}
          </Wrapper>
        )}
      </Droppable>
    );
  }
}
