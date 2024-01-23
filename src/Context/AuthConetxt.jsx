import { onAuthStateChanged } from "firebase/auth";
import { createContext, useEffect, useState } from "react";
import { auth } from "../firebase/firebase";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null); // Initialize currentUser to null
  const [loading, setLoading] = useState(true); // Add loading state

  useEffect(() => {
    const unSub = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setLoading(false); // Set loading to false once user information is obtained
    });

    return () => {
      unSub();
    };
  }, [currentUser]);

  if (loading) {
    // Return a loading indicator or component while authentication is being checked
    return <div className="loaders">Loading...</div>;
  }

  return (
    <AuthContext.Provider value={{ currentUser }}>
      {children}
    </AuthContext.Provider>
  );
};
