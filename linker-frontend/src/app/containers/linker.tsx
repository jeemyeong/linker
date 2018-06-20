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
import { STORE_ROUTER, STORE_UI, STORE_USER } from 'app/constants/stores';
import { Nav } from 'app/components/nav/nav';
import { sizes } from 'app/constants/size';
import { SignIn } from 'app/components/sign-in/sign-in';
import UserStore from 'app/stores/user-store';

const Container = styled.div`
  display: flex;
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

@inject(STORE_UI, STORE_ROUTER, STORE_USER)
@observer
export class Linker extends React.Component<LinkerAppProps, LinkerState> {
  render() {
    const uiStore = this.props[STORE_UI] as UiStore;
    const userStore = this.props[STORE_USER] as UserStore;
    return (
      <Container>
        {
          uiStore.state.snackbar.isOpen && <Snackbar message={uiStore.state.snackbar.message} handleClose={uiStore.closeSnackbar}/>
        }
        {
          uiStore.state.loader.isOpen && <Overlay><Loader/></Overlay>
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
        <LeftSide>
          <Nav/>
        </LeftSide>

        <RightSide>
          <Header
            onClickSignIn={() =>uiStore.openDialog({
              DialogComponent: <SignIn
                onFailure={(response) => {
                  uiStore.closeDialogWithActions({message: `Error: ${response.error}`})
                }}
                onSuccess={(gToken) => {
                  uiStore.closeDialogWithActions(
                    () => userStore.signInWithGoogle({gToken}).then(
                      () => uiStore.openSnackbar({message: 'Successful SignIn'}),
                    ).catch(
                      (err) => uiStore.openSnackbar({message: `${err}`})
                    )
                  )
                }}
                closeModal={uiStore.closeDialog}
              />
            })}
          />
          <Main
            {...this.props}
          />
        </RightSide>
      </Container>
    )
  }
}