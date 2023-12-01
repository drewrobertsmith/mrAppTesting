import App from "./App";
import TrackPlayer from "react-native-track-player";
import { playbackService } from "./src/services/trackPlayer.service";
import { registerRootComponent } from "expo";

// registerRootComponent calls AppRegistry.registerComponent('main', () => App);
// It also ensures that whether you load the app in Expo Go or in a native build,
// the environment is set up appropriately
registerRootComponent(App);

//This is to enable remote events to be recieved like notification presses
TrackPlayer.registerPlaybackService(() => playbackService);
