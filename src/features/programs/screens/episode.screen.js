import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
  useWindowDimensions,
} from "react-native";
import {
  formatDate,
  formatDuration,
} from "../../../services/formatter.service";

import RenderHTML from "react-native-render-html";

export default function EpisodeScreen({ route }) {
  const { episode } = route.params;
  const window = useWindowDimensions();

  return (
    <ScrollView styles={styles.container}>
      <View style={styles.headingContainer}>
        <Image style={styles.img} src={episode.ImageUrl} />
        <View style={styles.headerInfo}>
          <Text style={styles.title}>{episode.Title}</Text>
          <Text>{formatDate(episode.PublishedUtc)}</Text>
          <Text>{formatDuration(episode.DurationSeconds)}</Text>
        </View>
        <View></View>
      </View>
      <RenderHTML
        contentWidth={window.width}
        source={{ html: episode.DescriptionHtml }}
        baseStyle={styles.description}
        tagsStyles={tagsStyles}
      />
    </ScrollView>
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
  headingContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  headerInfo: {
    paddingLeft: 8,
  },
  img: {
    height: 100,
    width: 100,
  },
  title: {
    fontWeight: "bold",
  },
  description: {
    padding: 8,
  },
});
