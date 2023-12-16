import { Button } from "react-native";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import MiniPlayerBar from "../player/miniPlayerBar.component";
import PlayerNavigator from "./player.navigator";
import ProgramNavigator from "./program.navigator";
import StationsScreen from "../../features/stations/screens/stations.screen";
import { SupabaseAuthContext } from "../../services/authentication/supabaseAuth.context";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useContext } from "react";

const Tab = createBottomTabNavigator();

export default function AppNavigator() {
  const { signOutUser } = useContext(SupabaseAuthContext);

  return (
    <Tab.Navigator
      tabBar={(props) => <MiniPlayerBar {...props} />}
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === "Programs") {
            iconName = focused ? "mic" : "mic";
          } else if (route.name === "Stations") {
            iconName = focused ? "radio" : "radio";
          }
          return <MaterialIcons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: "tomato",
        tabBarInactiveTintColor: "grey",
      })}
    >
      <Tab.Screen
        name="Programs"
        component={ProgramNavigator}
        options={{
          headerRight: () => (
            <Button
              onPress={() => signOutUser()}
              title="Sign Out"
              color="red"
            />
          ),
        }}
      />
      <Tab.Screen name="Stations" component={StationsScreen} />
      <Tab.Screen
        name="Expanded Player"
        component={PlayerNavigator}
        options={{
          tabBarButton: () => null,
          headerShown: false,
        }}
      />
    </Tab.Navigator>
  );
}
