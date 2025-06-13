"use client";
import { Bell } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";

interface Announcement {
  id: number;
  title: string;
  content: string;
  date: string;
  isImportant: boolean;
}

const mockAnnouncements: Announcement[] = [
  {
    id: 1,
    title: "New Office Policy Updates",
    content:
      "Please review the updated remote work guidelines and hybrid schedule policies. All changes take effect starting next Monday.",
    date: "2025-01-01",
    isImportant: true,
  },
];

const AnnouncementCard = ({ announcement }: { announcement: Announcement }) => (
  <div className="p-4 bg-blue-50/50 rounded-lg border border-blue-100 hover:bg-blue-50 transition-colors">
    <div className="flex justify-between items-start mb-2">
      <div className="flex items-start gap-2">
        <Bell className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />
        <h3 className="font-semibold text-gray-900 text-sm leading-tight">
          {announcement.title}
        </h3>
      </div>
      <span className="text-xs text-gray-500 whitespace-nowrap ml-2">
        {announcement.date}
      </span>
    </div>
    <p className="text-sm text-gray-600 leading-relaxed ml-6">
      {announcement.content}
    </p>
  </div>
);

export default function Announcements() {
  const [announcements] = useState(mockAnnouncements);

  return (
    <div className="bg-white rounded-lg p-4">
      <div className="flex justify-between ">
        <div className="flex items-center gap-2 mb-4">
          <Bell className="w-5 h-5 text-gray-700" />
          <h1 className=" font-semibold text-gray-900">Announcements</h1>
        </div>
          <Button
            variant="ghost"
            size="sm"
            className="text-blue-600 hover:text-blue-700 text-sm font-medium"
          >
            View All
          </Button>
      </div>
      <div className="space-y-3">
        {announcements.length > 0 ? (
          announcements.map((announcement) => (
            <AnnouncementCard
              key={announcement.id}
              announcement={announcement}
            />
          ))
        ) : (
          <div className="p-6 text-center text-gray-500">
            <Bell className="w-8 h-8 mx-auto mb-2 text-gray-300" />
            <p>No announcements</p>
          </div>
        )}
      </div>
    </div>
  );
}
