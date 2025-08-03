import { Card, CardContent } from "@/components/ui/card"
import { Users, Building2, BookOpen, GraduationCap } from "lucide-react"

interface TeacherStatsProps {
  stats: {
    attendance: number
    branches: number
    lessons: number
    classes: number
  }
}

export function TeacherStats({ stats }: TeacherStatsProps) {
  const statItems = [
    {
      title: "Attendance",
      value: `${stats.attendance}%`,
      icon: Users,
      color: "bg-blue-100",
      iconColor: "text-blue-600",
    },
    {
      title: "Branches",
      value: stats.branches.toString(),
      icon: Building2,
      color: "bg-purple-100",
      iconColor: "text-purple-600",
    },
    {
      title: "Lessons",
      value: stats.lessons.toString(),
      icon: BookOpen,
      color: "bg-orange-100",
      iconColor: "text-orange-600",
    },
    {
      title: "Classes",
      value: stats.classes.toString(),
      icon: GraduationCap,
      color: "bg-green-100",
      iconColor: "text-green-600",
    },
  ]

  return (
    <div className="grid grid-cols-2 p-2 gap-2">
      {statItems.map((item, index) => (
        <Card key={index} className="border-none shadow-sm">
          <CardContent  className="py-1">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-2xl font-bold">{item.value}</p>
                <p className="text-sm text-muted-foreground">{item.title}</p>
              </div>
              <div className={`p-2 rounded-full ${item.color}`}>
                <item.icon className={`h-5 w-5 ${item.iconColor}`} />
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
