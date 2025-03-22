import { SubmitHandler, useForm } from "react-hook-form"; // form validation
import {
  Inventory_RawMaterial_createNew,
  Inventory_RawMaterial_getDoc,
  Inventory_RawMaterial_updateDoc,
} from "@/utils/inventory/Inventory_RawMaterial_API";// API
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

const Inventory_RawMaterial_update: React.FC<any> = (currentData) => {
  const UpdateDoc: SubmitHandler<any> = async (data) => {
    await Inventory_RawMaterial_updateDoc(currentData._id, data);
  };

  const {
    register,
    formState: { errors, isSubmitSuccessful },
    handleSubmit,
  } = useForm({
    defaultValues: {
      buyerName: "",
      sellerName: "",
      price: "",
      weight: "",
      getDate: "",
      expireDate: "",
      location: "",
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

      <Card className={` m-3 ${errors.buyerName || errors.sellerName || errors.price || errors.weight || errors.getDate || errors.expireDate || errors.location ? "bg-destructive/5 outline-1 outline-destructive" : ""} ${isSubmitSuccessful ? "bg-primary/10 outline-1 outline-primary" : ""}`}>
        <form onSubmit={handleSubmit(UpdateDoc)}>
          <CardContent>
            <div className="flex flex-col space-y-1.5">
              <Label>Buyer Name</Label>
              <Input {...register("buyerName", { required: "Buyer Name is required" })} />
              {errors.buyerName && <span className="text-destructive text-sm">{errors.buyerName.message}</span>}
            </div>
            
            <div className="flex flex-col space-y-1.5">
              <Label>Seller Name</Label>
              <Input {...register("sellerName", { required: "Seller Name is required" })} />
              {errors.sellerName && <span className="text-destructive text-sm">{errors.sellerName.message}</span>}
            </div>
            
            <div className="flex flex-col space-y-1.5">
              <Label>Price (Rs.)</Label>
              <Input {...register("price", { required: "Price is required", pattern: { value: /^[0-9]+$/i, message: "Only numbers" } })} />
              {errors.price && <span className="text-destructive text-sm">{errors.price.message}</span>}
            </div>

            <div className="flex flex-col space-y-1.5">
              <Label>Weight (Kg)</Label>
              <Input {...register("weight", { required: "Weight is required", pattern: { value: /^[0-9]+(\.[0-9]{1,2})?$/i, message: "Enter a valid weight" } })} />
              {errors.weight && <span className="text-destructive text-sm">{errors.weight.message}</span>}
            </div>

            <div className="flex flex-col space-y-1.5">
              <Label>Get Date</Label>
              <Input type="date" {...register("getDate", { required: "Get Date is required" })} />
              {errors.getDate && <span className="text-destructive text-sm">{errors.getDate.message}</span>}
            </div>

            <div className="flex flex-col space-y-1.5">
              <Label>Expire Date</Label>
              <Input type="date" {...register("expireDate", { required: "Expire Date is required" })} />
              {errors.expireDate && <span className="text-destructive text-sm">{errors.expireDate.message}</span>}
            </div>

            <div className="flex flex-col space-y-1.5">
              <Label>Location</Label>
              <Input {...register("location", { required: "Location is required" })} />
              {errors.location && <span className="text-destructive text-sm">{errors.location.message}</span>}
            </div>
          </CardContent>
          <CardFooter className="flex flex-col">
            <Button
              type="submit"
              className={`cursor-pointer w-full ${
                errors.buyerName || errors.sellerName || errors.price || errors.weight || errors.getDate || errors.expireDate || errors.location
                  ? "bg-destructive/50 hover:bg-destructive/70 cursor-not-allowed animate-pulse"
                  : null
              }`}
              // {...(currentType === "Replenishment" && {
              //   disabled: true,
              //   className: "bg-destructive/50 w-full",
              // })}
            >
              {isSubmitSuccessful ? "Updated" : "update"}
            </Button>
            </CardFooter>
        </form>
        <DialogClose asChild>
          <div className="flex flex-col items-center w-full ">
            <Button variant="outline" className="my-2 mx-0.5 border-1 border-primary w-full">Close</Button>
          </div>
        </DialogClose>
      </Card>
    </>
  );
};

export default Inventory_RawMaterial_update;
