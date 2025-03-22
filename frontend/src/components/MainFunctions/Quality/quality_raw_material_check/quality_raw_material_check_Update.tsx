import { SubmitHandler, useForm } from "react-hook-form";
import { quality_raw_material_check_updateDoc } from "@/utils/quality/quality_raw_material_check_Api";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

const QualityRawMaterialCheckUpdate: React.FC<any> = ({ currentData }) => {
  // Form handling
  const {
    register,
    formState: { errors, isSubmitSuccessful },
    handleSubmit,
    // Removed unused setValue
  } = useForm({
    defaultValues: {
      batch_id: currentData?.batch_id || "",
      moisture_content: currentData?.moisture_content || "",
      foreign_material: currentData?.foreign_material || "",
      raw_color: currentData?.raw_color || "",
      odor: currentData?.odor || "",
      inspected_by: currentData?.inspected_by || "",
    },
  });

  const UpdateDoc: SubmitHandler<any> = async (data) => {
    await quality_raw_material_check_updateDoc(currentData._id, data);
  };

  return (
    <form onSubmit={handleSubmit(UpdateDoc)}>
      <Card
        className={`md:w-[50vw] p-[25px] lg:w-[30vw] ${
          Object.keys(errors).length > 0
            ? "bg-destructive/5 outline-1 outline-destructive"
            : ""
        } ${isSubmitSuccessful ? "bg-primary/10 outline-1 outline-primary" : ""}`}
      >
        <CardHeader>
          <CardTitle>Update Raw Material Quality Check</CardTitle>
          <CardDescription>Modify raw material inspection details</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Batch ID */}
          <div className="flex flex-col space-y-1.5">
            <Label htmlFor="batch_id">Batch ID</Label>
            <Input
              id="batch_id"
              {...register("batch_id", { required: "Batch ID is required" })}
            />
            {errors.batch_id && (
              <span className="text-destructive text-sm">{errors.batch_id?.message?.toString()}</span>
            )}
          </div>

          {/* Moisture Content */}
          <div className="flex flex-col space-y-1.5">
            <Label htmlFor="moisture_content">Moisture Content (%)</Label>
            <Input
              id="moisture_content"
              type="number"
              step="0.01"
              {...register("moisture_content", { required: "Moisture content is required" })}
            />
            {errors.moisture_content && (
              <span className="text-destructive text-sm">{errors.moisture_content?.message?.toString()}</span>
            )}
          </div>

          {/* Foreign Material */}
          <div className="flex flex-col space-y-1.5">
            <Label htmlFor="foreign_material">Foreign Material (%)</Label>
            <Input
              id="foreign_material"
              type="number"
              step="0.01"
              {...register("foreign_material", { required: "Foreign material percentage is required" })}
            />
            {errors.foreign_material && (
              <span className="text-destructive text-sm">{errors.foreign_material?.message?.toString()}</span>
            )}
          </div>

          {/* Raw Color */}
          <div className="flex flex-col space-y-1.5">
            <Label htmlFor="raw_color">Raw Color</Label>
            <Input
              id="raw_color"
              {...register("raw_color", { required: "Raw color is required" })}
            />
            {errors.raw_color && (
              <span className="text-destructive text-sm">{errors.raw_color?.message?.toString()}</span>
            )}
          </div>

          {/* Odor */}
          <div className="flex flex-col space-y-1.5">
            <Label htmlFor="odor">Odor</Label>
            <Input
              id="odor"
              {...register("odor", { required: "Odor description is required" })}
            />
            {errors.odor && (
              <span className="text-destructive text-sm">{errors.odor?.message?.toString()}</span>
            )}
          </div>

          {/* Inspected By */}
          <div className="flex flex-col space-y-1.5">
            <Label htmlFor="inspected_by">Inspected By</Label>
            <Input
              id="inspected_by"
              {...register("inspected_by", { required: "Inspector name is required" })}
            />
            {errors.inspected_by && (
              <span className="text-destructive text-sm">{errors.inspected_by?.message?.toString()}</span>
            )}
          </div>
        </CardContent>
        <CardFooter>
          <Button type="submit" className="w-full">
            {isSubmitSuccessful ? "Updated Successfully" : "Update Quality Check"}
          </Button>
        </CardFooter>
      </Card>
    </form>
  );
};

export default QualityRawMaterialCheckUpdate;
