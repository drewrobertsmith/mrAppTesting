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
import React, { useEffect, useState } from "react";

import EpisodeItem from "../components/episodeItem.component";
import ProgramHeader from "../components/programHeader.component";
import ProgramsPlaylists from "../components/programPlaylists.component";

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
              onPress={() =>
                navigation.navigate("Episode Screen", {
                  episode: item,
                })
              }
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
  }
});
