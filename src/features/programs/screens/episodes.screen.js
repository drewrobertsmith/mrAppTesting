import {
  ActivityIndicator,
  FlatList,
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { useState } from "react";

import EpisodeItem from "../components/episodeItem.component";
import ProgramsPlaylists from "../components/programPlaylists.component";

function ProgramHeader({ show, setEpisodes, setIsLoading }) {
  return (
    <View style={styles.showInfoContainer}>
      <Image style={styles.showImage} source={{ uri: show.ArtworkUrl }} />
      <Text>{show.Description}</Text>
      <ProgramsPlaylists
        setEpisodes={setEpisodes}
        setIsLoading={setIsLoading}
        show={show}
      />
    </View>
  );
}

export default function EpisodesScreen({ route }) {
  const { show } = route.params;
  const [episodes, setEpisodes] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  return (
    <SafeAreaView style={styles.container}>
      <ProgramHeader
        show={show}
        setEpisodes={setEpisodes}
        setIsLoading={setIsLoading}
      />

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
});
