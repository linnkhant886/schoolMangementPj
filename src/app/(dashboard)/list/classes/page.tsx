import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Filter, ArrowUpDown, Plus } from "lucide-react";
import PaginationforAllComponents from "../../components/Pagnation";
import { ColumnConfig } from "../teachers/page";
import TableforAllComponents from "../../components/Table";
// import { classesData } from "@/lib/data";
import { Eye, Edit } from "lucide-react";
import TableSearch from "../../components/TableSearch";
import prisma from "@/lib/prisma";

interface Classes {
  id: number;
  name: string;
  capacity: number;
  gradeId: number;
  supervisor: { name: string } | null;
}

const classColumns: ColumnConfig<Classes>[] = [
  {
    header: "Class Name",
    accessorKey: "name",
  },
  {
    header: "Capacity",
    accessorKey: "capacity",
  },

  {
    header: "Grade",
    accessorKey: "gradeId",
  },
  {
    header: "Supervisor",
    render: (item) =>
      item.supervisor ? item.supervisor.name : "No Supervisor",
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

export default async function Classes({
  searchParams,
}: {
  searchParams: { [key: string]: string } | undefined;
}) {
  const params = await searchParams;
  const page = params?.page;
  const query = params?.classid || "";
  const p = page ? Number(page) : 1;
 const whereClause = query
  ? {
      OR: [
        { name: { contains: query, mode: "insensitive" as const } },
        { supervisor: { name: { contains: query, mode: "insensitive" as const } } },
      ],
    }
  : {};

  const [data, count] = await prisma.$transaction([
    prisma.class.findMany({
      where: whereClause,
      include: {
        supervisor: {
          select: {
            name: true,
          },
        },
      },
    }),
    prisma.class.count({ where: whereClause }),
  ]);

  // console.log(classData);
  return (
    <div className="flex-1 space-y-4 p-4 md:p-2 pt-6">
      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <h2 className="text-xl font-bold tracking-tight">All Classes</h2>
            <div className="flex items-center gap-2">
              <TableSearch searchType="classid" />
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
          <TableforAllComponents data={data} columns={classColumns} />
          {/* Mobile Card View */}

          {/* Pagination */}
          <PaginationforAllComponents count={count} page={p} />
        </CardContent>
      </Card>
    </div>
  );
}
