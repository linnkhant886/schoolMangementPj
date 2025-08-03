import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { Mail, Phone, Calendar, GraduationCap } from "lucide-react";

interface TeacherProfileCardProps {
  teacher: {
    name: string;
    email: string;
    photo: string;
    phone: string;
    grade: string;
    joinDate: string;
    description: string;
  };
}

export function TeacherProfileCard({ teacher }: TeacherProfileCardProps) {
  return (
    <div className=" p-2 ">
      <Card className="bg-gradient-to-br from-blue-100 to-blue-200 border-none ">
        <CardContent className="p-4 flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-4">
          <div>
            <Avatar className="h-24 w-24 sm:h-32 sm:w-32 border-2 border-white">
              <AvatarImage
                src={teacher.photo || "/placeholder.svg"}
                alt={teacher.name}
              />
              <AvatarFallback className="text-lg bg-gray-200">
                {teacher.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </AvatarFallback>
            </Avatar>
          </div>
          <div className="flex-1 text-center sm:text-left space-y-2">
            <div className="space-y-2">
              <h2 className="text-xl sm:text-2xl font-bold text-gray-800">
                {teacher.name}
              </h2>
              <p className="text-sm sm:text-base text-gray-600 max-w-xs sm:max-w-md">
                {teacher.description}
              </p>
            </div>

            <div className="flex flex-col sm:flex-row justify-center sm:justify-start items-center sm:items-start gap-4">
              <div className="flex flex-col space-y-1  ">
                <div className="flex items-center gap-2 text-sm sm:text-base text-gray-600">
                  <GraduationCap className="h-4 w-4 sm:h-5 sm:w-5" />

                  <span >{teacher.grade}</span>
                </div>
                <div className="flex items-center gap-2 text-sm sm:text-base text-gray-600">
                  <Calendar className="h-4 w-4 sm:h-5 sm:w-5" />
                  <span>{teacher.email}</span>
                </div>
              </div>

              <div className="flex flex-col gap-1 mt-2 sm:mt-0 w-full sm:w-auto">
                <div className="flex items-center gap-2 text-sm sm:text-base text-gray-600">
                  <Mail className="h-4 w-4 sm:h-5 sm:w-5" />
                  <span>{teacher.joinDate}</span>
                </div>
                <div className="flex items-center gap-2 text-sm sm:text-base text-gray-600">
                  <Phone className="h-4 w-4 sm:h-5 sm:w-5" />
                  <span>{teacher.phone}</span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
