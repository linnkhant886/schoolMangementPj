"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

export function TeacherSchedule() {
  const timeSlots = ["8:00 AM", "9:00 AM", "10:00 AM", "11:00 AM", "12:00 PM", "1:00 PM", "2:00 PM", "3:00 PM"]

  const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"]

  const schedule = {
    "8:00 AM": {
      Monday: { subject: "Math", time: "8:00 AM - 8:45 AM", color: "bg-blue-100" },
      Tuesday: { subject: "Math", time: "8:00 AM - 8:45 AM", color: "bg-blue-100" },
      Wednesday: { subject: "Math", time: "8:00 AM - 8:45 AM", color: "bg-blue-100" },
      Thursday: { subject: "Math", time: "8:00 AM - 8:45 AM", color: "bg-blue-100" },
      Friday: { subject: "Math", time: "8:00 AM - 8:45 AM", color: "bg-blue-100" },
    },
    "9:00 AM": {
      Monday: { subject: "English", time: "9:00 AM - 9:45 AM", color: "bg-green-100" },
      Tuesday: { subject: "English", time: "9:00 AM - 9:45 AM", color: "bg-green-100" },
      Wednesday: { subject: "English", time: "9:00 AM - 9:45 AM", color: "bg-green-100" },
      Thursday: { subject: "English", time: "9:00 AM - 9:45 AM", color: "bg-green-100" },
      Friday: { subject: "English", time: "9:00 AM - 9:45 AM", color: "bg-green-100" },
    },
    "10:00 AM": {
      Monday: { subject: "Biology", time: "10:00 AM - 10:45 AM", color: "bg-yellow-100" },
      Tuesday: { subject: "Biology", time: "10:00 AM - 10:45 AM", color: "bg-yellow-100" },
      Wednesday: { subject: "Biology", time: "10:00 AM - 10:45 AM", color: "bg-yellow-100" },
      Thursday: { subject: "Biology", time: "10:00 AM - 10:45 AM", color: "bg-yellow-100" },
      Friday: { subject: "Biology", time: "10:00 AM - 10:45 AM", color: "bg-yellow-100" },
    },
    "11:00 AM": {
      Monday: { subject: "Physics", time: "11:00 AM - 11:45 AM", color: "bg-purple-100" },
      Tuesday: { subject: "Physics", time: "11:00 AM - 11:45 AM", color: "bg-purple-100" },
      Wednesday: null,
      Thursday: { subject: "Physics", time: "11:00 AM - 11:45 AM", color: "bg-purple-100" },
      Friday: { subject: "Physics", time: "11:00 AM - 11:45 AM", color: "bg-purple-100" },
    },
    "1:00 PM": {
      Monday: { subject: "Chemistry", time: "1:00 PM - 1:45 PM", color: "bg-pink-100" },
      Tuesday: { subject: "Chemistry", time: "1:00 PM - 1:45 PM", color: "bg-pink-100" },
      Wednesday: null,
      Thursday: { subject: "Chemistry", time: "1:00 PM - 1:45 PM", color: "bg-pink-100" },
      Friday: { subject: "Chemistry", time: "1:00 PM - 1:45 PM", color: "bg-pink-100" },
    },
    "2:00 PM": {
      Monday: { subject: "History", time: "2:00 PM - 2:45 PM", color: "bg-orange-100" },
      Tuesday: { subject: "History", time: "2:00 PM - 2:45 PM", color: "bg-orange-100" },
      Wednesday: null,
      Thursday: { subject: "History", time: "2:00 PM - 2:45 PM", color: "bg-orange-100" },
      Friday: { subject: "History", time: "2:00 PM - 2:45 PM", color: "bg-orange-100" },
    },
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
        <CardTitle className="text-lg">Teacher&apos;s Schedule</CardTitle>
        <div className="flex items-center gap-2">
          <span className="text-sm text-muted-foreground">August 12 – 16</span>
          <div className="flex gap-1">
            <Button variant="outline" size="sm" className="text-xs">
              Work Week
            </Button>
            <Button variant="ghost" size="sm" className="text-xs">
              Day
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        {/* Desktop Schedule View */}
        <div className="hidden lg:block">
          <div className="grid grid-cols-6 gap-2">
            {/* Header */}
            <div className="font-medium text-sm text-muted-foreground"></div>
            {days.map((day) => (
              <div key={day} className="font-medium text-sm text-center p-2">
                {day}
              </div>
            ))}

            {/* Time slots */}
            {timeSlots.map((time) => (
              <div key={time} className="contents">
                <div className="font-medium text-sm text-muted-foreground p-2 border-r">{time}</div>
                {days.map((day) => {
                  const classInfo =
                    schedule[time as keyof typeof schedule]?.[day as keyof (typeof schedule)[keyof typeof schedule]]
                  return (
                    <div key={`${time}-${day}`} className="p-1">
                      {classInfo ? (
                        <div className={`p-2 rounded text-xs ${classInfo.color} border`}>
                          <div className="font-medium">{classInfo.subject}</div>
                          <div className="text-muted-foreground text-xs">{classInfo.time}</div>
                        </div>
                      ) : (
                        <div className="p-2 h-12"></div>
                      )}
                    </div>
                  )
                })}
              </div>
            ))}
          </div>
        </div>

        {/* Mobile Schedule View */}
        <div className="lg:hidden space-y-4">
          {days.map((day) => (
            <div key={day} className="space-y-2">
              <h4 className="font-medium text-sm">{day}</h4>
              <div className="space-y-1">
                {timeSlots.map((time) => {
                  const classInfo =
                    schedule[time as keyof typeof schedule]?.[day as keyof (typeof schedule)[keyof typeof schedule]]
                  if (!classInfo) return null
                  return (
                    <div key={`${day}-${time}`} className={`p-3 rounded ${classInfo.color} border`}>
                      <div className="flex justify-between items-center">
                        <span className="font-medium text-sm">{classInfo.subject}</span>
                        <Badge variant="secondary" className="text-xs">
                          {classInfo.time}
                        </Badge>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
