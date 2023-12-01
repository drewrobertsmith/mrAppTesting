import { Image, StyleSheet } from 'react-native';

import React from 'react';

export default function ProgramItem({ artwork }) {
  return <Image style={styles.showIcon} src={artwork} />;
}

const styles = StyleSheet.create({
  showIcon: {
    aspectRatio: 1,
    width: 'auto',
    height: 'auto',
    resizeMode: 'contain',
  },
});
