import Link from "next/link";
import HomeCard from "./components/HomeCard";

export default function Home() {

  return (
    <div>
      <div className="flex flex-row h-screen">
        <div className="flex flex-col grow basis-0 justify-center items-center">
          <h1 className="font-bold text-2xl">
            The perfect website to see information about movies
          </h1>
          <Link href={'/login'}>Login</Link>
        </div>
        <div className="grow bg-blue-400 basis-0 flex justify-center items-center">
          <HomeCard className="w-96 h-[600px]"/>       
        </div>
      </div>
    </div>
  );
}
