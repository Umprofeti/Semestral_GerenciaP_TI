'use client'
import { createContext, useState, useContext } from "react";

// Crear el contexto
const userConext = createContext();

// Crear el proveedor
export const UserProvider = ({ children }) => {
  const [state, setState] = useState();

  const updateState = (newValue) => {
    setState(newValue);
  };

  return (
    <userConext.Provider value={{ state, updateState }}>
      {children}
    </userConext.Provider>
  );
};

// Hook personalizado para usar el contexto
export const useUserConext = (user: any) => {
  return useContext(userConext);
};
