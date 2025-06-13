import { Users, GraduationCap, Users2, UserRound } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

export function StatsCards({ type }: { type: string }) {
  let bgColor: string = "bg-white";
  if (type === "students" || type === "parents") bgColor = "bg-[#f0e7ff]";
  else if (type === "teachers" || type === "staff") bgColor = "bg-[#fff8dd]";
  return (
    <div className="w-full  flex-1 items-center justify-center">
      <Card
        className={`w-full ${bgColor} shadow-md hover:shadow-lg transition-all duration-300`}
      >
        <CardContent>
          <div className="flex items-center justify-between mb-4">
            <div>2024/2025</div>
            {type === "students" ? (
              <Users className="h-6 w-6 text-lamaSky" />
            ) : type === "teachers" ? (
              <GraduationCap className="h-6 w-6 text-lamaSky" />
            ) : type === "courses" ? (
              <Users2 className="h-6 w-6 text-lamaSky" />
            ) : (
              <UserRound className="h-6 w-6 text-lamaSky" />
            )}
          </div>
          <div className="text-2xl font-bold mb-1 ">6,123</div>
          {type === "students"
            ? " Students"
            : type === "teachers"
            ? " Teachers"
            : type === "parents"
            ? " Parents"
            : " Staff"}
        </CardContent>
      </Card>
    </div>
  );
}
