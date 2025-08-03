"use client";

import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Search, Filter, ArrowUpDown } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import TableforAllComponents from "../../components/Table";
import PaginationforAllComponents from "../../components/Pagnation";
import { teachersData } from "@/lib/data";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Eye, Edit } from "lucide-react";
import CreateTeacherForm from "../../components/Forms/TeacherForm";

export interface Teacher {
  id: number;
  teacherId: string;
  name: string;
  email: string;
  photo: string;
  phone: string;
  subjects: string[];
  classes: string[];
  address: string;
}
export interface ColumnConfig<T> {
  header: string;
  accessorKey?: keyof T; // Key to access data directly
  render?: (item: T) => React.ReactNode; // Custom render function
  className?: string; // Optional className for styling
}

const teacherColumns: ColumnConfig<Teacher>[] = [
  {
    header: "Info",
    render: (item) => (
      <div className="flex items-center gap-3">
        <Avatar>
          <AvatarImage src={item.photo || "/placeholder.svg"} alt={item.name} />
          <AvatarFallback>
            {item.name
              .split(" ")
              .map((n) => n[0])
              .join("")}
          </AvatarFallback>
        </Avatar>
        <div>
          <div className="font-medium">{item.name}</div>
          <div className="text-sm text-muted-foreground">{item.email}</div>
        </div>
      </div>
    ),
  },
  {
    header: "Teacher ID",
    accessorKey: "teacherId",
  },
  {
    header: "Subjects",
    render: (item) => (
      <div className="flex flex-wrap gap-1">
        {item.subjects.map((subject, index) => (
          <Badge key={index} variant="secondary" className="text-xs">
            {subject}
          </Badge>
        ))}
      </div>
    ),
  },
  {
    header: "Classes",
    render: (item) => item.classes.join(", "),
  },
  {
    header: "Phone",
    accessorKey: "phone",
  },
  {
    header: "Address",
    accessorKey: "address",
    className: "max-w-[200px] truncate",
  },
  {
    header: "Actions",
    render: () => (
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
    ),
  },
];

export default function Teachers() {
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <div className="flex-1 space-y-4 p-4 md:p-2 pt-6">
      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <h2 className="text-xl font-bold tracking-tight">All Teachers</h2>
            <div className="flex items-center gap-2">
              <div className="relative flex-1 max-w-sm">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                  placeholder="Search from table..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Button
                variant="outline"
                size="sm"
                className="bg-yellow-100 hover:bg-yellow-200"
              >
                <Filter className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="bg-yellow-100 hover:bg-yellow-200"
              >
                <ArrowUpDown className="h-4 w-4" />
              </Button>
              <CreateTeacherForm />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <TableforAllComponents data={teachersData} columns={teacherColumns} />
          {/* Mobile Card View */}

          {/* Pagination */}
          <PaginationforAllComponents />
        </CardContent>
      </Card>
    </div>
  );
}
