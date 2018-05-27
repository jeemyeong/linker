import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import { Board } from 'app/components/linker/Board/board';
import Banner from 'app/components/linker/Banner/banner';
import styled from 'styled-components';
import { inject, observer } from 'mobx-react';
import { LinkCard } from 'app/components/linker/Link/link-card';
import ColumnTitle from 'app/components/linker/ColumnTitle/column-title';
import { STORE_BOARD, STORE_UI } from 'app/constants';
import UiStore from 'app/stores/ui-store';
import { AddLinkButton } from 'app/components/linker/Link/add-link-button';
import { LinkModel } from 'app/models';
import * as R from 'ramda';
import AddLinkDialog from 'app/components/linker/Link/add-link-dialog';
import { DialogModal } from 'app/components/linker/Dialog/dialog-modal';
import { Loader } from 'app/components/linker/ui/loader';
import { Snackbar } from 'app/components/linker/ui/snackbar';
import BoardStore from 'app/stores/board-store';
import { CategoryData } from 'app/type/category-data';
import { LinkData } from 'app/type/link-data';

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

@inject(STORE_UI, STORE_BOARD)
@observer
export class LinkerApp extends React.Component<LinkerAppProps, LinkerAppState> {

  renderColumnTitle = (column, isDragging, dragHandleProps) => (
    <ColumnTitle category={column}
      isDragging={isDragging}
      dragHandleProps={dragHandleProps}/>
  );

  openAddLinkModal = (category: CategoryData) => {
    const uiStore = this.props[STORE_UI] as UiStore;
    return uiStore.openDialog({
      DialogComponent: (
        <AddLinkDialog
          onSubmit={({url}) => {
            return R.pipe(uiStore.openLoader, () => this.newLink({category, url}).then(R.pipe(uiStore.closeDialog, uiStore.closeLoader, R.always({message: "Link has been saved"}), uiStore.openSnackbar)))(true)
          }}
          closeModal={uiStore.closeDialog}
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

  newLink = ({category, url}: {category: CategoryData, url: string}) => {
    const boardStore = this.props[STORE_BOARD] as BoardStore;
    const link: LinkData = {
      id: 0,
      url,
      content: '',
      order: 0,
    };
    return boardStore.addLink({link, category})
  };

  renderItem = (item: LinkModel) => {
    const boardStore = this.props[STORE_BOARD] as BoardStore;
    return <LinkCard link={item} deleteLink={boardStore.deleteLink}/>
  };

  render() {
    const boardStore = this.props[STORE_BOARD] as BoardStore;
    const uiStore = this.props[STORE_UI] as UiStore;
    const board = boardStore.board;
    board.categories.forEach(category => category["items"] = category.links);

    return (
      <Layout>
        {
          uiStore.state.snackbar.isOpen && <Snackbar message={uiStore.state.snackbar.message} handleClose={uiStore.closeSnackbar}/>
        }
        {
          uiStore.state.loader.isOpen && <Loader/>
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
