import { AntDesign, Entypo, MaterialCommunityIcons } from "@expo/vector-icons";
import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import TrackPlayer, {
  useActiveTrack,
  useIsPlaying,
} from "react-native-track-player";
import {
  formatDate,
  formatDuration,
} from "../../../services/formatter.service";

import { updateQueue } from "../../../services/trackPlayer.service";

export default function EpisodeItem({ episode }) {
  const activeTrack = useActiveTrack();
  const isPlaying = useIsPlaying();

  // Determine the current play state for this episode
  let playButtonIcon;

  if (
    activeTrack &&
    activeTrack.id === episode.Id &&
    isPlaying.playing === true
  ) {
    playButtonIcon = "pausecircleo";
  } else {
    playButtonIcon = "playcircleo";
  }

  async function handlePlayButtonPress() {
    if (
      activeTrack &&
      activeTrack.id === episode.Id &&
      isPlaying.playing === true
    ) {
      await TrackPlayer.pause();
    } else {
      await updateQueue("play", episode, () => {});
    }
  }

  async function handleQueueButtonPress() {
    await updateQueue("queue", episode, () => {});
  }

  return (
    <View style={styles.episodesContainer}>
      <View style={styles.singleEpisodeContainer}>
        <Text>{formatDate(episode.PublishedUtc)}</Text>
        <Text style={styles.episodeTitleContainer}>{episode.Title}</Text>
        <Text>{formatDuration(episode.DurationSeconds)}</Text>
      </View>
      <AntDesign
        name={playButtonIcon}
        size={32}
        onPress={handlePlayButtonPress}
      />
      <MaterialCommunityIcons
        name="playlist-plus"
        size={32}
        onPress={handleQueueButtonPress}
      />
    </View>
  );
}
const styles = StyleSheet.create({
  episodesContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    padding: 8,
    justifyContent: "space-between",
    borderTopWidth: 1,
    borderColor: "grey",
  },
  singleEpisodeContainer: {
    flex: 0.9,
  },
  episodeTitleContainer: {
    flex: 1,
  },
});
