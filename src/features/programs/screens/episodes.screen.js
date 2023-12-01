import {
    ActivityIndicator,
    FlatList,
    Image,
    SafeAreaView,
    StyleSheet,
    Text,
    View,
} from 'react-native';
import React, {useEffect, useState} from 'react';

import { ClipsRequest } from '../../../services/programsAndClipsRequest.service';
import EpisodeItem from '../components/episodeItem.component';

export default function EpisodesScreen({route}) {
    const {show} = route.params;
    const [episodes, setEpisodes] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
  
    useEffect(() => {
      ClipsRequest({setEpisodes, setIsLoading, show});
    }, [show]);
  
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.showInfoContainer}>
          <Image style={styles.showImage} source={{uri: show.ArtworkUrl}} />
          <Text>{show.Name}</Text>
          <Text>{show.Description}</Text>
        </View>
        {isLoading ? (
          <ActivityIndicator size="small" />
        ) : (
          <FlatList
            data={episodes}
            keyExtractor={item => item.Id}
            renderItem={({item}) => <EpisodeItem show={item} />}
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
  