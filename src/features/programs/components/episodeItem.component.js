import { AntDesign, Entypo, MaterialCommunityIcons } from "@expo/vector-icons";
import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import TrackPlayer, {
  useActiveTrack,
  useIsPlaying,
} from "react-native-track-player";
import {
  formatDate,
  formatDuration,
} from "../../../services/formatter.service";

import { supabase } from "../../../services/authentication/supabase.config";
import { updateQueue } from "../../../services/trackPlayer.service";

export default function EpisodeItem({ episode }) {
  const activeTrack = useActiveTrack();
  const isPlaying = useIsPlaying();
  const [savedPosition, setSavedPosition] = useState(0);
  const [isStarted, setIsStarted] = useState(false);

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

  let queueButtonIcon;

  async function handleQueueButtonPress() {
    await updateQueue("queue", episode, () => {});
  }

  async function checkForProgress() {
    const { data, error } = await supabase
      .from("track_progress")
      .select()
      .eq("track_id", "b61d8d9d-cab7-4dd1-a4ed-af2c015cb705");
    console.log("track_id is: ", data[0].track_id);
    console.log("episode.id: ", episode.Id, episode.Title);
    if(data[0].track_id === episode.Id){
      setIsStarted(true)
      setSavedPosition(data[0].progress);
    }
    else null;
    
  }

  useEffect(() => {
    checkForProgress();
  }, []);
  console.log(savedPosition)
  console.log(isStarted)

  return (
    <View style={styles.episodesContainer}>
      <View style={styles.singleEpisodeContainer}>
        <Text>{formatDate(episode.PublishedUtc)}</Text>
        <Text style={styles.episodeTitleContainer}>{episode.Title}</Text>
        <Text>
          {`${
            isStarted
              ? formatDuration(episode.DurationSeconds - savedPosition)
              : formatDuration(episode.DurationSeconds)
          }${isStarted ? " left" : ""}`}
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
