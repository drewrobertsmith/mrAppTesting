import { createContext, useState } from "react";
import { getAuth, onAuthStateChanged, signOut } from "@firebase/auth";
import { loginRequest, registerRequest } from "./firebase.config";

export const AuthenticationContext = createContext();
export const AuthenticationContextProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState(null);
  const [error, setError] = useState([]);

  //this is setting the authentication state observer, which i would ultimately like to move to the authentication service but I cannot figure out how to properly export and write a function in that manner. Thus; i am importing getAuth and onAuthStateChange from firebase/auth
  const auth = getAuth();
  onAuthStateChanged(auth, (usr) => {
    if (usr) {
      setUser(usr);
      setIsLoading(false);
    } else {
      setIsLoading(false);
    }
  });

  //Login Function that calls the auth service
  const onLogin = (email, password) => {
    loginRequest(email, password)
      .then((u) => {
        setUser(u);
        setIsLoading(false);
      })
      .catch((e) => {
        setError(e.toString());
        setIsLoading(false);
      });
  };

  //New User Function that calls the auth service
  const onRegister = (email, password, repeatedPassword) => {
    setIsLoading(true);
    if (password !== repeatedPassword) {
      setError("Error: Passwords do not match");
      return;
    }
    registerRequest(email, password)
      .then((u) => {
        setUser(u);
        setIsLoading(false);
      })
      .catch((e) => {
        setError(e.toString());
        setIsLoading(false);
      });
  };

  //this is the logout function
  const onLogout = () => {
    setUser(null);
    signOut(auth)
      .then(() => {
        setUser(null);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  return (
    <AuthenticationContext.Provider
      value={{
        isAuthenticated: !!user,
        user,
        isLoading,
        error,
        onLogin,
        onRegister,
        onLogout,
      }}
    >
      {children}
    </AuthenticationContext.Provider>
  );
};
