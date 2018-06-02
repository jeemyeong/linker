import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import { Board } from 'app/components/linker/Board/board';
import Banner from 'app/components/linker/Banner/banner';
import styled from 'styled-components';
import { inject, observer } from 'mobx-react';
import { LinkCard } from 'app/components/linker/Link/link-card';
import ColumnTitle from 'app/components/linker/ColumnTitle/column-title';
import {STORE_BOARD, STORE_ROUTER, STORE_UI} from 'app/constants';
import UiStore from 'app/stores/ui-store';
import { AddLinkButton } from 'app/components/linker/Link/add-link-button';
import * as R from 'ramda';
import AddContentDialog from 'app/components/linker/Link/add-content-dialog';
import { DialogModal } from 'app/components/linker/ui/dialog-modal';
import { Loader } from 'app/components/linker/ui/loader';
import { Snackbar } from 'app/components/linker/ui/snackbar';
import BoardStore from 'app/stores/board-store';
import { CategoryData } from 'app/type/category-data';
import { LinkData } from 'app/type/link-data';
import { FloatingButton } from 'app/components/linker/ui/floating-button';
import { EmptyBoard } from 'app/components/linker/ui/empty-board';
import { Overlay } from "app/components/linker/ui/overlay";

const Layout = styled.div`
  position: relative;
  background: #f5f5f5;
`;

const Header = styled.header`
  width: 100%;
  position: fixed;
  height: 5vh;
`;

const Main = styled.main`
  position: absolute;
  width: 100%;
  top: 4vh;
  height: 94vh;
  background: #fff;
`;

export interface LinkerAppProps extends RouteComponentProps<any> {
  /** MobX Stores will be injected via @inject() **/
  // [STORE_ROUTER]: RouterStore;
  // [STOURE_TODO]: UserStore;
}

export interface LinkerAppState {}

@inject(STORE_UI, STORE_BOARD, STORE_ROUTER)
@observer
export class BoardContainer extends React.Component<LinkerAppProps, LinkerAppState> {

  renderColumnTitle = (column, isDragging, dragHandleProps) => (
    <ColumnTitle category={column}
      isDragging={isDragging}
      dragHandleProps={dragHandleProps}/>
  );

  openAddLinkModal = (category: CategoryData) => {
    const uiStore = this.props[STORE_UI] as UiStore;
    return uiStore.openDialog({
      DialogComponent: (
        <AddContentDialog
          onSubmit={({content: url}) => {
            return R.pipe(uiStore.openLoader, () => this.newLink({category, url}).then(R.pipe(uiStore.closeDialog, uiStore.closeLoader, R.always({message: "Link has been saved"}), uiStore.openSnackbar)))(true)
          }}
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
        category={category}
        openAddLinkModal={this.openAddLinkModal}
      />
    )
  };

  openAddCategoryModal = () => {
    const uiStore = this.props[STORE_UI] as UiStore;
    return uiStore.openDialog({
      DialogComponent: (
        <AddContentDialog
          onSubmit={({content: title}) => {
            return R.pipe(uiStore.openLoader, () => this.newCategory({title}).then(R.pipe(uiStore.closeDialog, uiStore.closeLoader, R.always({message: "Category has been saved"}), uiStore.openSnackbar)))(true)
          }}
          closeModal={uiStore.closeDialog}
          title={'Add Category'}
          msg={'You can add new category with typing title in this box.'}
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

  renderItem = (item: LinkData) => {
    const boardStore = this.props[STORE_BOARD] as BoardStore;
    return <LinkCard link={item} deleteLink={boardStore.deleteLink}/>
  };

  componentDidMount() {
    const boardStore = this.props[STORE_BOARD] as BoardStore;
    const boardId = this.props.match.params.boardId
    boardStore.getBoard(boardId);
  };

  render() {
    const boardStore = this.props[STORE_BOARD] as BoardStore;
    const uiStore = this.props[STORE_UI] as UiStore;
    const board = boardStore.board;
    const isLoading = boardStore.isLoading;
    if (isLoading) {
      return <Loader/>
    }
    if (!board) {
      return <EmptyBoard/>
    }

    board.categories.forEach(category => category["items"] = category.links);

    return (
      <Layout>
        {
          uiStore.state.snackbar.isOpen && <Snackbar message={uiStore.state.snackbar.message} handleClose={uiStore.closeSnackbar}/>
        }
        {
          uiStore.state.loader.isOpen && <Overlay><Loader/></Overlay>
        }
        {
          <FloatingButton handleClick={this.openAddCategoryModal}/>
        }
        {
          uiStore.state.dialog.isOpen &&
          <DialogModal
            open={uiStore.state.dialog.isOpen}
            onClose={uiStore.closeDialog}
          >
            {uiStore.state.dialog.Component}
          </DialogModal>
        }
        <Header>
          <Banner/>
        </Header>
        <Main>
          <Board
            board={board}
            reorderColumn={boardStore.reorderCategories}
            reorderItem={boardStore.reorderLink}
            renderItem={this.renderItem}
            renderColumnTitle={this.renderColumnTitle}
            renderAddItemButton={this.renderAddItemButton}
          />
        </Main>
      </Layout>
    )
  }
}
