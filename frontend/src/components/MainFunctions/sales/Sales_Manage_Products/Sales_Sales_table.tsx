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
      let result = await getAll_Sales_Sales_Data();
      setRow(result);
    }
    getAll();
  }, []);

  // table rows
  const columns = [

    { name: "Sales Date" },
    { name: "Sales Status" },
    { name: "Payment Status" },
    { name: "Total Amount" },
    { name: "Unit Price" },
    { name: "Quantity" },
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
                    {/* change this */}


                    <TableCell>{rowData.sales_date
                      ? new Date(rowData.sales_date).toLocaleString(
                        "en-US",
                        {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        }
                      )
                      : "N/A"}</TableCell>
                    <TableCell>{rowData.sales_status}</TableCell>
                    <TableCell>{rowData.payment_status}</TableCell>
                    <TableCell>{rowData.total_amount}</TableCell>
                    <TableCell>{rowData.unit_price}</TableCell>
                    <TableCell>{rowData.quantity}</TableCell>


                    {/* show current month only */}
                    {rowData.month !== currentMonth ? (
                      <div>
                        {/* Update */}
                        {UpdateBtn()}

                        {/* Delete */}
                        {deleteBtn(rowData._id)}
                      </div>
                    ) : (
                      <TableCell>
                        <Lock className="size-5 opacity-20" />
                      </TableCell>
                    )}
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
import { getAll_Sales_Sales_Data, Sales_Sales_deleteDoc } from "@/utils/sales/Sales_Sales_API";

const UpdateBtn = () => {
  return (
    <>
      <Dialog>
        <DialogTrigger>
          <Button variant="ghost" className="my-2 mx-0.5">
            <Edit className="  stroke-primary" />
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Update Now.</DialogTitle>
            <DialogDescription>
              You are about to update this record.
            </DialogDescription>
          </DialogHeader>
          <Separator />

          {/* deleteNow */}

          <DialogFooter className="sm:justify-start">
            <DialogClose asChild>
              <div className="flex flex-col items-center w-full ">
                <Button type="submit" className="w-full">Update</Button>
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







const deleteBtn = (deleteId: any) => {
  // delete one
  const deleteOne = async (id: string) => {
    await Sales_Sales_deleteDoc(id);
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


import Sales_Sales_Insert from "@/components/MainFunctions/sales/insert/Sales_Sales_Insert"
const insertBtn = () => {
  return (
    <>
      <Dialog>
        <DialogTrigger>
          <Button className="left-0">Insert Now</Button>
        </DialogTrigger>
        <DialogContent>
        <Sales_Sales_Insert/>
        </DialogContent>
      </Dialog>
    </>
  );
};