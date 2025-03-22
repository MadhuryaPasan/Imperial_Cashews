import { SubmitHandler, useForm } from "react-hook-form"; // form validation
 import {
   Staff_Employee_createNew,
   Staff_Employee_getDoc,
   Staff_Employee_updateDoc,
 } from "@/utils/staff/Staff_Employee_API";// API
 import {
   Card,
   CardContent,
   CardDescription,
   CardFooter,
   CardHeader,
   CardTitle,
 } from "@/components/ui/card";
 import {
   Select,
   SelectContent,
   SelectItem,
   SelectTrigger,
   SelectValue,
 } from "@/components/ui/select";
 import { Textarea } from "@/components/ui/textarea";
 
 import { Label } from "@/components/ui/label";
 import { Input } from "@/components/ui/input";
 import { Button } from "@/components/ui/button";
 import { use, useEffect, useState } from "react";
 import {
   DialogClose,
   DialogContent,
   DialogDescription,
   DialogFooter,
   DialogHeader,
   DialogTitle,
 } from "@/components/ui/dialog";
 import { Separator } from "@/components/ui/separator";
 
 // const Inventory_FinalProduct_update = ({ UpdateId, currentData }: any) => {
 const Inventory_FinalProduct_update: React.FC<any> = (currentData) => {
   // get current month
   const currentMonth: string = new Date().toLocaleString("en-US", {
     month: "long",
   });
 
   console.log(currentData);
 
   // insert data
   const UpdateDoc: SubmitHandler<any> = async (data) => {
     await Staff_Employee_updateDoc(currentData._id, data);
   };
 
   // form validation and submission
   const {
     register,
     formState: { errors, isSubmitSuccessful },
     handleSubmit,
   } = useForm({
     defaultValues: {
       name: "",
       email: "",
       phoneNumber: "",
       address: "",
       position: "",
       department: "",
       dateJoined: "",
       month: "",
     },
   });
 
   return (
     <>
       <DialogHeader>
         <DialogTitle>Update Now.</DialogTitle>
         <DialogDescription>
           You are about to update this record.
         </DialogDescription>
       </DialogHeader>
       <Separator />
 
       <Card
         className={` m-3  ${
           errors.name ||
           errors.email ||
           errors.phoneNumber ||
           errors.address ||
           errors.position ||
           errors.department ||
           errors.dateJoined ||
           errors.month
             ? "bg-destructive/5 outline-1 outline-destructive"
             : null
         } ${isSubmitSuccessful ? "bg-primary/10 outline-1 outline-primary" : null}`}
       >
         <form onSubmit={handleSubmit(UpdateDoc)}>
           <CardContent>
             {/* name */}
             <div className="flex flex-col space-y-1.5">
               <Label>Name</Label>
               <Input
                 {...register("name", {
                   required: "Name is required",
                 })}
               />
               {errors.name && (
                 <span className="text-destructive text-sm">
                   {errors.name.message}
                 </span>
               )}
             </div>
 
             {/* email */}
             <div className="flex flex-col space-y-1.5">
               <Label>E-mail</Label>
               <Input
                 {...register("email", {
                   required: "Email is required",
                   pattern: {
                     value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                     message: "Enter a valid email address",
                   },
                 })}
               />
               {errors.email && (
                 <span className="text-destructive text-sm">
                   {errors.email.message}
                 </span>
               )}
             </div>
 
             {/* Phone Number*/}
             <div className="flex flex-col space-y-1.5">
               <Label>Phone Number</Label>
               <Input
                 {...register("phoneNumber", {
                   required: "Phone number is required",
                   pattern: {
                     value: /^[0-9]{10}$/,
                     message: "Enter a valid 10-digit phone number",
                   },
                 })}
               />
               {errors.phoneNumber && (
                 <span className="text-destructive text-sm">
                   {errors.phoneNumber.message}
                 </span>
               )}
             </div>
 
            {/* Address */}
            <div className="flex flex-col space-y-1.5">
            <Label>Address</Label>
            <Input
                type="text"
                {...register("address", {
                required: "Address is required",
                minLength: {
                    value: 5,
                    message: "Address must be at least 5 characters",
                },
                maxLength: {
                    value: 100,
                    message: "Address cannot exceed 100 characters",
                },
                })}
            />
            {errors.address && (
                <span className="text-destructive text-sm">
                {errors.address.message}
                </span>
            )}
            </div>

 
            {/* Position */}
<div className="flex flex-col space-y-1.5">
  <Label>Position</Label>
  <Input
    type="text"
    {...register("position", {
      required: "Position is required",
      minLength: {
        value: 2,
        message: "Position must be at least 2 characters",
      },
      maxLength: {
        value: 50,
        message: "Position cannot exceed 50 characters",
      },
      pattern: {
        value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        message: "Enter a valid email address",
      },
    })}
  />
  {errors.position && (
    <span className="text-destructive text-sm">
      {errors.position.message}
    </span>
  )}
</div>

{/* Department */}
<div className="flex flex-col space-y-1.5">
  <Label>Department</Label>
  <Input
    type="text"
    {...register("department", {
      required: "Department is required",
      minLength: {
        value: 2,
        message: "Department must be at least 2 characters",
      },
      maxLength: {
        value: 50,
        message: "Department cannot exceed 50 characters",
      },
      pattern: {
        value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        message: "Enter a valid email address",
      },
    })}
  />
  {errors.department && (
    <span className="text-destructive text-sm">
      {errors.department.message}
    </span>
  )}
</div>

{/* Joined Date */}
<div className="flex flex-col space-y-1.5">
  <Label>Joined Date</Label>
  <Input
    type="date"
    {...register("dateJoined", {
      required: "Joined Date is required",
    })}
  />
  {errors.dateJoined && (
    <span className="text-destructive text-sm">
      {errors.dateJoined.message}
    </span>
  )}
</div>

{/* Month */}
<div className="flex flex-col space-y-1.5">
  <Label>Month</Label>
  <Input
    type="text"
    {...register("month", {
      required: "Month is required",
      pattern: {
        value: /^(0?[1-9]|1[0-2])$/,
        message: "Enter a valid month (1-12)",
      },
    })}
  />
  {errors.month && (
    <span className="text-destructive text-sm">
      {errors.month.message}
    </span>
  )}
</div>

           </CardContent>
 
           <CardFooter className="flex flex-col">
             <Button
               type="submit"
               className={`cursor-pointer w-full ${
                errors.name ||
                errors.phoneNumber ||
                errors.address ||
                errors.position ||
                errors.department ||
                errors.dateJoined ||
                errors.month
                   ? "bg-destructive/50 hover:bg-destructive/70 cursor-not-allowed animate-pulse"
                   : null
               }`}
             >
               {isSubmitSuccessful ? "Updated" : "Update"}
             </Button>
           </CardFooter>
         </form>
         <DialogClose asChild>
           <div className="flex flex-col items-center w-full ">
             <Button
               variant="outline"
               className="my-2 mx-0.5 border-1 border-primary w-full"
             >
               Close
             </Button>
           </div>
         </DialogClose>
       </Card>
     </>
   );
 };
 
 export default Staff_Employee_update;