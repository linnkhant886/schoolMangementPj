"use client";

import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Search, Filter, ArrowUpDown, Plus } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import PaginationforAllComponents from "../../components/Pagnation";
import { ColumnConfig } from "../teachers/page";
import TableforAllComponents from "../../components/Table";
import { parentsData } from "@/lib/data";
import { Eye, Edit } from "lucide-react";

interface Parents {
  id: number;
  name: string;
  email: string;
  students: string[];
  phone: string;
  address: string;
}

const studentsColumns: ColumnConfig<Parents>[] = [
  {
    header: "Info",
    render: (item) => (
      <div className="flex items-center gap-2">
        <div >
          <p className="font-medium leading-none">{item.name}</p>
          <p className="text-sm text-muted-foreground">{item.email}</p>
        </div>
      </div>
    ),
  },
  {
    header: "Student",
    render: (item) => (
      <div className="flex items-center gap-2">
        <div>
          <p className="font-medium leading-none">{item.students}</p>
        </div>
      </div>
    )
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

export default function Students() {
  const [searchTerm, setSearchTerm] = useState("");
  return (
    <div className="flex-1 space-y-4 p-4 md:p-2 pt-6">
      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <h2 className="text-xl font-bold tracking-tight">All Students</h2>
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
            data={parentsData}
            columns={studentsColumns}
          />
          {/* Mobile Card View */}

          {/* Pagination */}
          <PaginationforAllComponents />
        </CardContent>
      </Card>
    </div>
  );
}
