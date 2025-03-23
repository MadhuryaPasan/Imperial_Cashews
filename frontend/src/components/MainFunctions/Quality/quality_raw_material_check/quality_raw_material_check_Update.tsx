
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
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";

import { quality_raw_material_check_getDoc, quality_raw_material_check_updateDoc } from "@/utils/quality/quality_raw_material_check_Api"; 

const quality_raw_material_check_Update: React.FC<any> = (currentData) => {
  const {
    register,
    formState: { errors, isSubmitSuccessful },
    handleSubmit,
    reset,
  } = useForm();

  const updateId = currentData.currentData;

  // Get data according to this id
  const [data, setData] = useState<any>();
  useEffect(() => {
    async function loadPost() {
      try {
        let result = await quality_raw_material_check_getDoc(updateId);
        if (result) {
          setData(result);
          reset(result);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
    loadPost();
  }, [updateId, reset]);

  // Assign data to temp variables
  const UpdateDoc: SubmitHandler<any> = async (data: any) => {
    await quality_raw_material_check_updateDoc(updateId, data);
  };

  

  let batch_id: string = data?.batch_id;
  let supplier_id: string = data?.supplier_id;
  let material_type: string = data?.material_type;
  let size_category: string = data?.size_category;
  let moisture_level: number = data?.moisture_level;
  let foreign_objects_detected: boolean = data?.foreign_objects_detected;
  let color: string = data?.color;
  let broken_percentage: number = data?.broken_percentage;
  let checked_by: string = data?.checked_by;
  return (
      <div>
        {data ? (
          <form onSubmit={handleSubmit(UpdateDoc)}>
            <Card
              className={`${errors.batch_id || errors.supplier_id || errors.material_type || errors.size_category || errors.moisture_level || errors.foreign_objects_detected || errors.color || errors.broken_percentage || errors.checked_by
                ? "bg-destructive/5 outline-1 outline-destructive"
                : ""
                } ${isSubmitSuccessful ? "bg-primary/5 outline-1 outline-primary" : ""}`}
            >
              <CardHeader>
                <CardTitle>Update Quality Raw Material Check</CardTitle>
                <CardDescription>Update data for the raw material quality check</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid w-full items-center gap-4">
                  <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="batch_id">Batch ID</Label>
                    <Input
                      defaultValue={batch_id}
                      placeholder="Batch ID"
                      {...register("batch_id", { required: "Batch ID is required" })}
                    />
                    {errors.batch_id && <span className="text-destructive">{String(errors.batch_id.message)}</span>}
                  </div>
  
                  <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="supplier_id">Supplier ID</Label>
                    <Input
                      defaultValue={supplier_id}
                      placeholder="Supplier ID"
                      {...register("supplier_id", { required: "Supplier ID is required" })}
                    />
                    {errors.supplier_id && <span className="text-destructive">{String(errors.supplier_id.message)}</span>}
                  </div>
  
                  <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="material_type">Material Type</Label>
                    <Input
                      defaultValue={material_type}
                      placeholder="Material Type"
                      {...register("material_type", { required: "Material type is required" })}
                    />
                    {errors.material_type && <span className="text-destructive">{String(errors.material_type.message)}</span>}
                  </div>
  
                  <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="size_category">Size Category</Label>
                    <Input
                      defaultValue={size_category}
                      placeholder="Size Category"
                      {...register("size_category", { required: "Size category is required" })}
                    />
                    {errors.size_category && <span className="text-destructive">{String(errors.size_category.message)}</span>}
                  </div>
  
                  <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="moisture_level">Moisture Level</Label>
                    <Input
                      defaultValue={moisture_level}
                      placeholder="Moisture Level"
                      {...register("moisture_level", { required: "Moisture level is required" })}
                    />
                    {errors.moisture_level && <span className="text-destructive">{String(errors.moisture_level.message)}</span>}
                  </div>
  
                  <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="foreign_objects_detected">Foreign Objects Detected</Label>
                    <Input
                      defaultValue={foreign_objects_detected.toString()}
                      placeholder="True or False"
                      {...register("foreign_objects_detected", { required: "Foreign objects field is required" })}
                    />
                    {errors.foreign_objects_detected && <span className="text-destructive">{String(errors.foreign_objects_detected.message)}</span>}
                  </div>
  
                  <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="color">Color</Label>
                    <Input
                      defaultValue={color}
                      placeholder="Color"
                      {...register("color", { required: "Color is required" })}
                    />
                    {errors.color && <span className="text-destructive">{String(errors.color.message)}</span>}
                  </div>
  
                  <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="broken_percentage">Broken Percentage</Label>
                    <Input
                      defaultValue={broken_percentage}
                      placeholder="Broken Percentage"
                      {...register("broken_percentage", { required: "Broken percentage is required" })}
                    />
                    {errors.broken_percentage && <span className="text-destructive">{String(errors.broken_percentage.message)}</span>}
                  </div>
  
                  <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="checked_by">Checked By</Label>
                    <Input
                      defaultValue={checked_by}
                      placeholder="Checked By"
                      {...register("checked_by", { required: "Inspector's name is required" })}
                    />
                    {errors.checked_by && <span className="text-destructive">{String(errors.checked_by.message)}</span>}
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button
                  className={`cursor-pointer w-full ${errors.batch_id || errors.supplier_id || errors.material_type || errors.size_category || errors.moisture_level || errors.foreign_objects_detected || errors.color || errors.broken_percentage || errors.checked_by
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
        ) : (
          "Loading..."
        )}
      </div>
  );
};

export default quality_raw_material_check_Update;
import { SubmitHandler, useForm as useReactHookForm } from "react-hook-form";

function useForm() {
  return useReactHookForm();
}
// Removed duplicate implementation of useForm

