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
      let result = await quality_iso_sls_check_getAllData();
      setRows(result);
    }
    getAll();
  }, []);

  // table rows
  const columns = [
    { name: "Batch ID" },
    { name: "ISO Certified" },
    { name: "SLS Certified" },
    { name: "Last Audit Date" },
    { name: "Next Audit Date" },
    { name: "Inspector" },
    { name: "Remarks" },
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
                   <TableCell>{rowsData.batch_id}</TableCell>
                   <TableCell>{rowsData.iso_certified ? "Yes" : "No"}</TableCell>
                   <TableCell>{rowsData.sls_certified ? "Yes" : "No"}</TableCell>
                   <TableCell>{new Date(rowsData.last_audit_date).toLocaleDateString()}</TableCell>
                   <TableCell>{new Date(rowsData.next_audit_date).toLocaleDateString()}</TableCell>
                   <TableCell>{rowsData.inspector}</TableCell>
                   <TableCell>{rowsData.remarks}</TableCell>
                    


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
      </div>
    </>
  );
};

export default table;

import { Button } from "@/components/ui/button";
import { DialogClose } from "@radix-ui/react-dialog";
import {
  quality_iso_sls_check_deleteDoc,
  quality_iso_sls_check_getAllData,
} from "@/utils/quality/quality_iso_sls_check_Api";
import Quality_iso_sls_check_Update  from "./quality_iso_sls_check_Update"


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

          <div><Quality_iso_sls_check_Update UpdateId={updateId} /></div>

        </DialogContent>
      </Dialog>
    </>
  );
};

const deleteBtn = (deleteId: any) => {
  // delete one
  const deleteOne = async (id: string) => {
    await quality_iso_sls_check_deleteDoc(id);
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





import Quality_iso_sls_check_Insert from "@/components/MainFunctions//Quality/Quality_iso_sls_check/quality_iso_sls_check_Insert";
const insertBtn = () => {
  return (
    <>
      <Dialog>
        <DialogTrigger>
          <Button className="left-0">Insert Now</Button>
        </DialogTrigger>
        <DialogContent>
          <Quality_iso_sls_check_Insert />
        </DialogContent>
      </Dialog>
    </>
  );
};