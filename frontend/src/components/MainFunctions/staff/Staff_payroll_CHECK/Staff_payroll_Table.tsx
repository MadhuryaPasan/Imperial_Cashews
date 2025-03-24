
import { Separator } from "@/components/ui/separator";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { useEffect, useState } from "react";
import {
  BookLock,
  DeleteIcon,
  Edit,
  Lock,
  MenuIcon,
  Recycle,
  Trash2,
} from "lucide-react";
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





const table = ({ selectedMonth }: any) => {
  // grt current month
  const currentMonth: string = new Date().toLocaleString("en-US", {
    month: "long",
  });

  const [row, setRow] = useState<any>([]);

  // get data from api
  useEffect(() => {
    async function getAll() {
      let result = await Staff_payroll_getAllData();
      setRow(result);
    }
    getAll();
  }, []);

  // table rows
  const columns = [

    { name: "month" },
    { name: "year" },
    { name: "totalAllowences" },
    { name: "totalEPF" },
    { name: "totalETF" },
    { name: "totalPayments" },

  ];

  return (
    <>
      <div className="p-3">
        <div className="flex justify-begin py-3">{insertBtn()}</div>
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              {/* table rows here */}
              <TableRow className="font-bold">
                {columns.map((columnData: any) => (
                  <TableHead
                    className=" font-bold text-[15px]"
                    key={columnData.name}
                  >
                    {columnData.name}
                  </TableHead>
                ))}
                <TableHead className=" font-bold text-[15px]">Options</TableHead>
              </TableRow>
            </TableHeader>

            {/* columns */}
            <TableBody>
              {row
                // .filter((rowData: any) => rowData.month === "March")
                .map((rowData: any) => (
                  <TableRow key={rowData._id} className="hover:bg-primary/10">
                    <TableCell>{rowData.month}</TableCell>
                    <TableCell>{rowData.year}</TableCell>
                    <TableCell>{rowData.totalAllowences}</TableCell>
                    <TableCell>{rowData.totalEPF}</TableCell>
                    <TableCell>{rowData.totalETF}</TableCell>
                    <TableCell>{rowData.totalPayments}</TableCell>

                    {/* show current month only */}
                    {/* {rowData.month !== currentMonth ? ( */}
                      <div>
                        {/* Update */}
                        {UpdateBtn(rowData._id)}

                        {/* Delete */}
                        {deleteBtn(rowData._id)}
                      </div>
                    {/* ) : (
                      <TableCell>
                        <Lock className="size-5 opacity-20" />
                      </TableCell>
                    )} */}
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </>
  );
};

export default table;









import { DialogClose } from "@radix-ui/react-dialog";
import { Button } from "@/components/ui/button";

import { Staff_payroll_getAllData, Staff_payroll_deleteDoc } from "@/utils/staff/Staff_payroll_API";
import Staff_payroll_Update from "../Staff_payroll_CHECK/Staff_payroll_Update"


const UpdateBtn = (updateId: any) => {



  return (
    <>
      <Dialog>
        <DialogTrigger>
          <Button variant="ghost" className="my-2 mx-0.5">
            <Edit className="  stroke-primary" />
          </Button>
        </DialogTrigger>
        <DialogContent>
          <div>
            {/* {currentData ? <Staff_payroll_Update {...currentData} /> : <p>Loading...</p>} */}
            <Staff_payroll_Update currentData={updateId}/>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};







const deleteBtn = (deleteId: any) => {
  // delete one
  const deleteOne = async (id: string) => {
    await Staff_payroll_deleteDoc(id);
    window.location.reload();
  };
  return (
    <>
      <Dialog>
        <DialogTrigger>
          <Button variant="ghost" className="my-2 mx-0.5">
            <Trash2 className="  stroke-destructive" />
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Are you absolutely sure?</DialogTitle>
            <DialogDescription>
              This action cannot be undone. This will permanently delete your
              account and remove your data from our servers.
            </DialogDescription>
          </DialogHeader>
          <Separator />
          <DialogTitle>"ID: {deleteId}"</DialogTitle>

          {/* deleteNow */}

          <DialogFooter className="sm:justify-start">
            <DialogClose asChild>
              <div className="flex flex-col items-center w-full ">
                <Button variant="destructive" type="submit" onClick={() => deleteOne(deleteId)} className="w-full">
                  Delete
                </Button>
                <Button
                  variant="outline"
                  className="my-2 mx-0.5 border-1 border-primary w-full"
                >
                  Close
                </Button>
              </div>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};


import Staff_payroll_insert from '@/components/MainFunctions/staff/Staff_payroll_CHECK/Staff_payroll_insert'
const insertBtn = () => {
  return (
    <>
      <Dialog>
        <DialogTrigger>
          <Button className="left-0">Insert Now</Button>
        </DialogTrigger>
        <DialogContent>
          <Staff_payroll_insert />
        </DialogContent>
      </Dialog>
    </>
  );
};
