import { Separator } from "@/components/ui/separator"; 
import { useEffect, useState } from "react";
import { Edit, Lock, Trash2 } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { quality_raw_material_check_deleteDoc, quality_raw_material_check_getDoc } from "@/utils/quality/quality_raw_material_check_Api";
import QualityRawMaterialCheckUpdate from "./quality_raw_material_check_Update";
import { quality_end_product_check_getAllData } from "@/utils/quality/quality_end_product_check";

const Quality_raw_material_CheckTable = ({ selectedMonth }: any) => {
  const currentMonth: string = new Date().toLocaleString("en-US", { month: "long" });
  const [rows, setRows] = useState<any>([]);

  useEffect(() => {
    async function getAll() {
      let result = await quality_end_product_check_getAllData(); // Replace "some-id" with the appropriate ID or logic to fetch data
      setRows(result);
    }
    getAll();
  }, []);

  const columns = [
    { name: "Batch ID" },
    { name: "Supplier ID" },
    { name: "Material Type" },
    { name: "Size Category" },
    { name: "Moisture Level" },
    { name: "Foreign Objects Detected" },
    { name: "Color" },
    { name: "Broken Percentage" },
    { name: "Checked By" },
    { name: "Timestamp" },
  ];

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow className="font-bold">
            {columns.map((column) => (
              <TableHead className="font-bold text-[15px]" key={column.name}>
                {column.name}
              </TableHead>
            ))}
            <TableHead className="font-bold text-[15px]">Options</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {rows.map((row: any) => (
            <TableRow key={row._id} className="hover:bg-primary/10">
              <TableCell>{row.batch_id}</TableCell>
              <TableCell>{row.supplier_id}</TableCell>
              <TableCell>{row.material_type}</TableCell>
              <TableCell>{row.size_category}</TableCell>
              <TableCell>{row.moisture_level}</TableCell>
              <TableCell>{row.foreign_objects_detected ? "Yes" : "No"}</TableCell>
              <TableCell>{row.color}</TableCell>
              <TableCell>{row.broken_percentage}</TableCell>
              <TableCell>{row.checked_by}</TableCell>
              <TableCell>{new Date(row.timestamp).toLocaleDateString()}</TableCell>
              {row.month !== currentMonth ? (
                <TableCell>
                  {UpdateBtn(row._id)}
                  {DeleteBtn(row._id)}
                </TableCell>
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
  );
};

export default Quality_raw_material_CheckTable;

const UpdateBtn = (updateId: any) => (
  <Dialog>
    <DialogTrigger>
      <Button variant="ghost" className="my-2 mx-0.5">
        <Edit className="stroke-primary" />
      </Button>
    </DialogTrigger>
    <DialogContent>
      <QualityRawMaterialCheckUpdate UpdateId={updateId} />
    </DialogContent>
  </Dialog>
);

const DeleteBtn = (deleteId: any) => {
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
            This action cannot be undone. This will permanently delete this record.
          </DialogDescription>
        </DialogHeader>
        <Separator />
        <DialogFooter className="sm:justify-start">
          <DialogClose asChild>
            <div className="flex flex-col items-center w-full ">
              <Button variant="destructive" type="submit" onClick={() => deleteOne(deleteId)} className="w-full">
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
