import { SubmitHandler, useForm } from "react-hook-form"; // form validation
import {
  Inventory_Material_getDoc,
  Inventory_Material_updateDoc,
} from "@/utils/inventory/Inventory_Material_API"; // API
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
import { useEffect, useState } from "react";





const Inventory_Material_Update: React.FC<any> = (currentData) => {
  // get current month
  const currentMonth: string = new Date().toLocaleString("en-US", {
    month: "long",
  });

  const updateId = currentData.currentData;

  // get data according to this id
  const [data, setData] = useState<any>();
  useEffect(() => {
    async function loadPost() {
      try {
        let result = await Inventory_Material_getDoc(updateId);
        if (result) {
          setData(result);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
    loadPost();
  }, []);

  //asign data to temp variable

  const UpdateDoc: SubmitHandler<any> = async (data) => {
    await Inventory_Material_updateDoc(updateId, data);
  };

  let sellerName: string = data?.sellerName;
  let buyerName: string = data?.buyerName;
  let materialName: string = data?.materialName;
  let quantity: string = data?.quantity;
  let getPrice: string = data?.getPrice;
  let inventoryLocation: string = data?.inventoryLocation;
  let getDate: string = data?.getDate;

  const {
    register,
    formState: { errors, isSubmitSuccessful },
    handleSubmit,
  } = useForm({
    defaultValues: {
      sellerName:sellerName,
      buyerName:buyerName,
      materialName:materialName,
      quantity:quantity,
      getPrice:getPrice,
      inventoryLocation:inventoryLocation,
      getDate:getDate,
    },
  });

  return (
    <>
      <div>
        {data ? (
         <div className=" ]">
         <form onSubmit={handleSubmit(UpdateDoc)}>
           <Card className={` ${
             errors.sellerName|| errors.buyerName || errors.materialName || errors.quantity || errors.getPrice || errors.inventoryLocation || errors.getDate
               ? "bg-destructive/5 outline-1 outline-destructive"
               : null
           } ${
             isSubmitSuccessful ? "bg-primary/10 outline-1 outline-primary" : null
           }`}>
             <CardHeader>
               <CardTitle>Insert Material</CardTitle>
               <CardDescription>Insert Material in Stock</CardDescription>
             </CardHeader>
             <CardContent>
 
                { /*sellerName*/ }
 
                <div className="flex flex-col space-y-1.5">
               <Label htmlFor="sellerName">Seller Name</Label>
               <Input
                 id="sellerName"
                 placeholder="Insert Name"
                 {...register("sellerName", {
                   required: "Name is required",
                   minLength: { value: 2, message: "Name must be at least 2 characters long" },
                   maxLength: { value: 50, message: "Name cannot exceed 50 characters" },
                   pattern: {
                     value: /^[A-Za-z\s'-]{2,50}$/i,
                     message: "Please enter a valid name (only letters, spaces, apostrophes, and hyphens, between 2 to 50 characters)",
                   },
                 })}
                 {...(isSubmitSuccessful ? { disabled: true } : {})}
               />
               {errors.sellerName && (
                 <span className="text-destructive">{errors.sellerName.message}</span>
               )}
             </div>
 
               {/*buyerName */}
               <div className="flex flex-col space-y-1.5">
               <Label htmlFor="buyerName">Buyer Name</Label>
               <Input
                 id="buyerName"
                 placeholder="Insert Name"
                 {...register("buyerName", {
                   required: "Name is required",
                   minLength: { value: 2, message: "Name must be at least 2 characters long" },
                   maxLength: { value: 50, message: "Name cannot exceed 50 characters" },
                   pattern: {
                     value: /^[A-Za-z\s'-]{2,50}$/i,
                     message: "Please enter a valid name (only letters, spaces, apostrophes, and hyphens, between 2 to 50 characters)",
                   },
                 })}
                 {...(isSubmitSuccessful ? { disabled: true } : {})}
               />
               {errors.buyerName && (
                 <span className="text-destructive">{errors.buyerName.message}</span>
               )}
             </div>
 
               {/* materialName*/}
               <div className="flex flex-col space-y-1.5">
               <Label htmlFor="materialName"> Material Name</Label>
               <Input
                 id="materialName"
                 placeholder="Insert Name"
                 {...register("materialName", {
                   required: "Name is required",
                   minLength: { value: 2, message: "Name must be at least 2 characters long" },
                   maxLength: { value: 50, message: "Name cannot exceed 50 characters" },
                   pattern: {
                     value: /^[A-Za-z\s'-]{2,50}$/i,
                     message: "Please enter a valid name (only letters, spaces, apostrophes, and hyphens, between 2 to 50 characters)",
                   },
                 })}
                 {...(isSubmitSuccessful ? { disabled: true } : {})}
               />
               {errors.materialName && (
                 <span className="text-destructive">{errors.materialName.message}</span>
               )}
             </div>
 
               {/* quantity */}
               <div className="flex flex-col space-y-1.5">
                 <Label htmlFor="quantity">Quantity</Label>
                 <Input
                 id="quantity"
                 placeholder="Insert quantity"
                   {...register("quantity", {
                     required: "quantity is required",
                     min: {
                       value: 1,
                       message: "quantity should be at least 1",
                     },
                     max: {
                       value: 1000,
                       message: "quantity should be at most 1000",
                     },
                     pattern: {
                         value: /^[A-Za-z\s'-]{2,20}$/i,
                         message: "Please enter a valid name (only letters, spaces, apostrophes, and hyphens, between 2 to 50 characters)",
                     },
                   })}
                 />
 
                 {errors.quantity && (
                   <span className="text-destructive text-sm">
                     {errors.quantity.message}
                   </span>
                 )}
               </div>
 
                 {/*getPrice*/}
 
               <div className="flex flex-col space-y-1.5">
               <Label htmlFor="getPrice">Get Price</Label>
               <Input
                 id="getPrice"
                 placeholder="Insert getPrice"
                 {...register("getPrice", {
                   required: "getPrice is required",
 
                   pattern: {
                     value: /^\d+(\.\d{1,2})?$/,
                     message: "Please enter a valid getPrice  (positive numbers with up to two decimal places)",
                   },
                 })}
                 {...(isSubmitSuccessful ? { disabled: true } : {})}
               />
               {errors.getPrice && (
                 <span className="text-destructive">{errors.getPrice.message}</span>
               )}
             </div>
 
             {/*inventoryLocation*/}
             <div className="flex flex-col space-y-1.5">
              <Label htmlFor="inventoryLocation">Inventory Location</Label>
              <select
              id="inventoryLocation"
              className="border rounded-md p-2"
              {...register("inventoryLocation", {
               required: "Inventory location is required",
               validate: (value) =>
                 ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"].includes(String(value)) ||
                  "Please select a valid section (1-10)"
 
                 })}
                   {...(isSubmitSuccessful ? { disabled: true } : {})}
                   >
                  <option value="">Select Section</option>
                  {[...Array(10)].map((_, index) => (
                     <option key={index + 1} value={index + 1}>
                    Section {index + 1}
                    </option>
                     ))}
                     </select>
                      {errors.inventoryLocation && (
                      <span className="text-destructive">{errors.inventoryLocation.message}</span>
                        )}
                      </div>
 
             {/*getDate*/}
             <div className="flex flex-col space-y-1.5">
            <Label htmlFor="getDate">Buy Date</Label>
                <Input
                 id="getDate"
                 type="date"
                className="border rounded-md p-2"
                 {...register("getDate", {
                 required: "Buy date is required",
                 validate: (value) => {
                 if (!value) return "Buy date is required";
                 const selectedDate = new Date(value);
                 const today = new Date();
                 today.setHours(0, 0, 0, 0); // Normalize today's date to avoid time discrepancies
                  return selectedDate <= today || "Future dates are not allowed";
                  },
                  })}
                  {...(isSubmitSuccessful ? { disabled: true } : {})}
                       />
                  {errors.getDate && (
                   <span className="text-destructive">{errors.getDate.message}</span>
                    )}
                  </div>
 
 
             </CardContent>
 
             <CardFooter>
               <Button className="w-full">
                 {isSubmitSuccessful ? "Submitted" : "Submit"}
               </Button>
             </CardFooter>
           </Card>
         </form>
       </div>
        ) : (
          "Loading..."
        )}
      </div>
    </>
  );
};

export default Inventory_Material_Update;