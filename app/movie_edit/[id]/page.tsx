'use client';
import SelectWithAddModal from '@/app/components/SelectWithAddModal';
import Spinner from '@/app/components/Spinner';
import { useAuth } from '@/app/hooks/useAuth';
import {
  getInfo,
  updateMovie,
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
import Link from 'next/link';
import React, { useEffect, useState } from 'react';

const Page = ({ params }: { params: { id: number } }) => {
    const [movieInfo, setMovieInfo] = useState<MovieL | null>(null);
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
        const [movie, genresData, countriesData, classificationsData, languagesData] = await Promise.all([
          getInfo(params.id, token),
          getGenres(token),
          getCountries(token),
          getClassifications(token),
          getLanguages(token),
        ]);
        setMovieInfo(movie);
        setGenres(genresData.map((genre) => ({ id: genre.id, name: genre.genre_name })));
        setCountries(countriesData.map((country) => ({ id: country.id, name: country.country_name })));
        setClassifications(
          classificationsData.map((classification) => ({
            id: classification.id,
            name: classification.classification_name,
          }))
        );
        setLanguages(languagesData.map((language) => ({ id: language.id, name: language.language_name })));
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [params.id]);

  if (loading || !movieInfo) {
    return <Spinner />;
  }

  const handleSubmit = async () => {
    try {
      const token = await getToken();
      await updateMovie(token, movieInfo!);
      alert('Movie updated successfully!');
    } catch (error) {
      alert('Failed to update movie.');
    }
  };

  return (
    <div className="h-full md:h-screen grid grid-rows-2 md:grid-cols-2 bg-gray-900">
      <Image
        src={movieInfo.image_url}
        className="w-full h-full md:h-screen object-cover"
        width={1920}
        height={1080}
        alt="movie image"
      />
      <div className="py-8 md:px-10">
        <div className="text-center mb-5">
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

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-5 mb-10">
          <label className="block">
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
                                  setGenres(updatedGenresData.map((genre) => ({ id: genre.id, name: genre.genre_name })));
                                  setMovieInfo((prev) =>
                                      prev ? { ...prev, genre: newItemName } : prev
                                  );
                              } catch (error) {
                                  console.error('Failed to add new genre', error);
                              }
                          }}
                      />

                  </label>

          <label className="block">
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
      setCountries(updatedCountriesData.map((country) => ({ id: country.id, name: country.country_name })));
      setMovieInfo((prev) =>
        prev ? { ...prev, origin_country: newItemName } : prev
      );
    } catch (error) {
      console.error('Failed to add new country', error);
    }
  }}
/>

          </label>

          <label className="block">
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
      setClassifications(
        updatedClassificationsData.map((classification) => ({
          id: classification.id,
          name: classification.classification_name,
        }))
      );
      setMovieInfo((prev) =>
        prev ? { ...prev, classification: newItemName } : prev
      );
    } catch (error) {
      console.error('Failed to add new classification', error);
    }
  }}
/>

          </label>

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

          <label className="block">
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
      setLanguages(updatedLanguagesData.map((language) => ({ id: language.id, name: language.language_name })));
      setMovieInfo((prev) =>
        prev ? { ...prev, original_language: newItemName } : prev
      );
    } catch (error) {
      console.error('Failed to add new language', error);
    }
  }}
/>

          </label>

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

        <div className="flex gap-4">
          <button
            onClick={handleSubmit}
            className="p-4 bg-gradient-to-r from-purple-600 to-pink-500 text-white font-semibold rounded-xl shadow-md
            transition-shadow duration-700 hover:shadow-lg hover:shadow-purple-600 focus:outline-none focus:ring-2 focus:ring-purple-500"
          >
            Save Changes
          </button>

          <Link
            href={movieInfo.website_url}
            className="p-4 bg-gradient-to-r from-purple-600 to-pink-500 text-white font-semibold rounded-xl shadow-md
            transition-shadow duration-700 hover:shadow-lg hover:shadow-purple-600 focus:outline-none focus:ring-2 focus:ring-purple-500"
          >
            Delete movie
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Page;
