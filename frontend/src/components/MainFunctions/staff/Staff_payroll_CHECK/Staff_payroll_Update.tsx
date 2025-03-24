import { SubmitHandler, useForm } from "react-hook-form"; // form validation
import {
} from "@/utils/staff/Staff_payroll_API"; // API
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
import { useEffect, useState } from "react";
import {Staff_payroll_getDoc,Staff_payroll_updateDoc } from "@/utils/staff/Staff_payroll_API";




const Staff_payroll_Update: React.FC<any> = (currentData) => {
  // get current month
  const currentMonth: string = new Date().toLocaleString("en-US", {
    month: "long",
  });

  const updateId = currentData.currentData;

  // get data according to this id
  const [data, setData] = useState<any>();
  useEffect(() => {
    async function loadPost() {
      try {
        let result = await Staff_payroll_getDoc(updateId);
        if (result) {
          setData(result);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
    loadPost();
  }, []);

  //asign data to temp variable

  const UpdateDoc: SubmitHandler<any> = async (data) => {
    await Staff_payroll_updateDoc(updateId, data);
  };

  let month: string = data?.month;
  let year: string = data?.year;
  let totalAllowences: string = data?.totalAllowences;
  let totalEPF: string = data?.totalEPF;
  let totalETF: string = data?.totalETF;
  let totalPayments: string = data?.totalPayments;
  

  const {
    register,
    formState: { errors, isSubmitSuccessful },
    handleSubmit,
  } = useForm({
    defaultValues: {
        month:month,
        year:year,
      totalAllowences:totalAllowences,
      totalEPF:totalEPF,
      totalETF:totalETF,
      totalPayments:totalPayments,
    },
  });
  return (
    <>
      <div>
        {data ? (
          <div><form onSubmit={handleSubmit(UpdateDoc)}>
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

               {/* month */}
              <div className="flex flex-col space-y-1.5">
                <Label>month</Label>
                <Input
                defaultValue={month}
                  {...register("month", {
                    required: "month is required",

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

                  {/* year */}
                <div className="flex flex-col space-y-1.5">
                <Label>Year</Label>
                <Input
                defaultValue={year}
                  {...register("year", {
                    required: "year is required",

                    
                      
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

                 {/* totalAllowences */}
                <div className="flex flex-col space-y-1.5">
                <Label>Total Allowences</Label>
                <Input
                defaultValue={totalAllowences}
                  {...register("totalAllowences", {
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
                {errors.totalAllowences && (
                  <span className="text-destructive text-sm">
                    {errors.totalAllowences.message}
                  </span>
                )}
              </div>

                 {/* totalEPF */}
                <div className="flex flex-col space-y-1.5">
                <Label>totalEPF</Label>
                <Input
                defaultValue={totalEPF}
                  {...register("totalEPF", {
                    required: "totalEPF is required",

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

              {/* totalETF */}
              <div className="flex flex-col space-y-1.5">
                <Label>Total EPF</Label>
                <Input
                defaultValue={totalETF}
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

                 {/* totalPayments */}
                <div className="flex flex-col space-y-1.5">
                <Label>Total Payments</Label>
                <Input
                defaultValue={totalPayments}
                  {...register("totalPayments", {
                    required: "Total Payments is required",

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
        </form></div>
        ) : (
          "Loading..."
        )}
      </div>
    </>
  );
};

export default Staff_payroll_Update;