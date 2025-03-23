import { Controller, SubmitHandler, useForm } from "react-hook-form"; // form validation
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
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import {  CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { Calendar } from "@/components/ui/calendar";

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
    control,

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
        <Card
          className={`${
            errors.batch_id || errors.iso_certified || errors.sls_certified || errors.last_audit_date || errors.next_audit_date || errors.inspector
              ? "bg-destructive/5 outline-1 outline-destructive"
              : null
          } ${
            isSubmitSuccessful
              ? "bg-primary/10 outline-1 outline-primary"
              : null
          }`}
        >
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
              <div className="flex flex-col space-y-1.5">
                <Checkbox id="iso_certified" {...register("iso_certified")} />
                <Label htmlFor="iso_certified">ISO Certified</Label>
              </div>

              {/* SLS Certified */}
              <div className="flex flex-col space-y-1.5">
                <Checkbox id="sls_certified" {...register("sls_certified")} />
                <Label htmlFor="sls_certified">SLS Certified</Label>
              </div>

              {/* Last Audit Date */}
              {/* <div className="flex flex-col space-y-1.5">
                <Label htmlFor="last_audit_date">Last Audit Date</Label>
                <Input id="last_audit_date" type="date" {...register("last_audit_date", { required: "Last audit date is required" })} />
                {errors.last_audit_date && (
                  <span className="text-destructive text-sm">{errors.last_audit_date.message}</span>
                )}
              </div> */}
              <div className="flex flex-col space-y-1.5">
              {/* Date Picker */}
              <Label>Last Audit Date</Label>
              <Controller
                name="last_audit_date"
                control={control}
                rules={{ required: "Date is required" }} // ✅ Add required validation
                render={({ field }) => (
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant={"outline"}
                        className=" justify-start text-left font-normal w-full"
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {field.value ? (
                          format(new Date(field.value), "PPP")
                        ) : (
                          <span>Pick a date</span>
                        )}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={
                          field.value ? new Date(field.value) : undefined
                        }
                        onSelect={(date) =>
                          field.onChange(
                            date ? format(date, "yyyy-MM-dd") : null
                          )
                        }
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                )}
              />
              {errors.last_audit_date && (
                <p className="text-red-500">{errors.last_audit_date.message}</p>
              )}{" "}
              {/* ✅ Display error message */}
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

            <CardFooter className="flex flex-col gap-3">
                <div className="w-full ">
                  {/* <Button
                      variant="outline"
                      className=" border-1 border-primary cursor-pointer"
                    >
                      Cancel
                    </Button> */}
                  <Button
                    className={`cursor-pointer w-full ${
                      errors.batch_id || errors.iso_certified || errors.sls_certified || errors.last_audit_date || errors.next_audit_date || errors.inspector
                        ? "bg-destructive/50 hover:bg-destructive/70 cursor-not-allowed animate-pulse"
                        : null
                    }`}
                    type="submit"
                    {...(isSubmitSuccessful ? { disabled: true } : {})}
                  >
                    {isSubmitSuccessful ? "Submitted" : "submit"}
                  </Button>
                </div>
              </CardFooter>
          </Card>
        </form>
      </div>
    </>
  );
};

export default quality_iso_sls_check_Insert;
