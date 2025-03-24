import { SubmitHandler, useForm } from "react-hook-form"; // form validation
import { Staff_salary_createNew } from "@/utils/staff/Staff_salary_API"; // API
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




const Staff_salary_insert = () => {
  // get current month
  const currentMonth: string = new Date().toLocaleString("en-US", {
    month: "long",
  });

  // insert data
  const CreateDoc: SubmitHandler<any> = async (data) => {
    await Staff_salary_createNew(data);
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
      basicSalary:null,
      allowances:null,
      epf:null,
      etf:null,
      totalSalary:null,
      month:currentMonth,
      payDate:null,
    },
  });

  return (
    <>
      <div>
        <form onSubmit={handleSubmit(CreateDoc)}>
          <Card className={` p-[25px]   ${
            errors.basicSalary || errors.allowances ||errors.epf||errors.etf||errors.totalSalary||errors.month||errors.payDate
              ? "bg-destructive/5 outline-1 outline-destructive"
              : null
          } ${
            isSubmitSuccessful ? "bg-primary/10 outline-1 outline-primary" : null
          }`}>
            <CardHeader>
              <CardTitle>Insert Salary</CardTitle>
              <CardDescription>Insert Employee Salary</CardDescription>
            </CardHeader>
            <CardContent>

               {/* Basic Salary */}
              <div className="flex flex-col space-y-1.5">
                <Label>Basic Salary</Label>
                <Input
                  {...register("basicSalary", {
                    required: "Name is required",

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
                {errors.basicSalary && (
                  <span className="text-destructive text-sm">
                    {errors.basicSalary.message}
                  </span>
                )}
              </div>

                  {/* Allowances */}
                <div className="flex flex-col space-y-1.5">
                <Label>Allowances</Label>
                <Input
                  {...register("allowances", {
                    required: "Allowances is required",

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
                {errors.allowances && (
                  <span className="text-destructive text-sm">
                    {errors.allowances.message}
                  </span>
                )}
              </div>

                 {/* EPF */}
                <div className="flex flex-col space-y-1.5">
                <Label>EPF</Label>
                <Input
                  {...register("epf", {
                    required: "Phone number is required",

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
                {errors.epf && (
                  <span className="text-destructive text-sm">
                    {errors.epf.message}
                  </span>
                )}
              </div>

                 {/* ETF */}
                <div className="flex flex-col space-y-1.5">
                <Label>ETF</Label>
                <Input
                  {...register("etf", {
                    required: "Address is required",

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
                {errors.etf && (
                  <span className="text-destructive text-sm">
                    {errors.etf.message}
                  </span>
                )}
              </div>

                 {/* Total Salary */}
                <div className="flex flex-col space-y-1.5">
                <Label>Total Salary</Label>
                <Input
                  {...register("totalSalary", {
                    required: "Total Salary is required",

                    min: {
                      value: 1,
                      message: "Amount should be at least 1",
                    },
                   
                    pattern: {
                      value: /^[0-9.]+$/i,
                      message: "Only numbers",
                    },
                  })}
                />
                {errors.totalSalary && (
                  <span className="text-destructive text-sm">
                    {errors.totalSalary.message}
                  </span>
                )}
              </div>

                 {/* Month */}
                <div className="flex flex-col space-y-1.5">
                <Label>Month</Label>
                <Input
                  disabled
                  value={currentMonth}
                  {...register("month", {
                    required: "error",
                  })}
                />
                {errors.month && (
                  <span className="text-destructive text-sm">
                    {errors.month.message}
                  </span>
                )}
              </div>

               {/* Pay Date */}
               <div className="flex flex-col space-y-1.5">
                <Label>Pay Date</Label>
                <Input
                type="date"
                  {...register("payDate", {
                    required: "Pay Date is required",

                    pattern: {
                      value: /^\d{4}-\d{2}-\d{2}$/,
                      message: "Date must be in YYYY-MM-DD format",
                    },
                    validate: () => {
                      const selectedDate = new Date();
                      const currentDate = new Date();
                      return (
                        selectedDate <= currentDate || "Pay Date cannot be in the future"
                      );
                    },
                  })}
                />
                {errors.payDate && (
                  <span className="text-destructive text-sm">
                    {errors.payDate.message}
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

export default Staff_salary_insert;