import {Pressable, StyleSheet, View} from 'react-native';

import {BottomTabBar} from '@react-navigation/bottom-tabs';
import Controls from './controls.component';
import ProgressBar from './progressBar.component';
import React from 'react';

export default function MiniPlayerBar(props) {
  const {navigation} = props;

  return (
    <View>
      <Pressable
        onPress={() => {
          navigation.navigate('Expanded Player');
        }}>
        <View style={styles.container}>
          <ProgressBar />
          <Controls />
        </View>
      </Pressable>
      <BottomTabBar {...props} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#003b5c',
    padding: 4,
  },
});
