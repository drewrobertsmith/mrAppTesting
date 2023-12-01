import EpisodesScreen from "../../features/programs/screens/episodes.screen";
import ProgramsScreen from "../../features/programs/screens/programs.screen";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

const Stack = createNativeStackNavigator();

export default function ProgramNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Programs Screen"
        component={ProgramsScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Episodes Screen"
        component={EpisodesScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}