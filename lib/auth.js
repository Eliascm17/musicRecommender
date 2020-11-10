import React, { useState, useEffect, useContext, createContext } from "react";

const authContext = createContext();

export default function AuthProvider({ children }) {
  const auth = useProvideAuth();
  return <authContext.Provider value={auth}>{children}</authContext.Provider>;
}

export const useAuth = () => {
  return useContext(authContext);
};

function useProvideAuth() {
  const [user, setUser] = useState(false);
  const [code, setCode] = useState("");

  const signIn = (authCode, user) => {
    return () => {
      setUser(user);
      setCode(authCode);
    };
  };

  const signout = () => {
    return () => {
      setUser(false);
    };
  };

  return {
    user,
    code,
    signIn,
    signout,
  };
}
