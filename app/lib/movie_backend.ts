
interface Movie {
  image_url: string,
}

export const getMovies = async (token: string): Promise<Movie[]> => {
  const res = await fetch("movierustbackend-production.up.railway.app/movie/page/0/8", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return res.json()
}
