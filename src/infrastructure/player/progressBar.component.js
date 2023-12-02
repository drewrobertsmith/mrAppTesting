import {StyleSheet, Text, View} from 'react-native';

import React from 'react';
import {useProgress} from 'react-native-track-player';

export default function ProgressBar() {
  const {position, duration} = useProgress();

  function format(seconds) {
    let mins = parseInt(seconds / 60, 10)
      .toString()
      .padStart(2, '0');
    let sec = (Math.trunc(seconds) % 60).toString().padStart(2, '0');
    return `${mins}:${sec}`;
  }

  const progressWidth = duration > 0 ? (position / duration) * 100 : 0;

  return (
    <View style={styles.container}>
      <View style={[styles.progressBar, {width: `${progressWidth}%`}]} />
      <Text style={styles.Progress}>
        {format(position)} / {format(duration)}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 20,
    width: '100%',
    backgroundColor: '#e0e0e0', // Light gray background
    borderRadius: 10,
    overflow: 'hidden',
    marginVertical: 8,
  },
  progressBar: {
    height: '100%',
    backgroundColor: '#3b5998', // Color of the filled part
    borderRadius: 16,
  },
  Progress: {
    textAlign: 'center',
    fontSize: 14,
    position: 'absolute',
    width: '100%',
  },
});
