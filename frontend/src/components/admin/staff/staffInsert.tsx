import { format } from "date-fns";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog";
import { Staff_Employee_Add } from "@/utils/API/staff/Staff_Employee_API";

const staffinsert = () => {
  const newStaff: SubmitHandler<any> = async (data) => {
    console.log(data);
    // Submit the form data to the API
    // Example: await Staff_Add_API(data);


await Staff_Employee_Add(data);

reset({
  name: "",
  email: "",
  phoneNumber: "",
  address: "",
  department: "",
  dateJoined: new Date(),
  dateOfbirth: "",
  designation: "",
  emerPhoneNum: "",
  gender: "",
  nic: "",
});

window.location.reload();
  };

  const {
    register,
    formState: { errors, isSubmitSuccessful },
    handleSubmit,
    control,
    reset,
  } = useForm({
    defaultValues: {
      name: "",
      email: "",
      phoneNumber: "",
      address: "",
      department: "",
      dateJoined: new Date(),
      dateOfbirth: "",
      designation: "",
      emerPhoneNum: "",
      gender: "",
      nic: "",
    },
    mode: "onChange",
  });

  return (

    <Dialog>
      <DialogTrigger asChild>
        <Button>New user</Button>
      </DialogTrigger>
      <DialogContent className={`sm:max-w-[425px] border-2 ${errors.name || errors.email || errors.phoneNumber || errors.address || errors.department || errors.dateOfbirth || errors.designation || errors.emerPhoneNum || errors.gender || errors.nic ? "border-destructive/50" : ""}`}>
        <DialogHeader>
          <DialogTitle>new Employee</DialogTitle>
        </DialogHeader>
    <form onSubmit={handleSubmit(newStaff)} className="grid gap-4 py-4">
      {/* Name */}
      <div className="grid grid-cols-4 items-center gap-x-4">
        <Label htmlFor="name" className="text-right">Name</Label>
        <Input
          id="name"
          placeholder="Full Name"
          className="col-span-3"
          {...register("name", { required: "Name is required" })}
        />
        {errors.name && <span className="text-destructive text-sm col-span-3">{errors.name.message}</span>}
      </div>

      {/* Email */}
      <div className="grid grid-cols-4 items-center gap-x-4">
        <Label htmlFor="email" className="text-right">Email</Label>
        <Input
          id="email"
          placeholder="Email Address"
          className="col-span-3"
          {...register("email", {
            required: "Email is required",
            pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: "Invalid email format" },
          })}
        />
        {errors.email && <span className="text-destructive text-sm col-span-3">{errors.email.message}</span>}
      </div>

      {/* Phone Number */}
      <div className="grid grid-cols-4 items-center gap-x-4">
        <Label htmlFor="phoneNumber" className="text-left">Phone Number</Label>
        <Input
          id="phoneNumber"
          placeholder="Phone Number"
          className="col-span-3"
          {...register("phoneNumber", {
            required: "Phone number is required",
            pattern: { value: /^[0-9]{10}$/, message: "Invalid phone number format" },
          })}
        />
        {errors.phoneNumber && <span className="text-destructive text-sm col-span-3">{errors.phoneNumber.message}</span>}
      </div>

      {/* Address */}
      <div className="grid grid-cols-4 items-center gap-x-4">
        <Label htmlFor="address" className="text-right">Address</Label>
        <Input
          id="address"
          placeholder="Address"
          className="col-span-3"
          {...register("address", { required: "Address is required" })}
        />
        {errors.address && <span className="text-destructive text-sm col-span-3">{errors.address.message}</span>}
      </div>

      {/* Department
      <div className="grid grid-cols-4 items-center gap-x-4">
        <Label htmlFor="department" className="text-right">Department</Label>
        <Input
          id="department"
          placeholder="Department"
          className="col-span-3"
          {...register("department", { required: "Department is required" })}
        />
        {errors.department && <span className="text-destructive text-sm col-span-3">{errors.department.message}</span>}
      </div> */}

      {/* Date Joined
      <div className="grid grid-cols-4 items-center gap-x-4">
        <Label htmlFor="dateJoined" className="text-right">Date Joined</Label>
        <Controller
          name="dateJoined"
          control={control}
          render={({ field }) => (
            <Input
              id="dateJoined"
              value={format(new Date(field.value), "yyyy-MM-dd")}
              readOnly
              className="col-span-3"
            />
          )}
        />
      </div> */}

      {/* Date of Birth */}
      <div className="grid grid-cols-4 items-center gap-x-4">
        <Label htmlFor="dateOfbirth" className="text-left">Date of Birth</Label>
        <Input
          id="dateOfbirth"
          placeholder="YYYY-MM-DD"
          className="col-span-3"
          {...register("dateOfbirth", {
            required: "Date of birth is required",
            pattern: { value: /^\d{4}-\d{2}-\d{2}$/, message: "Invalid date format (YYYY-MM-DD)" },
          })}
        />
        {errors.dateOfbirth && <span className="text-destructive text-sm col-span-3">{errors.dateOfbirth.message}</span>}
      </div>

      {/* Designation */}
      <div className="grid grid-cols-4 items-center gap-x-4">
        <Label htmlFor="designation" className="text-right">Designation</Label>
        <Input
          id="designation"
          placeholder="Designation"
          className="col-span-3"
          {...register("designation", { required: "Designation is required" })}
        />
        {errors.designation && <span className="text-destructive text-sm col-span-3">{errors.designation.message}</span>}
      </div>

      {/* Emergency Phone Number */}
      <div className="grid grid-cols-4 items-center gap-x-4">
        <Label htmlFor="emerPhoneNum" className="text-left">Emergency Phone</Label>
        <Input
          id="emerPhoneNum"
          placeholder="Emergency Phone Number"
          className="col-span-3"
          {...register("emerPhoneNum", {
            required: "Emergency phone number is required",
            pattern: { value: /^[0-9]{9,10}$/, message: "Invalid phone number format" },
          })}
        />
        {errors.emerPhoneNum && <span className="text-destructive text-sm col-span-3">{errors.emerPhoneNum.message}</span>}
      </div>

      {/* Gender */}
      <div className="grid grid-cols-4 items-center gap-x-4">
        <Label htmlFor="gender" className="text-right">Gender</Label>
        <Input
          id="gender"
          placeholder="Gender"
          className="col-span-3"
          {...register("gender", { required: "Gender is required" })}
        />
        {errors.gender && <span className="text-destructive text-sm col-span-3">{errors.gender.message}</span>}
      </div>

      {/* NIC */}
      <div className="grid grid-cols-4 items-center gap-x-4">
        <Label htmlFor="nic" className="text-right">NIC</Label>
        <Input
          id="nic"
          placeholder="NIC"
          className="col-span-3"
          {...register("nic", {
            required: "NIC is required",
            pattern: { value: /^[0-9]{12}$/, message: "Invalid NIC format" },
          })}
        />
        {errors.nic && <span className="text-destructive text-sm col-span-3">{errors.nic.message}</span>}
      </div>

      <DialogFooter>
            <Button
              className={`cursor-pointer w-full ${errors.name || errors.email || errors.phoneNumber || errors.address || errors.department || errors.dateOfbirth || errors.designation || errors.emerPhoneNum || errors.gender || errors.nic  ? "bg-destructive/50 hover:bg-destructive/70 cursor-not-allowed animate-pulse" : ""}`}
              type="submit"
              {...(isSubmitSuccessful ? { disabled: true } : {})}
            >
              {isSubmitSuccessful ? "Submitted" : "Submit"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default staffinsert;