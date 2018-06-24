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
import { STORE_BOARD, STORE_ROUTER, STORE_UI, STORE_AUTH } from 'app/constants/stores';
import { CategoryData } from 'app/type/category-data';
import { LinkData } from 'app/type/link-data';
import { ColumnContainer } from 'app/libs/board/column';
import { AddCategoryButton } from 'app/components/board/add-category-button';
import UpdateContentDialog from 'app/components/board/update-content-dialog';
import * as debug from 'debug';
const log = debug('application:board-container.tsx');

const Container = styled.div``;

export interface BoardContainerProps extends RouteComponentProps<any> {}

export interface BoardContainerState {}

@inject(STORE_UI, STORE_BOARD, STORE_ROUTER, STORE_AUTH)
@observer
export class BoardContainer extends React.Component<BoardContainerProps, BoardContainerState> {

  componentWillReact() {
    log('componentWillReact');
  }

  renderColumnTitle = (column, isDragging, dragHandleProps) => {
    const boardStore = this.props[STORE_BOARD] as BoardStore;
    const uiStore = this.props[STORE_UI] as UiStore;
    return (
      <ColumnTitle
        category={column}
        isDragging={isDragging}
        dragHandleProps={dragHandleProps}
        onClickEdit={() => this.openEditCategoryModal({category: column})}
        onClickDelete={() => boardStore.deleteCategory({category: column}).then(
          () => uiStore.openSnackbar({message: 'Category has been deleted'})
        ).catch(
          (err) => uiStore.openSnackbar({message: `${err}`})
        )}
      />
    );
  };

  openAddLinkModal = (category: CategoryData) => {
    const uiStore = this.props[STORE_UI] as UiStore;

    return uiStore.openDialog({
      DialogComponent: <UpdateContentDialog
          onSubmit={({value: url}) => uiStore.closeDialogWithActions(
            () => this.newLink({category, url}).then(
              () => {
                console.log("ERR")
                uiStore.openSnackbar({message: 'Link has been saved'})
              }
            ).catch(
              (err) => uiStore.openSnackbar({message: `${err}`})
            )
          )}
          closeModal={uiStore.closeDialog}
          title={`Add Link to ${category.title}`}
          placeholder={'https://paste.link.here'}
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
      />
    })
  };

  openEditCategoryModal = ({category}) => {
    const uiStore = this.props[STORE_UI] as UiStore;
    const boardStore = this.props[STORE_BOARD] as BoardStore;

    return uiStore.openDialog({
      DialogComponent: <UpdateContentDialog
        defaultValue={category.title}
        onSubmit={({value: title}) => uiStore.closeDialogWithActions(
          () => boardStore.updateCategory({category, title}).then(
            () => uiStore.openSnackbar({message: 'Category has been saved'})
          ).catch(
            (err) => uiStore.openSnackbar({message: `${err}`})
          )
        )}
        closeModal={uiStore.closeDialog}
        title={'Edit Category'}
      />
    })
  };

  openEditLinkModal = ({link}) => {
    const uiStore = this.props[STORE_UI] as UiStore;
    const boardStore = this.props[STORE_BOARD] as BoardStore;

    return uiStore.openDialog({
      DialogComponent: <UpdateContentDialog
        onSubmit={({value: url}) => uiStore.closeDialogWithActions(
          () => boardStore.updateLink({link, url}).then(
            () => uiStore.openSnackbar({message: 'Link has been saved'})
          ).catch(
            (err) => uiStore.openSnackbar({message: `${err}`})
          )
        )}
        closeModal={uiStore.closeDialog}
        title={'Edit Link'}
        defaultValue={link.url}
      />
    })
  };

  openAddLinkWithDefaultCategory = ({defaultCategoryName}) => {
    const uiStore = this.props[STORE_UI] as UiStore;
    const boardStore = this.props[STORE_BOARD] as BoardStore;

    return uiStore.openDialog({
      DialogComponent: <UpdateContentDialog
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
        title={`Add Link to ${defaultCategoryName}`}
        placeholder={'https://paste.link.here'}
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
    const uiStore = this.props[STORE_UI] as UiStore;
    const boardStore = this.props[STORE_BOARD] as BoardStore;
    return <LinkCard
      isDragging={isDragging}
      link={item}
      onClickDelete={() => boardStore.deleteLink({targetLink: item}).then(
        () => uiStore.openSnackbar({message: 'Category has been deleted'})
      ).catch(
        (err) => uiStore.openSnackbar({message: `${err}`})
      )}
      onClickEdit={() => this.openEditLinkModal({link: item})}
    />
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
