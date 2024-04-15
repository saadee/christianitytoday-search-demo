import { createContext, useState } from "react";

// Create the context
const AppContext = createContext();

// Create the provider component
export const AppContextProvider = ({ children }) => {
  // State or any other context logic

  return <AppContext.Provider value={{}}>{children}</AppContext.Provider>;
};

export default AppContext;
