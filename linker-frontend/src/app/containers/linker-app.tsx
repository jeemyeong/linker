import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import { Board } from 'app/components/linker/Board/board';
import Banner from 'app/components/linker/Banner/banner';
import styled from 'styled-components';
import { inject, observer } from 'mobx-react';
import { STORE_CATEGORY, STORE_LINK } from 'app/constants/index';
import { CategoryStore, LinkStore } from 'app/stores/index';
import { LinkCard } from 'app/components/linker/Link/link-card';
import ColumnTitle from 'app/components/linker/ColumnTitle/column-title';
import { STORE_UI } from 'app/constants';
import UiStore from 'app/stores/ui-store';
import { AddLinkButton } from 'app/components/linker/Link/add-link-button';
import { CategoryModel, LinkModel } from 'app/models';
import { rootStore } from '../../main';
import * as R from 'ramda';
import AddLinkDialog from 'app/components/linker/Link/add-link-dialog';
import { DialogModal } from 'app/components/linker/Dialog/dialog-modal';
import { Loader } from 'app/components/linker/ui/loader';
import { Snackbar } from 'app/components/linker/ui/snackbar';

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

@inject(STORE_LINK, STORE_CATEGORY, STORE_UI)
@observer
export class LinkerApp extends React.Component<LinkerAppProps, LinkerAppState> {

  renderColumnTitle= (column, isDragging, dragHandleProps) => (
    <ColumnTitle category={column}
      isDragging={isDragging}
      dragHandleProps={dragHandleProps}/>
  );

  renderAddItemButton = (listId: number) => {
    const uiStore = this.props[STORE_UI] as UiStore;
    const categoryStore = this.props[STORE_CATEGORY] as CategoryStore;
    const category = categoryStore.categories.find(category => category.id === listId);

    return (
      <AddLinkButton
        category={category}
        openAddLinkModal={(category) => uiStore.openDialog({
          DialogComponent: (
            <AddLinkDialog
              onSubmit={({url}) => {
                const link = this.newLink({url: url, category: category});
                return R.pipe(uiStore.openLoader, () => this.submitLink({link}).then(R.pipe(uiStore.closeDialog, uiStore.closeLoader, R.always({message: "Link has been saved"}), uiStore.openSnackbar)))(true)
              }}
              closeModal={uiStore.closeDialog}
            />
          )
        })}
      />
    )
  };

  submitLink = ({link}: {link: LinkModel}) => {
    const linkStore = this.props[STORE_LINK] as LinkStore;
    return linkStore.addLink({link})
  };

  newLink = ({url, category}: {url: string, category: CategoryModel}) => {
    const order = R.countBy((link: LinkModel) => link.category.id)(rootStore[STORE_LINK].links)[category.id] + 1;
    return new LinkModel({url, category, order})
  };

  render() {
    const linkStore = this.props[STORE_LINK] as LinkStore;
    const categoryStore = this.props[STORE_CATEGORY] as CategoryStore;
    const uiStore = this.props[STORE_UI] as UiStore;
    const links = linkStore.links;
    const categories = categoryStore.categories;
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
            items={links}
            columns={categories}
            reorderColumn={categoryStore.reorderCategories}
            reorderItem={linkStore.reorderLink}
            renderItem={(item) => <LinkCard link={item} deleteLink={linkStore.deleteLink}/>}
            renderColumnTitle={this.renderColumnTitle}
            renderAddItemButton={this.renderAddItemButton}
          />
        </Main>
      </Layout>
    )
  }
}
