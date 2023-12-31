import { AntDesign, Entypo, MaterialCommunityIcons } from "@expo/vector-icons";
import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import TrackPlayer, {
  useActiveTrack,
  useIsPlaying,
  useProgress,
} from "react-native-track-player";
import { checkForProgress, updateQueue } from "../../../services/trackPlayer.service";
import {
  formatDate,
  formatDuration,
} from "../../../services/formatter.service";

export default function EpisodeItem({ episode }) {
  const activeTrack = useActiveTrack();
  const isPlaying = useIsPlaying();
  const [savedPosition, setSavedPosition] = useState(0);
  const [isStarted, setIsStarted] = useState(false);
  const { position, duration } = useProgress();


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
      await updateQueue("play", episode, savedPosition, () => {});
    }
  }

  let queueButtonIcon;

  async function handleQueueButtonPress() {
    await updateQueue("queue", episode, () => {});
  }

  //checks for saved episode position
  useEffect(() => {
    checkForProgress(episode, setIsStarted, setSavedPosition);
  }, []);

  return (
    <View style={styles.episodesContainer}>
      <View style={styles.singleEpisodeContainer}>
        <Text>{formatDate(episode.PublishedUtc)}</Text>
        <Text style={styles.episodeTitleContainer}>{episode.Title}</Text>
        <Text>
          {`${
            isStarted
              ? formatDuration(episode.DurationSeconds - savedPosition )
              : formatDuration(episode.DurationSeconds)
          }${isStarted && savedPosition > 0 ? " left" : ""}`}
        </Text>
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
