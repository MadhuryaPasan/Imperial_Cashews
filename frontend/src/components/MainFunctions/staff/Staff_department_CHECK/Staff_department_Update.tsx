import { SubmitHandler, useForm } from "react-hook-form"; // form validation
import {
} from "@/utils/staff/Staff_department_API"; // API
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
import {Staff_department_getDoc,Staff_department_updateDoc } from "@/utils/staff/Staff_department_API";




const Staff_department_Update: React.FC<any> = (currentData) => {
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
        let result = await Staff_department_getDoc(updateId);
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
    await Staff_department_updateDoc(updateId, data);
  };

  let name: string = data?.name;
  let manager: string = data?.manager;
  let staffCount: string = data?.phoneNumber;
 
  const {
    register,
    formState: { errors, isSubmitSuccessful },
    handleSubmit,
  } = useForm({
    defaultValues: {
      name:name,
      manager:manager,
      staffCount:staffCount,
    },
  });

  return (
    <>
      <div>
        {data ? (
          <div><form onSubmit={handleSubmit(UpdateDoc)}>
          <Card className={` p-[25px]   ${
            errors.name || errors.manager ||errors.staffCount
              ? "bg-destructive/5 outline-1 outline-destructive"
              : null
          } ${
            isSubmitSuccessful ? "bg-primary/10 outline-1 outline-primary" : null
          }`}>
            <CardHeader>
              <CardTitle>Insert Department</CardTitle>
              <CardDescription>Insert new Department</CardDescription>
            </CardHeader>
            <CardContent>

               {/* Name */}
              <div className="flex flex-col space-y-1.5">
                <Label>Name</Label>
                <Input
                defaultValue={name}
                  {...register("name", {
                    required: "Name is required",

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
                {errors.name && (
                  <span className="text-destructive text-sm">
                    {errors.name.message}
                  </span>
                )}
              </div>

                  {/* Manager */}
                <div className="flex flex-col space-y-1.5">
                <Label>Manager</Label>
                <Input
                defaultValue={manager}
                  {...register("manager", {
                    required: "Manager is required",

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
                {errors.manager && (
                  <span className="text-destructive text-sm">
                    {errors.manager.message}
                  </span>
                )}
              </div>

               {/* Staff Count */}
               <div className="flex flex-col space-y-1.5">
                <Label>Staff Count</Label>
                <Input
                defaultValue={staffCount}
                  {...register("staffCount", {
                    required: "Staff Count is required",

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
                {errors.staffCount && (
                  <span className="text-destructive text-sm">
                    {errors.staffCount.message}
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

export default Staff_department_Update;