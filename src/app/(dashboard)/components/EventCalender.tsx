"use client";

import React, { useState } from "react";
import {  CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {  Calendar, Clock } from "lucide-react";
import { Calendarshad } from "./Calendar";
import Image from "next/image";

interface Event {
  id: number;
  title: string;
  description: string;
  startTime: string;
  endTime: string;
  date: string;
}

// Mock data for events
const mockEvents: Event[] = [
  {
    id: 1,
    title: "Team Meeting",
    description:
      "Weekly team sync to discuss project progress and upcoming deadlines.",
    startTime: "12:00 PM",
    endTime: "2:00 PM",
    date: "2025-06-09",
  },
  {
    id: 2,
    title: "Client Presentation",
    description:
      "Present quarterly results and new product roadmap to key stakeholders.",
    startTime: "12:00 PM",
    endTime: "2:00 PM",
    date: "2025-06-09",
  },
  {
    id: 3,
    title: "Workshop",
    description:
      "Deep dive into React performance optimization and modern patterns.",
    startTime: "12:00 PM",
    endTime: "2:00 PM",
    date: "2025-06-09",
  },
];

const EventCard = ({ event }: { event: Event }) => (
  <div className="p-4 border-b border-gray-100 last:border-b-0 hover:bg-gray-50/50 transition-colors">
    <div className="flex justify-between items-start mb-2">
      <h3 className="font-semibold text-gray-900 text-sm">{event.title}</h3>
      <div className="flex items-center gap-2 text-xs text-gray-500">
        <Clock className="w-3 h-3" />
        <span>
          {event.startTime} - {event.endTime}
        </span>
      </div>
    </div>
    <p className="text-sm text-gray-600 leading-relaxed">{event.description}</p>
  </div>
);

export default function EventCalender() {
  const [events] = useState(mockEvents);
  //   const [loading, setLoading] = useState(true);
  return (
    <div className="flex flex-col gap-2">
      <div className="mb-4">
        <Calendarshad />
      </div>
      <div className="flex justify-between items-center px-4">
        <div className="flex items-center gap-2">
          <Calendar className="w-5 h-5 text-gray-700" />
          <CardTitle className="text-lg font-semibold text-gray-900">
            Events
          </CardTitle>
        </div>
        <Button
          variant="ghost"
          size="sm"
          className="text-gray-500 hover:text-gray-700"
        >
          <Image src="/moreDark.png" alt="more" width={20} height={20} />
        </Button>
      </div>
      {events.length > 0 ? (
        <div className="divide-y divide-gray-100">
          {events.map((event) => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>
      ) : (
        <div className="p-6 text-center text-gray-500">
          <Calendar className="w-8 h-8 mx-auto mb-2 text-gray-300" />
          <p>No events scheduled</p>
        </div>
      )}
    </div>
  );
}
