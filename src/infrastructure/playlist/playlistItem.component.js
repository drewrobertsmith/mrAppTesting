import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';

import React from 'react';
import TrackPlayer from 'react-native-track-player';

export default function PlaylistItem({title, index, isCurrent}) {
  function handleItemPress() {
    TrackPlayer.skip(index); //skips to selected track in queue, tried to do position but it's going to the initial position of everything couting up, it is not individualized
    TrackPlayer.move(index, 0); //moves selected track to top position
    TrackPlayer.play(); //begins playing slected track
  }
  function handleLongPress() {
    TrackPlayer.remove(index);
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={handleItemPress} onLongPress={handleLongPress}>
        {/* <Image source={}/> */}
        <Text
          style={{
            ...styles.playlistItem,
            ...{backgroundColor: isCurrent ? 'lightblue' : 'transparent'},
          }}>
          {title}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
  },
  playlistItem: {
    fontSize: 16,
    paddingTop: 4,
    paddingBottom: 4,
    paddingLeft: 8,
    paddingRight: 8,
    borderRadius: 4,
  },
});
