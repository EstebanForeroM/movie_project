
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

export interface MovieL {
  movie_id: number,
  original_title: string,
  original_language: string,
  has_spanish_subtitles: boolean
  production_year: number,
  website_url: string,
  image_url: string,
  duration_hours: number,
  summary: string | null,
  classification: string,
  origin_country: string,
  genre: string,
  distribution_title: string,
}

export interface Genre {
  id: number;
  genre_name: string;
}

export interface Country {
  id: number;
  country_name: string;
}

export interface Classification {
  id: number;
  classification_name: string;
}

export interface Language {
  id: number;
  language_name: string;
}

export const getGenres = async (token: string): Promise<Genre[]> => {
  const res = await fetch('https://movierustbackend-production.up.railway.app/movie/genre', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.json();
};

export const getCountries = async (token: string): Promise<Country[]> => {
  const res = await fetch('https://movierustbackend-production.up.railway.app/movie/country', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.json();
};

export const getClassifications = async (token: string): Promise<Classification[]> => {
  const res = await fetch('https://movierustbackend-production.up.railway.app/movie/classification', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.json();
};

export const getLanguages = async (token: string): Promise<Language[]> => {
  const res = await fetch('https://movierustbackend-production.up.railway.app/movie/language', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.json();
};

export const updateMovie = async (token: string, updatedMovieInfo: MovieL) => {
  const res = await fetch(`https://movierustbackend-production.up.railway.app/movie/movie`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(updatedMovieInfo),
  });
  if (!res.ok) {
    throw new Error('Failed to update movie');
  }
  return res.json();
};

export const createGenre = async (token: string, genreName: string) => {
  const res = await fetch('https://movierustbackend-production.up.railway.app/movie/genre', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ genre_name: genreName }),
  });
  if (!res.ok) {
    throw new Error('Failed to create genre');
  }
};

export const createCountry = async (token: string, countryName: string) => {
  const res = await fetch('https://movierustbackend-production.up.railway.app/movie/country', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ country_name: countryName }),
  });
  if (!res.ok) {
    throw new Error('Failed to create country');
  }
};

export const createClassification = async (token: string, classificationName: string) => {
  const res = await fetch('https://movierustbackend-production.up.railway.app/movie/classification', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ classification_name: classificationName }),
  });
  if (!res.ok) {
    throw new Error('Failed to create classification');
  }
};

export const createLanguage = async (token: string, languageName: string) => {
  const res = await fetch('https://movierustbackend-production.up.railway.app/movie/language', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ language_name: languageName }),
  });
  if (!res.ok) {
    throw new Error('Failed to create language');
  }
};
