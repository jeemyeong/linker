import * as React from 'react';
import styled from 'styled-components';
import { inject, observer } from 'mobx-react';
import { RouteComponentProps } from 'react-router';
import UiStore from 'app/stores/ui-store';
import { Loader } from 'app/components/ui/loader';
import { Overlay } from 'app/components/ui/overlay';
import { Snackbar } from 'app/components/ui/snackbar';
import Header from 'app/components/header/header';
import { Main } from 'app/components/main/main';
import { STORE_ROUTER, STORE_UI, STORE_AUTH, STORE_NAV, STORE_BOARD } from 'app/constants/stores';
import { NavContainer } from 'app/components/nav/nav-container';
import { sizes } from 'app/constants/size';
import { SignIn } from 'app/components/sign-in/sign-in';
import AuthStore from 'app/stores/auth-store';
import { NavStore } from 'app/stores/nav-store';
import * as debug from 'debug';
import RouterStore from 'app/stores/router-store';
import { AuthData } from 'app/type/user-data';
const log = debug('application:linker.tsx');

const Container = styled.div`
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




const userIdPattern = new RegExp(/(\/user\/)([\d]+)($|[\/]?.*)/);

const getUserId = (path) => {
  const res = userIdPattern.exec(path);
  return res && res[2] && +res[2]
};


export interface LinkerAppProps extends RouteComponentProps<any> {
  /** MobX Stores will be injected via @inject() **/
}

export interface LinkerState {}

@inject(STORE_UI, STORE_ROUTER, STORE_AUTH, STORE_NAV, STORE_BOARD)
@observer
class Linker extends React.Component<LinkerAppProps, LinkerState> {

  unsubscribeHistory;

  componentDidMount() {
    const navStore = this.props[STORE_NAV] as NavStore;
    const userId = this.props.match.params.userId;
    const routerStore = this.props[STORE_ROUTER] as RouterStore;

    this.unsubscribeHistory = routerStore.history.subscribe(location => {
      const userId = getUserId(location.pathname);
      if (userId) {
        navStore.getBoards({userId}).catch(this.redirectToOtherPage)
      } else {
        this.redirectToOtherPage()
      }
    });
    log('componentDidMount');
    log('userId: '+userId);
  }

  componentWillUnmount() {
    this.unsubscribeHistory()
  }

  redirectToOtherPage = () => {
    const authStore = this.props[STORE_AUTH] as AuthStore;
    if (authStore.authed) {
      const userId = authStore.authData.id;
      this.redirectToUserBoard({userId});
    } else {
      this.openSignInPage()
    }
  };

  openSignInPage = () => {
    const uiStore = this.props[STORE_UI] as UiStore;
    const authStore = this.props[STORE_AUTH] as AuthStore;
    return uiStore.openDialog({
      DialogComponent: <SignIn
        onFailure={(response) => uiStore.openSnackbar({message: `${response.error}`})}
        onSuccess={(gToken) => authStore.signInWithGoogle({gToken}).then((authData:AuthData) => {
          uiStore.openSnackbar({message: 'Successful SignIn'});
          return authData
        }).then(
          (authData: AuthData) => {
            const userId = authData.id;
            this.redirectToUserBoard({userId});
            uiStore.closeDialog()
          }).catch(
          (err) => uiStore.openSnackbar({message: `${err}`})
        )}
        closeModal={uiStore.closeDialog}
      />
    })
  };

  redirectToUserBoard = ({userId}: {userId: number}) => {
    const routerStore = this.props[STORE_ROUTER] as RouterStore;
    routerStore.push(`/user/${userId}`);
  };

  render() {
    const uiStore = this.props[STORE_UI] as UiStore;
    const authStore = this.props[STORE_AUTH] as AuthStore;
    const userId = authStore.authData && authStore.authData.id;
    const isModalOpen = uiStore.state.loader.isOpen || uiStore.state.dialog.isOpen;
    return (
      <Container>
        {
          uiStore.state.loader.isOpen && <Overlay><Loader/></Overlay>
        }
        {
          uiStore.state.dialog.isOpen && uiStore.state.dialog.Component
        }
        {
          uiStore.state.snackbar.isOpen && <Snackbar message={uiStore.state.snackbar.message} handleClose={uiStore.closeSnackbar}/>
        }
        <ContentContainer
          isModalOpen={isModalOpen}
        >
          <LeftSide>
            <NavContainer/>
          </LeftSide>

          <RightSide>
            <Header
              onClickSignIn={this.openSignInPage}
              onClickSignOut={authStore.signOut}
              authed={authStore.authed}
              authData={authStore.authData}
              redirectToUserBoard={() => this.redirectToUserBoard({userId})}
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

export default Linker;
