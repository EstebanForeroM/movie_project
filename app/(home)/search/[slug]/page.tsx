"use client";

import Spinner from "@/app/components/Spinner";
import { useAuth } from "@/app/hooks/useAuth";
import { getMovieBySearch, MovieL } from "@/app/lib/movie_backend";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const Page = ({ params }: { params: { slug: string } }) => {
  const router = useRouter();
  const { getToken } = useAuth();
  const [movies, setMovies] = useState<MovieL[]|null>(null);

  useEffect(() => {
    const get = async () => {
      const token = await getToken();
      console.log('Params.slug is: ', params.slug)
      const res = await getMovieBySearch(token, params.slug)
      console.log("res is: ", res)
      console.log("executing inner get function");
      setMovies(res);
    }
    console.log("executing inner useEffetct");
    get()
  }, [])

  if (!movies) {
    return <Spinner/> 
  }

  const goBack = () => {
    router.push("/browse");
  }

  const goToDescription = (id: number) => {
    router.push(`/movie/${id}`);
  }

  if (movies.length === 0) {
    return <div className="flex justify-center items-center">
      <h1 className="h1">could not find any movies by that search</h1>
      <button className="p-4 bg-blue-400 rounded-xl font-bold text-white
        absolute left-[calc(50%)] top-[calc(50%)]" onClick={goBack}>
        go back
      </button>
    </div>
  }


  return (
    <div className="flex flex-col p-8">
      <h2 className="h2 mb-4">Searched Results</h2>
      {movies.map(movie => (
        <div key={movie.movie_id} className="flex">
          <Image src={movie.image_url} width={1920} height={1080} className="w-52 h-72 mb-4"
            alt={movie.original_title}/>

          <div className="flex flex-col">
            <p className="body-2 ml-3 mb-3">Title: {movie.original_title} | {movie.distribution_title}</p>

            {movie.summary && (
              <p className="body-2 ml-3 mb-3">Summary: {movie.summary}</p>
            )}

            {!movie.summary && (
              <p className="ml-3 text-gray-600 mb-3">no summary for this movie</p>
            )}

            <button className="p-4 bg-blue-400 rounded-xl font-bold text-white ml-4" 
              onClick={() => goToDescription(movie.movie_id)}>

              See More Detials
            </button>
          </div>

        </div>
      ))}

      <button className="p-4 bg-blue-400 rounded-xl font-bold text-white" onClick={goBack}>
        go back
      </button>
    </div>
  )
}

export default Page
