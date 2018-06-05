import * as React from 'react';
import styled from 'styled-components';
import { DraggableProvided } from 'react-beautiful-dnd';
import { RenderItemToJSXElement } from 'app/libs/board/board';
import { colors } from 'app/constants/colors';
import { observer } from 'mobx-react';

const Container = styled.div`
  margin: 20px 0px 20px 0px;
  user-select: none;
  transition: background-color 0.1s ease;
  /* anchor overrides */
  color: ${colors.black};
  /* flexbox */
  display: flex;
  align-items: center;
`;

export interface ItemProps<T> {
  item: T;
  isDragging: boolean;
  provided: DraggableProvided;
  renderItem: RenderItemToJSXElement<T>;
}

export interface ItemState {}

@observer
export default class Item<T> extends React.Component<
  ItemProps<T>,
  ItemState
> {

  componentDidMount() {
    // cdm is called when item is put to another column
  }

  componentDidUpdate() {
    // cdu is called when item is put to same column
  }

  render() {
    const { provided, item, isDragging } = this.props;
    return (
      <Container
        // href={item.author.url}
        innerRef={provided.innerRef}
        {...provided.draggableProps}
        {...provided.dragHandleProps}
      >
        {this.props.renderItem(item, isDragging)}
      </Container>
    );
  }
}
