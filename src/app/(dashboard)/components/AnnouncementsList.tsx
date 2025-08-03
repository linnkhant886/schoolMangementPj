import { Megaphone } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";

export function AnnouncementsList() {
  const announcements = [
    {
      id: 1,
      title: "School Holiday Announcement",
      description:
        "The school will be closed on August 15th for Independence Day celebrations.",
      date: "2023-08-01",
      isNew: true,
    },
    {
      id: 2,
      title: "New Curriculum Update",
      description:
        "We're updating our science curriculum to include more hands-on experiments.",
      date: "2023-07-28",
      isNew: false,
    },
    {
      id: 3,
      title: "School Infrastructure Upgrade",
      description:
        "We're pleased to announce the completion of our new computer lab.",
      date: "2023-07-25",
      isNew: false,
    },
  ];

  return (
    <div className="space-y-4 bg-white rounded-md p-4 ">
      <div className="flex items-center justify-between ">
        <h1 className="text-xl font-semibold">Announcements</h1>
        <span className="text-xs text-gray-400">View All</span>
      </div>
      {announcements.map((announcement, index) => (
        <div key={announcement.id}>
          <div className="flex items-start gap-4">
            <div className="rounded-full bg-orange-100 p-2">
              <Megaphone className="h-4 w-4 text-orange-500" />
            </div>
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <h4 className="text-sm font-medium">{announcement.title}</h4>
                {announcement.isNew && (
                  <Badge
                    variant="outline"
                    className="bg-orange-100 text-orange-800 hover:bg-orange-200 border-orange-200"
                  >
                    New
                  </Badge>
                )}
              </div>
              <p className="text-xs text-muted-foreground">
                {announcement.description}
              </p>
              <p className="text-xs text-muted-foreground">
                {announcement.date}
              </p>
            </div>
          </div>
          {index < announcements.length - 1 && <Separator className="my-4" />}
        </div>
      ))}
    </div>
  );
}
