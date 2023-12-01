import {Button, StyleSheet, Text, View} from 'react-native';
import TrackPlayer, {useIsPlaying} from 'react-native-track-player';

//import Icon from 'react-native-vector-icons/AntDesign';
import React from 'react';

//formats the duration
function formatDuration(durationSeconds) {
  const hours = Math.floor(durationSeconds / 3600);
  const minutes = Math.floor((durationSeconds % 3600) / 60);

  let formattedDuration = '';
  if (hours > 0) {
    formattedDuration += `${hours}h `;
  }
  if (minutes > 0) {
    formattedDuration += `${minutes}m`;
  }
  return formattedDuration;
}

//formats the date
function formatDate(publishedUtc) {
  const date = new Date(publishedUtc);
  const options = {month: 'long', day: 'numeric'};
  const currentYear = new Date().getFullYear();

  if (date.getFullYear() === currentYear) {
    return date.toLocaleDateString('en-US', options);
  } else {
    return date.toLocaleDateString('en-US', {...options, year: 'numeric'});
  }
}

export default function EpisodeItem({show}) {
  function handlePlayButtonPress() {
    //adds a track object to the queue in position 0, skips to position 0, then plays audio in position 0
    //   TrackPlayer.add(
    //     {
    //       id: show.Id,
    //       title: show.Title,
    //       url: show.AudioUrl,
    //       artist: 'Moody Radio',
    //       duration: show.DurationSeconds,
    //     },
    //     0,
    //   );
    //   TrackPlayer.skip(0);
    //   TrackPlayer.play();
  }
  function handleQueueButtonPress() {
    // TrackPlayer.add({
    //   id: show.Id,
    //   title: show.Title,
    //   url: show.AudioUrl,
    //   artist: 'Moody Radio',
    //   duration: show.DurationSeconds,
    // });
  }

  return (
    <View style={styles.episodeContainer}>
      <View style={styles.titleContainer}>
        <Text>{formatDate(show.PublishedUtc)}</Text>
        <Text>{show.Title}</Text>
        <Text>{formatDuration(show.DurationSeconds)}</Text>
      </View>
      {/* <Icon name="playcircleo" size={24} onPress={handlePlayButtonPress} />
      <Icon name="menu-fold" size={24} onPress={handleQueueButtonPress} /> */}
    </View>
  );
}
const styles = StyleSheet.create({
  episodeContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 8,
    justifyContent: 'space-between',
  },
  titleContainer: {
    flex: 0.9,
    flexWrap: 'wrap',
  },
});
