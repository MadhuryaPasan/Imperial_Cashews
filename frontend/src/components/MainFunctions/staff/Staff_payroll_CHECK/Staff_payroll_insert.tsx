import { SubmitHandler, useForm } from "react-hook-form"; // form validation
import { Staff_payroll_createNew } from "@/utils/staff/Staff_payroll_API"; // API
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


import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";




const Staff_payroll_insert = () => {
  // get current month
  const currentMonth: string = new Date().toLocaleString("en-US", {
    month: "long",
  });

  // insert data
  const CreateDoc: SubmitHandler<any> = async (data) => {
    await Staff_payroll_createNew(data);
    // wait for 1 seconds
    await new Promise((resolve) => setTimeout(resolve, 2000));
    // reload the page
    window.location.reload();
  };

  // form validation and submission

  const {
    register,
    formState: { errors, isSubmitSuccessful },
    handleSubmit,
  } = useForm({
    defaultValues: {
      month:null,
      year:null,
      totalAllowences:null,
      totalEPF:null,
      totalETF:null,
      totalPayments:null,
    },
  });

  return (
    <>
      <div>
        <form onSubmit={handleSubmit(CreateDoc)}>
          <Card className={` p-[25px]   ${
            errors.month || errors.year ||errors.totalAllowences||errors.totalEPF||errors.totalETF||errors.totalPayments
              ? "bg-destructive/5 outline-1 outline-destructive"
              : null
          } ${
            isSubmitSuccessful ? "bg-primary/10 outline-1 outline-primary" : null
          }`}>
            <CardHeader>
              <CardTitle>Insert Payroll</CardTitle>
              <CardDescription></CardDescription>
            </CardHeader>
            <CardContent>

               {/* Month */}
              <div className="flex flex-col space-y-1.5">
                <Label>Month</Label>
                <Input
                  {...register("month", {
                    required: "Month is required",

                    minLength: {
                        value: 1,
                        message: "Fill this feild",
                      },
                      
                      pattern: {
                        value: /^[A-Za-z.-_ ]+$/i,
                        message: "Only letters",
                      },
                  })}
                />
                {errors.month && (
                  <span className="text-destructive text-sm">
                    {errors.month.message}
                  </span>
                )}
              </div>

                  {/* Year */}
                <div className="flex flex-col space-y-1.5">
                <Label>Year</Label>
                <Input
                  {...register("year", {
                    required: "Year is required",

                   
                      pattern: {
                        value: /^[0-9.]+$/i,
                        message: "Only numbers",
                      },
                  })}
                />
                {errors.year && (
                  <span className="text-destructive text-sm">
                    {errors.year.message}
                  </span>
                )}
              </div>

                 {/* Total Allowences */}
                <div className="flex flex-col space-y-1.5">
                <Label>Total Allowences</Label>
                <Input
                  {...register("totalAllowences", {
                    required: "Total allowences is required",

                    min: {
                        value: 1,
                        message: "Fill this feild",
                      },
                      
                      pattern: {
                        value: /^[0-9.]+$/i,
                        message: "Only numbers",
                      },
                  })}
                />
                {errors.totalAllowences && (
                  <span className="text-destructive text-sm">
                    {errors.totalAllowences.message}
                  </span>
                )}
              </div>

                 {/* Total EPF */}
                <div className="flex flex-col space-y-1.5">
                <Label>Total EPF</Label>
                <Input
                  {...register("totalEPF", {
                    required: "Total EPF is required",

                    min: {
                        value: 1,
                        message: "Fill this feild",
                      },
                      
                      pattern: {
                        value: /^[0-9.]+$/i,
                        message: "Only numbers",
                      },

                  })}
                />
                {errors.totalEPF && (
                  <span className="text-destructive text-sm">
                    {errors.totalEPF.message}
                  </span>
                )}
              </div>

                 {/* Total ETF */}
                <div className="flex flex-col space-y-1.5">
                <Label>Total ETF</Label>
                <Input
                  {...register("totalETF", {
                    required: "Total ETF is required",

                    min: {
                        value: 1,
                        message: "Fill this feild",
                      },
                      
                      pattern: {
                        value: /^[0-9.]+$/i,
                        message: "Only numbers",
                      },
                  })}
                />
                {errors.totalETF && (
                  <span className="text-destructive text-sm">
                    {errors.totalETF.message}
                  </span>
                )}
              </div>

                 {/* Total Payments */}
                <div className="flex flex-col space-y-1.5">
                <Label>Total Payments</Label>
                <Input
                  {...register("totalPayments", {
                    required: "Total payments is required",

                    min: {
                        value: 1,
                        message: "Fill this feild",
                      },
                      
                      pattern: {
                        value: /^[0-9.]+$/i,
                        message: "Only numbers",
                      },
                  })}
                />
                {errors.totalPayments && (
                  <span className="text-destructive text-sm">
                    {errors.totalPayments.message}
                  </span>
                )}
              </div>
             
            </CardContent>

            <CardFooter>
              <Button className="w-full">
                {isSubmitSuccessful ? "Submitted" : "Submit"}
              </Button>
            </CardFooter>
          </Card>
        </form>
      </div>
    </>
  );
};

export default Staff_payroll_insert;