import { useReducer, createContext, useEffect } from "react";

const initialState = {
  user: null
};

const Context = createContext();

const rootReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      return { ...state, user: action.payload };
    case "LOGOUT":
      return { ...state, user: null };
    default:
      return state;
  }
};

// context provider
const Provider = ({ children }) => {
  const [state, dispatch] = useReducer(rootReducer, initialState);

  useEffect(() => {
    dispatch({
      type: "LOGIN",
      payload: JSON.parse(window.localStorage.getItem("user"))
    });
  }, []);

  return (
    <Context.Provider value={{ state, dispatch }}>{children}</Context.Provider>
  );
};

export { Context, Provider };
