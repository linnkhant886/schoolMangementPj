import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Eye, Edit } from "lucide-react";
import { teachersData } from "@/lib/data";
import { Card, CardContent } from "@/components/ui/card";

export default function TableforAllComponents() {
  const currentTeachers = teachersData;
  return (
    <>
      <div className="hidden md:block">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Info</TableHead>
              <TableHead>Teacher ID</TableHead>
              <TableHead>Subjects</TableHead>
              <TableHead>Classes</TableHead>
              <TableHead>Phone</TableHead>
              <TableHead>Address</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {currentTeachers.map((teacher) => (
              <TableRow key={teacher.id}>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <Avatar>
                      <AvatarImage
                        src={teacher.photo || "/placeholder.svg"}
                        alt={teacher.name}
                      />
                      <AvatarFallback>
                        {teacher.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="font-medium">{teacher.name}</div>
                      <div className="text-sm text-muted-foreground">
                        {teacher.email}
                      </div>
                    </div>
                  </div>
                </TableCell>
                <TableCell>{teacher.teacherId}</TableCell>
                <TableCell>
                  <div className="flex flex-wrap gap-1">
                    {teacher.subjects.map((subject, index) => (
                      <Badge
                        key={index}
                        variant="secondary"
                        className="text-xs"
                      >
                        {subject}
                      </Badge>
                    ))}
                  </div>
                </TableCell>
                <TableCell>{teacher.classes.join(", ")}</TableCell>
                <TableCell>{teacher.phone}</TableCell>
                <TableCell className="max-w-[200px] truncate">
                  {teacher.address}
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      className="h-8 w-8 p-0 bg-blue-100 hover:bg-blue-200"
                    >
                      <Eye className="h-4 w-4 text-blue-600" />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="h-8 w-8 p-0 bg-purple-100 hover:bg-purple-200"
                    >
                      <Edit className="h-4 w-4 text-purple-600" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <div className="md:hidden space-y-4">
        {currentTeachers.map((teacher) => (
          <Card key={teacher.id}>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Avatar>
                    <AvatarImage
                      src={teacher.photo || "/placeholder.svg"}
                      alt={teacher.name}
                    />
                    <AvatarFallback>
                      {teacher.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="font-medium">{teacher.name}</div>
                    <div className="text-sm text-muted-foreground">
                      {teacher.email}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className="h-8 w-8 p-0 bg-blue-100 hover:bg-blue-200"
                  >
                    <Eye className="h-4 w-4 text-blue-600" />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="h-8 w-8 p-0 bg-purple-100 hover:bg-purple-200"
                  >
                    <Edit className="h-4 w-4 text-purple-600" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </>
  );
}
