import { SubmitHandler, useForm } from "react-hook-form"; // form validation 
import { quality_raw_material_check_createNew } from "@/utils/quality/quality_raw_material_check_Api"; // API
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const quality_raw_material_check_Insert = () => {
  // insert data
  const CreateDoc: SubmitHandler<any> = async (data) => {
    await quality_raw_material_check_createNew(data);
  };

  // form validation and submission
  const {
    register,
    formState: { errors, isSubmitSuccessful },
    handleSubmit,
  } = useForm({
    defaultValues: {
      batch_id: "",
      supplier_id: "",
      material_type: "",
      size_category: "",
      moisture_level: "",
      foreign_objects_detected: false,
      color: "",
      broken_percentage: "",
      checked_by: "",
      timestamp: new Date().toISOString(),
    },
  });

  return (
    <>
      <div>
        <form onSubmit={handleSubmit(CreateDoc)}>
          <Card className={`md:w-[50vw] p-[25px] lg:w-[30vw] ${
            Object.keys(errors).length > 0
              ? "bg-destructive/5 outline-1 outline-destructive"
              : null
          } ${
            isSubmitSuccessful ? "bg-primary/10 outline-1 outline-primary" : null
          }`}>
            <CardHeader>
              <CardTitle>Raw Material Quality Check</CardTitle>
              <CardDescription>Enter raw material quality check details</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Batch ID */}
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="batch_id">Batch ID</Label>
                <Input
                  id="batch_id"
                  placeholder="Enter batch ID"
                  {...register("batch_id", { required: "Batch ID is required" })}
                />
                {errors.batch_id && (
                  <span className="text-destructive text-sm">{errors.batch_id.message}</span>
                )}
              </div>

              {/* Supplier ID */}
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="supplier_id">Supplier ID</Label>
                <Input
                  id="supplier_id"
                  placeholder="Enter supplier ID"
                  {...register("supplier_id", { required: "Supplier ID is required" })}
                />
                {errors.supplier_id && (
                  <span className="text-destructive text-sm">{errors.supplier_id.message}</span>
                )}
              </div>

              {/* Material Type */}
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="material_type">Material Type</Label>
                <Input
                  id="material_type"
                  placeholder="Enter material type"
                  {...register("material_type", { required: "Material type is required" })}
                />
                {errors.material_type && (
                  <span className="text-destructive text-sm">{errors.material_type.message}</span>
                )}
              </div>

              {/* Size Category */}
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="size_category">Size Category</Label>
                <Input
                  id="size_category"
                  placeholder="Enter size category"
                  {...register("size_category", { required: "Size category is required" })}
                />
                {errors.size_category && (
                  <span className="text-destructive text-sm">{errors.size_category.message}</span>
                )}
              </div>

              {/* Moisture Level */}
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="moisture_level">Moisture Level (%)</Label>
                <Input id="moisture_level" type="number" step="0.1" {...register("moisture_level", { required: "Moisture level is required" })} />
                {errors.moisture_level && (
                  <span className="text-destructive text-sm">{errors.moisture_level.message}</span>
                )}
              </div>

              {/* Foreign Objects Detected */}
              <div className="flex items-center space-x-2">
                <Checkbox id="foreign_objects_detected" {...register("foreign_objects_detected")} />
                <Label htmlFor="foreign_objects_detected">Foreign Objects Detected</Label>
              </div>

              {/* Color */}
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="color">Color</Label>
                <Input
                  id="color"
                  placeholder="Enter color"
                  {...register("color", { required: "Color is required" })}
                />
                {errors.color && (
                  <span className="text-destructive text-sm">{errors.color.message}</span>
                )}
              </div>

              {/* Broken Percentage */}
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="broken_percentage">Broken Percentage (%)</Label>
                <Input id="broken_percentage" type="number" step="0.1" {...register("broken_percentage", { required: "Broken percentage is required" })} />
                {errors.broken_percentage && (
                  <span className="text-destructive text-sm">{errors.broken_percentage.message}</span>
                )}
              </div>

              {/* Checked By */}
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="checked_by">Checked By</Label>
                <Input
                  id="checked_by"
                  placeholder="Enter inspector name"
                  {...register("checked_by", { required: "Inspector name is required" })}
                />
                {errors.checked_by && (
                  <span className="text-destructive text-sm">{errors.checked_by.message}</span>
                )}
              </div>
            </CardContent>

            <CardFooter>
              <Button type="submit" className="w-full" {...(isSubmitSuccessful ? { disabled: true } : {})}>
                {isSubmitSuccessful ? "Submitted" : "Submit Quality Check"}
              </Button>
            </CardFooter>
          </Card>
        </form>
      </div>
    </>
  );
};

export default quality_raw_material_check_Insert;
