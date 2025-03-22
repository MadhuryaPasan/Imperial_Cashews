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

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const Staff_Employee_insert = () => {
  const currentMonth: string = new Date().toLocaleString("en-US", {
    month: "long",
  });

  const CreateDoc: SubmitHandler<any> = async (data) => {
    try {
      await Staff_Employee_createNew(data);
      await new Promise((resolve) => setTimeout(resolve, 2000));
      window.location.reload();
    } catch (error) {
      console.error("Failed to submit:", error);
      alert("Submission failed. Please try again.");
    }
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
      <div className="">
        <form onSubmit={handleSubmit(CreateDoc)}>
          <Card
            className={`${
              errors.name ||
              errors.email ||
              errors.phoneNumber ||
              errors.address ||
              errors.position ||
              errors.department ||
              errors.dateJoined ||
              errors.month
                ? "bg-destructive/5 outline-1 outline-destructive"
                : ""
            } ${isSubmitSuccessful ? "bg-primary/10 outline-1 outline-primary" : ""}`}
          >
            <CardHeader>
              <CardTitle>Insert Employee</CardTitle>
              <CardDescription>Insert new Employee</CardDescription>
            </CardHeader>
            <CardContent>
              {/* Name */}
              <div className="flex flex-col space-y-1.5">
                <Label>Name</Label>
                <Input type="text" {...register("name", { required: "Name is required" })} />
                {errors.name && <span className="text-destructive text-sm">{errors.name.message}</span>}
              </div>

              {/* Email */}
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

              {/* Address */}
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
              <Input type="hidden" {...register("month")} value={currentMonth} />
            </CardContent>

            <CardFooter>
              <Button type="submit" className="w-full">
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
