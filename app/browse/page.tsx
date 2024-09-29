"use client";
import { useEffect, useState } from "react";
import { getMovies } from "../GlobalFunctions/crud";
import Card from "../components/Card";
import './styles.css';
import { useAuth } from "../hooks/useAuth";

//interface Props {
//  id: number,
//}

interface Movie {
  image_url: string,
}

const Page = () => {
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

  if (!movies || movies.length === 0) {
    return <h1>No movies found</h1>
  }

  return (
    <>
      <button className="w-full">
        <Card className="rounded-2xl banner-image max-sm:object-cover"
          height={1080} width={1920} src={movies[0].image_url} alt="idk"/>
      </button>

      <div className="px-10 py-8 gap-4">
        <div>
          <h6 className="h6 font-bold">Comming Soon</h6>

          {movies.map(movie => (
            <div className="flex flex-row" key={movie.image_url}>
              <button>
                <Card src={movie.image_url} width={208} height={288} className="w-52 h-72" alt="idk"/>
              </button>
            </div>
          ))}
        </div>

      </div>
    </>
  )
}

export default Page
