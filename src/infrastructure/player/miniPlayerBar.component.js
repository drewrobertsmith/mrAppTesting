import { Image, Pressable, StyleSheet, View } from "react-native";
import { useActiveTrack, usePlaybackState } from "react-native-track-player";

import { BottomTabBar } from "@react-navigation/bottom-tabs";
import Controls from "./controls.component";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import ProgressBar from "./progressBar.component";
import React from "react";

export default function MiniPlayerBar(props) {
  const { navigation } = props;

  //Tracking playback state to hide the mini player if no audio is loaded
  const playerState = usePlaybackState();
  const activeTrack = useActiveTrack();
  const noMediaLoaded = playerState.state === "none";

  if (noMediaLoaded) {
    return <BottomTabBar {...props} />;
  } else {
    return (
      <View>
        <View style={styles.container}>
          <ProgressBar />
          <View style={styles.nonProgressContainer}>
            <Pressable
              onPress={() => {
                navigation.navigate("Expanded Player");
              }}
            >
              {activeTrack ? (
                <Image style={styles.image} src={activeTrack.artwork} />
              ) : null}
            </Pressable>
            <Controls />
            <MaterialCommunityIcons
              name="playlist-play"
              size={32}
              color="#ffffff"
              style={styles.icon}
            />
          </View>
        </View>
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
  image: {
    height: 56,
    width: 56,
  },
  icon: {
    paddingRight: 12,
    paddingLeft: 12,
  },
  nonProgressContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 8,
  },
});
