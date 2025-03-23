import { SubmitHandler, useForm } from "react-hook-form"; // form validation // API
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
import { quality_raw_material_check_getDoc, quality_raw_material_check_updateDoc } from "@/utils/quality/quality_raw_material_check_Api";  // Assume correct import for your collection API

const quality_raw_material_check_Update: React.FC<any> = (currentData) => {
  const updateId = currentData.currentData;

  // Get data according to this id
  const [data, setData] = useState<any>();
  useEffect(() => {
    async function loadPost() {
      try {
        let result = await quality_raw_material_check_getDoc(updateId); // Assuming function to get the specific document
        if (result) {
          setData(result);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
    loadPost();
  }, [updateId]);

  // Assign data to temp variables
  const UpdateDoc: SubmitHandler<any> = async (data) => {
    await quality_raw_material_check_updateDoc(updateId, data); // Update API call with the document ID
  };

  let batch_id: string = data?.batch_id;
  let moisture_content: string = data?.moisture_content;
  let foreign_materials: string = data?.foreign_materials;
  let size_uniformity: string = data?.size_uniformity;
  let overall_quality: string = data?.overall_quality;
  let inspected_by: string = data?.inspected_by;

  const {
    register,
    formState: { errors, isSubmitSuccessful },
    handleSubmit,
  } = useForm({
    defaultValues: {
      batch_id,
      moisture_content,
      foreign_materials,
      size_uniformity,
      overall_quality,
      inspected_by,
    },
  });

  return (
    <div>
      {data ? (
        <form onSubmit={handleSubmit(UpdateDoc)}>
          <Card
            className={`${errors.batch_id || errors.moisture_content || errors.foreign_materials || errors.size_uniformity || errors.overall_quality || errors.inspected_by
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
                  {errors.batch_id && <span className="text-destructive">{errors.batch_id.message}</span>}
                </div>
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="moisture_content">Moisture Content</Label>
                  <Input
                    defaultValue={moisture_content}
                    placeholder="Moisture Content"
                    {...register("moisture_content", { required: "Moisture content is required" })}
                  />
                  {errors.moisture_content && <span className="text-destructive">{errors.moisture_content.message}</span>}
                </div>
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="foreign_materials">Foreign Materials</Label>
                  <Input
                    defaultValue={foreign_materials}
                    placeholder="Foreign Materials"
                    {...register("foreign_materials", { required: "Foreign materials field is required" })}
                  />
                  {errors.foreign_materials && <span className="text-destructive">{errors.foreign_materials.message}</span>}
                </div>
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="size_uniformity">Size Uniformity</Label>
                  <Input
                    defaultValue={size_uniformity}
                    placeholder="Size Uniformity"
                    {...register("size_uniformity", { required: "Size uniformity is required" })}
                  />
                  {errors.size_uniformity && <span className="text-destructive">{errors.size_uniformity.message}</span>}
                </div>
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="overall_quality">Overall Quality</Label>
                  <Input
                    defaultValue={overall_quality}
                    placeholder="Overall Quality"
                    {...register("overall_quality", { required: "Overall quality is required" })}
                  />
                  {errors.overall_quality && <span className="text-destructive">{errors.overall_quality.message}</span>}
                </div>
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="inspected_by">Inspected By</Label>
                  <Input
                    defaultValue={inspected_by}
                    placeholder="Inspector's Name"
                    {...register("inspected_by", { required: "Inspector name is required" })}
                  />
                  {errors.inspected_by && <span className="text-destructive">{errors.inspected_by.message}</span>}
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button
                className={`cursor-pointer w-full ${errors.batch_id || errors.moisture_content || errors.foreign_materials || errors.size_uniformity || errors.overall_quality || errors.inspected_by
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
