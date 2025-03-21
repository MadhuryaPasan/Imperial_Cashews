import { SubmitHandler, useForm } from "react-hook-form"; // form validation
import { quality_end_product_check_createNew, quality_end_product_check_updateDoc } from "@/utils/quality/quality_end_product_check"; // API
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
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const quality_end_product_check_Update:React.FC<any> = (currentData) => {
  // Get current timestamp
  const currentTimestamp = new Date();

  const UpdateDoc: SubmitHandler<any> = async (data) => {
    await quality_end_product_check_updateDoc(currentData._id, data);
  };

  // form validation and submission
  const {
    register,
    formState: { errors, isSubmitSuccessful },
    handleSubmit,
    setValue,
    watch,
  } = useForm({
    defaultValues: {
      batch_id: "",
      product_grade: "Standard",
      color_uniformity: "Good",
      taste_test: "Passed",
      packaging_integrity: "Good",
      approved: true,
      checked_by: "",
      timestamp: currentTimestamp,
    },
  });

  // Watch the approved value for the checkbox
  const approvedValue = watch("approved");

  // Handle checkbox change
  const handleApprovedChange = (checked: boolean) => {
    setValue("approved", checked);
  };

  return (
    <>
      <div>
        <form>
          <Card className={`md:w-[50vw] p-[25px] lg:w-[30vw] ${
            Object.keys(errors).length > 0
              ? "bg-destructive/5 outline-1 outline-destructive"
              : null
          } ${
            isSubmitSuccessful ? "bg-primary/10 outline-1 outline-primary" : null
          }`}>
            <CardHeader>
              <CardTitle>Quality Control Check</CardTitle>
              <CardDescription>Enter product quality check details</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Batch ID */}
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="batch_id">Batch ID</Label>
                <Input
                  id="batch_id"
                  placeholder="Enter batch ID"
                  {...register("batch_id", {
                    required: "Batch ID is required",
                    pattern: {
                      value: /^[A-Za-z0-9-_]+$/i,
                      message: "Only alphanumeric characters, hyphens and underscores",
                    },
                  })}
                />
                {errors.batch_id && (
                  <span className="text-destructive text-sm">
                    {errors.batch_id.message}
                  </span>
                )}
              </div>

              {/* Product Grade */}
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="product_grade">Product Grade</Label>
                <Select 
                  defaultValue="Standard" 
                  onValueChange={(value) => setValue("product_grade", value)}
                >
                  <SelectTrigger id="product_grade">
                    <SelectValue placeholder="Select product grade" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Premium">Premium</SelectItem>
                    <SelectItem value="Standard">Standard</SelectItem>
                    <SelectItem value="Economy">Economy</SelectItem>
                  </SelectContent>
                </Select>
                <input
                  type="hidden"
                  {...register("product_grade", {
                    required: "Product grade is required",
                  })}
                />
                {errors.product_grade && (
                  <span className="text-destructive text-sm">
                    {errors.product_grade.message}
                  </span>
                )}
              </div>

              {/* Color Uniformity */}
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="color_uniformity">Color Uniformity</Label>
                <Select 
                  defaultValue="Good" 
                  onValueChange={(value) => setValue("color_uniformity", value)}
                >
                  <SelectTrigger id="color_uniformity">
                    <SelectValue placeholder="Select color uniformity" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Excellent">Excellent</SelectItem>
                    <SelectItem value="Good">Good</SelectItem>
                    <SelectItem value="Fair">Fair</SelectItem>
                    <SelectItem value="Poor">Poor</SelectItem>
                  </SelectContent>
                </Select>
                <input
                  type="hidden"
                  {...register("color_uniformity", {
                    required: "Color uniformity is required",
                  })}
                />
                {errors.color_uniformity && (
                  <span className="text-destructive text-sm">
                    {errors.color_uniformity.message}
                  </span>
                )}
              </div>

              {/* Taste Test */}
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="taste_test">Taste Test</Label>
                <Select 
                  defaultValue="Passed" 
                  onValueChange={(value) => setValue("taste_test", value)}
                >
                  <SelectTrigger id="taste_test">
                    <SelectValue placeholder="Select taste test result" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Passed">Passed</SelectItem>
                    <SelectItem value="Failed">Failed</SelectItem>
                  </SelectContent>
                </Select>
                <input
                  type="hidden"
                  {...register("taste_test", {
                    required: "Taste test result is required",
                  })}
                />
                {errors.taste_test && (
                  <span className="text-destructive text-sm">
                    {errors.taste_test.message}
                  </span>
                )}
              </div>

              {/* Packaging Integrity */}
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="packaging_integrity">Packaging Integrity</Label>
                <Select 
                  defaultValue="Good" 
                  onValueChange={(value) => setValue("packaging_integrity", value)}
                >
                  <SelectTrigger id="packaging_integrity">
                    <SelectValue placeholder="Select packaging integrity" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Excellent">Excellent</SelectItem>
                    <SelectItem value="Good">Good</SelectItem>
                    <SelectItem value="Fair">Fair</SelectItem>
                    <SelectItem value="Poor">Poor</SelectItem>
                  </SelectContent>
                </Select>
                <input
                  type="hidden"
                  {...register("packaging_integrity", {
                    required: "Packaging integrity is required",
                  })}
                />
                {errors.packaging_integrity && (
                  <span className="text-destructive text-sm">
                    {errors.packaging_integrity.message}
                  </span>
                )}
              </div>

              {/* Checked By */}
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="checked_by">Checked By</Label>
                <Input
                  id="checked_by"
                  placeholder="Enter inspector name"
                  {...register("checked_by", {
                    required: "Inspector name is required",
                    minLength: {
                      value: 3,
                      message: "Name should be at least 3 characters",
                    },
                    pattern: {
                      value: /^[A-Za-z0-9 ]+$/i,
                      message: "Only alphanumeric characters and spaces",
                    },
                  })}
                />
                {errors.checked_by && (
                  <span className="text-destructive text-sm">
                    {errors.checked_by.message}
                  </span>
                )}
              </div>

              {/* Approved */}
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="approved" 
                  checked={approvedValue}
                  onCheckedChange={handleApprovedChange}
                />
                <Label htmlFor="approved">Approve Quality Check</Label>
                <input
                  type="hidden"
                  {...register("approved")}
                />
              </div>

              {/* Timestamp - Hidden field */}
              <input
                type="hidden"
                {...register("timestamp")}
              />
            </CardContent>

            <CardFooter>
              <Button type="submit" className="w-full">
                {isSubmitSuccessful ? "Submitted" : "Submit Quality Check"}
              </Button>
            </CardFooter>
          </Card>
        </form>
      </div>
    </>
  );
};

export default quality_end_product_check_Update;