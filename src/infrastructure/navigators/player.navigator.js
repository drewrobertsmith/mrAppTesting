import ExpandedPlayerBar from "../player/expandedPlayerBar.component";
import React from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";

const Tab = createMaterialTopTabNavigator();

export default function PlayerNavigator() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Now Playing" component={ExpandedPlayerBar} />
    </Tab.Navigator>
  );
}
