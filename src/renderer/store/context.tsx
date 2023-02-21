import React, { Dispatch, useReducer } from 'react';
import { IAction, State, reducer, initialState } from './reducer';

interface ContextProps {
  state: State;
  dispatch: Dispatch<IAction>;
}

export const Context = React.createContext({} as ContextProps);

export const ContextProvider = (props: any) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const value = { state, dispatch };
  return <Context.Provider value={value}>{props.children}</Context.Provider>;
};
