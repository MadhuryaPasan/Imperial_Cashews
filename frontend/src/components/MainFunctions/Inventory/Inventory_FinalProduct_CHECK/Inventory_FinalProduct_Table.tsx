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

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import {
  Inventory_FinalProduct_getAllData,
  Inventory_FinalProduct_deleteDoc,
  Inventory_FinalProduct_getDoc
} from "@/utils/inventory/Inventory_FinalProduct_API";


import Inventory_FinalProduct_Update from "./Inventory_FinalProduct_Update";


const table = ({ selectedMonth }: any) => {
  // get current month
  const currentMonth: string = new Date().toLocaleString("en-US", {
    month: "long",
  });

  const [rows, setRows] = useState<any>([]);

  // get data from api
  useEffect(() => {
    async function getAll() {
      let result = await Inventory_FinalProduct_getAllData();
      setRows(result);
    }
    getAll();
  }, []);

  // table rows
  const columns = [
    { name: "Category" },
    { name: "SellPrice" },
    { name: "Weight" },
    { name: "Manufacturer Date" },
    { name: "Expire Date" },
    { name: "Package Count" },
  ];

  return (
    <>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {/* table rows here */}
            <TableRow className="font-bold">
              {columns.map((columns: any) => (
                <TableHead
                  className=" font-bold text-[15px]"
                  key={columns.name}
                >
                  {columns.name}
                </TableHead>
              ))}
              <TableHead className=" font-bold text-[15px]">Options</TableHead>
            </TableRow>
          </TableHeader>

          {/* columns */}
          <TableBody>
            {rows
              // .filter((rowsData: any) => rowsData.month === "March")
              .map((rowsData: any) => (
                <TableRow key={rowsData._id} className="hover:bg-primary/10">
                  <TableCell>{rowsData.category}</TableCell>
                  <TableCell>{rowsData.Sellprice}</TableCell>
                  <TableCell>{rowsData.weight}</TableCell>
                  <TableCell>{rowsData.manufacturerDate}</TableCell>
                  <TableCell>{rowsData.ExpireDate}</TableCell>
                  <TableCell>{rowsData.PackageCount}</TableCell>

                  {/* show current month only */}
                  {rowsData.month !== currentMonth ? (
                    <div>
                      {/* Update */}
                      {UpdateBtn(rowsData._id)}

                      {/* Delete */}
                      {deleteBtn(rowsData._id)}
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
    </>
  );
};

export default table;

import { Button } from "@/components/ui/button";
import { DialogClose } from "@radix-ui/react-dialog";
import Inventory_FinalProduct_update from "./Inventory_FinalProduct_Update";

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
            <Inventory_FinalProduct_update />
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

const deleteBtn = (deleteId: any) => {
  // delete one
  const deleteOne = async (id: string) => {
    await Inventory_FinalProduct_deleteDoc(id);
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
          {/* deleteNow */}

          <DialogFooter className="sm:justify-start">
            <DialogClose asChild>
              <div className="flex flex-col items-center w-full ">
                <Button
                  variant="destructive"
                  type="submit"
                  onClick={() => deleteOne(deleteId)}
                  className="w-full"
                >
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
