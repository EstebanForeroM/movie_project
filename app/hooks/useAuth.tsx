"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export const useAuth = () => {
  const [token, setToken] = useState<null | string | undefined>(undefined);
  const router = useRouter();

  const comproveToken = async () => {
    const storedToken = localStorage.getItem('TOKEN-VaoJIpvOZb+xpg==')?.toString();

    if (!storedToken) {
      setToken(null);
      return null;
    }

    try {
      const response = await fetch("https://movierustbackend-production.up.railway.app/movie", {
        headers: {
          Authorization: `Bearer ${storedToken}`,
        },
      });

      if (!response.ok) {
        throw new Error("Invalid token");
      }

      setToken(storedToken);
      return storedToken;
    } catch (error) {
      console.error("Error validating token:", error);
      setToken(null);
      return null;
    }
  };

  const getToken = async () => {
    if (token !== undefined) {
      return token ?? "";
    }
    const validatedToken = await comproveToken();
    return validatedToken ?? "";
  };

  useEffect(() => {
    if (token === null) {
      router.push("/register");
    } else if (token === undefined) {
      comproveToken();
    }
  }, [token, router]);

  return { getToken };
};

