import * as React from 'react';
import { Board } from 'app/libs/board/board';
import styled from 'styled-components';
import { inject, observer } from 'mobx-react';
import { LinkCard } from 'app/components/board/link-card';
import ColumnTitle from 'app/components/board/column-title';
import UiStore from 'app/stores/ui-store';
import { AddLinkButton } from 'app/components/board/add-link-button';
import { Loader } from 'app/components/ui/loader';
import BoardStore from 'app/stores/board-store';
import { EmptyBoard } from 'app/components/ui/empty-board';
import { RouteComponentProps } from 'react-router';
import { STORE_BOARD, STORE_ROUTER, STORE_UI } from 'app/constants/stores';
import { CategoryData } from 'app/type/category-data';
import { LinkData } from 'app/type/link-data';
import { ColumnContainer } from 'app/libs/board/column';
import { AddCategoryButton } from 'app/components/board/add-category-button';
import * as R from 'ramda';
import UpdateContentDialog from 'app/components/board/add-content-dialog';

const Container = styled.div``;

export interface BoardContainerProps extends RouteComponentProps<any> {}

export interface BoardContainerState {}

@inject(STORE_UI, STORE_BOARD, STORE_ROUTER)
@observer
export class BoardContainer extends React.Component<BoardContainerProps, BoardContainerState> {

  componentWillReact() {
    console.log('BoardContainer: I will re-render, since the props has changed!');
  }

  renderColumnTitle = (column, isDragging, dragHandleProps) => {
    return (
      <ColumnTitle
        category={column}
        isDragging={isDragging}
        dragHandleProps={dragHandleProps}
        onDoubleClick={() => this.openEditCategoryModal({category: column})}
      />
    );
  };

  openAddLinkModal = (category: CategoryData) => {
    const uiStore = this.props[STORE_UI] as UiStore;
    const onSubmit = ({value: url}) =>
      uiStore.closeDialogWithActions({category, url, message: 'Link has been saved'},
        this.newLink);

    return uiStore.openDialog(
      <UpdateContentDialog
        label={'URL'}
        onSubmit={onSubmit}
        closeModal={uiStore.closeDialog}
        title={'Add Link'}
        msg={'You can add link with typing URL in this box.'}
      />
    )
  };

  renderAddItemButton = (index: number) => {
    const boardStore = this.props[STORE_BOARD] as BoardStore;
    const category = boardStore.board.categories[index];
    return (
      <AddLinkButton
        onClick={() => this.openAddLinkModal(category)}
      />
    )
  };

  renderAddCategory = () => {
    const date = new Date();
    const defaultCategoryName = `Category for ${date.getUTCMonth()+1}/${date.getDate()}`;
    return (
      <ColumnContainer>
        <AddCategoryButton
          defaultCategoryName={defaultCategoryName}
          onClick={() => this.openAddCategoryModal({defaultCategoryName})}
        />
        <AddLinkButton
          onClick={() =>this.openAddLinkWithDefaultCategory({defaultCategoryName})}
        />
      </ColumnContainer>
    );
  };

  openAddCategoryModal = ({defaultCategoryName}) => {
    const uiStore = this.props[STORE_UI] as UiStore;
    const onSubmit = ({value: title}) =>
      uiStore.closeDialogWithActions({title, message: 'Category has been saved'},
        this.newCategory);

    return uiStore.openDialog(
      <UpdateContentDialog
        label={'Title'}
        defaultValue={defaultCategoryName}
        onSubmit={onSubmit}
        closeModal={uiStore.closeDialog}
        title={'Add Category'}
        msg={'You can add new category with typing title in this box.'}
      />
    )
  };

  openEditCategoryModal = ({category}) => {
    const uiStore = this.props[STORE_UI] as UiStore;
    const boardStore = this.props[STORE_BOARD] as BoardStore;
    const onSubmit = ({value: title}) =>
      uiStore.closeDialogWithActions({category, title, message: 'Category has been saved'},
        boardStore.updateCategory);
    const deleteCategory = () =>
      uiStore.closeDialogWithActions({category, message: 'Category has been deleted'},
        boardStore.deleteCategory);

    return uiStore.openDialog(
      <UpdateContentDialog
        label={'Title'}
        defaultValue={category.title}
        onSubmit={onSubmit}
        deleteContent={deleteCategory}
        closeModal={uiStore.closeDialog}
        title={'Edit Category'}
        msg={'You can edit category with typing title in this box.'}
      />
    )
  };

  openAddLinkWithDefaultCategory = ({defaultCategoryName}) => {
    const uiStore = this.props[STORE_UI] as UiStore;
    const boardStore = this.props[STORE_BOARD] as BoardStore;
    const onSubmit = ({value: url}) =>
      uiStore.closeDialogWithActions({title: defaultCategoryName, message: 'Link has been saved'},
        this.newCategory,
        R.tap(() => this.newLink({category: boardStore.board.categories[0], url})),
      );

    return uiStore.openDialog(
      <UpdateContentDialog
        label={'Title'}
        onSubmit={onSubmit}
        closeModal={uiStore.closeDialog}
        title={'Add Link'}
        msg={'You can add link with typing URL in this box.'}
      />
    )
  };

  newCategory = ({title}: {title: string}) => {
    const boardStore = this.props[STORE_BOARD] as BoardStore;
    return boardStore.addCategory({title})
  };

  newLink = ({category, url}: {category: CategoryData, url: string}) => {
    const boardStore = this.props[STORE_BOARD] as BoardStore;
    return boardStore.addLink({url, category})
  };

  renderItem = (item: LinkData, isDragging: boolean) => {
    const boardStore = this.props[STORE_BOARD] as BoardStore;
    return <LinkCard isDragging={isDragging} link={item} deleteLink={boardStore.deleteLink}/>
  };

  componentDidMount() {
    const boardStore = this.props[STORE_BOARD] as BoardStore;
    const boardId = this.props.match.params.boardId;
    boardStore.getBoard(boardId);
  };

  render() {
    console.log('BoardContainer is rendering');
    const boardStore = this.props[STORE_BOARD] as BoardStore;
    const board = boardStore.board;
    const isLoading = boardStore.isLoading;
    if (isLoading) {
      return <Loader/>
    }
    if (!board) {
      return <EmptyBoard/>
    }

    return (
      <Container>
        <Board
          board={board}
          itemKey={'links'}
          reorderColumn={boardStore.reorderCategories}
          reorderItem={boardStore.reorderLink}
          renderItem={this.renderItem}
          renderAddColumn={this.renderAddCategory}
          renderColumnTitle={this.renderColumnTitle}
          renderAddItemButton={this.renderAddItemButton}
        />
      </Container>
    )
  }
}
