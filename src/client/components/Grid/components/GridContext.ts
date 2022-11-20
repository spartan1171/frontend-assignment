import { createContext } from 'react';
import { IGridContext } from './GridContext.d';

export const defaultState: IGridContext = {
  spacing: 0,
};

export default createContext<IGridContext>(defaultState);
