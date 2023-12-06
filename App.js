import {
  ActivityIndicator,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import {
  AuthenticationContext,
  AuthenticationContextProvider,
} from "./src/services/authentication/authentication.context";
import React, { useContext, useEffect, useState } from "react";
import { addTracks, setupPlayer } from "./src/services/trackPlayer.service";

import AppNavigator from "./src/infrastructure/navigators/app.navigator";
import AuthenticationNavigator from "./src/infrastructure/navigators/authentication.navigator";
import Navigation from "./src/infrastructure/navigators/index.navigator";
import { NavigationContainer } from "@react-navigation/native";
import { PaperProvider } from "react-native-paper";
import RegisterScreen from "./src/features/account/screens/register.screen";
import { StatusBar } from "expo-status-bar";
import TrackPlayer from "react-native-track-player";

export default function App() {
  const [isPlayerReady, setIsPlayerReady] = useState(false);

  //this intantiates the player using the setupPlayer() function from the trackservice
  useEffect(() => {
    async function setup() {
      const isSetup = await setupPlayer(); // The player is ready to be used
      const queue = await TrackPlayer.getQueue();
      if (isSetup && queue.length <= 0) {
        await addTracks();
      }
      setIsPlayerReady(isSetup);
    }
    setup();
  }, []);

  //display loading wheel if player isnt ready
  if (!isPlayerReady) {
    return (
      <SafeAreaView>
        <ActivityIndicator size="large" />
      </SafeAreaView>
    );
  } else {
    return (
        <PaperProvider>
          <StatusBar style="auto" />
          <AuthenticationContextProvider>
            <Navigation />
          </AuthenticationContextProvider>
        </PaperProvider>
    );
  }
}

const styles = StyleSheet.create({
  container: {},
});
