import LoginScreen from "../../features/account/screens/login.screen";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

const Stack = createNativeStackNavigator();

export default function AuthenticationNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Login" component={LoginScreen} />
      {/* <Stack.Screen name="Main" component={AccountScreen} /> */}
      
    </Stack.Navigator>
  );
}
