import ProgramNavigator from "./program.navigator";
import ProgramsScreen from "../../features/programs/screens/programs.screen";
import StationsScreen from "../../features/stations/screens/stations.screen";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

const Tab = createBottomTabNavigator();

export default function AppNavigator() {
    return (
        <Tab.Navigator>
            <Tab.Screen name="Stations" component={StationsScreen}/>
            <Tab.Screen name="Programs" component={ProgramNavigator}/>
        </Tab.Navigator>
    );
}