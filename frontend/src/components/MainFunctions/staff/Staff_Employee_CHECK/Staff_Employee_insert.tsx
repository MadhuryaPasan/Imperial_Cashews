import { SubmitHandler, useForm } from "react-hook-form"; // form validation
 import { Staff_Employee_createNew } from "@/utils/staff/Staff_Employee_API"; // API
 import {
   Card,
   CardContent,
   CardDescription,
   CardFooter,
   CardHeader,
   CardTitle,
 } from "@/components/ui/card";
 import { Textarea } from "@/components/ui/textarea";
 import { Label } from "@/components/ui/label";
 import { Input } from "@/components/ui/input";
 import { Button } from "@/components/ui/button";
 
 const Staff_Employee_insert = () => {
   // get current month
   const currentMonth: string = new Date().toLocaleString("en-US", {
     month: "long",
   });
 
   // insert data
   const CreateDoc: SubmitHandler<any> = async (data) => {
     await Staff_Employee_createNew(data);
   };
 
   // form validation and submission
   const {
     register,
     formState: { errors, isSubmitSuccessful },
     handleSubmit,
   } = useForm({
     defaultValues: {
        category: "",
        name: "",
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
       <div className="">
         <form onSubmit={handleSubmit(CreateDoc)}>
           <Card
             className={`md:w-[50vw] p-[25px] lg:w-[30vw]  ${
                errors.name ||
                errors.phoneNumber ||
                errors.address ||
                errors.position ||
                errors.department ||
                errors.dateJoined ||
                errors.month
                 ? "bg-destructive/5 outline-1 outline-destructive"
                 : ""
             } ${isSubmitSuccessful ? "bg-primary/10 outline-1 outline-primary" : ""}`}
           >
             <CardHeader>
               <CardTitle>Insert Employee</CardTitle>
               <CardDescription>Insert new Employee</CardDescription>
             </CardHeader>
             <CardContent>

               {/* Name */}
               <div className="flex flex-col space-y-1.5">
                 <Label></Label>
                 <Input type ="text"{...register("name", { required: "Name is required" })} />
                 {errors.name  && <span className="text-destructive text-sm">{errors.name .message}</span>}
               </div>

               {/* Weight */}
               <div className="flex flex-col space-y-1.5">
                 <Label>Weight</Label>
                 <Input type="number" {...register("weight", { required: "Weight is required" })} />
                 {errors.weight && <span className="text-destructive text-sm">{errors.weight.message}</span>}
               </div>
               
               {/* Phone Number */}
               <div className="flex flex-col space-y-1.5">
                 <Label>Phone Number</Label>
                 <Input type="tel" {...register("phoneNumber", { required: "Phone number is required" })} />
                 {errors.phoneNumber && <span className="text-destructive text-sm">{errors.phoneNumber.message}</span>}
               </div>

               {/* Manufacturer Date */}
               <div className="flex flex-col space-y-1.5">
                 <Label>Manufacturer Date</Label>
                 <Input type="date" {...register("manufacturerDate", { required: "Manufacturer Date is required" })} />
                 {errors.manufacturerDate && <span className="text-destructive text-sm">{errors.manufacturerDate.message}</span>}
               </div>
               {/* Expiry Date */}
               <div className="flex flex-col space-y-1.5">
                 <Label>Expire Date</Label>
                 <Input type="date" {...register("ExpireDate", { required: "Expire Date is required" })} />
                 {errors.ExpireDate && <span className="text-destructive text-sm">{errors.ExpireDate.message}</span>}
               </div>
               {/* Package Count */}
               <div className="flex flex-col space-y-1.5">
                 <Label>Package Count</Label>
                 <Input type="number" {...register("PackageCount", { required: "Package Count is required" })} />
                 {errors.PackageCount && <span className="text-destructive text-sm">{errors.PackageCount.message}</span>}
               </div>
             </CardContent>
 
             <CardFooter>
               <Button className="w-full" type="submit">
                 {isSubmitSuccessful ? "Submitted" : "Submit"}
               </Button>
             </CardFooter>
           </Card>
         </form>
       </div>
     </>
   );
 };
 
 export default Inventory_FinalProduct_insert;