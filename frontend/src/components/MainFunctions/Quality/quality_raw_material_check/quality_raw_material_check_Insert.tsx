import React from 'react'
import { Button } from "@/components/ui/button";
import { SubmitHandler, useForm } from "react-hook-form";
import { createNew } from "@/utils/dbAPI";

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
  // Insert data
  const CreateDoc: SubmitHandler<any> = async (data) => {
    await createNew({ collection: "quality_raw_material_check", data });
    window.location.reload();
  };

  const {
    register,
    formState: { errors, isSubmitSuccessful },
    handleSubmit,
  } = useForm({
    defaultValues: {
      batch_id: "",
      moisture_content: "",
      foreign_materials: "",
      size_uniformity: "",
      overall_quality: "",
      inspected_by: "",
      timestamp: "",
    },
  });

  return (
    <div>
      <form onSubmit={handleSubmit(CreateDoc)}>
        <Card className={`${errors.batch_id || errors.moisture_content || errors.foreign_materials || errors.size_uniformity || errors.overall_quality || errors.inspected_by || errors.timestamp ? "bg-destructive/5 outline-1 outline-destructive" : ""} ${isSubmitSuccessful ? "bg-primary/5 outline-1 outline-primary" : ""}`}>
          <CardHeader>
            <CardTitle>Insert Quality Check</CardTitle>
            <CardDescription>Insert new raw material quality check data</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="batch_id">Batch ID</Label>
                <Input
                  placeholder="Insert Batch ID"
                  {...register("batch_id", { required: "Batch ID is required" })}
                />
                {errors.batch_id && <span className="text-destructive">{errors.batch_id.message}</span>}
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="moisture_content">Moisture Content</Label>
                <Input
                  placeholder="Moisture Content (%)"
                  {...register("moisture_content", { required: "Moisture content is required" })}
                />
                {errors.moisture_content && <span className="text-destructive">{errors.moisture_content.message}</span>}
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="foreign_materials">Foreign Materials</Label>
                <Input
                  placeholder="Foreign Materials"
                  {...register("foreign_materials", { required: "Foreign materials field is required" })}
                />
                {errors.foreign_materials && <span className="text-destructive">{errors.foreign_materials.message}</span>}
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="size_uniformity">Size Uniformity</Label>
                <Input
                  placeholder="Size Uniformity"
                  {...register("size_uniformity", { required: "Size uniformity is required" })}
                />
                {errors.size_uniformity && <span className="text-destructive">{errors.size_uniformity.message}</span>}
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="overall_quality">Overall Quality</Label>
                <Input
                  placeholder="Overall Quality"
                  {...register("overall_quality", { required: "Overall quality is required" })}
                />
                {errors.overall_quality && <span className="text-destructive">{errors.overall_quality.message}</span>}
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="inspected_by">Inspected By</Label>
                <Input
                  placeholder="Inspector's Name"
                  {...register("inspected_by", { required: "Inspector name is required" })}
                />
                {errors.inspected_by && <span className="text-destructive">{errors.inspected_by.message}</span>}
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button
              className={`cursor-pointer w-full ${errors.batch_id || errors.moisture_content || errors.foreign_materials || errors.size_uniformity || errors.overall_quality || errors.inspected_by ? "bg-destructive/50 hover:bg-destructive/70 cursor-not-allowed animate-pulse" : ""}`}
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
