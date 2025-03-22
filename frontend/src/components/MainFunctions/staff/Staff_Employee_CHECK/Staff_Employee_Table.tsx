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
   // get current month
   const currentMonth: string = new Date().toLocaleString("en-US", {
     month: "long",
   });
 
   const [rows, setRows] = useState<any>([]);
 
   // get data from api
   useEffect(() => {
     async function getAll() {
       let result = await Staff_Employee_getAllData();
       setRows(result);
     }
     getAll();
   }, []);
 
   // table rows
   const columns = [
     { name: "Name" },
     { name: "Email" },
     { name: "Phone Number" },
     { name: "Address" },
     { name: "Position" },
     { name: "Department" },
     { name: "Joined Date" },
     { name: "Month" },
   ];
 
   return (
     <>
      {/* insert */}

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
               .filter((rowsData: any) => rowsData.month === "March")
               .map((rowsData: any) => (
                 <TableRow key={rowsData._id} className="hover:bg-primary/10">
                   <TableCell>{rowsData.name}</TableCell>
                   <TableCell>{rowsData.email}</TableCell>
                   <TableCell>{rowsData.phoneNumber}</TableCell>
                   <TableCell>{rowsData.address}</TableCell>
                   <TableCell>{rowsData.position}</TableCell>
                   <TableCell>{rowsData.department}</TableCell>
                   <TableCell>{rowsData.dateJoined}</TableCell>
                   <TableCell>{rowsData.month}</TableCell>
 
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
  Staff_Employee_deleteDoc,
  Staff_Employee_getAllData,
  Staff_Employee_getDoc,
} from "@/utils/staff/Staff_Employee_API";

import Staff_Employee_Update from "./Staff_Employee_Update";
 
 
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
            {/* {currentData ? <Staff_Employee_Update {...currentData} /> : <p>Loading...</p>} */}
            <Staff_Employee_Update currentData={updateId}/>
          </div>
        </DialogContent>
      </Dialog>
     </>
   );
 };
 
 const deleteBtn = (deleteId: any) => {
   // delete one
   const deleteOne = async (id: string) => {
     await Staff_Employee_deleteDoc(id);
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

 import Staff_Employee_insert from '@/components/MainFunctions/staff/Staff_Employee_CHECK/Staff_Employee_insert'
 const insertBtn = () => {
  return (
    <>
      <Dialog>
        <DialogTrigger>
          <Button className="left-0">Insert Now</Button>
        </DialogTrigger>
        <DialogContent>
          <Staff_Employee_insert/>
        </DialogContent>
      </Dialog>
    </>
  );
};