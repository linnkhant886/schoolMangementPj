import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Users, GraduationCap, BookOpen, FileText, ClipboardList } from "lucide-react"
import Link from "next/link";

export function TeacherShortcuts({ teacherID }: { teacherID: string }) {
  const shortcuts = [
    { label: "Teacher's Classes", icon: GraduationCap, path: `/list/classes?classid=${teacherID}` },
    { label: "Teacher's Students", icon: Users, path: `/list/students?teacherid=${teacherID}`},
    { label: "Teacher's Lessons", icon: BookOpen, path: `/list/lessons?lessonid=${teacherID}` },
    { label: "Teacher's Exams", icon: FileText, path: `/list/exams?examid=${teacherID}`},
    { label: "Teacher's Assignments", icon: ClipboardList, path: `/list/assignments?assignmentid=${teacherID}` },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Shortcuts</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-wrap gap-2">
          {shortcuts.map((shortcut, index) => (
            <Link key={index} href={shortcut.path} className="w-full">
            <Button key={index} variant="ghost" className="justify-start h-auto p-3 text-left hover:bg-gray-50">
              <shortcut.icon className="h-4 w-4 mr-3 text-muted-foreground" />
              <span className="text-sm">{shortcut.label}</span>
            </Button>
            </Link>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
