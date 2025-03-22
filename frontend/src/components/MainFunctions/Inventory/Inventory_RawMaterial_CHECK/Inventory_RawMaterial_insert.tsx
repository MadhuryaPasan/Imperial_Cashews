import { Controller, SubmitHandler, useForm } from "react-hook-form"; // form validation
import { Inventory_RawMaterial_createNew } from "@/utils/inventory/Inventory_RawMaterial_API"; // API
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
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { Calendar } from "@/components/ui/calendar";

const Inventory_RawMaterial_insert = () => {
  // insert data
  const CreateDoc: SubmitHandler<any> = async (data) => {
    await Inventory_RawMaterial_createNew(data);
  };

  // form validation and submission
  const {
    register,
    formState: { errors, isSubmitSuccessful },
    control,
    handleSubmit,
  } = useForm({
    defaultValues: {
      getDate: "",
      expireDate: "",
      buyerName: "",
      sellerName: "",
      weight: "",
      price: "",
      location: "",
    },
  });

  return (
    <>
      <div className="">
        <form onSubmit={handleSubmit(CreateDoc)}>
          <Card
            className={`md:w-[50vw] p-[25px] lg:w-[30vw]  ${errors.getDate ||
              errors.expireDate ||
              errors.buyerName ||
              errors.sellerName ||
              errors.weight ||
              errors.price ||
              errors.location
              ? "bg-destructive/5 outline-1 outline-destructive"
              : ""
              } ${isSubmitSuccessful ? "bg-primary/10 outline-1 outline-primary" : ""}`}
          >
            <CardHeader>
              <CardTitle>Insert Raw Material</CardTitle>
              <CardDescription>get raw material </CardDescription>
            </CardHeader>
            <CardContent>
              {/* Get Date */}
              <div className="flex flex-col space-y-1.5">
                <Label>Get Date</Label>
                <Input type="date" {...register("getDate", { required: "Get Date is required" })} />
                {errors.getDate && <span className="text-destructive text-sm">{errors.getDate.message}</span>}
              </div>
              {/* Expire Date */}
              {/* <div className="flex flex-col space-y-1.5">
                <Label>Expire Date</Label>
                <Input type="date" {...register("expireDate", { required: "Expire Date is required" })} />
                {errors.expireDate && <span className="text-destructive text-sm">{errors.expireDate.message}</span>}
              </div> */}
              <div className="flex flex-col space-y-1.5">

                {/* Date Picker */}
                <label>Date</label>
                <Controller
                  name="expireDate"
                  control={control}
                  rules={{ required: "Date is required" }} // ✅ Add required validation
                  render={({ field }) => (
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant={"outline"}
                          className=" justify-start text-left font-normal"
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {field.value ? (
                            format(new Date(field.value), "PPP")
                          ) : (
                            <span>Pick a date</span>
                          )}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
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
                      </PopoverContent>
                    </Popover>
                  )}
                />
                {errors.expireDate && (
                  <p className="text-red-500">{errors.expireDate.message}</p>
                )}{" "}
                {/* ✅ Display error message */}
              </div>

              {/* Buyer Name */}
              <div className="flex flex-col space-y-1.5">
                <Label>Buyer Name</Label>
                <Input {...register("buyerName", { required: "Buyer Name is required" })} />
                {errors.buyerName && <span className="text-destructive text-sm">{errors.buyerName.message}</span>}
              </div>
              {/* Seller Name */}
              <div className="flex flex-col space-y-1.5">
                <Label>Seller Name</Label>
                <Input {...register("sellerName", { required: "Seller Name is required" })} />
                {errors.sellerName && <span className="text-destructive text-sm">{errors.sellerName.message}</span>}
              </div>
              {/* Weight */}
              <div className="flex flex-col space-y-1.5">
                <Label>Weight</Label>
                <Input type="text" {...register("weight", { required: "Weight is required" })} />
                {errors.weight && <span className="text-destructive text-sm">{errors.weight.message}</span>}
              </div>
              {/* Price */}
              <div className="flex flex-col space-y-1.5">
                <Label>Price</Label>
                <Input type="text" {...register("price", { required: "Price is required" })} />
                {errors.price && <span className="text-destructive text-sm">{errors.price.message}</span>}
              </div>
              {/* Location */}
              <div className="flex flex-col space-y-1.5">
                <Label>Location</Label>
                <Input {...register("location", { required: "Location is required" })} />
                {errors.location && <span className="text-destructive text-sm">{errors.location.message}</span>}
              </div>
            </CardContent>

            <CardFooter>
              <Button className="w-full" type="submit">
                {isSubmitSuccessful ? "Submitted" : "Submit"}
              </Button>
            </CardFooter>
          </Card>
        </form>
      </div >
    </>
  );
};

export default Inventory_RawMaterial_insert;
