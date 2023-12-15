import { Button, FlatList, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import TrackPlayer, {
  Event,
  State,
  useTrackPlayerEvents,
} from "react-native-track-player";

import EmptyQueue from "./components/emptyQueue.component";
import PlaylistItem from "./playlistItem.component";
import QueueHeader from "./components/queueHeader.component";

export default function Playlist() {
  const [queue, setQueue] = useState([]);
  const [currentTrack, setCurrentTrack] = useState(0);

  const loadPlaylist = async () => {
    const q = await TrackPlayer.getQueue();
    setQueue(q);
  };

  useEffect(() => {
    loadPlaylist();
  }, [queue]);

  useTrackPlayerEvents([Event.PlaybackActiveTrackChanged], async (event) => {
    if (event.type === Event.PlaybackActiveTrackChanged) {
      let index = await TrackPlayer.getActiveTrackIndex();
      if (currentTrack !== index) {
        setCurrentTrack(index);
        loadPlaylist();
      }
    }
  });

  return (
    <View style={styles.playlist}>
      <FlatList
        data={queue}
        renderItem={({ item, index }) => (
          <PlaylistItem
            track={item}
            index={index}
            isCurrent={currentTrack === index}
          />
        )}
        keyExtractor={(item) => item.id}
        ListEmptyComponent={EmptyQueue}
        ListHeaderComponent={QueueHeader}
      />
    </View>
  );
}
const styles = StyleSheet.create({
  playlist: {
    flex: 1,
    backgroundColor: "#003b5c",
  },
});
