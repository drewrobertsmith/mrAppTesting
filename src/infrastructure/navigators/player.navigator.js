import ExpandedPlayerBar from "../player/expandedPlayerBar.component";
import Playlist from "../playlist/playlist.component";
import React from "react";
import { SafeArea } from "../../components/utility/safeArea.component";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";

const Tab = createMaterialTopTabNavigator();

export default function PlayerNavigator() {
  return (
    <SafeArea>
      <Tab.Navigator>
        <Tab.Screen name="Now Playing" component={ExpandedPlayerBar} />
        <Tab.Screen name="Queue" component={Playlist} />
      </Tab.Navigator>
    </SafeArea>
  );
}
