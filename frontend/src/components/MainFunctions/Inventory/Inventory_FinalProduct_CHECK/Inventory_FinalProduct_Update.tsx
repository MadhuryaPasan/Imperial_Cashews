import { SubmitHandler, useForm } from "react-hook-form"; // form validation
import {
  Inventory_FinalProduct_createNew,
  Inventory_FinalProduct_getDoc,
  Inventory_FinalProduct_updateDoc,
} from "@/utils/inventory/Inventory_FinalProduct_API";// API
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
    await Inventory_FinalProduct_updateDoc(currentData._id, data);
  };

  // form validation and submission
  const {
    register,
    formState: { errors, isSubmitSuccessful },
    handleSubmit,
  } = useForm({
    defaultValues: {
      category: "",
      price: "",
      weight: "",
      manufacturerDate: "",
      ExpireDate: "",
      PackageCount: "",
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
          errors.category ||
          errors.price ||
          errors.weight ||
          errors.manufacturerDate ||
          errors.ExpireDate ||
          errors.PackageCount
            ? "bg-destructive/5 outline-1 outline-destructive"
            : null
        } ${isSubmitSuccessful ? "bg-primary/10 outline-1 outline-primary" : null}`}
      >
        <form onSubmit={handleSubmit(UpdateDoc)}>
          <CardContent>
            {/* Category */}
            <div className="flex flex-col space-y-1.5">
              <Label>Category</Label>
              <Input
                {...register("category", {
                  required: "Category is required",
                })}
              />
              {errors.category && (
                <span className="text-destructive text-sm">
                  {errors.category.message}
                </span>
              )}
            </div>

            {/* Price */}
            <div className="flex flex-col space-y-1.5">
              <Label>Price (Rs.)</Label>
              <Input
                {...register("price", {
                  required: "Price is required",
                  pattern: {
                    value: /^[0-9]+$/i,
                    message: "Only numbers",
                  },
                })}
              />
              {errors.price && (
                <span className="text-destructive text-sm">
                  {errors.price.message}
                </span>
              )}
            </div>

            {/* Weight */}
            <div className="flex flex-col space-y-1.5">
              <Label>Weight (Kg)</Label>
              <Input
                {...register("weight", {
                  required: "Weight is required",
                  pattern: {
                    value: /^[0-9]+(\.[0-9]{1,2})?$/i,
                    message: "Enter a valid weight",
                  },
                })}
              />
              {errors.weight && (
                <span className="text-destructive text-sm">
                  {errors.weight.message}
                </span>
              )}
            </div>

            {/* Manufacturer Date */}
            <div className="flex flex-col space-y-1.5">
              <Label>Manufacturer Date</Label>
              <Input
                type="date"
                {...register("manufacturerDate", {
                  required: "Manufacturer Date is required",
                })}
              />
              {errors.manufacturerDate && (
                <span className="text-destructive text-sm">
                  {errors.manufacturerDate.message}
                </span>
              )}
            </div>

            {/* Expire Date */}
            <div className="flex flex-col space-y-1.5">
              <Label>Expire Date</Label>
              <Input
                type="date"
                {...register("ExpireDate", {
                  required: "Expire Date is required",
                })}
              />
              {errors.ExpireDate && (
                <span className="text-destructive text-sm">
                  {errors.ExpireDate.message}
                </span>
              )}
            </div>

            {/* Package Count */}
            <div className="flex flex-col space-y-1.5">
              <Label>Package Count</Label>
              <Input
                {...register("PackageCount", {
                  required: "Package Count is required",
                  pattern: {
                    value: /^[0-9]+$/i,
                    message: "Only numbers",
                  },
                })}
              />
              {errors.PackageCount && (
                <span className="text-destructive text-sm">
                  {errors.PackageCount.message}
                </span>
              )}
            </div>
          </CardContent>

          <CardFooter className="flex flex-col">
            <Button
              type="submit"
              className={`cursor-pointer w-full ${
                errors.category ||
                errors.price ||
                errors.weight ||
                errors.manufacturerDate ||
                errors.ExpireDate ||
                errors.PackageCount
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

export default Inventory_FinalProduct_update;
