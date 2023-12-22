import {
  ActivityIndicator,
  FlatList,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";

import ProgramItem from "../components/programItem.component";
import { ProgramsRequest } from "../../../services/programsAndClipsRequest.service";

export default function ProgramsScreen({ navigation }) {
  const [isLoading, setIsLoading] = useState(false);
  const [aToZPrograms, setAToZPrograms] = useState([]);


  useEffect(() => {
    ProgramsRequest({ setIsLoading, setAToZPrograms });
  }, []);

  return isLoading ? (
    <SafeAreaView>
      <ActivityIndicator size="large" />
      <Text>Loading Programs...</Text>
    </SafeAreaView>
  ) : (
    <View>
      {/* <FilterOptions />  this will eventually become filtering options. Current issue is programs omny request doesnt include most recent publish date of episodes*/}
      <FlatList
        style={styles.showList}
        horizontal={false}
        numColumns={4}
        data={aToZPrograms}
        keyExtractor={(item) => item.Id}
        renderItem={({ item }) => (
          <Pressable
            style={styles.showContainer}
            onPress={() =>
              navigation.navigate("Episodes Screen", {
                show: item,
              })
            }
          >
            <ProgramItem artwork={item.ArtworkUrl} name={item.Name} />
          </Pressable>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  showContainer: {
    width: "25%",
  },
});
