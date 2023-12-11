import AppNavigator from "./app.navigator";
import AuthenticationNavigator from "./authentication.navigator";
import { NavigationContainer } from "@react-navigation/native";
import { SupabaseAuthContext } from "../../services/authentication/supabaseAuth.context";
import { useContext } from "react";

export default function Navigation() {
  const { isAuthenticated } = useContext(SupabaseAuthContext);

  return (
    <NavigationContainer>
      {isAuthenticated ? <AppNavigator /> : <AuthenticationNavigator />}
    </NavigationContainer>
  );
}
