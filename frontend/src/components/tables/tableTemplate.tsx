import { useEffect, useState } from "react";
import { BookLock, Lock, MenuIcon } from "lucide-react";
import { getAllData } from "@/utils/dbAPI";
import { deleteDoc } from "@/utils/dbAPI";
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

interface iColumns {
  name: string;
  age: number;
  gpa: number;
  month: string;
}

const table = ({selectedMonth}:any) => {
  // grt current month
  const currentMonth: string = new Date().toLocaleString("en-US", {
    month: "long",
  });

  const [columns, setData] = useState<iColumns | any>([]);

  // get data from api
  useEffect(() => {
    async function getAll() {
      let result = await getAllData();
      setData(result);
    }
    getAll();
  }, []);

  //delete one
  const deleteOne = async (id: string) => {
    await deleteDoc(id);
    window.location.reload();
  };

  // table rows
  const rows = [
    { name: "Id" },
    { name: "Name" },
    { name: "Age" },
    { name: "Gpa" },
  ];

  return (
    <>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {/* table rows here */}
            <TableRow className="font-bold">
              {rows.map((rowData: any) => (
                <TableHead className=" font-bold text-[15px]" key={rowData.name}>{rowData.name}</TableHead>
              ))}
              <TableHead className=" font-bold text-[15px]">Options</TableHead>
            </TableRow>
          </TableHeader>

          {/* columns */}
          <TableBody>
            {columns
              .filter((columnsData: any) => columnsData.month === selectedMonth)
              .map((columnsData: any) => (
                <TableRow key={columnsData._id} className="hover:bg-gray-200">
                  <TableCell>{columnsData._id}</TableCell>
                  <TableCell>{columnsData.name}</TableCell>
                  <TableCell>{columnsData.age}</TableCell>
                  <TableCell>{columnsData.gpa}</TableCell>
                  <TableCell>{columnsData.month}</TableCell>

                  {/* show current month only */}
                  {columnsData.month === currentMonth ? (
                    <TableCell>
                      {/* Dropdown menu */}
                      <DropdownMenu>
                        <DropdownMenuTrigger>
                          <MenuIcon />
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="w-fit">
                          <DropdownMenuLabel>Manage</DropdownMenuLabel>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem className="text-[13px]  cursor-pointer">
                            Update
                          </DropdownMenuItem>

                          {/* delete btn */}
                          <DropdownMenuItem
                            className="text-[13px] cursor-pointer"
                            onClick={() => deleteOne(columnsData._id)}
                          >
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  ):<TableCell><Lock className="size-5 opacity-20"/></TableCell>}
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </div>
    </>
  );
};

export default table;
