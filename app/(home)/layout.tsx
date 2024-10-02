"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

const Layout = ({ children }: {children: React.ReactNode}) => {
  const router = useRouter();
  const [input, setInput] = useState("");

  const goHome = () => {
    router.push("/browse");
  }

  const search = () => {
    router.push(`/search/${input}`);
  }

  const addMovie = () => {
    router.push('/movie_add');
  }


  return (
    <div>
      <header className="flex w-full justify-between h-14 items-center">
        <button className="p-2 border border-white rounded-xl font-bold text-white ml-4" onClick={goHome}>
          Discover
        </button>

        <nav>
          <input type="text" className="bg-black p-2 border border-white rounded-2xl" onChange={(e) => setInput(e.target.value)}/>

          <button className="p-2 ml-3 border border-white rounded-xl font-bold text-white " onClick={search}>
            search  
          </button>
        </nav>

        <button className="p-2 border border-white rounded-xl font-bold text-white mr-4" onClick={addMovie}>
          Add movie
        </button>
      </header>
      {children}
    </div>
  )
}

export default Layout
