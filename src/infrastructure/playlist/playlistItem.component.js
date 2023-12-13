import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { formatDate, formatDuration } from "../../services/formatter.service";

import React from "react";
import TrackPlayer from "react-native-track-player";

export default function PlaylistItem({ track, index, isCurrent }) {
  async function handleItemPress() {
    await TrackPlayer.skip(index); //skips to selected track in queue, tried to do position but it's going to the initial position of everything couting up, it is not individualized
    await TrackPlayer.move(index, 0); //moves selected track to top position
    await TrackPlayer.play(); //begins playing slected track
  }
  function handleLongPress() {
    TrackPlayer.remove(index);
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={handleItemPress} onLongPress={handleLongPress}>
        <View
          style={{
            ...styles.trackContainer,
            ...{ backgroundColor: isCurrent ? "lightblue" : "transparent" },
          }}
        >
          <Image style={styles.image} src={track.artwork} />
          <View>
            <Text>{formatDate(track.date)}</Text>
            <Text style={styles.playlistItem}>{track.title}</Text>
            <Text>{formatDuration(track.duration)}</Text>
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
  trackContainer: {
    flexDirection: "row",
  },
  playlistItem: {
    fontSize: 16,
  },
  image: {
    height: 48,
    width: 48,
  },
});
