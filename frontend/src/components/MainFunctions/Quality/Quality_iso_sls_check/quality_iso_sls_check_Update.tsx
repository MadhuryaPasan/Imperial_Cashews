import { SubmitHandler, useForm } from "react-hook-form"; // form validation
import {
  quality_iso_sls_check_getDoc,
  quality_iso_sls_check_updateDoc,
} from "@/utils/quality/quality_iso_sls_check_Api"; // API
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
import { DialogClose, DialogHeader, DialogDescription, DialogTitle } from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { useEffect } from "react";

const Quality_ISO_SLS_Check_Update: React.FC<any> = ({ currentData }) => {
  const UpdateDoc: SubmitHandler<any> = async (data) => {
    await quality_iso_sls_check_updateDoc(currentData._id, data);
  };

  const {
    register,
    formState: { errors, isSubmitSuccessful },
    handleSubmit,
    setValue,
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

  useEffect(() => {
    if (currentData) {
      setValue("batch_id", currentData.batch_id);
      setValue("iso_certified", currentData.iso_certified);
      setValue("sls_certified", currentData.sls_certified);
      setValue("last_audit_date", currentData.last_audit_date);
      setValue("next_audit_date", currentData.next_audit_date);
      setValue("inspector", currentData.inspector);
      setValue("remarks", currentData.remarks);
    }
  }, [currentData, setValue]);

  return (
    <>
      <DialogHeader>
        <DialogTitle>Update ISO/SLS Check</DialogTitle>
        <DialogDescription>
          Modify the quality check details for this batch.
        </DialogDescription>
      </DialogHeader>
      <Separator />
      <Card className="m-3">
        <form onSubmit={handleSubmit(UpdateDoc)}>
          <CardContent>
            <div className="flex flex-col space-y-1.5">
              <Label>Batch ID</Label>
              <Input disabled {...register("batch_id")} />
            </div>

            <div className="flex flex-col space-y-1.5">
              <Label>ISO Certified</Label>
              <Input type="checkbox" {...register("iso_certified")} />
            </div>

            <div className="flex flex-col space-y-1.5">
              <Label>SLS Certified</Label>
              <Input type="checkbox" {...register("sls_certified")} />
            </div>

            <div className="flex flex-col space-y-1.5">
              <Label>Last Audit Date</Label>
              <Input type="date" {...register("last_audit_date", { required: "Last audit date is required" })} />
              {errors.last_audit_date && <span className="text-destructive text-sm">{errors.last_audit_date.message}</span>}
            </div>

            <div className="flex flex-col space-y-1.5">
              <Label>Next Audit Date</Label>
              <Input type="date" {...register("next_audit_date", { required: "Next audit date is required" })} />
              {errors.next_audit_date && <span className="text-destructive text-sm">{errors.next_audit_date.message}</span>}
            </div>

            <div className="flex flex-col space-y-1.5">
              <Label>Inspector</Label>
              <Input {...register("inspector", { required: "Inspector name is required" })} />
              {errors.inspector && <span className="text-destructive text-sm">{errors.inspector.message}</span>}
            </div>

            <div className="flex flex-col space-y-1.5">
              <Label>Remarks</Label>
              <Input {...register("remarks")} />
            </div>
          </CardContent>
          <CardFooter className="flex flex-col">
            <Button type="submit" className="w-full">
              {isSubmitSuccessful ? "Updated" : "Update"}
            </Button>
            <DialogClose asChild>
              <Button variant="outline" className="my-2 mx-0.5 border-1 border-primary w-full">
                Close
              </Button>
            </DialogClose>
          </CardFooter>
        </form>
      </Card>
    </>
  );
};

export default Quality_ISO_SLS_Check_Update;
