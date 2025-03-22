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
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const quality_iso_sls_check_Insert = () => {
  // insert data
  const CreateDoc: SubmitHandler<any> = async (data) => {
    await quality_iso_sls_check_createNew(data);
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
      iso_certified: false,
      sls_certified: false,
      last_audit_date: "",
      next_audit_date: "",
      inspector: "",
      remarks: "",
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
              <CardTitle>ISO/SLS Quality Check</CardTitle>
              <CardDescription>Enter ISO/SLS quality check details</CardDescription>
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
                <Input id="last_audit_date" type="date" {...register("last_audit_date", { required: "Last audit date is required" })} />
                {errors.last_audit_date && (
                  <span className="text-destructive text-sm">{errors.last_audit_date.message}</span>
                )}
              </div>

              {/* Next Audit Date */}
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="next_audit_date">Next Audit Date</Label>
                <Input id="next_audit_date" type="date" {...register("next_audit_date", { required: "Next audit date is required" })} />
                {errors.next_audit_date && (
                  <span className="text-destructive text-sm">{errors.next_audit_date.message}</span>
                )}
              </div>

              {/* Inspector */}
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="inspector">Inspector</Label>
                <Input
                  id="inspector"
                  placeholder="Enter inspector name"
                  {...register("inspector", { required: "Inspector name is required" })}
                />
                {errors.inspector && (
                  <span className="text-destructive text-sm">{errors.inspector.message}</span>
                )}
              </div>

              {/* Remarks */}
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="remarks">Remarks</Label>
                <Input
                  id="remarks"
                  placeholder="Enter remarks"
                  {...register("remarks")}
                />
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

export default quality_iso_sls_check_Insert;
