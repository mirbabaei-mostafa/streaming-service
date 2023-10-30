export interface Movie {
  id: number;
  name: string;
  year: number;
  duration: number;
  genre: string[];
  director: string;
  stars: string[];
  summary: string;
  logo: string;
  poster: string;
  background: string;
  video: string;
}

export const TMDB_API_KEY = "c94cf2a10ca13306d59fee92749fb6d6";
export const TMDB_API_Read_Access_Token =
  "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjOTRjZjJhMTBjYTEzMzA2ZDU5ZmVlOTI3NDlmYjZkNiIsInN1YiI6IjY1Mzc3ZGM4MWY3NDhiMDExZjg2MTZjNyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Vbk2cIK1Bx_kre8tqRQoag0oVZnRVvnc1BswGb3eRyQ";

export const TMDB_API_URL = "https://api.themoviedb.org/3/";
