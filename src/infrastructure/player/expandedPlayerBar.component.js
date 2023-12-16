import {
  ActivityIndicator,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
  useWindowDimensions,
} from "react-native";
import TrackPlayer, { State } from "react-native-track-player";
import { useEffect, useState } from "react";

import RenderHTML from "react-native-render-html";

export default function ExpandedPlayerBar() {
  const [currentTrack, setCurrentTrack] = useState(null);
  const window = useWindowDimensions();

  async function displayTrack() {
    const track = await TrackPlayer.getActiveTrack();
    setCurrentTrack(track);
  }

  useEffect(() => {
    displayTrack();
  }, [currentTrack]);

  return currentTrack ? (
    <ScrollView
      style={styles.container}
      contentContainerStyle={{
        alignItems: "center",
      }}
    >
      <Image src={currentTrack.artwork} style={styles.image} />
      <Text style={styles.title}>{currentTrack.title}</Text>
      <RenderHTML
        contentWidth={window.width}
        source={{ html: currentTrack.description }}
        baseStyle={styles.description}
      />
    </ScrollView>
  ) : (
    <View style={styles.emptyContainer}>
      <ActivityIndicator size="large" />
    </View>
  );
}
const styles = StyleSheet.create({
  emptyContainer: {
    flex: 1,
    backgroundColor: "003b5c",
  },
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#003b5c",
  },
  image: {
    height: 300,
    width: 300,
    borderRadius: 8,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    color: "white",
    paddingTop: 8,
    paddingBottom: 8,
  },
  description: {
    color: "white",
    lineHeight: 20,
    marginBottom: 56,
  },
});
