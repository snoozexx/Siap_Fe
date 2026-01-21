"use client";

import { useGetProfileMe } from "@/infrastructure/kubb";
import { useEffect, useState } from "react";

export function useProfileMe() {
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const t = localStorage.getItem("token") ?? null;
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setToken(t);
  }, []);

  const { data, isLoading, isError } = useGetProfileMe({
    client: token
      ? { headers: { Authorization: `Bearer ${token}` } }
      : undefined,
    query: { enabled: !!token }, 
  });

  const profile = data ?? null;

  return { profile, isLoading, isError };
}
