import React, { createContext, useReducer } from "react";

const initialState = { user: null, loading: true };

export const UserContext = createContext(initialState);

const userReducer = (state, action) => {
  switch (action.type) {
    case "setUser":
      return { ...state, user: action.payload, loading: false };
    case "clearUser":
      return { ...state, user: null, loading: false };
    default:
      throw new Error();
  }
};

export default props => {
  const [state, dispatch] = useReducer(userReducer, initialState);

  return <UserContext.Provider value={{ state, dispatch }} {...props} />;
};
