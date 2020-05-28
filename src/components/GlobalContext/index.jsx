import React, { createContext, useReducer } from 'react';

export const GlobalColorContext = createContext(null);

export const UPDATE_COLOR = 'UPDATE_COLOR';

const reducer = (state, action) => {
  switch (action.type) {
    case UPDATE_COLOR:
      return action.color;
    default:
      return state;
  }
};

const GlobalColor = props => {
  const [color, dispatch] = useReducer(reducer, 'blue');

  return (
    <GlobalColorContext.Provider value={{ color, dispatch }}>
      {props.children}
    </GlobalColorContext.Provider>
  );
};
export default GlobalColor;
