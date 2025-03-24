import { SubmitHandler, useForm } from "react-hook-form"; // form validation
import { Staff_Employee_createNew } from "@/utils/staff/Staff_Employee_API"; // API
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




const Staff_Employee_insert = () => {
  // get current month
  const currentMonth: string = new Date().toLocaleString("en-US", {
    month: "long",
  });

  // insert data
  const CreateDoc: SubmitHandler<any> = async (data) => {
    await Staff_Employee_createNew(data);
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
      email:null,
      phoneNumber:null,
      address:null,
      position:null,
      department:null,
      dateJoined:new Date().toISOString().split('T')[0],
      month: currentMonth,
    },
  });

  return (
    <>
      <div>
        <form onSubmit={handleSubmit(CreateDoc)}>
          <Card className={` p-[25px]   ${
            errors.name || errors.email ||errors.phoneNumber||errors.address||errors.position||errors.department||errors.dateJoined|| errors.month 
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

                  {/* Email */}
                <div className="flex flex-col space-y-1.5">
                <Label>E-mail</Label>
                <Input
                  {...register("email", {
                    required: "Email is required",
                    
                    pattern: {
                      value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/i,
                      message: "Enter a valid email address",
                    },
                  })}
                />
                {errors.email && (
                  <span className="text-destructive text-sm">
                    {errors.email.message}
                  </span>
                )}
              </div>

                 {/* Phone number */}
                <div className="flex flex-col space-y-1.5">
                <Label>Phone Number</Label>
                <Input
                  {...register("phoneNumber", {
                    required: "Phone number is required",
                    
                    pattern: {
                      value: /^\+?[0-9]{10,15}$/,
                      message: "Enter a valid phone number (10-15 digits, optional +)",
                    },
                    minLength: {
                      value: 10,
                      message: "Phone number must be at least 10 digits",
                    },
                    maxLength: {
                      value: 15,
                      message: "Phone number must be at most 15 digits",
                    },
                  })}
                />
                {errors.phoneNumber && (
                  <span className="text-destructive text-sm">
                    {errors.phoneNumber.message}
                  </span>
                )}
              </div>

                 {/* Address */}
                <div className="flex flex-col space-y-1.5">
                <Label>Address</Label>
                <Input
                  {...register("address", {
                    required: "Address is required",
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
                {errors.address && (
                  <span className="text-destructive text-sm">
                    {errors.address.message}
                  </span>
                )}
              </div>

                 {/* Position */}
                <div className="flex flex-col space-y-1.5">
                <Label>Position</Label>
                <Input
                  {...register("position", {
                    required: "Position is required",

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
                {errors.position && (
                  <span className="text-destructive text-sm">
                    {errors.position.message}
                  </span>
                )}
              </div>

                 {/* Department */}
                <div className="flex flex-col space-y-1.5">
                <Label>Department</Label>
                <Input
                  {...register("department", {
                    required: "Department is required",

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
                {errors.department && (
                  <span className="text-destructive text-sm">
                    {errors.department.message}
                  </span>
                )}
              </div>

               {/* Joined Date */}
               <div className="flex flex-col space-y-1.5">
                <Label>Joined Date</Label>
                <Input
                disabled
                  {...register("dateJoined", {
                    required: "Joined Date is required",
                  })}
                />
                {errors.dateJoined && (
                  <span className="text-destructive text-sm">
                    {errors.dateJoined.message}
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

export default Staff_Employee_insert;