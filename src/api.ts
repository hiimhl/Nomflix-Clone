const API_KEY = "a6266e583d888756aced9d1c2ad96864";
const BASE_PATH = "https://api.themoviedb.org/3/";

//Movies
export interface IMovies {
  adult?: boolean;
  backdrop_path: string;
  genre_ids: string[];
  id: number;
  origianl_languages?: string;
  origianl_title?: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  title?: string;
  video?: boolean;
  vote_average: number;
  vote_count?: number;
}

export interface IGetMoviesResult {
  dates: {
    maximum: string;
    minimum: string;
  };
  page: number;
  results: IMovies[];
  total_pages: number;
  total_results: number;
  vote_average: number;
  release_date: string;
  genre_ids: [];
}

export interface ILatest {
  backdrop_path: string;
  id: number;
  overview: string;
  poster_path: string;
  title: string;
  video: string;
  vote_average: number;
  release_date: string;
  genre_ids: [];
}
export interface ITopMovie {
  page: number;
  results: [
    {
      poster_path: string;
      adult: boolean;
      overview: string;

      id: number;
      original_title: string;
      title: string;
      backdrop_path: string;
      popularity: number;
      vote_average: number;
      release_date: string;
      genre_ids: [];
    }
  ];
}
export interface IUpMovie {
  page: number;
  results: [
    {
      poster_path: string;
      adult: boolean;
      overview: string;
      release_date: string;

      id: number;
      original_title: string;
      title: string;
      backdrop_path: string;
      popularity: number;
      vote_average: number;
      genre_ids: [];
    }
  ];
}

//Tv

export interface IAiringTv {
  page: number;
  results: [
    {
      poster_path: string;
      popularity: number;
      id: number;
      backdrop_path: string;
      overview: string;
      first_air_date: string;
      name: string;
      vote_average: number;
      release_date: string;
      genre_ids: [];
    }
  ];
}

export interface ILatestTv {
  first_air_date: string;
  homepage: string;
  id: number;
  poster_path: string;
  last_air_date: string;
  name: string;
  vote_average: number;
  release_date: string;
  genre_ids: [];
  title: string;
  overview: string;
  seasons: [
    {
      air_date: string;
      episode_count: number;
      id: number;
      poster_path: null;
      season_number: number;
    }
  ];
  status: string;
  type: string;
}

export interface IGenre {
  genres: [
    {
      id: number | any;
      name: string;
    }
  ];
}

//Movies
export function getMovies() {
  return fetch(`${BASE_PATH}movie/now_playing?api_key=${API_KEY}`).then((res) =>
    res.json()
  );
}
export function getLatestMovies() {
  return fetch(`${BASE_PATH}movie/latest?api_key=${API_KEY}`).then((res) =>
    res.json()
  );
}
export function getTopRatedMovies() {
  return fetch(`${BASE_PATH}movie/top_rated?api_key=${API_KEY}`).then((res) =>
    res.json()
  );
}
export function getUpcomingMovies() {
  return fetch(`${BASE_PATH}movie/upcoming?api_key=${API_KEY}`).then((res) =>
    res.json()
  );
}

// tv

export function getAiringTv() {
  return fetch(`${BASE_PATH}tv/airing_today?api_key=${API_KEY}`).then((res) =>
    res.json()
  );
}

export function getLatestTv() {
  return fetch(`${BASE_PATH}tv/latest?api_key=${API_KEY}`).then((res) =>
    res.json()
  );
}

export function getPopularTv() {
  return fetch(`${BASE_PATH}tv/popular?api_key=${API_KEY}`).then((res) =>
    res.json()
  );
}

export function getTopRatedTv() {
  return fetch(`${BASE_PATH}tv/top_rated?api_key=${API_KEY}`).then((res) =>
    res.json()
  );
}

export function getGenre() {
  return fetch(`${BASE_PATH}genre/movie/list?api_key=${API_KEY}`).then((res) =>
    res.json()
  );
}

// search
export const searchData = (keyword: string | null) => {
  return fetch(
    `${BASE_PATH}/search/multi?api_key=a6266e583d888756aced9d1c2ad96864&language=en-US&query=${keyword}&page=1&include_adult=false`
  ).then((res) => res.json());
};
