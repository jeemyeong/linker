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
import { STORE_ROUTER, STORE_UI } from 'app/constants/stores';
import { Nav } from 'app/components/nav/nav';
import { sizes } from 'app/constants/size';

const Container = styled.div`
  display: flex;
`;

const LeftSide = styled.div`
  position: relative;
  width: ${sizes.leftSide};
  height: 100vh;
`;

const RightSide = styled.div`
  width: calc(100% - ${sizes.leftSide});
  height: 100%;
`;

export interface LinkerAppProps extends RouteComponentProps<any> {
  /** MobX Stores will be injected via @inject() **/
  // [STORE_ROUTER]: RouterStore;
  // [STOURE_TODO]: UserStore;
}

export interface LinkerState {}

@inject(STORE_UI, STORE_ROUTER)
@observer
export class Linker extends React.Component<LinkerAppProps, LinkerState> {
  render() {
    const uiStore = this.props[STORE_UI] as UiStore;
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
          <Header/>
          <Main
            {...this.props}
          />
        </RightSide>
      </Container>
    )
  }
}