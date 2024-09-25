import Image from "next/image";
import Link from "next/link";

export default function Home() {

  return (
    <div>
      <div className="flex-row">
        <h1>
          The perfect website to see information about movies
        </h1>
        <Image 
          src={'https://utfs.io/f/6zXnrGgTXfUwwUSENe7pYaUzRtZOf8STnqWXbgmPickGK1yD'} alt="Home page image of the next movie comming soon"
          width={100}
          height={100}
        />
      </div>
      <Link href={'/login'}>Login</Link>
    </div>
  );
}
