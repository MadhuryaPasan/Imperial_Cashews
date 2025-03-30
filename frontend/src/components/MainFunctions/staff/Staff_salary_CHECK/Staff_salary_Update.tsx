import { SubmitHandler, useForm } from "react-hook-form"; // form validation
import {
} from "@/utils/staff/Staff_Employee_API"; // API
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
import {Staff_salary_getDoc,Staff_salary_updateDoc } from "@/utils/staff/Staff_salary_API";




const Staff_salary_Update: React.FC<any> = (currentData) => {
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
        let result = await Staff_salary_getDoc(updateId);
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
    await Staff_salary_updateDoc(updateId, data);
  };

  let basicSalary: number = data?.basicSalary;
  let allowances: number = data?.allowances;
  let epf: number = data?.epf;
  let etf: number = data?.etf;
  let totalSalary: number = data?.totalSalary;
 

  const {
    register,
    formState: { errors, isSubmitSuccessful },
    handleSubmit,
  } = useForm({
    defaultValues: {
        basicSalary:basicSalary,
        allowances:allowances,
        epf:epf,
        etf:etf,
        totalSalary:totalSalary,
    },
  });
  return (
    <>
      <div>
        {data ? (
          <div><form onSubmit={handleSubmit(UpdateDoc)}>
          <Card className={` p-[25px]   ${
            errors.basicSalary || errors.allowances ||errors.epf||errors.etf||errors.totalSalary
              ? "bg-destructive/5 outline-1 outline-destructive"
              : null
          } ${
            isSubmitSuccessful ? "bg-primary/10 outline-1 outline-primary" : null
          }`}>
            <CardHeader>
              <CardTitle>Insert Employee</CardTitle>
              <CardDescription>Insert new Employee</CardDescription>
            </CardHeader>
            <CardContent>

               {/* Basic Salary */}
              <div className="flex flex-col space-y-1.5">
                <Label>Basic Salary</Label>
                <Input
                defaultValue={basicSalary}
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
                defaultValue={allowances}
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
                defaultValue={epf}
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
                defaultValue={etf}
                  {...register("etf", {
                    required: "ETF is required",

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
                defaultValue={totalSalary}
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

export default Staff_salary_Update;