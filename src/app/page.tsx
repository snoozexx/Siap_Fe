"use client";

import React, { useState, useEffect, useMemo } from "react";
import { useAuthGuard } from "@/application/middleware/useAuthGuard";
import { useActivities } from "@/application/hooks/activity/useActivity";
import { useJobRecommendations } from "@/application/hooks/jobrecomendation/useJobRecommendations";

import { HomeHeader } from "@/components/home/HomeHeader";
import { PromoBanner } from "@/components/home/PromoBanner";
import { FeatureGrid } from "@/components/home/FeatureGrid";
import { ActivitySection } from "@/components/home/ActivitySection";
import { JobRecommendationSection } from "@/components/home/JobRecommendationSection";

export default function HomePage() {
  useAuthGuard();

  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    const frame = requestAnimationFrame(() => {
      setIsMounted(true);
    });

    return () => cancelAnimationFrame(frame);
  }, []);

  const { activities, isLoading: isActivityLoading } = useActivities();
  const { jobs, isLoading: isJobLoading } = useJobRecommendations();

  const features = useMemo(() => [
    { icon: <img src="/images/icons/skp.png" alt="SKP" className="w-14 h-14" />, label: "SKP" },
    { icon: <img src="/images/icons/aichat.png" alt="AI Chat" className="w-14 h-14" />, label: "AI Chat" },
    { icon: <img src="/images/icons/lms.png" alt="LMS" className="w-14 h-14" />, label: "LMS" },
    { icon: <img src="/images/icons/job.png" alt="Job" className="w-14 h-14" />, label: "Job" },
    { icon: <img src="/images/icons/forum.png" alt="Forum" className="w-14 h-14" />, label: "Forum" },
    { icon: <img src="/images/icons/afiliation.png" alt="Affiliation" className="w-14 h-14" />, label: "Affiliation" },
    { icon: <img src="/images/icons/virtualtour.png" alt="Virtual Tour" className="w-14 h-14" />, label: "Virtual Tour" },
    { icon: <img src="/images/icons/more.png" alt="More" className="w-14 h-14" />, label: "More" },
  ], []);

  if (!isMounted) {
    return null; 
  }

  return (
    <div className="min-h-screen bg-[#F8F9FA] pb-10">
      <main className="px-4 pt-6 space-y-6 max-w-2xl mx-auto lg:max-w-5xl">
        <HomeHeader />
        <PromoBanner />
        <FeatureGrid items={features} />
        <ActivitySection activities={activities} isLoading={isActivityLoading} />
        <JobRecommendationSection jobs={jobs} isLoading={isJobLoading} />
      </main>
    </div>
  );
}