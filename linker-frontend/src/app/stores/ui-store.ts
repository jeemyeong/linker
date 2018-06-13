import * as React from 'react';
import { observable, action } from 'mobx';
import * as R from 'ramda';
import { go } from 'app/util/functional';

interface UiSate {
  dialog: {
    isOpen: boolean,
    Component: null | React.ReactElement<{}>
  },
  loader: {
    isOpen: boolean
  },
  snackbar: {
    isOpen: boolean,
    message: null | string
  }
  floatingButton: {
    isOpen: boolean
  }
}

export class UiStore {
  @observable public state: UiSate = {
    dialog: {
      isOpen: false,
      Component: null
    },
    loader: {
      isOpen: false
    },
    snackbar: {
      isOpen: false,
      message: null
    },
    floatingButton: {
      isOpen: false
    }
  };

  @action
  openDialog = (DialogComponent: React.ReactElement<{}>) => {
    this.state = {
      ...this.state,
      dialog: {
        isOpen: true,
        Component: DialogComponent
      }
    }
  };

  @action
  closeDialog = () => {
    this.state = {
      ...this.state,
      dialog: {
        isOpen: false,
        Component: null
      }
    }
  };

  @action
  openLoader = () => {
    this.state = {
      ...this.state,
      loader: {
        isOpen: true
      }
    }
  };

  @action
  closeLoader = () => {
    this.state = {
      ...this.state,
      loader: {
        isOpen: false
      }
    }
  };

  @action
  openSnackbar = ({message}: {message: string}) => {
    this.state = {
      ...this.state,
      snackbar: {
        isOpen: true,
        message
      }
    }
  };

  @action
  closeSnackbar = () => {
    this.state = {
      ...this.state,
      snackbar: {
        isOpen: false,
        message: null
      }
    }
  };

  closeDialogWithActions = (arg: {message: string} & {[key: string]: any}, ...fns) => {
    return go(arg,
      R.tap(this.openLoader),
      ...R.map<({})[], ({})[]>(R.tap, fns),
      R.tap(this.closeDialog),
      R.tap(this.closeLoader),
      R.tap(this.openSnackbar)
    )
  };
}

export default UiStore;