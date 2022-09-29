import React, { useReducer, useContext } from "react";

const UPDATE = "UPDATE";

let initialState = {
  location: {
    coordinates: [],
    address: "",
  },
  role: "restaurant",
  accountStatus: "",
  isEmailVerified: false,
  isMobileVerified: false,
  _id: "",
  email: "",
  name: "",
  mobile: "",
  countryCode: "",
  createdAt: "",
  updatedAt: "",
  slug: "",
  __v: 0,
  profile: "/logo512.png",
};
export const Context = React.createContext();

const reducer = (state, action) => {
  switch (action.type) {
    case UPDATE: {
      const payload = action.payload;
      return { ...state, ...payload };
    }
    default: {
      return state;
    }
  }
};

export const useAuth = () => {
  return useContext(Context);
};

export const Provider = ({ children }) => {
  const [data, dispatch] = useReducer(reducer, initialState);

  const updateUser = (data) => {
    dispatch({ type: UPDATE, payload: data });
  };

  return (
    <Context.Provider value={{ ...data, updateUser }}>
      {children}
    </Context.Provider>
  );
};
