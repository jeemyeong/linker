import * as React from 'react';
import { borderRadius, colors, grid } from './constants';
import styled from 'styled-components';
import { DraggableProvided } from 'react-beautiful-dnd';
import { RenderItemToJSXElement } from 'app/components/linker/Board/board';

const Container = styled.a`
  border-radius: ${borderRadius}px;
  border: 1px solid grey;
  background-color: ${({ isDragging }: { isDragging? }) =>
    isDragging ? colors.green : colors.white};
  box-shadow: ${({ isDragging }: { isDragging? }) =>
    isDragging ? `2px 2px 1px ${colors.shadow}` : 'none'};
  padding: ${grid}px;
  min-height: 40px;
  margin-bottom: ${grid}px;
  user-select: none;
  transition: background-color 0.1s ease;
  /* anchor overrides */
  color: ${colors.black};
  &:hover {
    color: ${colors.black};
    text-decoration: none;
  }
  &:focus {
    outline: 2px solid ${colors.purple};
    box-shadow: none;
  }
  /* flexbox */
  display: flex;
  align-items: center;
`;


export interface ItemProps<T> {
  item: T,
  isDragging: boolean,
  provided: DraggableProvided,
  renderItem: RenderItemToJSXElement<T>
}

export interface ItemState {

}

export default class Item<T> extends React.PureComponent<ItemProps<T>, ItemState> {
  componentDidMount() {
    // cdm is called when item is put to another column
  }

  componentDidUpdate() {
    // cdu is called when item is put to same column
  }

  render() {
    const { isDragging, provided, item } = this.props;
    return (
      <Container
        // href={item.author.url}
        innerRef={provided.innerRef}
        isDragging={isDragging}
        {...provided.draggableProps}
        {...provided.dragHandleProps}
      >
        {this.props.renderItem(item)}
      </Container>
    );
  }
}
