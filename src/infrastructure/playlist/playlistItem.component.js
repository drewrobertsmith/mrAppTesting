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
            ...styles.progressBar,
            ...{
              backgroundColor: isCurrent ? "lightblue" : "transparent",
              width: isCurrent ? `${progressWidth}%` : "0%",
            },
          }}
        >
          <View style={styles.trackContainer}>
            <Image style={styles.image} src={track.artwork} />
            <View style={styles.info}>
              <Text style={styles.date}>{formatDate(track.date)}</Text>
              <Text style={styles.title}>{track.title}</Text>
              <Text style={styles.duration}>{`${formatDuration(timeLeft)}${position < track.duration ? ' left' : ''}`}</Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  progressBar: {
    flexDirection: "row",
    borderRadius: 8,
    height: 90,
  },
  trackContainer: {
    flexDirection: "row",
    position: "absolute",
    alignItems: "center",
    padding: 8,
    margin: 4,
  },
  image: {
    height: 56,
    width: 56,
    marginRight: 8,
  },
  title: {
    width: "85%",
    fontWeight: "bold"
  },
  date: {
    fontSize: 12,
  },
  duration: {
    fontSize: 12,
  }
});
