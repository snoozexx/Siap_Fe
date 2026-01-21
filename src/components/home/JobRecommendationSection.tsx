import { Card } from "@/components/ui/card";
import { IJobRecommendation } from "@/application/hooks/jobrecomendation/useJobRecommendations";

interface JobProps {
  jobs: IJobRecommendation[];
  isLoading: boolean;
}

export function JobRecommendationSection({ jobs, isLoading }: JobProps) {
  return (
    <section className="space-y-3 px-4">
      <div>
        <h3 className="text-xl font-bold text-[#1B2B36]">Jobs Recommendation</h3>
        <p className="text-xs text-muted-foreground">Berikut beberapa rekomendasi lowongan</p>
      </div>

      <div className="flex gap-4 overflow-x-auto pb-4 -mx-4 px-4 snap-x snap-mandatory scrollbar-hide">
        {isLoading ? (
          <p className="text-sm text-gray-400">Loading jobs...</p>
        ) : jobs.length === 0 ? (
          <p className="text-sm text-gray-400">No job recommendations</p>
        ) : (
          jobs.map((job) => (
            <Card key={job.id} className="min-w-[300px] max-w-[300px] border-none shadow-md rounded-[24px] p-5 snap-center bg-white">
              <div className="w-fit mb-2">
                <span className="bg-[#C4551E] text-white text-[11px] px-4 py-1.5 rounded-full font-bold">
                  {job.jobType ?? "Unknown"}
                </span>
              </div>
              <div className="space-y-1 mb-3">
                <h4 className="text-[17px] font-bold text-[#1B2B36] leading-tight">{job.title}</h4>
                <p className="text-[13px] text-[#8E97A6]">by {job.company}</p>
              </div>
              <p className="text-[14px] text-[#4A5568] leading-relaxed line-clamp-3 mb-4">
                {job.description ?? "No description available"}
              </p>
              <div className="border-t border-gray-100 pt-3 space-y-1">
                <div className="text-[13px] text-[#8E97A6]">{job.location}</div>
                <div className="text-[14px] font-bold text-[#5C6672]">
                  {job.minSalary && job.maxSalary
                    ? `Rp. ${job.minSalary.toLocaleString()} - ${job.maxSalary.toLocaleString()}`
                    : "Negotiable"}
                </div>
              </div>
            </Card>
          ))
        )}
      </div>
    </section>
  );
}