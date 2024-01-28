import React from 'react';

export interface NavTabLayoutContextState {
  setIsRefreshing(refreshing: boolean): void;
  setLayoutRefreshHandler(handler: (() => void) | null): void;
}

const initialState: NavTabLayoutContextState = {
  setIsRefreshing() {},
  setLayoutRefreshHandler() {},
};

export const NavTabLayoutContext = React.createContext(initialState);
