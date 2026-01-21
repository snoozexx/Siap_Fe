"use client";

import { useState, useMemo } from "react";
import {
  useGetJobRecommendations,
  type GetJobRecommendationsQueryResponse,
} from "@/infrastructure/kubb";

export interface IJobRecommendation {
  id: number;
  title: string;
  company: string;
  location: string;
  jobType: string | null;
  description: string | null;
  minSalary: number | null;
  maxSalary: number | null;
}

export function useJobRecommendations() {
  const [token] = useState<string | null>(() => {
    if (typeof window === "undefined") return null;
    return localStorage.getItem("token");
  });

  const { data, isLoading, isError, error, refetch } = useGetJobRecommendations({
    client: {
      headers: {
        Authorization: token ? `Bearer ${token}` : "",
      },
    },
    query: {
      enabled: !!token,
    },
  });

  const jobs: IJobRecommendation[] = useMemo(() => {
    const rawData = data as GetJobRecommendationsQueryResponse;

    if (!rawData || !Array.isArray(rawData)) {
      return [];
    }

    return rawData.map((item) => ({
      id: item.id,
      title: item.title ?? "Untitled",
      company: item.company ?? "Unknown Company",
      location: item.location ?? "Remote",
      jobType: item.jobType ?? null,
      description: item.description ?? null,
      minSalary: item.minSalary ?? null,
      maxSalary: item.maxSalary ?? null,
    }));
  }, [data]);


  return {
    jobs,
    isLoading,
    isError,
    error,
    refetch,
  };
}