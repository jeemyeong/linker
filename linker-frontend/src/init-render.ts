import * as debug from 'debug';
import { __PRODUCTION__ } from './config';
import { rootStore } from 'app/app';
import { STORE_AUTH } from 'app/constants/stores';

if (__PRODUCTION__) {
  //production disable log
  debug.enable('-application:*')
} else {
  debug.enable('application:*')
}

export const initRender = (callback) => Promise.resolve().then(
  () => rootStore[STORE_AUTH].signInWithToken().then(
    () => callback()
  ).catch(
    () => callback()
  )
);