import {
  BASE_URL,
  CACHE_EXPIRATION_MINUTES,
  CLIPS_CACHE_PREFIX,
  ORG_ID,
  PLAYLISTS_CACHE_PREFIX,
  PROGRAMS_CACHE_PREFIX,
} from "./requestService.config";

import AsyncStorage from "@react-native-async-storage/async-storage";

// Function to check and validate cache
async function getCachedData(cacheKey) {
  const cachedData = await AsyncStorage.getItem(cacheKey);
  if (cachedData) {
    const { data, timestamp } = JSON.parse(cachedData);
    if ((new Date().getTime() - timestamp) / 60000 < CACHE_EXPIRATION_MINUTES) {
      return data;
    }
  }
  return null;
}

// Function to cache data
async function setCachedData(cacheKey, data) {
  const cacheValue = { data, timespamp: new Date().getTime() };
  await AsyncStorage.setItem(cacheKey, JSON.stringify(cacheValue));
}

//Function for generic API requets
async function fetchData(endpoint) {
  const response = await fetch(`${BASE_URL}${endpoint}`);
  return await response.json();
}

/*================================Programs REQUEST=========================================*/
export async function ProgramsRequest({ setIsLoading, setPrograms }) {
  setIsLoading(true);
  try {
    // Check cache
    const cachedData = await getCachedData(PROGRAMS_CACHE_PREFIX);
    if (cachedData) {
      setPrograms(cachedData);
    } else {
      //If !cachedData request from the API
      const result = await fetchData(`/orgs/${ORG_ID}/programs`);
      const filteredPrograms = result.Programs.filter(
        (n) => n.Network === "Moody Radio"
      );
      setPrograms(filteredPrograms);
      //Set cache with requested data
      await setCachedData(PROGRAMS_CACHE_PREFIX, filteredPrograms);
    }
  } catch (error) {
    console.log("Error fetching Program data:", error);
  } finally {
    setIsLoading(false);
  }
}

/*================================Playlist REQUEST=========================================*/
export async function PlaylistsRequest({ setIsLoading, setPlaylists, show }) {
  setIsLoading(true);
  try {
    //check cache
    const cachedData = await getCachedData(PLAYLISTS_CACHE_PREFIX);
    if (cachedData) {
      setPlaylists(cachedData);
    } else {
      //If !cachedData requestfrom the API
      const result = await fetchData(
        `/orgs/${ORG_ID}/programs/${show.Id}/playlists`
      );
      setPlaylists(result.Playlists);
      //Set cache with request data
      await setCachedData(PLAYLISTS_CACHE_PREFIX, result);
    }
  } catch (error) {
    console.log("Error fetching playlist data:", error);
  } finally {
    setIsLoading(false);
  }
}

/*================================CLIPS BY PLAYLIST REQUEST=========================================*/
export async function ClipsByPlaylistRequest({
  setIsLoading,
  setEpisodes,
  playlistId,
}) {
  setIsLoading(true);
  try {
    // Check cache
    const cachedData = await getCachedData(CLIPS_CACHE_PREFIX);
    if (cachedData) {
      setEpisodes(cachedData);
    } else {
      //If !cachedData request from the API
      const result = await fetchData(
        `/orgs/${ORG_ID}/playlists/${playlistId}/clips/v2`
      );
      setEpisodes(result.Clips);
      //Set cache with request data
      await setCachedData(CLIPS_CACHE_PREFIX, result);
    }
  } catch (error) {
    console.log("Error fetching episode data:", error);
  } finally {
    setIsLoading(false);
  }
}
