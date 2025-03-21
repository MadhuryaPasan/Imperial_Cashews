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



const table = ({ selectedMonth }: any) => {
  // grt current month
  const currentMonth: string = new Date().toLocaleString("en-US", {
    month: "long",
  });

  const [rows, setRows] = useState<any>([]);

  // get data from api
  useEffect(() => {
    async function getAll() {
      let result = await quality_end_product_check_getAllData();
      setRows(result);
    }
    getAll();
  }, []);

  // table rows
  const columns = [
    { name: "Batch ID" },
    { name: "Product Grade" },
    { name: "Color Uniformity" },
    { name: "Taste Test" },
    { name: "Packaging Integrity" },
    { name: "Approved" },
    { name: "Checked By" },
    { name: "Timestamp" }
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
              .filter((rowsData: any) => rowsData.month === "March")
              .map((rowsData: any) => (
                <TableRow key={rowsData._id} className="hover:bg-primary/10">
                  <TableCell>
                    {rowsData.transaction_date
                      ? new Date(rowsData.transaction_date).toLocaleString(
                          "en-US",
                          {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          }
                        )
                      : "N/A"}
                  </TableCell>
                  <TableCell>{rowsData.batch_id}</TableCell>
                    <TableCell>{rowsData.product_grade}</TableCell>
                    <TableCell>{rowsData.color_uniformity}</TableCell>
                    <TableCell>{rowsData.taste_test}</TableCell>
                    <TableCell>{rowsData.packaging_integrity}</TableCell>
                    <TableCell>{rowsData.approved ? "Yes" : "No"}</TableCell>
                    <TableCell>{rowsData.checked_by}</TableCell>
                    <TableCell>{new Date(rowsData.timestamp).toLocaleDateString()}</TableCell>

                  {/* show current month only */}
                  {rowsData.month === currentMonth ? (
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
import { quality_end_product_check_deleteDoc, quality_end_product_check_getAllData } from "@/utils/quality/quality_end_product_check";
const UpdateBtn = (updateId:any) => {
  return (
    <>
      <Dialog>
        <DialogTrigger >
          <Button variant="ghost" className="my-2 mx-0.5">
            <Edit className="  stroke-primary" />
          </Button>
        </DialogTrigger>
        <DialogContent>
          {/* <DialogHeader>
            <DialogTitle>Update Now.</DialogTitle>
            <DialogDescription>
              You are about to update this record.
            </DialogDescription>
          </DialogHeader>
          <Separator /> */}

         <div>
          {/* <Finance_PettyCash_update UpdateId={updateId} /> */}

         </div>
          {/* deleteNow */}

          {/* <DialogFooter className="sm:justify-start">
            <DialogClose asChild>
              <div className="flex flex-col items-center w-full ">
                <Button type="submit" className="w-full">
                  Update
                </Button>
                <Button
                  variant="outline"
                  className="my-2 mx-0.5 border-1 border-primary w-full"
                >
                  Close
                </Button>
              </div>
            </DialogClose>
          </DialogFooter> */}
        </DialogContent>
      </Dialog>
    </>
  );
};





const deleteBtn = (deleteId: any) => {
  // delete one
  const deleteOne = async (id: string) => {
    await quality_end_product_check_deleteDoc(id);
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