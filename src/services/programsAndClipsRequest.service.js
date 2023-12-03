import AsyncStorage from "@react-native-async-storage/async-storage";

//api deats
const BASE_URL = "https://api.omny.fm";
const ORG_ID = "a8cdbf10-d816-4c77-9e79-aa1c012547e1";

//cache control
const CACHE_KEY = "ProgramsCache";
const PLAYLISTS_CACHE_PREFIX = "PlaylistsCache_";
const CLIPS_CACHE_PREFIX = "ClipsCache_"; // Prefix for cache key
const CACHE_EXPIRATION_MINUTES = 60; // Cache Expiration Time

export async function ProgramsRequest({ setIsLoading, setPrograms }) {
  setIsLoading(true);
  try {
    // Check cache
    const cachedData = await AsyncStorage.getItem(CACHE_KEY);
    if (cachedData) {
      const { data, timestamp } = JSON.parse(cachedData);
      const isCacheValid =
        (new Date().getTime() - timestamp) / 60000 < CACHE_EXPIRATION_MINUTES;

      //console.log("Cached data found", { cachedData: data, isCacheValid });

      if (isCacheValid) {
        setPrograms(data);
        setIsLoading(false);
        return;
      } else {
        console.log("Cache expired, fetching new data");
      }
    } else {
      console.log("No cached data found, fetching from API");
    }

    // API Request
    const response = await fetch(`${BASE_URL}/orgs/${ORG_ID}/programs`);
    const result = await response.json();
    const filteredPrograms = result.Programs.filter(
      (n) => n.Network === "Moody Radio"
    );
    setPrograms(filteredPrograms);

    // Cache data
    const cacheValue = {
      data: filteredPrograms,
      timestamp: new Date().getTime(),
    };
    await AsyncStorage.setItem(CACHE_KEY, JSON.stringify(cacheValue));
    console.log("New data cached");
  } catch (error) {
    console.log("Error fetching data:", error);
  } finally {
    setIsLoading(false);
  }
}
/*================================Playlist REQUEST=========================================*/
export async function PlaylistsRequest({ setIsLoading, setPlaylists, show }) {
  setIsLoading(true);
  const cacheKey = `${PLAYLISTS_CACHE_PREFIX}${show.Id}`; // Unique cache key for each playlist

  try {
    //check cache
    const cachedData = await AsyncStorage.getItem(cacheKey);
    if (cachedData) {
      const { data, timestamp } = JSON.parse(cachedData);
      const isCacheValid =
        (new Date().getTime() - timestamp) / 6000 < CACHE_EXPIRATION_MINUTES;

      if (isCacheValid) {
        setPlaylists(data);
        setIsLoading(false);
        return;
      } else {
        console.log(
          "Cache expired for playlists of:",
          show.Id,
          "fetching new data"
        );
      }
    } else {
      console.log(
        "No cached data found for playlists",
        show.Id,
        "fetching from API"
      );
    }

    //API request
    const response = await fetch(
      `${BASE_URL}/orgs/${ORG_ID}/programs/${show.Id}/playlists`
    );
    const result = await response.json();
    setPlaylists(result.Playlists);

    //Cache Data
    const cacheValue = {
      data: result.Playlists,
      timestamp: new Date().getTime(),
    };
    await AsyncStorage.setItem(cacheKey, JSON.stringify(cacheValue));
    console.log("New Data cached for playlists", show.id);
  } catch (error) {
    console.log("error fetching playlists data for show", show.Id, error);
  } finally {
    setIsLoading(false);
  }
}

/*================================CLIPS BY PLAYLIST REQUEST=========================================*/
export async function ClipsByPlaylistRequest({ setIsLoading, setEpisodes, playlistId }) {
  
  setIsLoading(true);
  const cacheKey = `${CLIPS_CACHE_PREFIX}${playlistId}`; // Unique cache key for each show

  try {
    // Check cache
    const cachedData = await AsyncStorage.getItem(cacheKey);
    if (cachedData) {
      const { data, timestamp } = JSON.parse(cachedData);
      const isCacheValid =
        (new Date().getTime() - timestamp) / 60000 < CACHE_EXPIRATION_MINUTES;

      //console.log('Cached data found for show', show.Id, { cachedData: data, isCacheValid });

      if (isCacheValid) {
        setEpisodes(data);
        setIsLoading(false);
        return;
      } else {
        console.log("Cache expired for show", playlistId, "fetching new data");
      }
    } else {
      console.log(
        "No cached data found for show",
        playlistId,
        "fetching from API"
      );
    }

    // API Request
    const response = await fetch(
      `${BASE_URL}/orgs/${ORG_ID}/playlists/${playlistId}/clips/v2`
    );
    const result = await response.json();
    setEpisodes(result.Clips);

    // Cache data
    const cacheValue = { data: result.Clips, timestamp: new Date().getTime() };
    await AsyncStorage.setItem(cacheKey, JSON.stringify(cacheValue));
    console.log("New data cached for show", playlistId);
  } catch (error) {
    console.log("Error fetching data for show", playlistId, error);
  } finally {
    setIsLoading(false);
  }
}
