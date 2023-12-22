import { Image, StyleSheet, Text, View, useWindowDimensions } from "react-native";

import RenderHTML from "react-native-render-html";

export default function EpisodeScreen({ route }) {
  const { episode } = route.params;
  const window = useWindowDimensions();


  return (
    <View styles={styles.container}>
      <Image style={styles.img} src={episode.ImageUrl} />
      <Text style={styles.title}>{episode.Title}</Text>
      <RenderHTML 
        contentWidth={window.width}
        source={{ html: episode.Description }}
        baseStyle={styles.description}
        tagsStyles={tagsStyles}
      />
    </View>
  );
}

const tagsStyles = {
    a: {
      color: "#74a433",
    },
  };

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  img: {
    height: 100,
    width: 100,
  },
  title: {
    fontWeight: "bold"
  },
  description: {

  },
});
