import { Pressable, StyleSheet, View } from "react-native";

import { BottomTabBar } from "@react-navigation/bottom-tabs";
import Controls from "./controls.component";
import ProgressBar from "./progressBar.component";
import React from "react";
import { usePlaybackState } from "react-native-track-player";

export default function MiniPlayerBar(props) {
  const { navigation } = props;

  //Tracking playback state to hide the mini player if no audio is loaded
  const playerState = usePlaybackState();
  const noMediaLoaded = playerState.state === "none";

  if (noMediaLoaded) {
    return <BottomTabBar {...props} />;
  } else {
    return (
      <View>
        <Pressable
          onPress={() => {
            navigation.navigate("Expanded Player");
          }}
        >
          <View style={styles.container}>
            <ProgressBar />
            <Controls />
          </View>
        </Pressable>
        <BottomTabBar {...props} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#003b5c",
    padding: 4,
  },
});
