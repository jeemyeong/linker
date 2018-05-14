import * as React from 'react';
import { CategoryModel } from 'app/models';
import styled from 'styled-components';
import { colors } from 'app/components/linker/Board/constants';
import { DraggableProvidedDragHandleProps } from 'react-beautiful-dnd';
import { ChangeEvent } from 'react';
import { rootStore } from '../../../../main';
import { STORE_CATEGORY } from 'app/constants';
import * as R from 'ramda';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`;

const Title = styled.h3`
  height: 100%;
  transition: background-color ease 0.2s;
  flex-grow: 1;
  user-select: none;
  position: relative;
  &:focus {
    outline: 2px solid ${colors.purple};
    outline-offset: 2px;
  }
`;

interface ColumnTitleProps {
  category: CategoryModel;
  isDragging: boolean;
  dragHandleProps: DraggableProvidedDragHandleProps;
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
      this.props.category.title = this.state.title;
      rootStore[STORE_CATEGORY].updateCategoryToServer(this.props.category).then(() => this.setState({editing: false}))
    }
  };

  shouldComponentUpdate(nextProp, nextState) {
    return !(R.equals(this.props, nextProp) && R.equals(this.state, nextState))
  }

  render() {
    const { category, dragHandleProps } = this.props;
    return (
      <Title {...dragHandleProps}>
        {this.state.editing
          ? <input type="text" defaultValue={this.state.title} onChange={e => this.onInputChange(e)} onKeyDown={this.onKeyDown}/>
          : <Container onDoubleClick={this.onDoubleClick}>{category.title}</Container>
        }
      </Title>
    )
  }
}
