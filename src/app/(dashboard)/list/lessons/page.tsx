import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Filter, ArrowUpDown, Plus } from "lucide-react";
import PaginationforAllComponents from "../../components/Pagnation";
import { ColumnConfig } from "../teachers/page";
import TableforAllComponents from "../../components/Table";
import { Eye, Edit } from "lucide-react";
import TableSearch from "../../components/TableSearch";
import prisma from "@/lib/prisma";
import { ITEM_PER_PAGE } from "@/lib/settings";

interface Lessons {
  id: number;
  subject: { name: string };
  class: { name: string };
  teacher: { name: string };
}

const lessonColumns: ColumnConfig<Lessons>[] = [
  {
    header: "Subject Name",
    render: (item) => item.subject.name,
  },
  {
    header: "Class",
    render: (item) => item.class.name,
  },

  {
    header: "Teacher",
    render: (item) => item.teacher.name,
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

export default async function Lessons({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const params = await searchParams;
  const page = params?.page;
  const query = Array.isArray(params?.lessonid)
    ? params.lessonid[0]
    : params?.lessonid || "";
  const p = page ? Number(page) : 1;

  const whereClause = query
    ? {
        OR: [
          {
            subject: {
              name: { contains: query, mode: "insensitive" as const },
            },
          },
          {
            teacher: {
              name: { contains: query, mode: "insensitive" as const },
            },
          },
          {
            teacher: {
              id: { equals: query, mode: "insensitive" as const },
            },
          },
        ],
      }
    : {};

  const [data, count] = await prisma.$transaction([
    prisma.lesson.findMany({
      where: whereClause,
      include: {
        subject: {
          select: {
            name: true,
          },
        },
        class: {
          select: {
            name: true,
          },
        },
        teacher: {
          select: {
            id: true,
            name: true,
          },
        },
      },
      take: ITEM_PER_PAGE,
      skip: ITEM_PER_PAGE * (p - 1),
    }),
    prisma.class.count(),
  ]);

  // const data = rawLessons.map((item: Lessons) => ({
  //   id: item.id,
  //   subject: item.subject.name,
  //   class: item.class.name,
  //   teacher: item.teacher.name,
  // }));
  // console.log(data);
  return (
    <div className="flex-1 space-y-4 p-4 md:p-2 pt-6">
      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <h2 className="text-xl font-bold tracking-tight">All Classes</h2>
            <div className="flex items-center gap-2">
              <div className="relative flex-1 max-w-sm">
                <TableSearch searchType="lessonid" />
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
          <TableforAllComponents data={data} columns={lessonColumns} />
          {/* Mobile Card View */}

          {/* Pagination */}
          <PaginationforAllComponents count={count} page={p} />
        </CardContent>
      </Card>
    </div>
  );
}
