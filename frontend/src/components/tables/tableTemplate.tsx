import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import {
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@radix-ui/react-dropdown-menu";
import { MenuIcon } from "lucide-react";
interface iColumns {
  name: string;
  age: number;
  gpa: number;
  month: string;
}

interface iRows {
  name: string;
}

interface TableProps {
  rows: iRows[];
  columns: iColumns[];
}

const table: React.FC<TableProps> = ({ rows, columns }) => {
  // grt current month
  const currentMonth: String = new Date().toLocaleString("en-US", {
    month: "long",
  });

  return (
    <>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {/* table rows here */}
            <TableRow className="font-bold">
              {rows.map((rowData: any) => (
                <TableHead key={rowData.name}>{rowData.name}</TableHead>
              ))}
              <TableHead>Options</TableHead>
            </TableRow>
          </TableHeader>

          {/* columns */}
          <TableBody>
            {columns
              .filter((columnsData: any) => columnsData.month === "March")
              .map((columnsData: any) => (
                <TableRow key={columnsData._id} className="hover:bg-gray-200">
                  <TableCell>{columnsData._id}</TableCell>
                  <TableCell>{columnsData.name}</TableCell>
                  <TableCell>{columnsData.age}</TableCell>
                  <TableCell>{columnsData.gpa}</TableCell>
                  <TableCell>{columnsData.month}</TableCell>

                  {columnsData.month === currentMonth && (
                    <TableCell>
                      {/* Dropdown menu */}
                      <DropdownMenu>
                        <DropdownMenuTrigger>
                          <MenuIcon />
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="w-fit">
                          <DropdownMenuLabel>Manage</DropdownMenuLabel>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem className="text-[13px]">
                            Update
                          </DropdownMenuItem>
                          <DropdownMenuItem className="text-[13px]">
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  )}
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </div>
    </>
  );
};

export default table;
