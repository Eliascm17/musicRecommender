import React, { useState, useContext, createContext } from "react";

const authContext = createContext();

export default function AuthProvider({ children }) {
  const auth = useProvideAuth();
  return <authContext.Provider value={auth}>{children}</authContext.Provider>;
}

export const useAuth = () => {
  return useContext(authContext);
};

function useProvideAuth() {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState("");

  const signIn = (person) => {
    return setUser(person);
  };

  const saveToken = (token) => {
    return setToken(token);
  };

  const signout = () => {
    return () => {
      setUser(null);
      setToken("");
    };
  };

  return {
    user,
    token,
    signIn,
    saveToken,
    signout,
  };
}
