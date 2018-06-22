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
import { STORE_BOARD, STORE_ROUTER, STORE_UI, STORE_USER } from 'app/constants/stores';
import { CategoryData } from 'app/type/category-data';
import { LinkData } from 'app/type/link-data';
import { ColumnContainer } from 'app/libs/board/column';
import { AddCategoryButton } from 'app/components/board/add-category-button';
import UpdateContentDialog from 'app/components/board/update-content-dialog';
import * as debug from 'debug';
import { ApiCall } from 'app/network/api-call';
const log = debug('application:board-container.tsx');

const Container = styled.div``;

export interface BoardContainerProps extends RouteComponentProps<any> {}

export interface BoardContainerState {}

@inject(STORE_UI, STORE_BOARD, STORE_ROUTER, STORE_USER)
@observer
export class BoardContainer extends React.Component<BoardContainerProps, BoardContainerState> {

  componentWillReact() {
    log('componentWillReact');
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

    return uiStore.openDialog({
      DialogComponent: <UpdateContentDialog
          label={'URL'}
          onSubmit={({value: url}) => uiStore.closeDialogWithActions(
            () => this.newLink({category, url}).then(
              () => uiStore.openSnackbar({message: 'Link has been saved'})
            ).catch(
              (err) => uiStore.openSnackbar({message: `${err}`})
            )
          )}
          closeModal={uiStore.closeDialog}
          title={'Add Link'}
          msg={'You can add link with typing URL in this box.'}
        />
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

    return uiStore.openDialog({
      DialogComponent: <UpdateContentDialog
        label={'Title'}
        defaultValue={defaultCategoryName}
        onSubmit={({value: title}) => uiStore.closeDialogWithActions(
          () => this.newCategory({title}).then(
            () => uiStore.openSnackbar({message: 'Category has been saved'})
          ).catch(
            (err) => uiStore.openSnackbar({message: `${err}`})
          )
        )}
        closeModal={uiStore.closeDialog}
        title={'Add Category'}
        msg={'You can add new category with typing title in this box.'}
      />
    })
  };

  openEditCategoryModal = ({category}) => {
    const uiStore = this.props[STORE_UI] as UiStore;
    const boardStore = this.props[STORE_BOARD] as BoardStore;

    return uiStore.openDialog({
      DialogComponent: <UpdateContentDialog
        label={'Title'}
        defaultValue={category.title}
        onSubmit={({value: title}) => uiStore.closeDialogWithActions(
          () => boardStore.updateCategory({category, title}).then(
            () => uiStore.openSnackbar({message: 'Category has been saved'})
          ).catch(
            (err) => uiStore.openSnackbar({message: `${err}`})
          )
        )}
        onDelete={() => uiStore.closeDialogWithActions(
          () => boardStore.deleteCategory({category}).then(
            () => uiStore.openSnackbar({message: 'Category has been deleted'})
          ).catch(
            (err) => uiStore.openSnackbar({message: `${err}`})
          )
        )}
        closeModal={uiStore.closeDialog}
        title={'Edit Category'}
        msg={'You can edit category with typing title in this box.'}
      />
    })
  };

  openAddLinkWithDefaultCategory = ({defaultCategoryName}) => {
    const uiStore = this.props[STORE_UI] as UiStore;
    const boardStore = this.props[STORE_BOARD] as BoardStore;

    return uiStore.openDialog({
      DialogComponent: <UpdateContentDialog
        label={'Title'}
        onSubmit={({value: url}) => uiStore.closeDialogWithActions(
          () => this.newCategory({title: defaultCategoryName}).then(
          () => this.newLink({category: boardStore.board.categories[0], url})
          ).then(
            () => uiStore.openSnackbar({message: 'Link has been saved'}),
          ).catch(
            (err) => uiStore.openSnackbar({message: `${err}`})
          ),
        )}
        closeModal={uiStore.closeDialog}
        title={'Add Link'}
        msg={'You can add link with typing URL in this box.'}
      />
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
    const userId = this.props.match.params.userId;
    ApiCall.getUserInfo({userId}).then(
      user => user.boards
    ).then(
      boards => {
        boardStore.boards = boards
        return boards
      }
    ).then(
      boards => boards[0] && boardStore.getBoards(boards[0])
    )
  };

  render() {
    log('render');
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
