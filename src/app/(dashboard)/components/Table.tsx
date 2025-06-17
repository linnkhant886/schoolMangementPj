import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ColumnConfig } from "../list/teachers/page";



  
  // Props interface with generics
  interface TableforAllComponentsProps<T> {
    data: T[];
    columns: ColumnConfig<T>[];
  }

export default function TableforAllComponents<T>({data, columns}: TableforAllComponentsProps<T>) {
  return (
    <>
      <div className="hidden md:block">
        <Table>
          <TableHeader>
            <TableRow>
            {columns.map((column, index) => (
              <TableHead key={index}>{column.header}</TableHead>
            ))}
            </TableRow>
          </TableHeader>
          <TableBody>
          {data.map((item, rowIndex) => (
            <TableRow key={rowIndex}>
              {columns.map((column, colIndex) => (
                <TableCell key={colIndex} className={column.className}>
                  {column.render
                    ? column.render(item)
                    : column.accessorKey
                    ? String(item[column.accessorKey])
                    : null}
                </TableCell>
              ))}
            </TableRow>
          ))}
          </TableBody>
        </Table>
      </div>

      {/* <div className="md:hidden space-y-4">
        {columns.map((item) => (
          <Card key={item.id}>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Avatar>
                    <AvatarImage
                      src={item.photo || "/placeholder.svg"}
                      alt={item.name}
                    />
                    <AvatarFallback>
                      {item.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="font-medium">{item.name}</div>
                    <div className="text-sm text-muted-foreground">
                      {item.email}
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
      </div> */}
    </>
  );
}
