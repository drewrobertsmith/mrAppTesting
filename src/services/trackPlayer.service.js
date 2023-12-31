import TrackPlayer, {
  AppKilledPlaybackBehavior,
  Capability,
  Event,
  RepeatMode,
  useActiveTrack,
  useProgress,
} from "react-native-track-player";

import { Alert } from "react-native";
import { supabase } from "./authentication/supabase.config";

//player setup and functions for app start
export async function setupPlayer() {
  let isSetup = false;
  try {
    await TrackPlayer.getActiveTrack();
    isSetup = true;
  } catch {
    await TrackPlayer.setupPlayer();
    await TrackPlayer.updateOptions({
      android: {
        appKilledPlaybackBehavior:
          AppKilledPlaybackBehavior.StopPlaybackAndRemoveNotification,
      },
      capabilities: [
        Capability.Play,
        Capability.Pause,
        Capability.SkipToNext,
        Capability.SkipToPrevious,
        Capability.SeekTo,
      ],
      compactCapabilities: [
        Capability.Play,
        Capability.Pause,
        Capability.SkipToNext,
      ],
      progressUpdateEventInterval: 1,
    });

    isSetup = true;
  } finally {
    return isSetup;
  }
}

export async function addTracks() {
  await TrackPlayer.add([]);
  await TrackPlayer.setRepeatMode(RepeatMode.Off);
}

//inital function to load a stream, replacing any playing tracks. This is rough but works
export async function playStream(name, callSign, url) {
  await TrackPlayer.load({
    id: callSign,
    title: name,
    artist: "Moody Radio",
    url: url,
    isLiveStream: true,
  });
  await TrackPlayer.play();
}

//Adding audio to plaback/queue
export async function updateQueue(trackAction, episode, savedPosition) {
  const queue = await TrackPlayer.getQueue();
  const trackIndex = queue.findIndex((track) => track.id === episode.Id);

  //if track is not in queue
  if (trackIndex === -1 && trackAction === "play") {
    await TrackPlayer.add(
      {
        id: episode.Id,
        title: episode.Title,
        url: episode.AudioUrl,
        artist: "Moody Radio",
        artwork: episode.ImageUrl,
        description: episode.DescriptionHtml,
        duration: episode.DurationSeconds,
        date: episode.PublishedUtc,
      },
      0 //adds track to position 0 in queue
    );
    await TrackPlayer.skip(0); //skips to position 0
    await TrackPlayer.seekTo(savedPosition); // seeks to the saved position of an episode
    await TrackPlayer.play();
    // await supabase
    //   .from("track_progress")
    //   .update({
    //     position: 120,
    //     last_updated: new Date(),
    //   })
    //   .eq("episode_id", episode.Id);

    //if not in queue and que button pressed
  } else if (trackIndex === -1 && trackAction === "queue") {
    await TrackPlayer.add({
      id: episode.Id,
      title: episode.Title,
      url: episode.AudioUrl,
      artist: "Moody Radio",
      artwork: episode.ImageUrl,
      description: episode.DescriptionHtml,
      duration: episode.DurationSeconds,
      date: episode.PublishedUtc,
    }); //ads to queue in last position
  } else {
    //if track is already in queue
    if (trackIndex != -1 && trackAction === "play") {
      await TrackPlayer.skip(trackIndex);
      await TrackPlayer.move(trackIndex, 0);
      await TrackPlayer.seekTo(savedPosition); // seeks to the saved position of an episode
      await TrackPlayer.play();
    } else {
      Alert.alert("Already in Queue");
    }
  }
}

//Supabase Progress Tracking function
export async function checkForProgress(
  episode,
  setIsStarted,
  setSavedPosition
) {
  try {
    const { data, error } = await supabase
      .from("track_progress")
      .select()
      .eq("episode_id", episode.Id);

    if (error) {
      console.error("Error fetching progress:", error);
      return;
    }
    //added a data length check due to errors for any episode that doesnt have a matching id
    if (data && data.length > 0 && data[0].episode_id === episode.Id) {
      setIsStarted(true);
      setSavedPosition(data[0].position);
    } else {
      console.log("No matching progress data found for episode:", episode.Id);
    }
  } catch (e) {
    console.errpr("Error in checkForPRogress:", e);
  }
}

//these are remote events to listen to from places where the ui IS NOT MOUNTED: android auto, lockscreen, notifications, bluetooth headset etc
export async function playbackService() {
  TrackPlayer.addEventListener(Event.RemotePause, () => {
    console.log("Event.RemotePause");
    TrackPlayer.pause();
  });

  TrackPlayer.addEventListener(Event.RemotePlay, () => {
    console.log("Event.RemotePlay");
    TrackPlayer.play();
  });

  TrackPlayer.addEventListener(Event.RemoteNext, () => {
    console.log("Event.RemoteNext");
    TrackPlayer.skipToNext();
  });

  TrackPlayer.addEventListener(Event.RemotePrevious, () => {
    console.log("Event.RemotePrevious");
    TrackPlayer.skipToPrevious();
  });
  // TrackPlayer.addEventListener(Event.RemoteSeek, () => {
  //   console.log('Event.RemoteSeek');
  //   TrackPlayer.seekBy();
  // })
}
