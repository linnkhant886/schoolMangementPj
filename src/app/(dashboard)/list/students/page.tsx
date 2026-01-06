import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Filter, ArrowUpDown, Plus, Trash } from "lucide-react";
import PaginationforAllComponents from "../../components/Pagnation";
import { ColumnConfig } from "../teachers/page";
import TableforAllComponents from "../../components/Table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Edit } from "lucide-react";
import TableSearch from "../../components/TableSearch";
import prisma from "@/lib/prisma";
import { ITEM_PER_PAGE } from "@/lib/settings";
import Link from "next/link";


// id grade class email phone adress

// {
//     id: 'S7',
//     username: 'Kurtis47',
//     name: 'Bridgette',
//     surname: 'Grady',
//     email: 'Fanny94@hotmail.com',
//     phone: '721-549-6931',
//     address: '5552 Dan Landing',
//     img: null,
//     bloodType: 'A',
//     sex: 'FEMALE',
//     createdAt: 2025-08-10T09:37:45.465Z,
//     parentId: 'P7',
//     classId: 4,
//     gradeId: 6,
//     birthday: 2013-04-18T03:22:39.279Z
//   },
interface Students {
  id: string;
  name: string;
  email: string | null;
  img: string | null;
  phone: string | null;
  grade: { level: number };
  class: { name: string };
  address: string;
}

const studentsColumns: ColumnConfig<Students>[] = [
  {
    header: "Info",
    render: (item) => (
      <div className="flex items-center gap-3">
        <Avatar>
          <AvatarImage src={item.img || "/placeholder.svg"} alt={item.name} />
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
    header: "Student ID",
    accessorKey: "id",
  },
  {
    header: "Grade",
    render: (item) => item.grade.level,
  },
  {
    header: "Classes",
    render: (item) => item.class.name,
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
        <Link href={`/list/students`}>  
        <Button
          variant="outline"
          size="sm"
          className="h-8 w-8 p-0 bg-blue-100 hover:bg-blue-200"
        >
          <Edit className="h-4 w-4 text-blue-600" />
        </Button>
        </Link>
        <Button
          variant="outline"
          size="sm"
          className="h-8 w-8 p-0 bg-purple-100 hover:bg-purple-200"
        >
          <Trash className="h-4 w-4 text-purple-600" />
        </Button>
      </div>
    ),
  },
];



export default async function Students({
  searchParams,
}: {
  searchParams: { [key: string]: string } | undefined;
}) {
  const params = await searchParams;
  const page = params?.page;
  const studentQuery = params?.studentid || "";
  const teacherQuery = params?.teacherid || "";
  const p = page ? Number(page) : 1;

  const whereClause =
  studentQuery
    ? {
        OR: [
          { name: { contains: studentQuery, mode: "insensitive" as const } },
          { id: { contains: studentQuery, mode: "insensitive" as const } },
        ],
      }
    : teacherQuery
    ? {
        class: {
          is: {
            supervisor: {
              id: teacherQuery,
            },
          },
        },
      }
    : {};


  const [data, count] = await prisma.$transaction([
    prisma.student.findMany({
      where: whereClause,
      select: {
        id: true,
        name: true,
        email: true,
        phone: true,
        img: true,
        grade: {
          select: {
            level: true,
          },
        },
        class: {
          select: {
            name: true,
          },
        },
        address: true,
      },
      take: ITEM_PER_PAGE,
      skip: (p - 1) * ITEM_PER_PAGE,
      
    }),
    prisma.student.count({ where: whereClause }),
  ]);
  // console.log(data);
  // console.log("count", count);
  return (
    <div className="flex-1 space-y-4 p-4 md:p-2 pt-6">
      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <h2 className="text-xl font-bold tracking-tight">All Students</h2>
            <div className="flex items-center gap-2">
              <TableSearch searchType="studentid" />
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
          <TableforAllComponents
            data={data}
            columns={studentsColumns}
          />
          {/* Mobile Card View */}

          {/* Pagination */}
          <PaginationforAllComponents count={count} page={p}/>
        </CardContent>
      </Card>
    </div>
  );
}
