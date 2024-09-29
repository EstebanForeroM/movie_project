
export interface Movie {
  image_url: string,
  movie_id: number
}

export const getMovies = async (token: string): Promise<Movie[]> => {
  const res = await fetch("https://movierustbackend-production.up.railway.app/movie/movie/page/0/3", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return res.json()
}
