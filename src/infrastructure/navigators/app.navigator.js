import { Button, SafeAreaView, Text } from "react-native";

import Header from "../components/header.component";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import MiniPlayerBar from "../player/miniPlayerBar.component";
import PlayerNavigator from "./player.navigator";
import ProfileScreen from "../../features/account/screens/profile.screen";
import ProgramNavigator from "./program.navigator";
import { SafeArea } from "../../components/utility/safeArea.component";
import StationsScreen from "../../features/stations/screens/stations.screen";
import { SupabaseAuthContext } from "../../services/authentication/supabaseAuth.context";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { getHeaderTitle } from "@react-navigation/elements";
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
          } else if (route.name === "Profile") {
            iconName = focused ? "supervisor-account" : "supervisor-account";
          }
          return <MaterialIcons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: "tomato",
        tabBarInactiveTintColor: "grey",
      })}
    >
      <Tab.Screen name="Programs" component={ProgramNavigator} 
        options={{
          headerShown: false
        }}
      />

      <Tab.Screen name="Stations" component={StationsScreen} />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
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
