import React from "react";
import { Button } from "@/components/ui/button";
import { SubmitHandler, useForm } from "react-hook-form";
import { quality_raw_material_check_createNew, quality_raw_material_check_updateDoc } from "@/utils/quality/quality_raw_material_check_Api";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

const quality_raw_material_check_Insert = () => {
  const CreateDoc: SubmitHandler<any> = async (data) => {
    if (data.id) {
      // If an ID exists, perform an update
      await quality_raw_material_check_updateDoc(data.id, data);
    } else {
      // Otherwise, perform an insert
      await quality_raw_material_check_createNew({ collection: "quality_raw_material_check", data });
    }
    window.location.reload();
  };

  const {
    register,
    formState: { errors, isSubmitSuccessful },
    handleSubmit,
  } = useForm({
    defaultValues: {
      id: "", // Add an ID field for update operations
      batch_id: "",
      supplier_id: "",
      material_type: "",
      size_category: "",
      moisture_level: "",
      foreign_objects_detected: "",
      color: "",
      broken_percentage: "",
      checked_by: "",
      timestamp: "",
    },
  });

  return (
    <div>
      <form onSubmit={handleSubmit(CreateDoc)}>
        <Card
          className={`${
            errors.batch_id ||
            errors.supplier_id ||
            errors.material_type ||
            errors.size_category ||
            errors.moisture_level ||
            errors.foreign_objects_detected ||
            errors.color ||
            errors.broken_percentage ||
            errors.checked_by ||
            errors.timestamp
              ? "bg-destructive/5 outline-1 outline-destructive"
              : ""
          } ${isSubmitSuccessful ? "bg-primary/5 outline-1 outline-primary" : ""}`}
        >
          <CardHeader>
            <CardTitle>Insert Quality Check</CardTitle>
            <CardDescription>Insert new raw material quality check data</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="id">ID (for updates)</Label>
                <Input
                  placeholder="Leave empty for new entry"
                  {...register("id")}
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="batch_id">Batch ID</Label>
                <Input
                  placeholder="660f14c9eebf3f76b3a1a234"
                  {...register("batch_id", { required: "Batch ID is required" })}
                />
                {errors.batch_id && (
                  <span className="text-destructive">{errors.batch_id.message}</span>
                )}
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="supplier_id">Supplier ID</Label>
                <Input
                  placeholder="SUP456"
                  {...register("supplier_id", { required: "Supplier ID is required" })}
                />
                {errors.supplier_id && (
                  <span className="text-destructive">{errors.supplier_id.message}</span>
                )}
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="material_type">Material Type</Label>
                <Input
                  placeholder="Cashew Nuts"
                  {...register("material_type", { required: "Material type is required" })}
                />
                {errors.material_type && (
                  <span className="text-destructive">{errors.material_type.message}</span>
                )}
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="size_category">Size Category</Label>
                <Input
                  placeholder="Medium"
                  {...register("size_category", { required: "Size category is required" })}
                />
                {errors.size_category && (
                  <span className="text-destructive">{errors.size_category.message}</span>
                )}
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="moisture_level">Moisture Level</Label>
                <Input
                  placeholder="5.2"
                  {...register("moisture_level", { required: "Moisture level is required" })}
                />
                {errors.moisture_level && (
                  <span className="text-destructive">{errors.moisture_level.message}</span>
                )}
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="foreign_objects_detected">Foreign Objects Detected</Label>
                <Input
                  placeholder="true / false"
                  {...register("foreign_objects_detected", {
                    required: "Field is required",
                  })}
                />
                {errors.foreign_objects_detected && (
                  <span className="text-destructive">
                    {errors.foreign_objects_detected.message}
                  </span>
                )}
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="color">Color</Label>
                <Input
                  placeholder="Light Brown"
                  {...register("color", { required: "Color is required" })}
                />
                {errors.color && (
                  <span className="text-destructive">{errors.color.message}</span>
                )}
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="broken_percentage">Broken Percentage</Label>
                <Input
                  placeholder="2.1"
                  {...register("broken_percentage", {
                    required: "Broken percentage is required",
                  })}
                />
                {errors.broken_percentage && (
                  <span className="text-destructive">
                    {errors.broken_percentage.message}
                  </span>
                )}
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="checked_by">Checked By</Label>
                <Input
                  placeholder="Quality Inspector 1"
                  {...register("checked_by", { required: "Inspector name is required" })}
                />
                {errors.checked_by && (
                  <span className="text-destructive">{errors.checked_by.message}</span>
                )}
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="timestamp">Timestamp</Label>
                <Input
                  type="datetime-local"
                  {...register("timestamp", { required: "Timestamp is required" })}
                />
                {errors.timestamp && (
                  <span className="text-destructive">{errors.timestamp.message}</span>
                )}
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button
              className={`cursor-pointer w-full ${
                errors.batch_id ||
                errors.supplier_id ||
                errors.material_type ||
                errors.size_category ||
                errors.moisture_level ||
                errors.foreign_objects_detected ||
                errors.color ||
                errors.broken_percentage ||
                errors.checked_by ||
                errors.timestamp
                  ? "bg-destructive/50 hover:bg-destructive/70 cursor-not-allowed animate-pulse"
                  : ""
              }`}
              type="submit"
              {...(isSubmitSuccessful ? { disabled: true } : {})}
            >
              {isSubmitSuccessful ? "Submitted" : "Submit"}
            </Button>
          </CardFooter>
        </Card>
      </form>
    </div>
  );
};

export default quality_raw_material_check_Insert;
