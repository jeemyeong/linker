import * as React from 'react';
import styled from 'styled-components';
import { DraggableProvidedDragHandleProps, DraggableStateSnapshot } from 'react-beautiful-dnd';
import { ChangeEvent } from 'react';
import { colors } from 'app/constants/colors';
import { CategoryData } from 'app/type/category-data';
import { observer } from "mobx-react";
import { sizes } from "app/constants/size";

const Container = styled.div`
  border-top-left-radius: ${sizes.borderRadius}px;
  border-top-right-radius: ${sizes.borderRadius}px;
  color: ${({ isDragging }: DraggableStateSnapshot) =>
  isDragging ? colors.apricot : colors.grey.light};
  height: ${sizes.columnTitleHeight};
  transition: background-color 0.1s ease;
  display: flex;
  flex-direction: row;
  align-items: center;
  &:hover {
    color: ${colors.apricot};
  }
`;
const Title = styled.h2`
  font-size: 1em;
  text-align: left;
  padding: 5px 5px 5px 5px;
`;

interface ColumnTitleProps {
  category: CategoryData;
  isDragging: boolean;
  dragHandleProps: DraggableProvidedDragHandleProps;
  updateCategory: {({category, title})}
}

interface ColumnTitleState {
  editing: boolean
  title: string
}

@observer
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
      this.props.updateCategory({category: this.props.category, title: this.state.title}).then(() => this.setState({editing: false}))
    }
  };

  render() {
    const { category, dragHandleProps, isDragging } = this.props;
    console.log("ColumnTitle: render")
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
