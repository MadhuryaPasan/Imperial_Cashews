import { SubmitHandler, useForm } from "react-hook-form"; // form validation
import { Staff_department_createNew } from "@/utils/staff/Staff_department_API"; // API
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




const Staff_department_insert = () => {
  // get current month
  const currentMonth: string = new Date().toLocaleString("en-US", {
    month: "long",
  });

  // insert data
  const CreateDoc: SubmitHandler<any> = async (data) => {
    await Staff_department_createNew(data);
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
      name:null,
      manager:null,
      staffCount:null,
    },
  });

  return (
    <>
      <div>
        <form onSubmit={handleSubmit(CreateDoc)}>
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
                  {...register("name", {
                    required: "Name is required",
                    minLength: {
                      value: 5,
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
        </form>
      </div>
    </>
  );
};

export default Staff_department_insert;