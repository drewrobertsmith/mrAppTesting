import { StyleSheet, Text, View } from "react-native";

import { Chip } from "react-native-paper";

export default function FilterOptions() {
  return (
    <View style={styles.container}>
      <Chip style={styles.filterChips}>A-Z</Chip>
      <Chip style={styles.filterChips}>Episode Release</Chip>
      <Chip style={styles.filterChips}>Drag & Drop</Chip>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row-reverse",
    padding: 4,
  },
  filterChips: {
    color: "003b5c",
    margin: 2,
  },
});
