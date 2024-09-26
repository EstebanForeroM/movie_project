import Link from "next/link";
import HomeCard from "./components/HomeCard";
import HomeSquares from "./components/HomeSquares";

export default function Home() {

  return (
    <div>
      <div className="flex flex-row h-screen flex-wrap">
        <div className="flex flex-col grow basis-0 justify-center items-center">
          <div className="p-10">
            <h1 className="font-bold text-6xl leading-[70px]">
              The perfect website to see information about {' '}
              <span className="font-bold text-6xl text-pink-600 transition-colors duration-500 hover:text-pink-600">Movies</span>
            </h1>
            <Link href={'/login'} 
              className="p-4 inline-block font-black text-black rounded-md bg-pink-600 hover:bg-pink-800 w-40 text-center mt-10 transition-colors duration-200">
              Login
            </Link>
          </div>   
        </div>
        <div className="grow bg-gradient-to-tr from-background from-50% to-pink-600 basis-0 flex justify-center items-center min-w-[330px]">
          <HomeSquares className="w-[500px] h-[700px] rounded-2xl blur-xl"/>
          <HomeCard className="w-96 h-[600px]"/>       
        </div>
      </div>
    </div>
  );
}
