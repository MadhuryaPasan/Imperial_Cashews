import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Plus } from "lucide-react";
import "react-day-picker/dist/style.css";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { Finance_BankBook_Add } from "@/utils/API/finance/Finance_BankBook_API";
import { Inventory_supplierDetail_ReturnAll } from "@/utils/API/inventory/Inventory_supplierDetail_API";
import { useState } from "react";
import { Inventory_RawCashews_StockLevel_Add } from "@/utils/API/inventory/Inventory_RawCashews_StockLevel_API";
import { Staff_Attendance_ReturnAll, Staff_Attendance_Update } from "@/utils/API/staff/Staff_Attendance_API";
import { Staff_Employee_ReturnAll } from "@/utils/API/staff/Staff_Employee_API";

const staffAtendenceInsert = () => {
  const [employeeId, setEmployeeId] = useState();
  const [employeeName, setEmployeeName] = useState(""); // Default to an empty string
  const [searchTerm, setSearchTerm] = useState("");

  const searchedSuppliers = Staff_Employee_ReturnAll().filter((data) => {
    return (
      data.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      data.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  const newTransaction: SubmitHandler<any> = async (data) => {
    const currentDate = new Date().toISOString().split("T")[0]; // Get current date in YYYY-MM-DD format
    const currentTime = new Date();

    try {
      if (data.type === "checkin") {
        // Create a new document for check-in
        const payload = {
          employee_id: data.employee_id,
          created_date: currentDate,
          check_in: currentTime,
          status: currentTime.getHours() > 9 ? "late present" : "present", // Mark as late if check-in is after 9 AM
        };


        console.log(payload); // Log the payload for debugging
        await Staff_Attendance_Update(payload);
        alert("Check-in marked successfully!");
      } else if (data.type === "checkout") {
        // Fetch the existing attendance record for today
        const existingAttendance = await Staff_Attendance_ReturnAll().find((record) => {
          return (
            record.employee_id === data.employee_id &&
            new Date(record.created_date).toISOString().split("T")[0] === currentDate
          );
        });

        if (existingAttendance) {
          const checkInTime = new Date(existingAttendance.check_in);
          const workingHours = Math.abs(currentTime.getTime() - checkInTime.getTime()) / (1000 * 60 * 60); // Calculate working hours

          const updatedPayload = {
            ...existingAttendance,
            check_out: currentTime,
            working_hours: workingHours.toFixed(2), // Round to 2 decimal places
          };


          await Staff_Attendance_Update(existingAttendance._id, updatedPayload);

          alert("Check-out marked successfully!");
        } else {
          alert("No check-in record found for today.");
        }
      }
    } catch (error) {
      console.error("Error marking attendance:", error);
      alert("An error occurred while marking attendance. Please try again.");
    }

    // Reload the page or reset the form
    // window.location.reload();
  };

  const {
    register,
    formState: { errors, isSubmitSuccessful },
    handleSubmit,
    setValue,
    control,
  } = useForm({
    defaultValues: {
      date_received: new Date(),
      unit_price: null,
      employee_id: employeeId,
      employeeName: employeeName,
      started_quantity_kg: null,
      location: null,
      type: "",
    },
    mode: "onChange",
  });

  const [currentTime, setCurrentTime] = useState(new Date());

  // Update the current time every second
  useState(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  });

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>
          <Plus />
          Mark Attendance
        </Button>
      </DialogTrigger>
      <DialogContent
        className={`sm:max-w-[425px] border-2 ${
          errors.unit_price ||
          errors.employee_id ||
          errors.employeeName ||
          errors.started_quantity_kg ||
          errors.location
            ? "border-destructive/50 "
            : null
        }`}
      >
        <DialogHeader>
          <DialogTitle>Mark Attendance</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(newTransaction)}>
          <div className="grid gap-4 py-4">
            {/* current time */}
            <div className="grid grid-cols-4 items-center gap-x-4">
              <Label htmlFor="unit_price" className="text-left">
                Current Time
              </Label>
              <div className=" border-2  rounded-md p-1 w-full col-span-3">
                {currentTime.toLocaleTimeString()}
              </div>
            </div>













            <div className="grid grid-cols-4 items-center gap-x-4">
              <Label htmlFor="name" className="text-right">
                Type
              </Label>


              <Controller
                name="type"
                control={control}
                rules={{ required: "Type is required" }}
                render={({ field }) => (
                  <Select onValueChange={field.onChange} value={field.value}>
                    <SelectTrigger className="col-span-3 w-full">
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="checkin">Check In</SelectItem>
                      <SelectItem value="checkout">Check Out</SelectItem>
                    </SelectContent>
                  </Select>
                )}
              />
              {errors.type && (
                <span className="text-destructive text-sm col-span-3 w-full col-end-5">
                  {errors.type.message}
                </span>
              )}
            </div>

            {/* Employee Name */}
            <div className="grid grid-cols-4 items-center gap-x-4">
              <Label htmlFor="employeeName" className="text-left">
                Employee
              </Label>

              {/* Supplier ID */}
              <Controller
                name="employee_id"
                control={control}
                rules={{ required: "Supplier is required" }}
                render={({ field }) => (
                  <>
                    <Input
                      id="employee_id"
                      placeholder="Click to select Supplier"
                      className="col-span-3"
                      readOnly
                      hidden
                      {...field}
                    />
                    <Dialog>
                      <DialogTrigger className="col-span-3">
                        <Input
                          id="employeeName"
                          placeholder="Click to select Supplier"
                          className="col-span-3"
                          value={employeeName || ""}
                          readOnly
                        />
                      </DialogTrigger>
                      <DialogContent className="max-h-[40vh] overflow-y-auto">
                        <DialogHeader>
                          <DialogTitle>Select the Employee</DialogTitle>
                          <DialogDescription>
                            Select a Employee from the list below.
                          </DialogDescription>
                        </DialogHeader>
                        <Input
                          type="text"
                          placeholder="Search data here... (e.g. Batch Code, Date Received, Location, Category)"
                          className="w-full"
                          value={searchTerm}
                          onChange={(e) => setSearchTerm(e.target.value)}
                        />
                        <DialogClose asChild>
                          <Table>
                            <TableHeader>
                              <TableRow>
                                <TableHead>Employee Name</TableHead>
                                <TableHead>Employee Email</TableHead>
                              </TableRow>
                            </TableHeader>
                            <TableBody>
                              {searchedSuppliers.map((data) => (
                                <TableRow
                                  key={data._id}
                                  className="cursor-pointer hover:bg-gray-100"
                                  onClick={() => {
                                    setEmployeeId(data._id);
                                    setEmployeeName(data.name); // Update SupplierName correctly
                                    setValue("employeeName", data.name);
                                    field.onChange(data._id); // Update employee_id value
                                  }}
                                >
                                  <TableCell>{data.name}</TableCell>
                                  <TableCell>{data.email}</TableCell>
                                </TableRow>
                              ))}
                            </TableBody>
                          </Table>
                        </DialogClose>
                      </DialogContent>
                    </Dialog>
                  </>
                )}
              />
              {errors.employee_id && (
                <span className="text-destructive text-sm col-span-3 w-full col-end-5">
                  {errors.employee_id.message}
                </span>
              )}
            </div>
          </div>
          <DialogFooter>
            <Button
              className={`cursor-pointer w-full ${
                errors.unit_price ||
                errors.employee_id ||
                errors.employeeName ||
                errors.started_quantity_kg ||
                errors.location
                  ? "bg-destructive/50 hover:bg-destructive/70 cursor-not-allowed animate-pulse"
                  : null
              }`}
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

export default staffAtendenceInsert;
