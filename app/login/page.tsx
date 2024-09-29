"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

const LoginReq = async (clientName: string, password: string): Promise<string> => {
  const res = await fetch(`https://movierustbackend-production.up.railway.app/user/login`, {
    method: "POST",
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
        client_name: clientName,
        password: password,
    }),
  })

  const token_json = await res.json()

  return token_json.token;
}

const Login = () => {
  const router = useRouter();
  const [clientName, setCilentName] = useState("");
  const [password, setPassword] = useState("");

  const getToken = async () => {
    const token = await LoginReq(clientName, password);
    localStorage.setItem("TOKEN-VaoJIpvOZb+xpg==", token);
    router.replace("/browse");
  }

  return (
    <div className="flex justify-center items-center h-screen w-screen bg-gradient-to-tl 
      from-black from-40% to-60% to-pink-900">

      <div className="px-20 py-12 backdrop-blur-3xl rounded-2xl">

        <div className="flex relative my-10 w-auto px-20 py-12 flex-col p-5 items-start
          bg-gradient-to-tl from-pink-500 to-40% from-10% to-black rounded-2xl">

          <h4 className="h4 mb-5 font-extrabold">
            Login to ... 
          </h4>

          <h6 className="h6 relative">UserName</h6>

          <div className="backdrop-blur-2xl rounded-2xl bg-transparent mt-5 mb-5">
            <input type="text" className="rounded-2xl bg-transparent 
              relative py-2 px-2 outline-none border border-gray-700
              text-gray-400 placeholder:text-gray-600 w-full" placeholder="put your username"
              onChange={(e) => setCilentName(e.target.value)}/>
          </div>

          <h6 className="h6 relative">Password</h6>

          <div className="backdrop-blur-2xl rounded-2xl bg-transparent mt-5 mb-5">
            <input type="text" className="rounded-2xl bg-transparent 
              relative py-2 px-2 outline-none border border-gray-700
              text-gray-400 placeholder:text-gray-600 w-full" placeholder="put your password"
              onChange={(e) => setPassword(e.target.value)}/>
          </div>


          <button className="bg-gray-800 transition-all duration-500 hover:brightness-75
            p-3 font-bold rounded" onClick={() => getToken()}>

            Submit
          </button>

          <p className="text-gray-300 mt-5">
            dont have an account yet? <Link href={`/register`}
              className="text-blue-500 transition-all duration-500 hover:text-blue-600">
              Register
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}

export default Login
