import {
  ClipsByPlaylistRequest,
  PlaylistsRequest,
} from "../../../services/programsAndClipsRequest.service";
import { FlatList, StyleSheet, View } from "react-native";
import { useEffect, useState } from "react";

import { Chip } from "react-native-paper";

export default function ProgramsPlaylists({ setIsLoading, show, setEpisodes }) {
  const [playlists, setPlaylists] = useState([]);
  const [selectedPlaylistId, setSelectedPlaylistId] = useState(null);

  useEffect(() => {
    PlaylistsRequest({ setPlaylists, setIsLoading, show });
  }, []);

  useEffect(() => {
    if (playlists.length > 0) {
      // Assuming the first playlist is the default one
      const defaultPlaylistId = playlists[0].Id;
      setSelectedPlaylistId(defaultPlaylistId);
      ClipsByPlaylistRequest({
        setEpisodes,
        setIsLoading,
        playlistId: defaultPlaylistId,
      });
    }
  }, [playlists]);

  // Function to handle playlist selection
  const handlePlaylistSelect = (playlistId) => {
    setSelectedPlaylistId(playlistId);
    ClipsByPlaylistRequest({ setEpisodes, setIsLoading, playlistId });
  };

  return (
    <View style={styles.playlistsContainer}>
      <FlatList
        data={playlists}
        horizontal={false}
        numColumns={4}
        keyExtractor={(item) => item.Id}
        renderItem={({ item }) => (
          <Chip
            style={[
              styles.playlistChips,
              item.Id === selectedPlaylistId ? styles.selectedPlaylistChip : {},
            ]}
            mode="outlined"
            onPress={() => handlePlaylistSelect(item.Id)}
          >
            {item.Title}
          </Chip>
        )}
      />
    </View>
  );
}
const styles = StyleSheet.create({
  playlistsContainer: {
    flexWrap: "wrap",
    padding: 8,
  },
  playlistChips: {
    margin: 2,
  },
  selectedPlaylistChip: {
    backgroundColor: "#E0E0E0", // or any other style changes for the selected chip
  },
});
