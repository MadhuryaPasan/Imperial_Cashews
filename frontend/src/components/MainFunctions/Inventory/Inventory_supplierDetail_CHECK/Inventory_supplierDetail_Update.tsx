import { SubmitHandler, useForm } from "react-hook-form"; // form validation
import {
  Inventory_supplierDetail_getDoc,
  Inventory_supplierDetail_updateDoc,
} from "@/utils/inventory/Inventory_supplierDetail_API";// API
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





const Inventory_supplierDetail_Update: React.FC<any> = (currentData) => {
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
        let result = await Inventory_supplierDetail_getDoc(updateId);
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
  await Inventory_supplierDetail_updateDoc(updateId, data);
  };

  let  supplierName: string = data?. supplierName;
  let address: string = data?.address;
  let phoneNumber1: string = data?.phoneNumber1;
  let phoneNumber2: string = data?.phoneNumber2;
  let email: string = data?.email;
  let supplierMaterial: string = data?.supplierMaterial;
  let leadTime: string = data?.leadTime;

  const {
    register,
    formState: { errors, isSubmitSuccessful },
    handleSubmit,
  } = useForm({
    defaultValues: {
     /*1*/ supplierName: supplierName,
    /*2*/ address: address,
    /*3*/ phoneNumber1: phoneNumber1,
    /*4*/ phoneNumber2 : phoneNumber2,
    /*5*/ email: email,                    
    /*6*/ supplierMaterial: supplierMaterial,
           leadTime:leadTime
    },
  });


  return (
  
    <div>
       {data ? (
     <div className="">
        <form onSubmit={handleSubmit(UpdateDoc)}>
          <Card
            className={` ${
              errors.supplierName ||
              errors.address ||
              errors.phoneNumber1 ||
              errors.phoneNumber2 ||
              errors.email ||
              errors.supplierMaterial ||
              errors.leadTime
                ? "bg-destructive/5 outline-1 outline-destructive"
                : ""
            } ${isSubmitSuccessful ? "bg-primary/10 outline-1 outline-primary" : ""}`}
          >
            <CardHeader>
              <CardTitle>Insert Final product</CardTitle>
              <CardDescription>Insert new final product</CardDescription>
            </CardHeader>
            <CardContent>

              {/*supplierName*/}
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="supplierName"> Suplier Name</Label>
              <Input
                id="supplierName"
                placeholder="Insert Name"
                {...register("supplierName", {
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
              {errors.supplierName && (
                <span className="text-destructive">{errors.supplierName.message}</span>
              )}
            </div>
           
            {/*address*/}
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="address">Address</Label>
              <Input

                placeholder="Insert Address"
                {...register("address", {
                  required: "Address is required",
                  minLength: { value: 5, message: "Minimum 5 characters" },
                  maxLength: {
                    value: 100,
                    message: "maximum 100 characters",
                  },
                  pattern: {
                    value: /^[A-Za-z0-9\s,.-/#]+$/i,
                    message: "Please enter a valid address."

                  },
                })}
                {...(isSubmitSuccessful ? { disabled: true } : {})}
              />
              {errors.address && (
                <span className="text-destructive">
                  {errors.address.message}
                </span>
              )}
              </div>
              {/*phone number 1 */}
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="phoneNumber1">Phone Number 1</Label>
              <Input

                placeholder="phoneNumber1"
                {...register("phoneNumber1", {
                  required: "Phone Number is required",

                  pattern: {
                    value: /^\+?\d{1,4}?[-.\s]?\(?\d{2,4}?\)?[-.\s]?\d{3,4}[-.\s]?\d{3,6}$/i,
                    message: "Please enter a valid phone number (7 to 15 digits)."

                  },
                })}
                {...(isSubmitSuccessful ? { disabled: true } : {})}
              />
              {errors.phoneNumber1 && (
                <span className="text-destructive">
                  {errors.phoneNumber1.message}
                </span>
              )}
            </div>

             {/*phone number 2 */}
             <div className="flex flex-col space-y-1.5">
              <Label htmlFor="phoneNumber2">Phone Number 1</Label>
              <Input

                placeholder="phoneNumber2"
                {...register("phoneNumber2", {
                  required: "Phone Number is required",

                  pattern: {
                    value: /^\+?\d{1,4}?[-.\s]?\(?\d{2,4}?\)?[-.\s]?\d{3,4}[-.\s]?\d{3,6}$/i,
                    message: "Please enter a valid phone number (7 to 15 digits)."

                  },
                })}
                {...(isSubmitSuccessful ? { disabled: true } : {})}
              />
              {errors.phoneNumber2 && (
                <span className="text-destructive">
                  {errors.phoneNumber2.message}
                </span>
              )}
            </div>

                 {/*Email*/}
                 <div className="flex flex-col space-y-1.5">
              <Label htmlFor="email">Email</Label>
              <Input

                placeholder="Insert Email"
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[\w\.-]+@[\w\.-]+\.\w{2,}$/i,
                    message: "Please enter a valid email address.",
                  },
                })}
                {...(isSubmitSuccessful ? { disabled: true } : {})}
              />
              {errors.email && (
                <span className="text-destructive">{errors.email.message}</span>
              )}
            </div>

            {/*supplier material*/}
          
<div className="flex flex-col space-y-1.5">
  <Label htmlFor="supplierMaterial">Supplier Material</Label>
  <Input
    id="supplierMaterial"
    placeholder="Enter supplier material"
    {...register("supplierMaterial", {
      required: "Supplier material is required",
      minLength: { value: 3, message: "Must be at least 3 characters long" },
      maxLength: { value: 100, message: "Cannot exceed 100 characters" },
      pattern: {
        value: /^[A-Za-z0-9\s.,;!?'"-]{3,100}$/i,
        message: "Please enter a valid material name",
      },
    })}
  />
  {errors.supplierMaterial && (
    <span className="text-destructive">{errors.supplierMaterial.message}</span>
  )}
</div>



             {/*lead time*/}
             <div className="flex flex-col space-y-1.5">
              <Label htmlFor="leadTime">Lead time</Label>
              <Input
                id="leadTime"
                placeholder="leadTime"
                {...register("leadTime", {
                  required: "leadTime is required",
                  min: { value: 1, message: "leadTime must be at least 1" },
                  max: { value: 100, message: "leadTime count cannot exceed 366" },
                  pattern: {
                    value: /^\d+$/i,
                    message: "Please enter a valid leadTime (only positive whole numbers)",
                  },
                })}
                {...(isSubmitSuccessful ? { disabled: true } : {})}
              />
              {errors.leadTime && (
                <span className="text-destructive">{errors.leadTime.message}</span>
              )}
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

        ) : (
          "Loading..."
        )}
    </div>
  );
};

export default Inventory_supplierDetail_Update;