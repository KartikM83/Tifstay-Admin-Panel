import React, { createContext, useState } from "react";

export const userDataContext = createContext();

export const UserDataProvider = ({ children }) => {
  const [userData, setUserData] = useState(null);
  const serverUrl = "http://localhost:5000"; // your backend URL

  return (
    <userDataContext.Provider value={{ userData, setUserData, serverUrl }}>
      {children}
    </userDataContext.Provider>
  );
};
