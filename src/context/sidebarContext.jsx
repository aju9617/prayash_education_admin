import React, { useReducer, useContext } from "react";
const TOGGLE = "TOGGLE";
const CLOSE = "CLOSE";
const initialState = { open: true };

export const Context = React.createContext();

const reducer = (state, action) => {
  switch (action.type) {
    case TOGGLE: {
      return { ...state, open: !state.open };
    }
    case CLOSE: {
      return { ...state, open: false };
    }
    default: {
      return state;
    }
  }
};

export const useSidebarState = () => {
  return useContext(Context);
};

export const Provider = ({ children }) => {
  const [data, dispatch] = useReducer(reducer, initialState);

  const toggleSidebar = () => {
    dispatch({ type: TOGGLE });
  };

  const closeSidebar = () => {
    const width = window.innerWidth;

    if (width <= 768) {
      dispatch({ type: CLOSE });
    }
  };

  return (
    <Context.Provider value={{ ...data, toggleSidebar, closeSidebar }}>
      {children}
    </Context.Provider>
  );
};
