import React, { createContext, useContext, useState } from "react";
import API from "../services/api";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

  const [user,setUser] = useState(null);

  const login = async (email,password) => {

    const res = await API.post("/auth/login",{
      email,
      password
    });

    localStorage.setItem("token",res.data.token);

    setUser(res.data.user);

  };

  const register = async (name,email,password) => {

    const res = await API.post("/auth/register",{
      name,
      email,
      password
    });

    localStorage.setItem("token",res.data.token);

    setUser(res.data.user);

  };

  const logout = ()=>{

    localStorage.removeItem("token");
    setUser(null);

  };

  return(

<AuthContext.Provider
value={{
user,
login,
register,
logout
}}
>

{children}

</AuthContext.Provider>

  );

};

export const useAuth = ()=> useContext(AuthContext);