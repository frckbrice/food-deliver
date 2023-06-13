import { createContext } from "react";
import { useState, useEffect } from "react";
import { getUser } from "./GetUser.jsx";

export const AuthContext = createContext({
  users: [],
  addUser: (user) => {},
  removeUser: (id) => {},
  updateUser: (id) => {},
});

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  useEffect(() => {
    const currentUser = getUser();
    setUser(currentUser);
  }, []);

  return (
    <AuthContext.Provider value={{ user }}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
