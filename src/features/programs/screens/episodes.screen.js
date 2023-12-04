import {
  ActivityIndicator,
  Button,
  FlatList,
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import {
  ClipsByPlaylistRequest,
  PlaylistsRequest,
} from "../../../services/programsAndClipsRequest.service";
import React, { useEffect, useState } from "react";

import { Chip } from "react-native-paper";
import EpisodeItem from "../components/episodeItem.component";

export default function EpisodesScreen({ route }) {
  const { show } = route.params;
  const [episodes, setEpisodes] = useState([]);
  const [playlists, setPlaylists] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
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
    <SafeAreaView style={styles.container}>
      <View style={styles.showInfoContainer}>
        <Image style={styles.showImage} source={{ uri: show.ArtworkUrl }} />
        <Text>{show.Description}</Text>
      </View>
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
                item.Id === selectedPlaylistId
                  ? styles.selectedPlaylistChip
                  : {},
              ]}
              mode="outlined"
              onPress={() => handlePlaylistSelect(item.Id)}
            >
              {item.Title}
            </Chip>
          )}
        />
      </View>

      {isLoading ? (
        <ActivityIndicator size="small" />
      ) : (
        <FlatList
          data={episodes}
          keyExtractor={(item) => item.Id}
          renderItem={({ item }) => <EpisodeItem show={item} />}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  showInfoContainer: {
    padding: 8,
  },
  showImage: {
    width: 200,
    height: 200,
  },
  playlistsContainer: {
    flexWrap: "wrap",
    padding: 8,
  },
  playlistChips: {
    margin: 2,
  },
  selectedPlaylistChip: {
    backgroundColor: '#E0E0E0', // or any other style changes for the selected chip
  },
});
