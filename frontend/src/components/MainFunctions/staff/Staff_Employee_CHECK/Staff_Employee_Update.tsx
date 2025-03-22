
import { SubmitHandler, useForm } from "react-hook-form"; // form validation
import {
    Staff_Employee_getDoc,
    Staff_Employee_updateDoc,
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

  
  const {
    register,
    formState: { errors, isSubmitSuccessful },
    handleSubmit,
  } = useForm({
    defaultValues: {
        name: "",
        email: "",
        phoneNumber: "",
        address: "",
        position: "",
        department: "",
        dateJoined: "",
        month: currentMonth,
    },
  });

  return (
    <>
      <div>
        {data ? (
          <div>
            <form onSubmit={handleSubmit(UpdateDoc)}>
              <Card
                className={` p-[25px]   ${
                    errors.name ||
                    errors.email ||
                    errors.phoneNumber ||
                    errors.address ||
                    errors.position ||
                    errors.department ||
                    errors.dateJoined ||
                    errors.month
                    ? "bg-destructive/5 outline-1 outline-destructive"
                    : null
                } ${
                  isSubmitSuccessful
                    ? "bg-primary/10 outline-1 outline-primary"
                    : null
                }`}
              >
                <CardHeader>
                  <CardTitle>Insert Employee</CardTitle>
                  <CardDescription>
                    Insert new Employee
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {/* Name */}
               <div className="flex flex-col space-y-1.5">
                 <Label>Name</Label>
                 <Input type ="text"{...register("name", { required: "Name is required" })} />
                 {errors.name  && <span className="text-destructive text-sm">{errors.name .message}</span>}
               </div>

               {/* email */}
               <div className="flex flex-col space-y-1.5">
                 <Label>E-mail</Label>
                 <Input type="email" {...register("email", { required: "Email is required" })} />
                 {errors.email && <span className="text-destructive text-sm">{errors.email.message}</span>}
               </div>
               
               {/* Phone Number */}
               <div className="flex flex-col space-y-1.5">
                 <Label>Phone Number</Label>
                 <Input type="tel" {...register("phoneNumber", { required: "Phone number is required" })} />
                 {errors.phoneNumber && <span className="text-destructive text-sm">{errors.phoneNumber.message}</span>}
               </div>

               {/* address */}
               <div className="flex flex-col space-y-1.5">
                 <Label>Address</Label>
                 <Input type="text" {...register("address", { required: "Address is required" })} />
                 {errors.address && <span className="text-destructive text-sm">{errors.address.message}</span>}
               </div>

               {/* Position */}
               <div className="flex flex-col space-y-1.5">
                 <Label>Position</Label>
                 <Input type="text" {...register("position", { required: "Position is required" })} />
                 {errors.position && <span className="text-destructive text-sm">{errors.position.message}</span>}
               </div>

               {/* Department */}
               <div className="flex flex-col space-y-1.5">
                 <Label>Department</Label>
                 <Input type="text" {...register("department", { required: "Department is required" })} />
                 {errors.department && <span className="text-destructive text-sm">{errors.department.message}</span>}
               </div>

               {/* Joined Date */}
               <div className="flex flex-col space-y-1.5">
                 <Label>Joined Date</Label>
                 <Input type="date" {...register("dateJoined", { required: "Joined Date is required" })} />
                 {errors.dateJoined && <span className="text-destructive text-sm">{errors.dateJoined.message}</span>}
               </div>

               {/* Month */}
               <div className="flex flex-col space-y-1.5">
                 <Label>Month</Label>
                 <Input disabled value={currentMonth} {...register("month", { required: "error" })} />
                 {errors.month && <span className="text-destructive text-sm">{errors.month.message}</span>}
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
        ) : (
          "Loading..."
        )}
      </div>
    </>
  );
};

export default Staff_Employee_Update;
