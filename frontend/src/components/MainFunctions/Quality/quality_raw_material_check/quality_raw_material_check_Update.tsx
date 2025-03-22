import { SubmitHandler, useForm } from "react-hook-form";
import { quality_raw_material_check_createNew, quality_raw_material_check_updateDoc } from "@/utils/quality/quality_raw_material_check";
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
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const QualityRawMaterialCheckUpdate: React.FC<any> = (currentData) => {
  // Get current timestamp
  const currentTimestamp = new Date();

  const UpdateDoc: SubmitHandler<any> = async (data) => {
    await quality_raw_material_check_updateDoc(currentData._id, data);
  };

  // Form validation and submission
  const {
    register,
    formState: { errors, isSubmitSuccessful },
    handleSubmit,
    setValue,
  } = useForm({
    defaultValues: {
      supplier_id: "",
      material_type: "Cashew Nuts",
      size_category: "Medium",
      moisture_level: "",
      timestamp: currentTimestamp,
    },
  });

  return (
    <div>
      <form onSubmit={handleSubmit(UpdateDoc)}>
        <Card className="md:w-[50vw] p-[25px] lg:w-[30vw]">
          <CardHeader>
            <CardTitle>Raw Material Quality Check</CardTitle>
            <CardDescription>Enter raw material quality details</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Supplier ID */}
            <div className="flex flex-col space-y-1.5">
              <label htmlFor="supplier_id">Supplier ID</label>
              <Input
                id="supplier_id"
                placeholder="Enter supplier ID"
                {...register("supplier_id", { required: "Supplier ID is required" })}
              />
              {errors.supplier_id && <span className="text-red-500">{errors.supplier_id.message}</span>}
            </div>

            {/* Material Type */}
            <div className="flex flex-col space-y-1.5">
              <label htmlFor="material_type">Material Type</label>
              <Input
                id="material_type"
                disabled
                value="Cashew Nuts"
                {...register("material_type")}
              />
            </div>

            {/* Size Category */}
            <div className="flex flex-col space-y-1.5">
              <label htmlFor="size_category">Size Category</label>
              <Select
                defaultValue="Medium"
                onValueChange={(value) => setValue("size_category", value)}
              >
                <SelectTrigger id="size_category">
                  <SelectValue placeholder="Select size category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Small">Small</SelectItem>
                  <SelectItem value="Medium">Medium</SelectItem>
                  <SelectItem value="Large">Large</SelectItem>
                </SelectContent>
              </Select>
              <input type="hidden" {...register("size_category", { required: "Size category is required" })} />
              {errors.size_category && <span className="text-red-500">{errors.size_category.message}</span>}
            </div>

            {/* Moisture Level */}
            <div className="flex flex-col space-y-1.5">
              <label htmlFor="moisture_level">Moisture Level (%)</label>
              <Input
                id="moisture_level"
                type="number"
                placeholder="Enter moisture level"
                {...register("moisture_level", { required: "Moisture level is required" })}
              />
              {errors.moisture_level && <span className="text-red-500">{errors.moisture_level.message}</span>}
            </div>
          </CardContent>

          <CardFooter>
            <Button type="submit" className="w-full">
              {isSubmitSuccessful ? "Submitted" : "Submit Quality Check"}
            </Button>
          </CardFooter>
        </Card>
      </form>
    </div>
  );
};

export default QualityRawMaterialCheckUpdate;
