import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { IActivity } from "@/application/hooks/activity/useActivity";

interface ActivitySectionProps {
  activities: IActivity[];
  isLoading: boolean;
}

export function ActivitySection({ activities, isLoading }: ActivitySectionProps) {
  return (
    <section className="space-y-3 px-4 mt-6">
      <div>
        <h3 className="text-xl font-bold text-[#1B2B36]">Lanjutkan Aktifitas</h3>
        <p className="text-xs text-muted-foreground">Berikut aktivitas anda yang belum selesai</p>
      </div>

      <div className="flex gap-4 overflow-x-auto pb-4 -mx-4 px-4 snap-x snap-mandatory scrollbar-hide">
        {isLoading ? (
          <p className="text-sm text-gray-400">Loading aktivitas...</p>
        ) : activities.length === 0 ? (
          <p className="text-sm text-gray-400">Tidak ada aktivitas</p>
        ) : (
          activities.map((item) => (
            <Card key={item.id} className="min-w-[280px] snap-center">
              <CardContent className="p-4 space-y-4">
                <div className="flex justify-between">
                  <span className="font-extrabold text-blue-400 text-sm">{item.type}</span>
                  <span className="text-xs text-gray-400">{item.date}</span>
                </div>
                <div className="flex gap-3 items-center">
                  <div className="w-16 h-12 relative rounded-lg overflow-hidden flex-shrink-0">
                    <img src={item.image} alt={item.title} className="object-cover object-top" />
                  </div>
                  <p className="font-bold text-sm line-clamp-2">{item.description}</p>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </section>
  );
}