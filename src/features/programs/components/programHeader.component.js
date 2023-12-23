import { Image, StyleSheet, Text, View } from "react-native";
import { useEffect, useState } from "react";

import { getColors } from "react-native-image-colors";

export default function ProgramHeader({ show }) {
  const [colors, setColors] = useState(null);
  useEffect(() => {
    const url = show.ArtworkUrl;
    getColors(url, {
      fallback: "#ffffff",
      cache: true,
      key: url,
    }).then(setColors);
  }, [show.ArtworkUrl]);

  const dynamicBackground = colors
    ? { backgroundColor: colors.background }
    : {};

  return (
    <View style={[styles.showInfoContainer, dynamicBackground]}>
      <Image style={styles.showImage} source={{ uri: show.ArtworkUrl }} />
      <Text style={styles.showDescription}>{show.Description}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  showInfoContainer: {
    alignItems: "center",
    padding: 8,
  },
  showImage: {
    width: 200,
    height: 200,
  },
  showDescription: {
    paddingTop: 8,
  },
});
