import * as React from 'react';
import { Draggable } from 'react-beautiful-dnd';
import ItemList from './item-list';
import styled from 'styled-components';
import { BoardItem } from './board';
import {
  BoardColumn,
  RenderAddItemToJSXElement, RenderColumnTitleToJSXElement,
  RenderItemToJSXElement
} from 'app/libs/board/board';
import { observer } from "mobx-react";
import { sizes } from "app/constants/size";
import * as debug from 'debug';
const log = debug('application:column.tsx');

export const ColumnContainer = styled.div`
  width: ${sizes.rightSide.column.width};
  padding: ${sizes.grid}px;
  margin: 5px;
  display: flex;
  flex-direction: column;
  height: 100%;
`;

export interface ColumnProps<T, K> {
  renderItem: RenderItemToJSXElement<T>;
  renderAddItemButton: RenderAddItemToJSXElement;
  renderColumnTitle: RenderColumnTitleToJSXElement<K>;
  index: number;
  itemKey: string;
  column: K,
}

export interface ColumnState {}

@observer
export class Column<T extends BoardItem, K extends BoardColumn<T>> extends React.Component<
  ColumnProps<T, K>,
  ColumnState
> {
  componentDidMount() {
    log("componentDidMount")
  }

  render() {
    log("render");
    const { index, renderColumnTitle, column, renderAddItemButton, itemKey } = this.props;
    const items = column[itemKey];
    return (
      <Draggable draggableId={"column|"+column.id} index={index}>
        {(provided, snapshot) => (
          <ColumnContainer innerRef={provided.innerRef} {...provided.draggableProps}>
            {renderColumnTitle(column, snapshot.isDragging, provided.dragHandleProps)}
            {renderAddItemButton(index)}
            <ItemList
              droppableId={index.toString()}
              listType="ITEM"
              items={items}
              renderItem={this.props.renderItem}
            />
          </ColumnContainer>
        )}
      </Draggable>
    );
  }
}
