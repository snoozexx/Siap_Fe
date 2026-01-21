"use client";

import {
  GetActivitiesQueryResponse,
  useGetActivities,
} from "@/infrastructure/kubb";
import { useEffect, useState } from "react";

export interface IActivity {
  id: number;
  title: string;
  description: string;
  type: string;
  date: string;
  image: string;
}

const DEFAULT_IMAGE = `/images/join.jpg`;

export function useActivities() {
  const [token] = useState<string | null>(() => {
    if (typeof window === "undefined") return null;
    return localStorage.getItem("token");
  });

  const { data, isLoading, isError, error, refetch } = useGetActivities({
    client: token
      ? { headers: { Authorization: `Bearer ${token}` } }
      : undefined,
    query: {
      enabled: !!token,
    },
  });

  const activities: IActivity[] = data
    ? data.map((item: GetActivitiesQueryResponse[number]) => ({
        id: item.id,
        title: item.title,
        description: item.description,
        type: item.type,
        date: new Date(item.date).toLocaleDateString("id-ID", {
          day: "2-digit",
          month: "long",
          year: "numeric",
        }),
        image: item.photoActivity
          ? `http://localhost:3001${item.photoActivity}`
          : DEFAULT_IMAGE,
      }))
    : [];

  return {
    activities,
    isLoading,
    isError,
    error,
    refetch,
  };
}
