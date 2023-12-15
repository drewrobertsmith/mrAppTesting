import { Alert, Button, StyleSheet, Text, View } from "react-native";
import { AntDesign, Entypo } from "@expo/vector-icons";
import TrackPlayer, { useIsPlaying } from "react-native-track-player";
import {
  formatDate,
  formatDuration,
} from "../../../services/formatter.service";

import React from "react";
import { updateQueue } from "../../../services/trackPlayer.service";

export default function EpisodeItem({ episode }) {

  async function handlePlayButtonPress() {
    await updateQueue("play", episode);
  }

  async function handleQueueButtonPress() {
    await updateQueue("queue", episode);
  }

  return (
    <View style={styles.episodesContainer}>
      <View style={styles.singleEpisodeContainer}>
        <Text>{formatDate(episode.PublishedUtc)}</Text>
        <Text style={styles.episodeTitleContainer}>{episode.Title}</Text>
        <Text>{formatDuration(episode.DurationSeconds)}</Text>
      </View>
      <AntDesign name="playcircleo" size={32} onPress={handlePlayButtonPress} />
      <Entypo name="add-to-list" size={32} onPress={handleQueueButtonPress} />
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
