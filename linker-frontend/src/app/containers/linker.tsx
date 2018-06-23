import * as React from 'react';
import styled from 'styled-components';
import { inject, observer } from 'mobx-react';
import { RouteComponentProps } from 'react-router';
import UiStore from 'app/stores/ui-store';
import { Loader } from 'app/components/ui/loader';
import { Overlay } from 'app/components/ui/overlay';
import { Snackbar } from 'app/components/ui/snackbar';
import { DialogModal } from 'app/components/ui/dialog-modal';
import Header from 'app/components/header/header';
import { Main } from 'app/components/main/main';
import { STORE_ROUTER, STORE_UI, STORE_AUTH, STORE_NAV, STORE_BOARD } from 'app/constants/stores';
import { Nav } from 'app/components/nav/nav';
import { sizes } from 'app/constants/size';
import { SignIn } from 'app/components/sign-in/sign-in';
import AuthStore from 'app/stores/auth-store';
import { NavStore } from 'app/stores/nav-store';
import BoardStore from 'app/stores/board-store';

const Container = styled.div`
`;

const ModalContainer = styled.div`
  position: fixed;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  filter: none;
  z-index: 9999;
`;

const ContentContainer = styled.div`
  display: flex;
  filter: ${({isModalOpen}: { isModalOpen }) => isModalOpen ? `blur(80px)` : `none`};
  ${({isModalOpen}: { isModalOpen }) => isModalOpen ? `pointer-events: none;` : ``}
`;

const LeftSide = styled.div`
  position: relative;
  width: ${sizes.leftSide.width};
  height: 100vh;
`;

const RightSide = styled.div`
  width: calc(100% - ${sizes.leftSide.width});
  height: 100%;
`;

export interface LinkerAppProps extends RouteComponentProps<any> {
  /** MobX Stores will be injected via @inject() **/
}

export interface LinkerState {}

@inject(STORE_UI, STORE_ROUTER, STORE_AUTH, STORE_NAV, STORE_BOARD)
@observer
export class Linker extends React.Component<LinkerAppProps, LinkerState> {

  componentDidMount() {
    const navStore = this.props[STORE_NAV] as NavStore;
    const boardStore = this.props[STORE_BOARD]  as BoardStore;
    const userId = this.props.match.params.userId;
    navStore
      .getBoards({userId})
      .then(currentBoardId => currentBoardId && boardStore.getBoard({id: currentBoardId}))
  }

  render() {
    const uiStore = this.props[STORE_UI] as UiStore;
    const authStore = this.props[STORE_AUTH] as AuthStore;
    const navStore = this.props[STORE_NAV] as NavStore;
    const isModalOpen = uiStore.state.loader.isOpen || uiStore.state.dialog.isOpen;
    return (
      <Container>
        {
          isModalOpen &&
          <ModalContainer>
            {
              uiStore.state.loader.isOpen && <Overlay><Loader/></Overlay>
            }
            {
              uiStore.state.dialog.isOpen &&
              <DialogModal
                isOpen={uiStore.state.dialog.isOpen}
                onClose={uiStore.closeDialog}
              >
                {uiStore.state.dialog.Component}
              </DialogModal>
            }
          </ModalContainer>
        }
        {
          uiStore.state.snackbar.isOpen && <Snackbar message={uiStore.state.snackbar.message} handleClose={uiStore.closeSnackbar}/>
        }
        <ContentContainer
          isModalOpen={isModalOpen}
        >
          <LeftSide>
            <Nav
              boards={navStore.boards}
              currentBoardId={navStore.currentBoardId}
            />
          </LeftSide>

          <RightSide>
            <Header
              onClickSignIn={() =>uiStore.openDialog({
                DialogComponent: <SignIn
                  onFailure={(response) => {
                    uiStore.closeDialogWithActions(
                      () => uiStore.openSnackbar({message: `${response.error}`})
                    )
                  }}
                  onSuccess={(gToken) => {
                    uiStore.closeDialogWithActions(
                      () => authStore.signInWithGoogle({gToken}).then(
                        () => uiStore.openSnackbar({message: 'Successful SignIn'}),
                      ).catch(
                        (err) => uiStore.openSnackbar({message: `${err}`})
                      )
                    )
                  }}
                  closeModal={uiStore.closeDialog}
                />
              })}
              onClickSignOut={authStore.signOut}
              authed={authStore.authed}
              authData={authStore.authData}
            />
            <Main
              {...this.props}
            />
          </RightSide>
        </ContentContainer>

      </Container>
    )
  }
}