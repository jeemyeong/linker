import * as React from 'react';
import styled from 'styled-components';
import { DraggableProvidedDragHandleProps, DraggableStateSnapshot } from 'react-beautiful-dnd';
import { colors } from 'app/constants/colors';
import { CategoryData } from 'app/type/category-data';
import { observer } from "mobx-react";
import { sizes } from "app/constants/size";
import * as debug from 'debug';
const log = debug('application:column-title.tsx');

const Container = styled.div`
  border-top-left-radius: ${sizes.borderRadius}px;
  border-top-right-radius: ${sizes.borderRadius}px;
  color: ${({ isDragging }: DraggableStateSnapshot) =>
  isDragging ? colors.apricot : colors.grey.light};
  height: ${sizes.rightSide.column.title.height};
  transition: background-color 0.1s ease;
  display: flex;
  flex-direction: row;
  align-items: center;
  &:hover {
    color: ${colors.apricot};
  }
`;
const Title = styled.h2`
  font-size: ${sizes.rightSide.column.title.fontSize};
  font-weight: bold;
  text-align: left;
  padding: 5px 5px 5px 5px;
  user-select: none;
`;

interface ColumnTitleProps {
  category: CategoryData;
  isDragging: boolean;
  dragHandleProps: DraggableProvidedDragHandleProps;
  onDoubleClick: {(e)}
}

@observer
export default class ColumnTitle extends React.Component<ColumnTitleProps, {}> {
  render() {
    const { category, dragHandleProps, isDragging, onDoubleClick } = this.props;
    log("render: " + category.title);
    return (
      <Container {...dragHandleProps} isDragging={isDragging}>
        <Title onDoubleClick={onDoubleClick}>{category.title}</Title>
      </Container>
    )
  }
}
