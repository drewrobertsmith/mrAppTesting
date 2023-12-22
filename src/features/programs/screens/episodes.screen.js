import {
  ActivityIndicator,
  FlatList,
  Image,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { useState } from "react";

import EpisodeItem from "../components/episodeItem.component";
import ProgramsPlaylists from "../components/programPlaylists.component";

function ProgramHeader({ show }) {
  return (
    <View style={styles.showInfoContainer}>
      <Image style={styles.showImage} source={{ uri: show.ArtworkUrl }} />
      <Text>{show.Description}</Text>
    </View>
  );
}

export default function EpisodesScreen({ route, navigation }) {
  const { show } = route.params;
  const [episodes, setEpisodes] = useState([]);
  const [arePlaylistsLoading, setArePlaylistsLoading] = useState(false);

  return (
    <SafeAreaView style={styles.container}>
      {arePlaylistsLoading ? (
        <ActivityIndicator size="small" />
      ) : (
        <FlatList
          data={episodes}
          keyExtractor={(item) => item.Id}
          renderItem={({ item }) => (
            <Pressable 
              onPress={()=> navigation.navigate("Episode Screen", {
                episode: item,
              })}
            >
              <EpisodeItem episode={item} />
            </Pressable>
          )}
          ListHeaderComponent={
            <View>
              <ProgramHeader show={show} />
              <ProgramsPlaylists
                show={show}
                setEpisodes={setEpisodes}
                setArePlaylistsLoading={setArePlaylistsLoading}
              />
            </View>
          }
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
