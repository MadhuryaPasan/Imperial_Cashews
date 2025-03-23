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
  Edit,
  Lock,
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

const TableComponent = ({ selectedMonth }: any) => {
  // Get current month
  const currentMonth: string = new Date().toLocaleString("en-US", {
    month: "long",
  });

  const [rows, setRows] = useState<any>([]);

  // Fetch data from API
  useEffect(() => {
    async function getAll() {
      let result = await quality_end_product_check_getAllData();
      setRows(result);
    }
    getAll();
  }, []);

  // Table columns
  const columns = [
    { name: "Batch ID" },
    { name: "Product Grade" },
    { name: "Color Uniformity" },
    { name: "Taste Test" },
    { name: "Packaging Integrity" },
    { name: "Approved" },
    { name: "Checked By" },
    { name: "Timestamp" },
  ];

  return (
    <>
      <div className="p-3">
        <div className="flex justify-begin py-3">{insertBtn()}</div>
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              {/* Table Header */}
              <TableRow className="font-bold">
                {columns.map((column: any) => (
                  <TableHead className="font-bold text-[15px]" key={column.name}>
                    {column.name}
                  </TableHead>
                ))}
                <TableHead className="font-bold text-[15px]">Options</TableHead>
              </TableRow>
            </TableHeader>

            {/* Table Body */}
            <TableBody>
              {rows.map((rowsData: any) => (
                <TableRow key={rowsData._id} className="hover:bg-primary/10">
                  <TableCell>{rowsData.batch_id}</TableCell>
                  <TableCell>{rowsData.product_grade}</TableCell>
                  <TableCell>{rowsData.color_uniformity}</TableCell>
                  <TableCell>{rowsData.taste_test}</TableCell>
                  <TableCell>{rowsData.packaging_integrity}</TableCell>
                  <TableCell>{rowsData.approved ? "Yes" : "No"}</TableCell>
                  <TableCell>{rowsData.checked_by}</TableCell>
                  <TableCell>
                    {new Date(rowsData.timestamp).toLocaleDateString()}
                  </TableCell>

                  {/* Show current month only */}
                  {rowsData.month !== currentMonth ? (
                    <div>
                      {/* Update Button */}
                      {UpdateBtn(rowsData._id)}

                      {/* Delete Button */}
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
      </div>
    </>
  );
};

export default TableComponent;

import { Button } from "@/components/ui/button";
import { DialogClose } from "@radix-ui/react-dialog";
import {
  quality_end_product_check_deleteDoc,
  quality_end_product_check_getAllData,
} from "@/utils/quality/quality_end_product_check";
import Quality_end_product_check_Update from "./quality_end_product_check_Update";

const UpdateBtn = (updateId: any) => {
  return (
    <Dialog>
      <DialogTrigger>
        <Button variant="ghost" className="my-2 mx-0.5">
          <Edit className="stroke-primary" />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <div>
          <Quality_end_product_check_Update UpdateId={updateId} />
        </div>
      </DialogContent>
    </Dialog>
  );
};

const deleteBtn = (deleteId: any) => {
  // Delete function
  const deleteOne = async (id: string) => {
    await quality_end_product_check_deleteDoc(id);
    window.location.reload();
  };

  return (
    <Dialog>
      <DialogTrigger>
        <Button variant="ghost" className="my-2 mx-0.5">
          <Trash2 className="stroke-destructive" />
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

        {/* Delete Confirmation */}
        <DialogFooter className="sm:justify-start">
          <DialogClose asChild>
            <div className="flex flex-col items-center w-full">
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
  );
};

// Insert Button
import Quality_end_product_check_Insert from "@/components/MainFunctions/Quality/quality_end_product_check/quality_end_product_check_Insert";

const insertBtn = () => {
  return (
    <Dialog>
      <DialogTrigger>
        <Button className="left-0">Insert Now</Button>
      </DialogTrigger>
      <DialogContent>
        <Quality_end_product_check_Insert />
      </DialogContent>
    </Dialog>
  );
};
