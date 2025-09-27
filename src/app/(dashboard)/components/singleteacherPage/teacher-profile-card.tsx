import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Mail, Phone, Calendar } from "lucide-react";

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
    <div className="" >
      <Card className="bg-gradient-to-br from-blue-100 to-blue-200 border-none p-4 ">
        
      <div className="flex items-start gap-4">
        <Avatar className="w-36 h-36">
          <AvatarImage src={teacher.photo || "/placeholder.svg"} alt={teacher.name} />
          <AvatarFallback className="text-lg font-semibold">
            {teacher.name
              .split(" ")
              .map((n) => n[0])
              .join("")}
          </AvatarFallback>
        </Avatar>

        <div className="flex-1 space-y-3">
          <div>
            <h2 className="text-xl font-semibold text-gray-900">{teacher.name}</h2>
            <p className="text-sm text-gray-600 mt-1">{teacher.description}</p>
          </div>

          <div className="flex items-center gap-4 text-sm">
            <div className="flex items-center gap-1">
              <Badge variant="secondary" className="bg-cyan-100 text-cyan-800 hover:bg-cyan-100">
                {teacher.grade}
              </Badge>
            </div>
            <div className="flex items-center gap-1 text-gray-600">
              <Calendar className="w-4 h-4" />
              <span>{teacher.joinDate}</span>
            </div>
            <div className="flex items-center gap-1">
              <Phone className="w-4 h-4" />
              <span>{teacher.phone.split(" x")[0]}</span>
            </div>
          </div>

          <div className="flex items-center gap-4 text-sm text-gray-600">
            <div className="flex items-center gap-1">
              <Mail className="w-4 h-4" />
              <span>{teacher.email}</span>
            </div>
            
          </div>
        </div>
      </div>
    </Card>
    </div>
  );
}
