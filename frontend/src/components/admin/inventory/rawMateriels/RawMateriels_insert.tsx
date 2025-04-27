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

const RawMateriels_insert = () => {
  const [SupplierID, setSupplierID] = useState();
  const [SupplierName, setSupplierName] = useState(""); // Default to an empty string
  const [searchTerm, setSearchTerm] = useState("");

  const searchedSuppliers = Inventory_supplierDetail_ReturnAll().filter(
    (data) => {
      return (
        data.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        data.supplierName.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
  );

  const newTransaction: SubmitHandler<any> = async (data) => {
    const payload = {
      date_received: data.date_received,
      unit_price: data.unit_price,
      quality_level: {
        raw_quality_id: data.raw_quality_id,
        quality_percentage: data.quality_percentage,
        quality_status: "pending",
      },
      supplier_details: {
        supplier_id: data.supplier_id,
        supplier_name: data.supplier_name,
      },
      started_quantity_kg: data.started_quantity_kg,
      location: data.location,
    };
    

    // console.log(payload);
    await Inventory_RawCashews_StockLevel_Add(payload);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    window.location.reload();
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
      supplier_id: SupplierID,
      supplier_name: SupplierName, // Ensure this is passed correctly
      started_quantity_kg: null,
      location: null,
    },
    mode: "onChange",
  });

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>
          <Plus />
          Add New Raw Material
        </Button>
      </DialogTrigger>
      <DialogContent
        className={`sm:max-w-[425px] border-2 ${
          errors.unit_price ||
          errors.supplier_id ||
          errors.supplier_name ||
          errors.started_quantity_kg ||
          errors.location
            ? "border-destructive/50 "
            : null
        }`}
      >
        <DialogHeader>
          <DialogTitle>New Raw Material Entry</DialogTitle>
          <DialogDescription>
            Add a new raw material entry to your inventory
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit(newTransaction)}>
          <div className="grid gap-4 py-4">
            {/* Date Start ----------*/}
            <div className="grid grid-cols-4 items-center gap-x-4">
              <Label htmlFor="name" className="text-right">
                Date
              </Label>
              <Controller
                name="date_received"
                control={control} // rules={{ required: "Date is required" }} // Add required validation
                render={({ field }) => (
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button
                        variant={"outline"}
                        className="w-full justify-start text-left font-normal col-span-3"
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {field.value ? (
                          format(new Date(field.value), "PPP")
                        ) : (
                          <span>Pick a date</span>
                        )}
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="z-52 w-fit bg-gray-200 ">
                      <DialogClose>
                        <Button
                          variant="ghost"
                          className=" hover:bg-gray-200  h-full"
                        >
                          <Calendar
                            mode="single"
                            selected={
                              field.value ? new Date(field.value) : undefined
                            }
                            onSelect={(date) =>
                              field.onChange(
                                date ? format(date, "yyyy-MM-dd") : null
                              )
                            }
                            initialFocus
                          />
                        </Button>
                      </DialogClose>
                    </DialogContent>
                  </Dialog>
                )}
              />
            </div>

            {/* Date end---------------- */}

            {/* Unit Price */}
            <div className="grid grid-cols-4 items-center gap-x-4">
              <Label htmlFor="unit_price" className="text-left">
                Unit Price
              </Label>
              <Input
                id="unit_price"
                placeholder="Unit Price"
                className="col-span-3"
                {...register("unit_price", {
                  required: "Unit Price is required",
                })}
              />
              {errors.unit_price && (
                <span className="text-destructive text-sm col-span-3 w-full col-end-5">
                  {errors.unit_price.message}
                </span>
              )}
            </div>

            {/* Supplier Details */}
            {/* ----------------------------------------------------- */}

            <div className="grid grid-cols-4 items-center gap-x-4">
              <Label htmlFor="supplier_name" className="text-left">
                Supplier
              </Label>

              {/* Supplier ID */}
              <Controller
                name="supplier_id"
                control={control}
                rules={{ required: "Supplier is required" }}
                render={({ field }) => (
                  <>
                    <Input
                      id="supplier_id"
                      placeholder="Click to select Supplier"
                      className="col-span-3"
                      readOnly
                      hidden
                      {...field}
                    />
                    <Dialog>
                      <DialogTrigger className="col-span-3">
                        <Input
                          id="supplier_name"
                          placeholder="Click to select Supplier"
                          className="col-span-3"
                          value={SupplierName || ""}
                          readOnly
                        />
                      </DialogTrigger>
                      <DialogContent className="max-h-[40vh] overflow-y-auto">
                        <DialogHeader>
                          <DialogTitle>Select the supplier</DialogTitle>
                          <DialogDescription>
                            Select a supplier from the list below.
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
                                <TableHead>Supplier Name</TableHead>
                                <TableHead>Supplier Email</TableHead>
                              </TableRow>
                            </TableHeader>
                            <TableBody>
                              {searchedSuppliers.map((data) => (
                                <TableRow
                                  key={data._id}
                                  className="cursor-pointer hover:bg-gray-100"
                                  onClick={() => {
                                    setSupplierID(data._id);
                                    setSupplierName(data.supplierName); // Update SupplierName correctly
                                    setValue(
                                      "supplier_name",
                                      data.supplierName
                                    );
                                    field.onChange(data._id); // Update supplier_id value
                                  }}
                                >
                                  <TableCell>{data.supplierName}</TableCell>
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
              {errors.supplier_id && (
                <span className="text-destructive text-sm col-span-3 w-full col-end-5">
                  {errors.supplier_id.message}
                </span>
              )}
            </div>

            {/* Started Quantity */}
            <div className="grid grid-cols-4 items-center gap-x-4">
              <Label htmlFor="started_quantity_kg" className="text-left">
                Quantity (kg)
              </Label>
              <Input
                id="started_quantity_kg"
                placeholder="Quantity"
                className="col-span-3"
                {...register("started_quantity_kg", {
                  required: "Started Quantity is required",
                })}
              />
              {errors.started_quantity_kg && (
                <span className="text-destructive text-sm col-span-3 w-full col-end-5">
                  {errors.started_quantity_kg.message}
                </span>
              )}
            </div>

            {/* Location */}
            <div className="grid grid-cols-4 items-center gap-x-4">
              <Label htmlFor="location" className="text-left">
                Stored Location
              </Label>
              <Input
                id="location"
                placeholder="Location"
                className="col-span-3"
                {...register("location", { required: "Location is required" })}
              />
              {errors.location && (
                <span className="text-destructive text-sm col-span-3 w-full col-end-5">
                  {errors.location.message}
                </span>
              )}
            </div>
          </div>
          <DialogFooter>
            <Button
              className={`cursor-pointer w-full ${
                errors.unit_price ||
                errors.supplier_id ||
                errors.supplier_name ||
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

export default RawMateriels_insert;
