import { SubmitHandler, useForm } from "react-hook-form"; // form validation
import { quality_iso_sls_check_createNew } from "@/utils/quality/quality_iso_sls_check_Api"; // API
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
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";

const QualityIsoSlsCheckInsert = () => {
  // Get current timestamp
  const currentTimestamp = new Date();

  // Insert data
  const CreateDoc: SubmitHandler<any> = async (data) => {
    await quality_iso_sls_check_createNew(data);
  };

  // Form validation and submission
  const {
    register,
    formState: { errors, isSubmitSuccessful },
    handleSubmit,
    setValue,
    watch,
  } = useForm({
    defaultValues: {
      batch_id: "",
      iso_certified: false,
      sls_certified: false,
      last_audit_date: "",
      next_audit_date: "",
      inspector: "",
      remarks: "",
      timestamp: currentTimestamp,
    },
  });

  return (
    <div>
      <form onSubmit={handleSubmit(CreateDoc)}>
        <Card
          className={`md:w-[50vw] p-[25px] lg:w-[30vw] ${
            Object.keys(errors).length > 0
              ? "bg-destructive/5 outline-1 outline-destructive"
              : null
          } ${
            isSubmitSuccessful ? "bg-primary/10 outline-1 outline-primary" : null
          }`}
        >
          <CardHeader>
            <CardTitle>ISO & SLS Certification Check</CardTitle>
            <CardDescription>Enter quality certification details</CardDescription>
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
                    message: "Only alphanumeric characters, hyphens, and underscores",
                  },
                })}
              />
              {errors.batch_id && (
                <span className="text-destructive text-sm">
                  {errors.batch_id.message}
                </span>
              )}
            </div>

            {/* ISO Certified */}
            <div className="flex items-center space-x-2">
              <Checkbox id="iso_certified" {...register("iso_certified")} />
              <Label htmlFor="iso_certified">ISO Certified</Label>
            </div>

            {/* SLS Certified */}
            <div className="flex items-center space-x-2">
              <Checkbox id="sls_certified" {...register("sls_certified")} />
              <Label htmlFor="sls_certified">SLS Certified</Label>
            </div>

            {/* Last Audit Date */}
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="last_audit_date">Last Audit Date</Label>
              <Input
                type="date"
                id="last_audit_date"
                {...register("last_audit_date", {
                  required: "Last audit date is required",
                })}
              />
              {errors.last_audit_date && (
                <span className="text-destructive text-sm">
                  {errors.last_audit_date.message}
                </span>
              )}
            </div>

            {/* Next Audit Date */}
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="next_audit_date">Next Audit Date</Label>
              <Input
                type="date"
                id="next_audit_date"
                {...register("next_audit_date", {
                  required: "Next audit date is required",
                })}
              />
              {errors.next_audit_date && (
                <span className="text-destructive text-sm">
                  {errors.next_audit_date.message}
                </span>
              )}
            </div>

            {/* Inspector */}
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="inspector">Inspector</Label>
              <Input
                id="inspector"
                placeholder="Enter inspector name"
                {...register("inspector", {
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
              {errors.inspector && (
                <span className="text-destructive text-sm">
                  {errors.inspector.message}
                </span>
              )}
            </div>

            {/* Remarks */}
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="remarks">Remarks</Label>
              <Textarea
                id="remarks"
                placeholder="Enter remarks"
                {...register("remarks", {
                  required: "Remarks are required",
                })}
              />
              {errors.remarks && (
                <span className="text-destructive text-sm">
                  {errors.remarks.message}
                </span>
              )}
            </div>

            {/* Timestamp - Hidden field */}
            <input type="hidden" {...register("timestamp")} />
          </CardContent>

          <CardFooter>
            <Button type="submit" className="w-full" {...(isSubmitSuccessful ? { disabled: true } : {})}>
              {isSubmitSuccessful ? "Submitted" : "Submit Certification Check"}
            </Button>
          </CardFooter>
        </Card>
      </form>
    </div>
  );
};

export default QualityIsoSlsCheckInsert;
