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

// DATA = {
//   Playlists: [
//     {
//       Id: "84c89ea1-c785-4736-bf57-abac0104cde0",
//       Title: "Dawn and in the Steve Mornings",
//     },
//     {
//       Id: "9bf5de81-979a-48d7-bf6d-b01b010d3eca",
//       Title: "Moody Tunes",
//     },
//   ],
//};

export default function EpisodesScreen({ route }) {
  const { show } = route.params;
  const [episodes, setEpisodes] = useState([]);
  const [playlists, setPlaylists] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    PlaylistsRequest({ setPlaylists, setIsLoading, show });
  }, [playlists]);

  useEffect(() => {
    ClipsByPlaylistRequest({ setEpisodes, setIsLoading, show });
  }, [show]);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.showInfoContainer}>
        <Image style={styles.showImage} source={{ uri: show.ArtworkUrl }} />
        <Text>{show.Name}</Text>
        <Text>{show.Description}</Text>
      </View>
      <View>
        <FlatList
          data={playlists}
          horizontal={true}
          keyExtractor={(item) => item.Id}
          renderItem={({ item }) => (
            <Chip mode="outlined">
            {/* <Chip mode="outlined" onPress={() => ClipsByPlaylistRequest({setEpisodes, setIsLoading, item})}> */}
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
});
