import * as React from 'react';
import {
  Draggable,
  Droppable,
  DroppableProvided,
  DroppableStateSnapshot
} from 'react-beautiful-dnd';
import Item from './item';
import { grid, colors } from './constants';
import styled from 'styled-components';
import { BoardItem, RenderItemToJSXElement } from './board';
import { CategoryId } from 'app/models';
import { RenderAddItemToJSXElement } from 'app/components/linker/Board/board';

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
  renderItem: RenderItemToJSXElement<T>;
  items: Array<T>;
}

export interface InnerItemListState {}

class InnerItemList<T extends BoardItem> extends React.Component<
  InnerItemListProps<T>,
  InnerItemListState
> {
  shouldComponentUpdate(nextProps) {
    if (nextProps.items !== this.props.items) {
      return true;
    }

    return false;
  }

  render() {
    return this.props.items.map((item, index) => (
      <Draggable key={item.id} draggableId={item.id.toString()} index={index}>
        {(dragProvided, dragSnapshot) => (
          <Item
            renderItem={this.props.renderItem}
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
  renderAddItem: RenderAddItemToJSXElement;
  internalScroll?: boolean;
  isDropDisabled?: boolean;
  listId: CategoryId;
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
      renderAddItem,
      internalScroll,
      isDropDisabled,
      listId,
      listType,
      items,
      title,
      style
    } = this.props;

    return (
      <Droppable
        droppableId={'' + listId}
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
            {renderAddItem(listId)}
          </Wrapper>
        )}
      </Droppable>
    );
  }
}
