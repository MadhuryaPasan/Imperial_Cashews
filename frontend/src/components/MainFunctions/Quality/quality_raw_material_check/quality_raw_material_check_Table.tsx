import { Separator } from "@/components/ui/separator";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useEffect, useState } from "react";
import { Edit, Lock, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import {
  quality_end_product_check_getAllData,
  quality_raw_material_check_deleteDoc,
  quality_raw_material_check_updateDoc,
} from "@/utils/quality/quality_raw_material_check_Api"; // assuming the API function exists

const quality_raw_material_check_Table = ({ selectedMonth }: any) => {
  // Get current month
  const currentMonth: string = new Date().toLocaleString("en-US", { month: "long" });

  const [rows, setRows] = useState<any>([]);

  // Get data from API
  useEffect(() => {
    async function getAll() {
      let result = await quality_end_product_check_getAllData();
      setRows(result);
    }
    getAll();
  }, []);

  // Table columns
  const columns = [
    // { name: "Batch ID" },
    // { name: "Supplier ID" },
    { name: "Material Type" },
    { name: "Size Category" },
    { name: "Moisture Level (%)" },
    { name: "Foreign Objects Detected" },
    { name: "Color" },
    { name: "Broken Percentage" },
    { name: "Checked By" },
    { name: "Timestamp" },
    { name: "Month" },
  ];

  return (
    <div className="p-3">
      <div className="flex justify-begin py-3">{insertBtn()}</div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow className="font-bold">
              {columns.map((column: any) => (
                <TableHead key={column.name} className="font-bold text-[15px]">
                  {column.name}
                </TableHead>
              ))}
              <TableHead className="font-bold text-[15px]">Options</TableHead>
            </TableRow>
          </TableHeader>

          {/* Table rows */}
          <TableBody>
            {rows
              .filter((rowData: any) => rowData.month === selectedMonth) // filter by selected month
              .map((rowData: any) => (
                <TableRow key={rowData._id} className="hover:bg-primary/10">
                  {/* <TableCell>{rowData.batch_id}</TableCell> */}
                  {/* <TableCell>{rowData.supplier_id}</TableCell> */}
                  <TableCell>{rowData.material_type}</TableCell>
                  <TableCell>{rowData.size_category}</TableCell>
                  <TableCell>{rowData.moisture_level}</TableCell>
                  <TableCell>{rowData.foreign_objects_detected ? "Yes" : "No"}</TableCell>
                  <TableCell>{rowData.color}</TableCell>
                  <TableCell>{rowData.broken_percentage}</TableCell>
                  <TableCell>{rowData.checked_by}</TableCell>
                  <TableCell>
                    {rowData.timestamp
                      ? new Date(rowData.timestamp).toLocaleString("en-US", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })
                      : "N/A"}
                  </TableCell>
                  <TableCell>{rowData.month}</TableCell>

                  {/* Show options only for the current month */}
                  {rowData.month === currentMonth ? (
                    <div>
                      {/* Update */}
                      {UpdateBtn(rowData._id)}

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
  );
};

export default quality_raw_material_check_Table;

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
          <Button
            variant="ghost"
            className="my-2 mx-0.5"
            onClick={async () => {
              const data = {}; // Replace with the actual data to update
              await quality_raw_material_check_updateDoc(updateId, data);
            }}
          >
            Update
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

const deleteBtn = (deleteId: any) => {
  const deleteOne = async (id: string) => {
    await quality_raw_material_check_deleteDoc(id);
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
            This action cannot be undone. This will permanently delete the entry and remove the data from our system.
          </DialogDescription>
        </DialogHeader>
        <Separator />
        <DialogFooter className="sm:justify-start">
          <DialogClose asChild>
            <div className="flex flex-col items-center w-full">
              <Button
                variant="destructive"
                onClick={() => deleteOne(deleteId)}
                className="w-full"
              >
                Delete
              </Button>
              <Button variant="outline" className="my-2 mx-0.5 border-1 border-primary w-full">
                Close
              </Button>
            </div>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

import QualityRawMaterialCheckInsert from "@/components/MainFunctions/Quality/quality_raw_material_check/quality_raw_material_check_Insert";
import quality_raw_material_check from "@/pages/MainFunctions/QualityControl/subPages/quality_raw_material_check";

const insertBtn = () => {
  return (
    <Dialog>
      <DialogTrigger>
        <Button className="left-0">Insert Now</Button>
      </DialogTrigger>
      <DialogContent>
        <QualityRawMaterialCheckInsert />
      </DialogContent>
    </Dialog>
  );
};
