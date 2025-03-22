import { SubmitHandler, useForm } from "react-hook-form"; // form validation
import {
  Inventory_Stock_createNew,
  Inventory_Stock_getDoc,
  Inventory_Stock_updateDoc,
} from "@/utils/inventory/Inventory_Stock_API"; // API
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

const Inventory_Stock_update: React.FC<any> = (currentData) => {
  const UpdateDoc: SubmitHandler<any> = async (data) => {
    await Inventory_Stock_updateDoc(currentData._id, data);
  };

  const {
    register,
    formState: { errors, isSubmitSuccessful },
    handleSubmit,
  } = useForm({
    defaultValues: {
      itemName: "Raw Cashew Nut",
      category: "Raw Material",
      minStock: "100KG",
      maxStock: "500kg",
      reorderLevel: "50kg",
      currentStock: "75kg",
      lastUpdateTime: "2025.03.21 - 11.30 AM",
    },
  });

  return (
    <>
      <DialogHeader>
        <DialogTitle>Update Stock Information</DialogTitle>
        <DialogDescription>
          You are about to update the stock information for this item.
        </DialogDescription>
      </DialogHeader>
      <Separator />

      <Card
        className={`m-3 ${
          errors.itemName ||
          errors.category ||
          errors.minStock ||
          errors.maxStock ||
          errors.reorderLevel ||
          errors.currentStock ||
          errors.lastUpdateTime
            ? "bg-destructive/5 outline-1 outline-destructive"
            : ""
        } ${isSubmitSuccessful ? "bg-primary/10 outline-1 outline-primary" : ""}`}
      >
        <form onSubmit={handleSubmit(UpdateDoc)}>
          <CardContent>
            <div className="flex flex-col space-y-1.5">
              <Label>Item Name</Label>
              <Input
                {...register("itemName", { required: "Item Name is required" })}
                disabled
              />
              {errors.itemName && (
                <span className="text-destructive text-sm">{errors.itemName.message}</span>
              )}
            </div>

            <div className="flex flex-col space-y-1.5">
              <Label>Category</Label>
              <Input
                {...register("category", { required: "Category is required" })}
                disabled
              />
              {errors.category && (
                <span className="text-destructive text-sm">{errors.category.message}</span>
              )}
            </div>

            <div className="flex flex-col space-y-1.5">
              <Label>Minimum Stock</Label>
              <Input
                {...register("minStock", { required: "Minimum Stock is required" })}
              />
              {errors.minStock && (
                <span className="text-destructive text-sm">{errors.minStock.message}</span>
              )}
            </div>

            <div className="flex flex-col space-y-1.5">
              <Label>Maximum Stock</Label>
              <Input
                {...register("maxStock", { required: "Maximum Stock is required" })}
              />
              {errors.maxStock && (
                <span className="text-destructive text-sm">{errors.maxStock.message}</span>
              )}
            </div>

            <div className="flex flex-col space-y-1.5">
              <Label>Reorder Level</Label>
              <Input
                {...register("reorderLevel", { required: "Reorder Level is required" })}
              />
              {errors.reorderLevel && (
                <span className="text-destructive text-sm">{errors.reorderLevel.message}</span>
              )}
            </div>

            <div className="flex flex-col space-y-1.5">
              <Label>Current Stock</Label>
              <Input
                {...register("currentStock", { required: "Current Stock is required" })}
              />
              {errors.currentStock && (
                <span className="text-destructive text-sm">{errors.currentStock.message}</span>
              )}
            </div>

            <div className="flex flex-col space-y-1.5">
              <Label>Last Update Time</Label>
              <Input
                {...register("lastUpdateTime", { required: "Last Update Time is required" })}
              />
              {errors.lastUpdateTime && (
                <span className="text-destructive text-sm">{errors.lastUpdateTime.message}</span>
              )}
            </div>
          </CardContent>
          <CardFooter className="flex flex-col">
            <Button
              type="submit"
              className={`cursor-pointer w-full ${
                errors.itemName ||
                errors.category ||
                errors.minStock ||
                errors.maxStock ||
                errors.reorderLevel ||
                errors.currentStock ||
                errors.lastUpdateTime
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
            <Button variant="outline" className="my-2 mx-0.5 border-1 border-primary w-full">
              Close
            </Button>
          </div>
        </DialogClose>
      </Card>
    </>
  );
};

export default Inventory_Stock_update;
