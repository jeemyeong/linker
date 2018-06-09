import * as React from 'react';
import styled from 'styled-components';
import { DraggableProvidedDragHandleProps, DraggableStateSnapshot } from 'react-beautiful-dnd';
import { ChangeEvent } from 'react';
import * as R from 'ramda';
import { rootStore } from 'app/app';
import { STORE_BOARD } from 'app/constants/stores';
import { borderRadius, colors } from 'app/constants/colors';
import { CategoryModel } from 'app/models';

const Container = styled.div`
  border-top-left-radius: ${borderRadius}px;
  border-top-right-radius: ${borderRadius}px;
  color: ${({ isDragging }: DraggableStateSnapshot) =>
  isDragging ? colors.apricot : colors.grey.light};
  transition: background-color 0.1s ease;
  min-width: 300px;
  &:hover {
    color: ${colors.apricot};
  }
`;
const Title = styled.h2`
  height: 40px;
  font-size: 2rem;
  text-align: left;
  padding: 5px 5px 5px 5px;
`;

interface ColumnTitleProps {
  category: CategoryModel;
  isDragging: boolean;
  dragHandleProps: DraggableProvidedDragHandleProps;
  updateCategory: {({category, title}): void }
}

interface ColumnTitleState {
  editing: boolean
  title: string
}

export default class ColumnTitle extends React.Component<
  ColumnTitleProps,
  ColumnTitleState
  > {
  state = {
    editing: false,
    title: this.props.category.title
  };

  onDoubleClick = _ => this.setState({editing: true});

  onInputChange = ({target}: ChangeEvent<HTMLInputElement>) => this.setState({title: target.value});

  onKeyDown = (event: React.KeyboardEvent<HTMLInputElement>): void => {
    // 'keypress' event misbehaves on mobile so we track 'Enter' key via 'keydown' event
    if (event.key === 'Enter') {
      event.preventDefault();
      event.stopPropagation();
      rootStore[STORE_BOARD].updateCategory({category: this.props.category, title: this.state.title})//.then(() => this.setState({editing: false}))
    }
  };
  shouldComponentUpdate(nextProp, nextState) {
    return !(R.equals(this.props, nextProp) && R.equals(this.state, nextState))
  }

  render() {
    const { category, dragHandleProps, isDragging } = this.props;
    return (
      <Container {...dragHandleProps} isDragging={isDragging}>
        {this.state.editing
          ? <input type="text" defaultValue={this.state.title} onChange={e => this.onInputChange(e)} onKeyDown={this.onKeyDown}/>
          : <Title onDoubleClick={this.onDoubleClick}>{category.title}</Title>
        }
      </Container>
    )
  }
}
