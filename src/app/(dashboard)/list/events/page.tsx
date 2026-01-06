import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Filter, ArrowUpDown, Plus } from "lucide-react";
import PaginationforAllComponents from "../../components/Pagnation";
import { ColumnConfig } from "../teachers/page";
import TableforAllComponents from "../../components/Table";
import { Eye, Edit } from "lucide-react";
import TableSearch from "../../components/TableSearch";
import { ITEM_PER_PAGE } from "@/lib/settings";
import prisma from "@/lib/prisma";

interface Events {
  id: number;
  title: string;
  class: string;
  date: Date;
  startTime: Date;
  endTime: Date;
}

const eventsColumns: ColumnConfig<Events>[] = [
  {
    header: "Title",
    accessorKey: "title",
  },
  {
    header: "Class",
    accessorKey: "class",
  },

  {
    header: "Date",
    render: (item) =>
      new Date(item.date).toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      }),
  },
  {
    header: "Start Time",
    render: (item) =>
      new Date(item.startTime).toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true, // set to true for AM/PM format
      }),
  },

  {
    header: "End Time",
    render: (item) =>
      new Date(item.endTime).toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      }),
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

export default async function Events({
  searchParams,
}: {
  searchParams: { [key: string]: string } | undefined;
}) {
  const params = await searchParams;
  const page = params?.page;
  const query = params?.eventid || "";
  const p = page ? Number(page) : 1;

  const [rawevent, count] = await prisma.$transaction([
    prisma.event.findMany({
      // where: whereClause,
      include: {
        class: {
          select: {
            name: true,
          },
        },
      },
      take: ITEM_PER_PAGE,
      skip: ITEM_PER_PAGE * (p - 1),
    }),
    prisma.result.count(),
  ]);

  const data = rawevent.map((event) => ({
    id: event.id,
    title: event.title,
    class: event.class?.name ?? "",
    date: event.startTime,
    startTime: event.startTime,
    endTime: event.endTime,
  }));
  //  console.log(rawevent)
  console.log(data);
  return (
    <div className="flex-1 space-y-4 p-4 md:p-2 pt-6">
      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <h2 className="text-xl font-bold tracking-tight">All Events</h2>
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
          <TableforAllComponents data={data} columns={eventsColumns} />
          {/* Mobile Card View */}

          {/* Pagination */}
          <PaginationforAllComponents count={count} page={p} />
        </CardContent>
      </Card>
    </div>
  );
}
