
export interface Movie {
  image_url: string,
  movie_id: number
}

export interface MovieL {
  movie_id: number,
  original_title: string,
  original_language: string,
  has_spanish_subtitles: boolean
  production_year: number,
  website_url: string,
  image_url: string,
  duration_hours: number,
  summary: string|null,
  classification: string,
  origin_country: string,
  genre: string,
  distribution_title: string,

}

export const getMovies = async (token: string): Promise<Movie[]> => {
  const res = await fetch("https://movierustbackend-production.up.railway.app/movie/movie/page/0/8", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return res.json()
}

export const getInfo = async (id: number, token: string): Promise<MovieL> => {
  const res = await fetch(`https://movierustbackend-production.up.railway.app/movie/movie/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    }
  })
  return res.json();
}
