'use client'
import Spinner from '@/app/components/Spinner';
import { useAuth } from '@/app/hooks/useAuth'
import { getInfo, MovieL } from '@/app/lib/movie_backend';
import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useState } from 'react'

const Page = ({ params }: {params: {id: number}}) => {
  const [movieInfo, setMovieInfo] = useState<MovieL>();
  const { getToken } = useAuth();

  useEffect(() => {
    const getMovie = async () => {
      const token = await getToken();
      const res = await getInfo(params.id ,token);
      setMovieInfo(res);
    }
    getMovie();
  }, [])

  if (!movieInfo) {
    return <Spinner/>
  }

  const ratingColor = {
    "Masterpiece": "bg-cyan-500",
    "Very Good": "bg-green-500",
    "Good": "bg-green-400",
    "Regular": "bg-yellow-500",
    "Bad": "bg-red-500",
  };

  return (
    <div className='h-full md:h-screen grid grid-rows-2 md:grid-cols-2 bg-gradient-to-tl from-pink-500 to-30% from-10% to-black'>
      <Image src={movieInfo.image_url} className='w-full h-full md:h-screen' width={1920}
        height={1080} alt='movie image'/>
      <div className='py-8 md:px-10'>
        <div className='text-center mb-3'>
          <h2 className='h2'>{movieInfo.original_title} | {movieInfo.distribution_title}</h2>
        </div>

        <div className='flex flex-row gap-3 flex-wrap mt-10 mb-10'>
          <p className='px-4 py-2 bg-pink-600 rounded-xl'>genre:{movieInfo.genre}</p>
          <p className='px-4 py-2 bg-yellow-500 rounded-xl'>origin country: {movieInfo.origin_country}</p>
          <p className={`px-4 py-2 ${ratingColor[movieInfo.classification as keyof typeof ratingColor]} rounded-xl`}>rating: {movieInfo.classification}</p>
          <p className='px-4 py-2 bg-purple-500 rounded-xl'>duration: {movieInfo.duration_hours}h</p>
          <p className='px-4 py-2 bg-blue-500 rounded-xl'>production year: {movieInfo.production_year}h</p>
          <p className='px-4 py-2 bg-gray-700 rounded-xl'>original language: {movieInfo.original_language}</p>
          {movieInfo.has_spanish_subtitles && (
            <p className='px-4 py-2 bg-zinc-400 rounded-xl'>CC: spanish</p>
          )}
        </div>

        {movieInfo.summary && (
          <div className='flex flex-wrap mt-5 mb-10 p-3 bg-gray-900 rounded-xl'>
            <p className='font-bold text-lg'>Description: {movieInfo.summary}</p>
          </div>
        )}
        
        <Link 
          href={movieInfo.website_url}
          className='p-4 bg-gradient-to-r from-black to-purple-600 from-70% border border-purple-600 rounded-xl
          transition-shadow duration-700 hover:shadow-lg hover:shadow-purple-600'
        >Watch it now</Link>

        <Link
          href={`/movie_edit/${params.id}`}
          className='p-4 bg-gradient-to-r from-black to-purple-600 from-70% border border-purple-600 rounded-xl
          transition-shadow duration-700 hover:shadow-lg hover:shadow-purple-600 ml-8'
        >Edit movie</Link>
      </div>
    </div>
  )
}

export default Page
