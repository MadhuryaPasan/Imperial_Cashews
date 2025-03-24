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
import {Staff_Employee_getDoc,Staff_Employee_updateDoc } from "@/utils/staff/Staff_Employee_API";




const Staff_Employee_Update: React.FC<any> = (currentData) => {
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
        let result = await Staff_Employee_getDoc(updateId);
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
    await Staff_Employee_updateDoc(updateId, data);
  };

  let name: string = data?.name;
  let email: string = data?.email;
  let phoneNumber: string = data?.phoneNumber;
  let address: string = data?.address;
  let position: string = data?.position;
  let department: string = data?.department;
  

  const {
    register,
    formState: { errors, isSubmitSuccessful },
    handleSubmit,
  } = useForm({
    defaultValues: {
      name:name,
      email:email,
      phoneNumber:phoneNumber,
      address:address,
      position:position,
      department:department,
    },
  });
  return (
    <>
      <div>
        {data ? (
          <div><form onSubmit={handleSubmit(UpdateDoc)}>
          <Card className={` p-[25px]   ${
            errors.name || errors.email ||errors.phoneNumber||errors.address||errors.position||errors.department
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
                defaultValue={name}
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
                defaultValue={email}
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
                defaultValue={phoneNumber}
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
                defaultValue={address}
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
                defaultValue={position}
                  {...register("position", {
                    required: "Position is required",

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
                defaultValue={department}
                  {...register("department", {
                    required: "Department is required",

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
                {errors.department && (
                  <span className="text-destructive text-sm">
                    {errors.department.message}
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

export default Staff_Employee_Update;