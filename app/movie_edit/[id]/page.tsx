'use client';
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
} from '@/app/lib/movie_backend';
import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';

const Page = ({ params }: { params: { id: number } }) => {
  const [movieInfo, setMovieInfo] = useState<MovieL | null>(null);
  const [genres, setGenres] = useState<Genre[]>([]);
  const [countries, setCountries] = useState<Country[]>([]);
  const [classifications, setClassifications] = useState<Classification[]>([]);
  const [languages, setLanguages] = useState<Language[]>([]);
  const [loading, setLoading] = useState(true);
  const { getToken } = useAuth();

  useEffect(() => {
    const fetchData = async () => {
      console.log("Initial fetch data");
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
        setGenres(genresData);
        setCountries(countriesData);
        setClassifications(classificationsData);
        setLanguages(languagesData);
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
          {/* Genre Selector */}
          <label className="block">
            <span className="text-white font-semibold">Genre:</span>
            <select
              name="genre"
              value={movieInfo.genre}
              onChange={(e) =>
                setMovieInfo((prev) =>
                  prev ? { ...prev, genre: e.target.value } : prev
                )
              }
              className="mt-1 block w-full px-3 py-2 bg-gray-800 text-white border border-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
            >
              {genres.map((genre) => (
                <option key={genre.id} value={genre.genre_name}>
                  {genre.genre_name}
                </option>
              ))}
            </select>
          </label>

          {/* Origin Country Selector */}
          <label className="block">
            <span className="text-white font-semibold">Origin Country:</span>
            <select
              name="origin_country"
              value={movieInfo.origin_country}
              onChange={(e) =>
                setMovieInfo((prev) =>
                  prev ? { ...prev, origin_country: e.target.value } : prev
                )
              }
              className="mt-1 block w-full px-3 py-2 bg-gray-800 text-white border border-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
            >
              {countries.map((country) => (
                <option key={country.id} value={country.country_name}>
                  {country.country_name}
                </option>
              ))}
            </select>
          </label>

          {/* Classification Selector */}
          <label className="block">
            <span className="text-white font-semibold">Classification:</span>
            <select
              name="classification"
              value={movieInfo.classification}
              onChange={(e) =>
                setMovieInfo((prev) =>
                  prev ? { ...prev, classification: e.target.value } : prev
                )
              }
              className="mt-1 block w-full px-3 py-2 bg-gray-800 text-white border border-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
            >
              {classifications.map((classification) => (
                <option key={classification.id} value={classification.classification_name}>
                  {classification.classification_name}
                </option>
              ))}
            </select>
          </label>

          {/* Duration */}
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

          {/* Production Year */}
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

          {/* Original Language Selector */}
          <label className="block">
            <span className="text-white font-semibold">Original Language:</span>
            <select
              name="original_language"
              value={movieInfo.original_language}
              onChange={(e) =>
                setMovieInfo((prev) =>
                  prev ? { ...prev, original_language: e.target.value } : prev
                )
              }
              className="mt-1 block w-full px-3 py-2 bg-gray-800 text-white border border-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
            >
              {languages.map((language) => (
                <option key={language.id} value={language.language_name}>
                  {language.language_name}
                </option>
              ))}
            </select>
          </label>

          {/* Has Spanish Subtitles */}
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

        {/* Summary */}
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

        {/* Website URL */}
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

        {/* Image URL */}
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

        {/* Buttons */}
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
            Watch it now
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Page;
