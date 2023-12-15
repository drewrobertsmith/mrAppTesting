import { StyleSheet, Text, View } from "react-native";

import { Entypo } from "@expo/vector-icons";

export default function EmptyQueue() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Your Queue is Empty!</Text>
      <Text style={styles.body}>
        Add some episodes by pressing the{"  "}
        {<Entypo name="add-to-list" size={24} />}{"  "}icon
      </Text>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: "#00578A",
    borderRadius: 8,
    margin: 4,
    padding: 4,
    alignItems: "center",
    justifyContent: "center",
    height: 100,
  },
  title: {
    color: "white",
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 8,
  },
  body: { color: "white" },
});
