import { TeacherProfileCard } from "@/app/(dashboard)/components/singleteacherPage/teacher-profile-card";
import { TeacherStats } from "@/app/(dashboard)/components/singleteacherPage/teacher-stats-card";
import BigCalendar from "@/app/(dashboard)/components/BigCalendar";
import { TeacherShortcuts } from "@/app/(dashboard)/components/singleteacherPage/teacher-shortcut";
import Performance from "@/app/(dashboard)/components/singleteacherPage/teacher-performance";
import { AnnouncementsList } from "@/app/(dashboard)/components/AnnouncementsList";
const teacherData = {
  id: 1,
  teacherId: "1234567890",
  name: "Dean Guerrero",
  email: "elmer@gmail.com",
  photo:
    "https://images.pexels.com/photos/2888150/pexels-photo-2888150.jpeg?auto=compress&cs=tinysrgb&w=1200",
  phone: "+1 234 567 89",
  grade: "A+",
  joinDate: "January 2025",
  description:
    "Lorem ipsum dolor sit amet consectetur adipiscing elit. Eaque, illo.",
  subjects: ["Math", "English", "Biology", "Physics", "Chemistry", "History"],
  classes: ["1B", "2A", "3C", "4A", "5B", "6C"],
  address: "123 Main St, Anytown, USA",
  stats: {
    attendance: 90,
    branches: 2,
    lessons: 6,
    classes: 6,
  },
  performance: {
    score: 9.2,
    firstSemester: 85,
    secondSemester: 95,
  },
};
export default function SingleTeacher() {
  return (
    <div className="flex flex-col min-h-screen p-4 gap-6 lg:gap-8">
      {/* Main Layout: Stack vertically on mobile, row on larger screens */}
      <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
        {/* Left Side: Teacher Profile, Stats, and Calendar */}
        <div className="w-full lg:w-2/3 flex flex-col gap-6">
          {/* Row 1: Profile + Stats */}
          <div className="flex flex-col md:flex-row gap-4 md:gap-6">
            <div className="w-full md:w-3/5">
              <TeacherProfileCard teacher={teacherData} />
            </div>
            <div className="w-full md:w-2/5">
              <TeacherStats stats={teacherData.stats} />
            </div>
          </div>

          {/* Row 2: Calendar */}
          <div className="w-full">
            <h1 className="text-xl font-semibold mb-4">Teacher&apos;s Schedule</h1>
            <div className="h-[500px] md:h-[600px] lg:h-[700px]">
              <BigCalendar />
            </div>
          </div>
        </div>

        {/* Right Side: Shortcuts, Performance, Announcements */}
        <div className="w-full lg:w-1/3 flex flex-col gap-4">
          <div className="flex flex-col gap-4">
            <TeacherShortcuts />
            <Performance />
            <AnnouncementsList />
          </div>
        </div>
      </div>
    </div>
  );
}
