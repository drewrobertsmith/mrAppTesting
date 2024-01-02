import { Button, FlatList, StyleSheet, Text, View } from "react-native";

import { playStream } from "../../../services/trackPlayer.service";

function StationItem({ name, callSign, url }) {
  return (
    <View style={styles.container}>
      <Text>{name}</Text>
      <Button
        title="play"
        onPress={() => {
          playStream(name, callSign, url);
        }}
      />
    </View>
  );
}

export default function StationsScreen() {
  const URL =
    "https://playerservices.streamtheworld.com/api/livestream-redirect/";
  const CODEC = ".mp3";
  const DATA = [
    {
      id: 1,
      name: "Praise & Worship",
      callSign: "PRWR",
      url: `${URL}IM_1${CODEC}`,
    },
    {
      id: 2,
      name: "Majesty Radio",
      callSign: "MJST",
      url: `${URL}IM_2${CODEC}`,
    },
    {
      id: 3,
      name: "Urban Praise",
      callSign: "URPR",
      url: `${URL}IM_3${CODEC}`,
    },
    {
      id: 4,
      name: "Proclaim",
      callSign: "PCLM",
      url: `${URL}IM_4${CODEC}`,
    },
    {
      id: 5,
      name: "Radio Moody",
      callSign: "RDMD",
      url: `${URL}WMBIAM${CODEC}`,
    },
    {
      id: 6,
      name: "Music of Christmas",
      callSign: "CHMS",
      url: `${URL}SPECIAL_EVENTS${CODEC}`,
    },
  ];
  return (
    <FlatList
      data={DATA}
      renderItem={({ item }) => (
        <StationItem name={item.name} callSign={item.callSign} url={item.url} />
      )}
      keyExtractor={(item) => item.name}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 8,
  },
});
