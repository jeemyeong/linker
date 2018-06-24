import * as React from 'react';
import styled from 'styled-components';
import { DraggableProvidedDragHandleProps, DraggableStateSnapshot } from 'react-beautiful-dnd';
import { colors } from 'app/constants/colors';
import { CategoryData } from 'app/type/category-data';
import { observer } from "mobx-react";
import { sizes } from "app/constants/size";
import { ContextMenu, MenuItem, ContextMenuTrigger } from "react-contextmenu";
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

const StyledContextMenu = styled(ContextMenu)`
  && {
    background: ${colors.white};
    border-radius: 10px;
    padding: 10px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
    z-index: 9997;
    min-width: 130px;
  }
`;

const StyledMenuItem = styled.button`
  min-height: 50px;
  width: 100%;
  text-align: left;
  padding: 10px;
  font-size: 1.1em;
  font-weight: 600;
  color: ${colors.grey.light};
  cursor: pointer;
  outline: none;
  user-select: none;
  &:hover {
    background: rgba(0,0,0,0.03);
  }
`;


interface ColumnTitleProps {
  category: CategoryData;
  isDragging: boolean;
  dragHandleProps: DraggableProvidedDragHandleProps;
  onClickEdit: {(e)}
  onClickDelete: {(e)}
}

@observer
export default class ColumnTitle extends React.Component<ColumnTitleProps, {}> {
  render() {
    const { category, dragHandleProps, isDragging, onClickEdit, onClickDelete } = this.props;
    log("render: " + category.title);
    return (
      <ContextMenuTrigger id={`column_title_context|${category.id}`}>
        <Container {...dragHandleProps} isDragging={isDragging}>
          <Title>{category.title}</Title>
          <StyledContextMenu id={`column_title_context|${category.id}`}>
            <MenuItem onClick={onClickEdit}>
              <StyledMenuItem>
                Edit
              </StyledMenuItem>
            </MenuItem>
            <MenuItem onClick={onClickDelete}>
              <StyledMenuItem>
                Remove
              </StyledMenuItem>
            </MenuItem>
          </StyledContextMenu>
        </Container>
      </ContextMenuTrigger>
    )
  }
}
