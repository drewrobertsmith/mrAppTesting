import AppNavigator from "./app.navigator";
import { AuthenticationContext } from "../../services/authentication/authentication.context";
import AuthenticationNavigator from "./authentication.navigator";
import { NavigationContainer } from "@react-navigation/native";
import { useContext } from "react";

export default function Navigation() {
    const {isAuthenticated} = useContext(AuthenticationContext);
    
    return(
        <NavigationContainer>
            {isAuthenticated ? <AppNavigator /> : <AuthenticationNavigator />}
        </NavigationContainer>
    );
}