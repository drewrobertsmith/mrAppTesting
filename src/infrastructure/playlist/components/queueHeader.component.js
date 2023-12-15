import { Button, StyleSheet, Text, View } from "react-native";

import TrackPlayer from "react-native-track-player";

export default function QueueHeader() {
  return (
    <View
      style={styles.container}
    >
      <Text
        style={styles.text}
      >
        Now Playing
      </Text>
      <Button
        title="Clear Queue"
        onPress={async () => await TrackPlayer.removeUpcomingTracks()}
        color="white"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 4,
  },
  text: { color: "white", fontSize: 18, fontWeight: "bold" },
});
