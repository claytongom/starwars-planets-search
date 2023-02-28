const API_URL = 'https://swapi.dev/api/planets';

async function fetchPlanets() {
  const response = await fetch(API_URL);
  const data = await response.json();
  return data.results;
}

export default fetchPlanets;
