import axios from "axios";
import router from "next/router";
import { useReducer, createContext, useEffect } from "react";
import { useRouter } from "next/router";

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

  // router
  const router = useRouter();

  useEffect(() => {
    dispatch({
      type: "LOGIN",
      payload: JSON.parse(window.localStorage.getItem("user"))
    });
  }, []);

  axios.interceptors.response.use(
    function (response) {
      //any status code that lie within the range of 2xx cause thisfunction to trigger
      return response;
    },
    function (err) {
      //any status codes that falls outside the range of 2xx cause this function to trigger
      let res = err.response;
      if (res.status === 401 && res.config && !res.config.__isRetryRequest) {
        return new Promise((resolve, reject) => {
          axios
            .get("/api/logout")
            .then(data => {
              console.log("/401 error > logout");
              dispatch({
                type: "LOGOUT"
              });
              window.localStorage.removeItem("user");
              router.push("/login");
            })
            .catch(err => {
              console.log("AXIOS INTERCEPTORS ERR", err);
              reject(err);
            });
        });
      }
      return Promise.reject(err);
    }
  );

  useEffect(() => {
    const getCsrfToken = async () => {
      const { data } = await axios.get("/api/csrf-token");
      console.log("CSRF", data);
      axios.defaults.headers["X-CSRF-Token"] = data.getCsrfToken;
    };

    getCsrfToken();
  }, []);

  return (
    <Context.Provider value={{ state, dispatch }}>{children}</Context.Provider>
  );
};

export { Context, Provider };
