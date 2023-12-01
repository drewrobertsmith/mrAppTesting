import {
  ActivityIndicator,
  FlatList,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
} from 'react-native';
import React, { useEffect, useState } from 'react';

import ProgramItem from '../components/programItem.component';
import { ProgramsRequest } from '../../../services/programsAndClipsRequest.service';

export default function ProgramsScreen() {
  const [isLoading, setIsLoading] = useState(false);
  const [programs, setPrograms] = useState([]);

  useEffect(() => {
    ProgramsRequest({ setIsLoading, setPrograms });
  }, []);

  return isLoading ? (
    <SafeAreaView>
      <ActivityIndicator size="large" />
      <Text>Loading Programs...</Text>
    </SafeAreaView>
  ) : (
    <FlatList
      style={styles.showList}
      horizontal={false}
      numColumns={4}
      data={programs}
      keyExtractor={(item) => item.Id}
      renderItem={({ item }) => (
        <Pressable
          style={styles.showContainer}
          //   onPress={() =>
          //     navigation.navigate("Show Detail", {
          //       show: item,
          //     })
          //   }
        >
          <ProgramItem artwork={item.ArtworkUrl} name={item.Name} />
        </Pressable>
      )}
    />
  );
}

const styles = StyleSheet.create({
  showContainer: {
    width: '25%',
  },
});
