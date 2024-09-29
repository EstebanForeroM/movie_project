"use client";
import { useEffect, useState } from "react";
import Card from "../components/Card";
import './styles.css';
import { useAuth } from "../hooks/useAuth";
import { getMovies, Movie } from "../lib/movie_backend";
import { useRouter } from "next/navigation";
import Spinner from "../components/Spinner";

const Page = () => {
  const router = useRouter();

  const [movies, setMovies] = useState<Movie[] | null>(null);
  const { getToken } = useAuth()

  console.log('this is browse')
  useEffect(() => {
    const get = async () => {
      console.log("use Effect executed in get function")
      const token = await getToken();
      const res = await getMovies(token);
      setMovies(res)
    }

    console.log("use Effect executed")
    get()
  }, [])

  const goToDescription = (movie_id: number) => {
    router.push(`/movie/${movie_id}`);
  }



  if (!movies || movies.length === 0) {
    return <Spinner/> 
  }

  return (
    <>
      <button className="w-full">
        <Card className="rounded-2xl banner-image max-sm:object-cover"
          height={1080} width={1920} src={movies[0].image_url} alt="idk"/>
      </button>

      <div className="px-10 flex flex-wrap py-8">
        <div>
          <h6 className="h6 font-bold">Comming Soon</h6>

          <div className="flex flex-row">
            {movies.map(movie => (
              <button key={movie.movie_id} onClick={() => goToDescription(movie.movie_id)}>
                <Card src={movie.image_url} width={208} height={288} className="w-52 h-72 mr-4" alt="idk"/>
              </button>
            ))}
          </div>
        </div>

      </div>
    </>
  )
}

export default Page
