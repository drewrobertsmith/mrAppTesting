const BASE_URL = 'https://api.omny.fm';
const ORG_ID = 'a8cdbf10-d816-4c77-9e79-aa1c012547e1';

export async function ProgramsRequest({ setIsLoading, setPrograms }) {
  setIsLoading(true);
  try {
    const response = await fetch(`${BASE_URL}/orgs/${ORG_ID}/programs`);
    console.log(response);
    const result = await response.json();
    setPrograms(result.Programs.filter((n) => n.Network === 'Moody Radio'));
  } catch (error) {
    console.log(error);
  } finally {
    setIsLoading(false);
  }
}

export async function ClipsRequest({ setIsLoading, setEpisodes, show }) {
  setIsLoading(true);
  try {
    const response = await fetch(`${BASE_URL}/orgs/${ORG_ID}/programs/${show.Id}/clips`);
    const result = await response.json();
    setEpisodes(result.Clips);
  } catch (error) {
    console.log(error);
  } finally {
    setIsLoading(false);
  }
}
