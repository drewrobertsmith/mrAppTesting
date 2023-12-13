import { Alert, Button, StyleSheet, Text, View } from "react-native";
import { AntDesign, Entypo } from "@expo/vector-icons";
import TrackPlayer, { useIsPlaying } from "react-native-track-player";
import {
  formatDate,
  formatDuration,
} from "../../../services/formatter.service";

import React from "react";

export default function EpisodeItem({ episode }) {
  async function handlePlayButtonPress() {
    const queue = await TrackPlayer.getQueue();
    const trackIndex = queue.findIndex((track) => track.id === episode.Id);
    if (trackIndex === -1) {
      await TrackPlayer.add(
        //adds a track object to the queue in position 0
        {
          id: episode.Id,
          title: episode.Title,
          url: episode.AudioUrl,
          artist: "Moody Radio",
          duration: episode.DurationSeconds,
        },
        0
      );
      await TrackPlayer.skip(0); //skips to position 0
    } else {
      await TrackPlayer.skip(trackIndex);
      await TrackPlayer.move(trackIndex, 0); //moves track to position zero
    }
    await TrackPlayer.play();
  }

  async function handleQueueButtonPress() {
    const queue = await TrackPlayer.getQueue();
    const trackIndex = queue.findIndex((track) => track.id === episode.Id);
    if (trackIndex === -1) {
      await TrackPlayer.add({
        id: episode.Id,
        title: episode.Title,
        url: episode.AudioUrl,
        artist: "Moody Radio",
        duration: episode.DurationSeconds,
      });
    } else {
      Alert.alert("Already in Queue");
    }
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
