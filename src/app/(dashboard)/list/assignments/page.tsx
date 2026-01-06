import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import {  Filter, ArrowUpDown, Plus } from "lucide-react";
import PaginationforAllComponents from "../../components/Pagnation";
import { ColumnConfig } from "../teachers/page";
import TableforAllComponents from "../../components/Table";
import { Eye, Edit } from "lucide-react";
import prisma from "@/lib/prisma";
import TableSearch from "../../components/TableSearch";

interface Assignments {
  id: number;
  subject: string;
  class: string;
  teacher: string;
  dueDate: string;
}

const assignmentsColumns: ColumnConfig<Assignments>[] = [
  {
    header: "Subject ",
    accessorKey: "subject",
  },
  {
    header: "Class",
    accessorKey: "class",
  },

  {
    header: "Teacher",
    accessorKey: "teacher",
  },
  {
    header: "Due Date",
    accessorKey: "dueDate",
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

export default async function Assignments({ searchParams }: { searchParams: { [key: string]: string } | undefined; }) {
  const params = await searchParams;
  const page = params?.page;
  const query = params?.assignmentid || "";
  const p = page ? Number(page) : 1;

  const whereClause = query
    ? {
        lesson: {
          OR: [
            { subject: { name: { contains: query, mode: "insensitive" as const } } },
            { teacher: { name: { contains: query, mode: "insensitive" as const } } },
            { teacher: { id: { equals: query, mode: "insensitive" as const } } },
            
          ],
        },
      }
    : {};

  const [rawAssignment, count] = await prisma.$transaction([
    prisma.assignment.findMany({
      where: whereClause,
      include: {
        lesson: {
          select: {
            subject: { select: { name: true } },
            class: { select: { name: true } },
            teacher: { select: { name: true, id: true } },
          }
        },
      }
    }),
    prisma.assignment.count(),
  ]);

  const data = rawAssignment.map((item) => ({
    id: item.id,
    subject: item.lesson.subject.name,
    teacher: `${item.lesson.teacher.name}`,
    teacherId: `${item.lesson.teacher.id}`,
    class: item.lesson.class.name,
    dueDate: new Date(item.dueDate).toISOString().split('T')[0]
  }));
 
  console.log(rawAssignment);

  return (
    <div className="flex-1 space-y-4 p-4 md:p-2 pt-6">
      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <h2 className="text-xl font-bold tracking-tight">All Assignments</h2>
            <div className="flex items-center gap-2">
                <TableSearch />
              
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
              <Button
                size="sm"
                className="bg-yellow-400 hover:bg-yellow-500 text-black"
              >
                <Plus className="h-4 w-4 " />
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <TableforAllComponents data={data} columns={assignmentsColumns} />
          {/* Mobile Card View */}

          {/* Pagination */}
          <PaginationforAllComponents  page={p} count={count}/>
        </CardContent>
      </Card>
    </div>
  );
}
