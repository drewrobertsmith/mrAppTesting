import { createContext, useEffect, useState } from "react";

import { Alert } from "react-native";
import { supabase } from "./supabase.config";

export const SupabaseAuthContext = createContext();
export const SupabaseAuthContextProvidor = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [session, setSession] = useState(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });
    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
  }, []);

  async function signInWithEmail(email, password) {
    setIsLoading(true);
    const { error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    });
    if (error) Alert.alert(error.message);
    setIsLoading(false);
  }

  async function signUpWithEmail(email, password) {
    setIsLoading(true);
    const {
      data: { session },
      error,
    } = await supabase.auth.signUp({
      email: email,
      password: password,
    });

    if (error) Alert.alert(error.message);
    if (!session) Alert.alert("Please check your inbox for email verification");
    setIsLoading(false);
  }

  async function signOutUser() {
    setSession(null);
    const { error } = await supabase.auth.signOut();
    if (error) Alert.alert(error.message);
  }

  return (
    <SupabaseAuthContext.Provider
      value={{
        isAuthenticated: !!session, //I think this does work as a delineation of whether a user is signin in or not, if there is a session
        isLoading,
        signInWithEmail,
        signUpWithEmail,
        signOutUser,
      }}
    >
      {children}
    </SupabaseAuthContext.Provider>
  );
};
