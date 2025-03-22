import { Separator } from "@/components/ui/separator";
import {
    Table,
    TableBody,
    TableCell,  // Add this line
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table";
  

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
  Inventory_RawMaterial_getAllData,
  Inventory_RawMaterial_deleteDoc,
  Inventory_RawMaterial_getDoc
} from "@/utils/inventory/Inventory_RawMaterial_API";

import Inventory_RawMaterial_Update from "./Inventory_RawMaterial_Update";

const table = ({ selectedMonth }: any) => {
  // get current month
  const currentMonth: string = new Date().toLocaleString("en-US", {
    month: "long",
  });

  const [rows, setRows] = useState<any>([]);

  // get data from api
  useEffect(() => {
    async function getAll() {
      let result = await Inventory_RawMaterial_getAllData();
      setRows(result);
    }
    getAll();
  }, []);

  // table rows
  const columns = [
    { name: "Get Date" },
    { name: "Expire Date" },
    { name: "Buyer Name" },
    { name: "Seller Name" },
    { name: "Weight" },
    { name: "Price" },
    { name: "Location" },
  ];

  return (
    <>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {/* table rows here */}
            <TableRow className="font-bold">
              {columns.map((columns: any) => (
                <TableHead className=" font-bold text-[15px]" key={columns.name}>
                  {columns.name}
                </TableHead>
              ))}
              <TableHead className=" font-bold text-[15px]">Options</TableHead>
            </TableRow>
          </TableHeader>

          {/* columns */}
          <TableBody>
            {rows.map((rowsData: any) => (
              <TableRow key={rowsData._id} className="hover:bg-primary/10">
                <TableCell>{rowsData.getDate}</TableCell>
                <TableCell>{rowsData.expireDate}</TableCell>
                <TableCell>{rowsData.buyerName}</TableCell>
                <TableCell>{rowsData.sellerName}</TableCell>
                <TableCell>{rowsData.weight}</TableCell>
                <TableCell>{rowsData.price}</TableCell>
                <TableCell>{rowsData.location}</TableCell>

                {rowsData.month !== currentMonth ? (
                  <div>
                    {UpdateBtn(rowsData._id)}
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
            <Inventory_RawMaterial_Update />
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

const deleteBtn = (deleteId: any) => {
  // delete one
  const deleteOne = async (id: string) => {
    await Inventory_RawMaterial_deleteDoc(id);
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
