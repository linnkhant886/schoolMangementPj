import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Filter, ArrowUpDown, Plus } from "lucide-react";
import PaginationforAllComponents from "../../components/Pagnation";
import { ColumnConfig } from "../teachers/page";
import TableforAllComponents from "../../components/Table";
// import { resultsData } from "@/lib/data";
import { Eye, Edit } from "lucide-react";
import TableSearch from "../../components/TableSearch";
import prisma from "@/lib/prisma";
import { ITEM_PER_PAGE } from "@/lib/settings";

interface Results {
  id: number;
  title: string;
  class: string;
  student: string;
  teacher: string;
  score: number;
  date: Date;
}

const resultsColumns: ColumnConfig<Results>[] = [
  {
    header: "Title ",
    accessorKey: "title",
  },
  {
    header: "Student",
    accessorKey: "student",
  },

  {
    header: "Score",
    accessorKey: "score",
  },
  {
    header: "Teacher",
    accessorKey: "teacher",
  },
  {
    header: "Class",
    accessorKey: "class",
  },
  {
    header: "Date",
    render: (item) => item.date.toLocaleDateString(),
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

export default async function Results({
  searchParams,
}: {
  searchParams: { [key: string]: string } | undefined;
}) {
  const params = await searchParams;
  const page = params?.page;
  const query = params?.resultid || "";
  const p = page ? Number(page) : 1;

  const whereClause = query
    ? {
        OR: [
          {
            student: {
              name: { contains: query, mode: "insensitive" as const },
            },
          },
          {
            assignment: {
              title: { contains: query, mode: "insensitive" as const },
            },
          },
          {
            exam: { title: { contains: query, mode: "insensitive" as const } },
          },
          {
            assignment: {
              lesson: {
                teacher: {
                  name: { contains: query, mode: "insensitive" as const },
                },
              },
            },
          },
          {
            exam: {
              lesson: {
                teacher: {
                  name: { contains: query, mode: "insensitive" as const },
                },
              },
            },
          },
        ],
      }
    : {};

  const [rawResults, count] = await prisma.$transaction([
    prisma.result.findMany({
      where: whereClause,
      include: {
        student: { select: { name: true } },
        assignment: {
          include: {
            lesson: {
              select: {
                class: { select: { name: true } },
                teacher: { select: { name: true } },
              },
            },
          },
        },
        exam: {
          include: {
            lesson: {
              select: {
                class: { select: { name: true } },
                teacher: { select: { name: true } },
              },
            },
          },
        },
      },
      take: ITEM_PER_PAGE,
      skip: ITEM_PER_PAGE * (p - 1),
      
    }),
    prisma.result.count({ where: whereClause }),
  ]);

  const data = rawResults
    .map((item) => {
      const assessment = item.exam || item.assignment;

      if (!assessment) return null;

      const isExam = "startTime" in assessment;

      return {
        id: item.id,
        title: assessment.title,
        student: item.student.name,
        teacher: assessment.lesson.teacher.name,
        score: item.score,
        class: assessment.lesson.class.name,
        date: isExam ? assessment.startTime : assessment.startDate,
      } as Results;
    })
    .filter((x): x is Results => x !== null);

  // console.log(data);

  return (
    <div className="flex-1 space-y-4 p-4 md:p-2 pt-6">
      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <h2 className="text-xl font-bold tracking-tight">Results</h2>
            <div className="flex items-center gap-2">
              <TableSearch searchType="resultid" />
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
          <TableforAllComponents data={data} columns={resultsColumns} />
          {/* Mobile Card View */}

          {/* Pagination */}
          <PaginationforAllComponents count={count} page={p} />
        </CardContent>
      </Card>
    </div>
  );
}
