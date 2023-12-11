import {
  ActivityIndicator,
  SafeAreaView,
  StyleSheet,
} from "react-native";
import React, { useEffect, useState } from "react";
import { addTracks, setupPlayer } from "./src/services/trackPlayer.service";

import Navigation from "./src/infrastructure/navigators/index.navigator";
import { PaperProvider } from "react-native-paper";
import { StatusBar } from "expo-status-bar";
import { SupabaseAuthContextProvidor } from "./src/services/authentication/supabaseAuth.context";
import TrackPlayer from "react-native-track-player";

export default function App() {
  // const [session, setSession] = useState(null);
  const [isPlayerReady, setIsPlayerReady] = useState(false);

  // useEffect(() => {
  //   supabase.auth.getSession().then(({ data: { session } }) => {
  //     setSession(session);
  //   });
  //   supabase.auth.onAuthStateChange((_event, session) => {
  //     setSession(session);
  //   });
  // }, []);

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
        {/* <LoginScreen />
        {session && session.user && <Text>{session.user.id}</Text>} */}
        <SupabaseAuthContextProvidor>
          <Navigation />
        </SupabaseAuthContextProvidor>
      </PaperProvider>
    );
  }
}

const styles = StyleSheet.create({
  container: {},
});
