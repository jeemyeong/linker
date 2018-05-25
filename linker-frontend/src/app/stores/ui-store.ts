import * as React from 'react';
import { observable, action } from 'mobx';

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
    }
  };

  @action
  openDialog = ({DialogComponent}: {DialogComponent: React.ReactElement<{}>}) => {
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
  }


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
  }

  @action
  closeSnackbar = () => {
    this.state = {
      ...this.state,
      snackbar: {
        isOpen: false,
        message: null
      }
    }
  }
}

export default UiStore;