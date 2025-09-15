import React, { useState } from "react";
import { UserDataContext } from "./userContext";

export const UserDataProvider = ({ children }) => {
  const [userData, setUserData] = useState(null);
  const serverUrl = "http://localhost:5000";

  return (
    <UserDataContext.Provider value={{ userData, setUserData, serverUrl }}>
      {children}
    </UserDataContext.Provider>
  );
};
