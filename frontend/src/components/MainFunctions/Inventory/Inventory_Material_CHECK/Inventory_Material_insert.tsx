// Inventory_Material

/* sellerName
"a.abaya"
buyerName
"b.gunawardhene"
materialName
"raw"
quantity
"5KG"
getPrice
"1000.00"
inventoryLocation
"section 01"
getDate */

import { SubmitHandler, useForm } from "react-hook-form"; // form validation
import { Inventory_Material_createNew } from "@/utils/inventory/Inventory_Material_API"; // API
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




const Inventory_Material_insert = () => {
  // get current month
  const currentMonth: string = new Date().toLocaleString("en-US", {
    month: "long",
  });

  // insert data
  const CreateDoc: SubmitHandler<any> = async (data) => {
    await Inventory_Material_createNew(data);
    // wait for 1 seconds
    // await new Promise((resolve) => setTimeout(resolve, 1000));
    // reload the page
    // window.location.reload();
  };

  // form validation and submission

  const {
    register,
    formState: { errors, isSubmitSuccessful },
    handleSubmit,
  } = useForm({
    defaultValues: {
        sellerName: null,buyerName: null, materialName: null, quantity: null, inventoryLocation: null,
    },
  });

  return (
    <>
      <div className=" ]">
        <form onSubmit={handleSubmit(CreateDoc)}>
          <Card className={` ${
            errors.sellerName|| errors.buyerName || errors.materialName || errors.quantity || errors.inventoryLocation 
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
    type="number" // Ensures only numbers are entered
    {...register("quantity", {
      required: "Quantity is required",
      min: {
       value: 1,
        message: "Quantity should be at least 1",
      },
      max: {
       value: 100000,
        message: "Quantity should be at most 100000",
      },
      pattern: {
        value: /^[0-9]+$/, // Only allows numbers
        message: "Only numbers are allowed",
      },
    })}
  />
</div>

                <div>

                {errors.quantity && (
                  <span className="text-destructive text-sm">
                    {errors.quantity.message}
                  </span>
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

           

            </CardContent>

            <CardFooter>
              <Button className="w-full">
                {isSubmitSuccessful ? "Submitted" : "Submit"}
              </Button>
            </CardFooter>
          </Card>
        </form>
      </div>
    </>
  );
};

export default Inventory_Material_insert;
