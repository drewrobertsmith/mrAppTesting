import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import TrackPlayer, { useProgress } from "react-native-track-player";
import { formatDate, formatDuration } from "../../services/formatter.service";

import React from "react";

export default function PlaylistItem({ track, index, isCurrent }) {
  async function handleItemPress() {
    await TrackPlayer.skip(index); //skips to selected track in queue,
    await TrackPlayer.move(index, 0); //moves selected track to top position
    await TrackPlayer.play(); //begins playing slected track
  }
  async function handleLongPress() {
    await TrackPlayer.remove(index);
  }

  const { position, duration } = useProgress();
  const progressWidth = duration > 0 ? (position / duration) * 100 : 0;

  const timeLeft = track.duration - position;

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={handleItemPress} onLongPress={handleLongPress}>
        <View
          style={{
            ...styles.trackContainer,
            backgroundColor: isCurrent ? "#00578A" : null,
          }}
        >
          {/* Absolute positioned progress bar */}
          {isCurrent && (
            <View
              style={{
                ...styles.progressBar,
                width: `${progressWidth}%`,
              }}
            />
          )}

          <Image style={styles.image} src={track.artwork} />
          <View style={styles.info}>
            <Text style={styles.date}>{formatDate(track.date)}</Text>
            <Text style={styles.title}>
              {track.title}
            </Text>
            <Text style={styles.duration}>{`${formatDuration(timeLeft)}${
              position < track.duration ? " left" : ""
            }`}</Text>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 4,
  },
  trackContainer: {
    flexDirection: "row",
    borderRadius: 12,
    padding: 8,
    overflow: "hidden"
  },
  progressBar: {
    height: "150%", // Set the height to fill the container
    backgroundColor: "#0071B3",
    position: "absolute", // Position absolutely to overlay on top of the track container
    top: 0, // Align to the top of the container
    left: 0, // Align to the left of the container
  },
  info: {
    flex: 1, // Add flex to allow it to fill the remaining space
    justifyContent: "center", // Vertically center the contents
  },
  image: {
    height: 56,
    width: 56,
    marginRight: 8,
    borderRadius: 8,
  },
  title: {
    fontWeight: "bold",
    color: "white",
  },
  date: {
    fontSize: 12,
    color: "white",
  },
  duration: {
    fontSize: 12,
    color: "white",
  },
});
