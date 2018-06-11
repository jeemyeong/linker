import * as React from 'react';
import { Board } from 'app/libs/board/board';
import styled from 'styled-components';
import { inject, observer } from 'mobx-react';
import { LinkCard } from 'app/components/board/link-card';
import ColumnTitle from 'app/components/board/column-title';
import UiStore from 'app/stores/ui-store';
import { AddLinkButton } from 'app/components/board/add-link-button';
import * as R from 'ramda';
import AddContentDialog from 'app/components/board/add-content-dialog';
import { Loader } from 'app/components/ui/loader';
import BoardStore from 'app/stores/board-store';
import { EmptyBoard } from 'app/components/ui/empty-board';
import { RouteComponentProps } from 'react-router';
import { STORE_BOARD, STORE_ROUTER, STORE_UI } from 'app/constants/stores';
import { CategoryData } from 'app/type/category-data';
import { LinkData } from 'app/type/link-data';
import { ColumnContainer } from 'app/libs/board/column';
import { AddCategoryButton } from 'app/components/board/add-category-button';

const Container = styled.div``;

export interface BoardContainerProps extends RouteComponentProps<any> {}

export interface BoardContainerState {}

@inject(STORE_UI, STORE_BOARD, STORE_ROUTER)
@observer
export class BoardContainer extends React.Component<BoardContainerProps, BoardContainerState> {

  componentWillReact() {
    console.log("BoardContainer: I will re-render, since the props has changed!");
  }

  renderColumnTitle = (column, isDragging, dragHandleProps) => {
    const boardStore = this.props[STORE_BOARD] as BoardStore;
    return (
      <ColumnTitle
        updateCategory={boardStore.updateCategory}
        category={column}
        isDragging={isDragging}
        dragHandleProps={dragHandleProps}/>
    );
  };

  openAddLinkModal = (category: CategoryData) => {
    const uiStore = this.props[STORE_UI] as UiStore;
    const onSubmit = ({value: url}) =>
      (R as any).pipeP(() => Promise.resolve(),
        uiStore.openLoader,
        () => this.newLink({category, url}),
        uiStore.closeDialog,
        uiStore.closeLoader,
        R.always({message: "Link has been saved"}),
        uiStore.openSnackbar)();

    return uiStore.openDialog({
      DialogComponent: (
        <AddContentDialog
          label={'URL'}
          onSubmit={onSubmit}
          closeModal={uiStore.closeDialog}
          title={'Add Link'}
          msg={'You can add link with typing URL in this box.'}
        />
      )
    })
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
      (R as any).pipe(() => Promise.resolve(),
        uiStore.openLoader,
        () => this.newCategory({title}),
        uiStore.closeDialog,
        uiStore.closeLoader,
        R.always({message: "Category has been saved"}),
        uiStore.openSnackbar)();

    return uiStore.openDialog({
      DialogComponent: (
        <AddContentDialog
          label={'Title'}
          defaultValue={defaultCategoryName}
          onSubmit={onSubmit}
          closeModal={uiStore.closeDialog}
          title={'Add Category'}
          msg={'You can add new category with typing title in this box.'}
        />
      )
    })
  };

  openAddLinkWithDefaultCategory = ({defaultCategoryName}) => {
    const uiStore = this.props[STORE_UI] as UiStore;
    const boardStore = this.props[STORE_BOARD] as BoardStore;
    const onSubmit = ({value: url}) =>
      (R as any).pipe(() => Promise.resolve(),
        uiStore.openLoader,
        () => this.newCategory({title: defaultCategoryName}),
        () => this.newLink({category: boardStore.board.categories[0], url}),
        uiStore.closeDialog,
        uiStore.closeLoader,
        R.always({message: "Link has been saved"}),
        uiStore.openSnackbar)();

    return uiStore.openDialog({
      DialogComponent: (
        <AddContentDialog
          label={'Title'}
          onSubmit={onSubmit}
          closeModal={uiStore.closeDialog}
          title={'Add Link'}
          msg={'You can add link with typing URL in this box.'}
        />
      )
    })
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
    console.log("BoardContainer is rendering");
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
          itemKey={"links"}
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
