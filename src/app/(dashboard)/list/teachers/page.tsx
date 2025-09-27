import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Filter, ArrowUpDown } from "lucide-react";
import TableforAllComponents from "../../components/Table";
import PaginationforAllComponents from "../../components/Pagnation";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Trash, Edit } from "lucide-react";
import CreateTeacherForm from "../../components/Forms/TeacherForm";
import TableSearch from "../../components/TableSearch";
import prisma from "@/lib/prisma";
import { ITEM_PER_PAGE } from "@/lib/settings";
import Link from "next/link";

interface Teacher {
  id: string;
  username: string;
  name: string;
  surname: string;
  email: string;
  phone: string;
  address: string;
  img: string | null;
  createdAt: Date;
  birthday: Date;
  subjects: { subject: { name: string } }[]; // updated to match usage
  classes: { name: string }[]; // updated to match usage
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
    header: "Teacher ID",
    accessorKey: "id",
  },
  {
    header: "Subjects",
    render: (item) => (
      <div className="flex flex-wrap gap-1">
        {item.subjects.map((subjectRelation, index) => (
          <Badge key={index} variant="secondary" className="text-xs">
            {subjectRelation.subject.name}
          </Badge>
        ))}
      </div>
    ),
  },
  {
    header: "Classes",
    render: (item) => (
      <div className="flex flex-wrap gap-1">
        {item.classes.map((classItem, index) => (
          <Badge key={index} variant="outline" className="text-xs">
            {classItem.name}
          </Badge>
        ))}
      </div>
    ),
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
    render: (item) => (
      <div className="flex items-center gap-2">
        <Link href={`/list/teachers/${item.id}`}>
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
export default async function Teachers({
  searchParams,
}: {
  searchParams: { [key: string]: string } | undefined;
}) {
  const params = await searchParams;
  const page = params?.page;
  const query = params?.teacherid || "";
  const p = page ? Number(page) : 1;

  const whereClause = query
    ? {
        OR: [
          { name: { contains: query, mode: "insensitive" as const } },
          { surname: { contains: query, mode: "insensitive" as const } },
          { email: { contains: query, mode: "insensitive" as const } },
          { phone: { contains: query, mode: "insensitive" as const } },
        ],
      }
    : {};

  const [data, count] = await prisma.$transaction([
    prisma.teacher.findMany({
      where: whereClause,
      include: {
        subjects: {
          include: {
            subject: true,
          },
        },
        classes: true,
      },
      take: ITEM_PER_PAGE,
      skip: (p - 1) * ITEM_PER_PAGE,
    }),
    prisma.teacher.count({ where: whereClause }),
  ]);
  // console.log("teachers:", count);

  return (
    <div className="flex-1 space-y-4 p-4 md:p-2 pt-6">
      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <h2 className="text-xl font-bold tracking-tight">All Teachers</h2>
            <div className="flex items-center gap-2">
              <TableSearch searchType="teacherid"/>
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
          <TableforAllComponents data={data} columns={teacherColumns} />
          {/* Mobile Card View */}

          {/* Pagination */}
          <PaginationforAllComponents count={count} page={p} />
        </CardContent>
      </Card>
    </div>
  );
}
