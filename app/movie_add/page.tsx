'use client';
import SelectWithAddModal from '@/app/components/SelectWithAddModal';
import Spinner from '@/app/components/Spinner';
import { useAuth } from '@/app/hooks/useAuth';
import {
  createMovie,
  MovieL,
  getGenres,
  getCountries,
  getClassifications,
  getLanguages,
  Genre,
  Country,
  Classification,
  Language,
  createGenre,
  createCountry,
  createClassification,
  createLanguage,
} from '@/app/lib/movie_backend';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';

const Page = () => {
  const [movieInfo, setMovieInfo] = useState<MovieL>({
    movie_id: 0,
    original_title: '',
    distribution_title: '',
    original_language: '',
    has_spanish_subtitles: false,
    production_year: new Date().getFullYear(),
    website_url: '',
    image_url: '',
    duration_hours: 1,
    summary: '',
    classification: '',
    origin_country: '',
    genre: '',
  });

  const [genres, setGenres] = useState<{ id: number; name: string }[]>([]);
  const [countries, setCountries] = useState<{ id: number; name: string }[]>([]);
  const [classifications, setClassifications] = useState<{ id: number; name: string }[]>([]);
  const [languages, setLanguages] = useState<{ id: number; name: string }[]>([]);

  const [loading, setLoading] = useState(true);
  const { getToken } = useAuth();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = await getToken();
        const [genresData, countriesData, classificationsData, languagesData] = await Promise.all([
          getGenres(token),
          getCountries(token),
          getClassifications(token),
          getLanguages(token),
        ]);

        const mappedGenres = genresData.map((genre) => ({ id: genre.id, name: genre.genre_name }));
        const mappedCountries = countriesData.map((country) => ({ id: country.id, name: country.country_name }));
        const mappedClassifications = classificationsData.map((classification) => ({
          id: classification.id,
          name: classification.classification_name,
        }));
        const mappedLanguages = languagesData.map((language) => ({ id: language.id, name: language.language_name }));

        setGenres(mappedGenres);
        setCountries(mappedCountries);
        setClassifications(mappedClassifications);
        setLanguages(mappedLanguages);

        setMovieInfo((prev) => ({
          ...prev,
          genre: mappedGenres.length > 0 ? mappedGenres[0].name : '',
          origin_country: mappedCountries.length > 0 ? mappedCountries[0].name : '',
          classification: mappedClassifications.length > 0 ? mappedClassifications[0].name : '',
          original_language: mappedLanguages.length > 0 ? mappedLanguages[0].name : '',
        }));
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) {
    return <Spinner />;
  }

  const handleSubmit = async () => {
    try {
      const token = await getToken();
      await createMovie(token, movieInfo!);
      alert('Movie added successfully!');
      setMovieInfo({
        movie_id: 0,
        original_title: '',
        distribution_title: '',
        original_language: languages.length > 0 ? languages[0].name : '',
        has_spanish_subtitles: false,
        production_year: new Date().getFullYear(),
        website_url: '',
        image_url: '',
        duration_hours: 1,
        summary: '',
        classification: classifications.length > 0 ? classifications[0].name : '',
        origin_country: countries.length > 0 ? countries[0].name : '',
        genre: genres.length > 0 ? genres[0].name : '',
      });
    } catch (error) {
      alert('Failed to add movie.');
      console.error('Error adding movie', error, '\n', 'The movie info was: ', movieInfo);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <h1 className="text-3xl font-bold mb-8 text-center">Add New Movie</h1>

      <div className="max-w-3xl mx-auto">
        <div className="mb-6">
          <label className="block mb-4">
            <span className="text-white font-semibold">Original Title:</span>
            <input
              type="text"
              name="original_title"
              value={movieInfo.original_title}
              onChange={(e) =>
                setMovieInfo((prev) =>
                  prev ? { ...prev, original_title: e.target.value } : prev
                )
              }
              className="mt-1 block w-full px-3 py-2 bg-gray-800 text-white border border-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </label>
          <label className="block mb-4">
            <span className="text-white font-semibold">Distribution Title:</span>
            <input
              type="text"
              name="distribution_title"
              value={movieInfo.distribution_title}
              onChange={(e) =>
                setMovieInfo((prev) =>
                  prev ? { ...prev, distribution_title: e.target.value } : prev
                )
              }
              className="mt-1 block w-full px-3 py-2 bg-gray-800 text-white border border-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </label>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <SelectWithAddModal
            label="Genre"
            items={genres}
            selectedValue={movieInfo.genre}
            onChange={(value) =>
              setMovieInfo((prev) =>
                prev ? { ...prev, genre: value } : prev
              )
            }
            onAddNew={async (newItemName) => {
              try {
                const token = await getToken();
                await createGenre(token, newItemName);
                const updatedGenresData = await getGenres(token);
                const mappedGenres = updatedGenresData.map((genre) => ({ id: genre.id, name: genre.genre_name }));
                setGenres(mappedGenres);
                setMovieInfo((prev) =>
                  prev ? { ...prev, genre: newItemName } : prev
                );
              } catch (error) {
                console.error('Failed to add new genre', error);
              }
            }}
          />

          <SelectWithAddModal
            label="Origin Country"
            items={countries}
            selectedValue={movieInfo.origin_country}
            onChange={(value) =>
              setMovieInfo((prev) =>
                prev ? { ...prev, origin_country: value } : prev
              )
            }
            onAddNew={async (newItemName) => {
              try {
                const token = await getToken();
                await createCountry(token, newItemName);
                const updatedCountriesData = await getCountries(token);
                const mappedCountries = updatedCountriesData.map((country) => ({ id: country.id, name: country.country_name }));
                setCountries(mappedCountries);
                setMovieInfo((prev) =>
                  prev ? { ...prev, origin_country: newItemName } : prev
                );
              } catch (error) {
                console.error('Failed to add new country', error);
              }
            }}
          />

          <SelectWithAddModal
            label="Classification"
            items={classifications}
            selectedValue={movieInfo.classification}
            onChange={(value) =>
              setMovieInfo((prev) =>
                prev ? { ...prev, classification: value } : prev
              )
            }
            onAddNew={async (newItemName) => {
              try {
                const token = await getToken();
                await createClassification(token, newItemName);
                const updatedClassificationsData = await getClassifications(token);
                const mappedClassifications = updatedClassificationsData.map((classification) => ({
                  id: classification.id,
                  name: classification.classification_name,
                }));
                setClassifications(mappedClassifications);
                setMovieInfo((prev) =>
                  prev ? { ...prev, classification: newItemName } : prev
                );
              } catch (error) {
                console.error('Failed to add new classification', error);
              }
            }}
          />

          <label className="block">
            <span className="text-white font-semibold">Duration (hours):</span>
            <input
              type="number"
              name="duration_hours"
              value={movieInfo.duration_hours}
              onChange={(e) =>
                setMovieInfo((prev) =>
                  prev ? { ...prev, duration_hours: Number(e.target.value) } : prev
                )
              }
              className="mt-1 block w-full px-3 py-2 bg-gray-800 text-white border border-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </label>

          <label className="block">
            <span className="text-white font-semibold">Production Year:</span>
            <input
              type="number"
              name="production_year"
              value={movieInfo.production_year}
              onChange={(e) =>
                setMovieInfo((prev) =>
                  prev ? { ...prev, production_year: Number(e.target.value) } : prev
                )
              }
              className="mt-1 block w-full px-3 py-2 bg-gray-800 text-white border border-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </label>

          <SelectWithAddModal
            label="Original Language"
            items={languages}
            selectedValue={movieInfo.original_language}
            onChange={(value) =>
              setMovieInfo((prev) =>
                prev ? { ...prev, original_language: value } : prev
              )
            }
            onAddNew={async (newItemName) => {
              try {
                const token = await getToken();
                await createLanguage(token, newItemName);
                const updatedLanguagesData = await getLanguages(token);
                const mappedLanguages = updatedLanguagesData.map((language) => ({ id: language.id, name: language.language_name }));
                setLanguages(mappedLanguages);
                setMovieInfo((prev) =>
                  prev ? { ...prev, original_language: newItemName } : prev
                );
              } catch (error) {
                console.error('Failed to add new language', error);
              }
            }}
          />

          <label className="flex items-center mt-4">
            <input
              type="checkbox"
              name="has_spanish_subtitles"
              checked={movieInfo.has_spanish_subtitles}
              onChange={(e) =>
                setMovieInfo((prev) =>
                  prev ? { ...prev, has_spanish_subtitles: e.target.checked } : prev
                )
              }
              className="form-checkbox h-5 w-5 text-purple-600 bg-gray-800 border-gray-700 rounded focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
            <span className="ml-2 text-white font-semibold">Has Spanish Subtitles</span>
          </label>
        </div>

        <label className="block mb-6">
          <span className="text-white font-semibold">Summary:</span>
          <textarea
            name="summary"
            value={movieInfo.summary || ''}
            onChange={(e) =>
              setMovieInfo((prev) =>
                prev ? { ...prev, summary: e.target.value } : prev
              )
            }
            className="mt-1 block w-full px-3 py-2 bg-gray-800 text-white border border-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
            rows={4}
          />
        </label>

        <label className="block mb-4">
          <span className="text-white font-semibold">Website URL:</span>
          <input
            type="text"
            name="website_url"
            value={movieInfo.website_url}
            onChange={(e) =>
              setMovieInfo((prev) =>
                prev ? { ...prev, website_url: e.target.value } : prev
              )
            }
            className="mt-1 block w-full px-3 py-2 bg-gray-800 text-white border border-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
        </label>

        <label className="block mb-6">
          <span className="text-white font-semibold">Image URL:</span>
          <input
            type="text"
            name="image_url"
            value={movieInfo.image_url}
            onChange={(e) =>
              setMovieInfo((prev) =>
                prev ? { ...prev, image_url: e.target.value } : prev
              )
            }
            className="mt-1 block w-full px-3 py-2 bg-gray-800 text-white border border-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
        </label>

        {/* Image Preview */}
        {movieInfo.image_url && (
          <div className="mb-6">
            <Image
              src={movieInfo.image_url}
              className="w-full h-auto object-cover rounded-md"
              width={1920}
              height={1080}
              alt="movie image"
            />
          </div>
        )}

        <div className="flex justify-center">
          <button
            onClick={handleSubmit}
            className="px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-500 text-white font-semibold rounded-xl shadow-md
            transition-shadow duration-700 hover:shadow-lg hover:shadow-purple-600 focus:outline-none focus:ring-2 focus:ring-purple-500"
          >
            Add Movie
          </button>
        </div>
      </div>
    </div>
  );
};

export default Page;
