import { StyleSheet, View } from "react-native";
import TrackPlayer, { useIsPlaying } from "react-native-track-player";

import Icon from "react-native-vector-icons/AntDesign";
import React from "react";

export default function Controls() {
  const playerState = useIsPlaying();

  async function handlePlayPress() {
    if (playerState.playing === true) {
      await TrackPlayer.pause();
    } else {
      await TrackPlayer.play();
    }
  }

  //this handles the playback presentation of the icon depending on theplayer being in a buffering, playing, or pause state
  let playState;
  if (playerState.bufferingDuringPlay === true) {
    playState = "ellipsis1";
  } else if (playerState.playing) {
    playState = "pausecircle";
  } else {
    playState = "play";
  }

  return (
    <View style={styles.container}>
      <Icon
        name="reload1"
        size={32}
        onPress={() => TrackPlayer.seekBy(-15)}
        onLongPress={() => TrackPlayer.skipToPrevious()}
        style={{ transform: [{ rotateY: "180deg" }] }}
        color={"white"}
      />
      <Icon name={playState} size={48} onPress={handlePlayPress} color={"white"}/>

      <Icon
        name="reload1"
        size={32}
        onPress={() => TrackPlayer.seekBy(15)}
        onLongPress={() => TrackPlayer.skipToNext()}
        color={"white"}
      />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
    paddingBottom: 4,
  },
});
