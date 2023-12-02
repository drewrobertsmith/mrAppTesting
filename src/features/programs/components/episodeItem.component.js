import { AntDesign, Entypo } from "@expo/vector-icons";
import { Button, StyleSheet, Text, View } from "react-native";
import TrackPlayer, { useIsPlaying } from "react-native-track-player";

import React from "react";

//formats the duration
function formatDuration(durationSeconds) {
  const hours = Math.floor(durationSeconds / 3600);
  const minutes = Math.floor((durationSeconds % 3600) / 60);

  let formattedDuration = "";
  if (hours > 0) {
    formattedDuration += `${hours}h `;
  }
  if (minutes > 0) {
    formattedDuration += `${minutes}m`;
  }
  return formattedDuration;
}

//formats the date
function formatDate(publishedUtc) {
  const date = new Date(publishedUtc);
  const options = { month: "long", day: "numeric" };
  const currentYear = new Date().getFullYear();

  if (date.getFullYear() === currentYear) {
    return date.toLocaleDateString("en-US", options);
  } else {
    return date.toLocaleDateString("en-US", { ...options, year: "numeric" });
  }
}

export default function EpisodeItem({ show }) {
  function handlePlayButtonPress() {
    //adds a track object to the queue in position 0, skips to position 0, then plays audio in position 0
    TrackPlayer.add(
      {
        id: show.Id,
        title: show.Title,
        url: show.AudioUrl,
        artist: "Moody Radio",
        duration: show.DurationSeconds,
      },
      0
    );
    TrackPlayer.skip(0);
    TrackPlayer.play();
  }
  function handleQueueButtonPress() {
    TrackPlayer.add({
      id: show.Id,
      title: show.Title,
      url: show.AudioUrl,
      artist: "Moody Radio",
      duration: show.DurationSeconds,
    });
  }

  return (
    <View style={styles.episodesContainer}>
      <View style={styles.singleEpisodeContainer}>
        <Text>{formatDate(show.PublishedUtc)}</Text>
        <Text style={styles.episodeTitleContainer}>{show.Title}</Text>
        <Text>{formatDuration(show.DurationSeconds)}</Text>
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
