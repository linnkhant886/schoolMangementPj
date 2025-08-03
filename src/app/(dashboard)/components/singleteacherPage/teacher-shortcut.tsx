import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Users, GraduationCap, BookOpen, FileText, ClipboardList } from "lucide-react"

export function TeacherShortcuts() {
  const shortcuts = [
    { label: "Teacher's Classes", icon: GraduationCap },
    { label: "Teacher's Students", icon: Users },
    { label: "Teacher's Lessons", icon: BookOpen },
    { label: "Teacher's Exams", icon: FileText },
    { label: "Teacher's Assignments", icon: ClipboardList },
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Shortcuts</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-wrap gap-2">
          {shortcuts.map((shortcut, index) => (
            <Button key={index} variant="ghost" className="justify-start h-auto p-3 text-left hover:bg-gray-50">
              <shortcut.icon className="h-4 w-4 mr-3 text-muted-foreground" />
              <span className="text-sm">{shortcut.label}</span>
            </Button>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
