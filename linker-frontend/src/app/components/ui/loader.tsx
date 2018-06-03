import * as React from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import {CenterWrapper} from "app/components/ui/center-wrapper";


export const Loader = () => {
  return (
    <CenterWrapper>
      <CircularProgress
        style={{color: "white"}}
      />
    </CenterWrapper>
)};
