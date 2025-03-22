import { Controller, SubmitHandler, useForm } from "react-hook-form"; // form validation
import { Inventory_Stock_createNew } from "@/utils/inventory/Inventory_Stock_API"; // API
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

const Inventory_Stock_insert = () => {
  // insert data
  const CreateDoc: SubmitHandler<any> = async (data) => {
    await Inventory_Stock_createNew(data);
  };

  // form validation and submission
  const {
    register,
    formState: { errors, isSubmitSuccessful },
    control,
    handleSubmit,
  } = useForm({
    defaultValues: {
      stockDate: "",
      itemName: "",
      category: "",
      minStock: "",
      maxStock: "",
      reorderLevel: "",
      currentStock: "",
      lastUpdateTime: "",
    },
  });

  return (
    <>
      <div className="">
        <form onSubmit={handleSubmit(CreateDoc)}>
          <Card
            className={`md:w-[50vw] p-[25px] lg:w-[30vw]  ${errors.stockDate ||
              errors.itemName ||
              errors.category ||
              errors.minStock ||
              errors.maxStock ||
              errors.reorderLevel ||
              errors.currentStock ||
              errors.lastUpdateTime
              ? "bg-destructive/5 outline-1 outline-destructive"
              : ""
              } ${isSubmitSuccessful ? "bg-primary/10 outline-1 outline-primary" : ""}`}
          >
            <CardHeader>
              <CardTitle>Insert Stock</CardTitle>
              <CardDescription>Insert new stock information</CardDescription>
            </CardHeader>
            <CardContent>
              {/* Stock Date */}
              <div className="flex flex-col space-y-1.5">
                <Label>Stock Date</Label>
                <Input type="date" {...register("stockDate", { required: "Stock Date is required" })} />
                {errors.stockDate && <span className="text-destructive text-sm">{errors.stockDate.message}</span>}
              </div>

              {/* Date Picker */}
              <div className="flex flex-col space-y-1.5">
                <label>Date</label>
                <Controller
                  name="lastUpdateTime"
                  control={control}
                  rules={{ required: "Last Update Time is required" }}
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
                          selected={field.value ? new Date(field.value) : undefined}
                          onSelect={(date) =>
                            field.onChange(date ? format(date, "yyyy-MM-dd") : null)
                          }
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                  )}
                />
                {errors.lastUpdateTime && (
                  <p className="text-red-500">{errors.lastUpdateTime.message}</p>
                )}
              </div>

              {/* Item Name */}
              <div className="flex flex-col space-y-1.5">
                <Label>Item Name</Label>
                <Input {...register("itemName", { required: "Item Name is required" })} />
                {errors.itemName && <span className="text-destructive text-sm">{errors.itemName.message}</span>}
              </div>

              {/* Category */}
              <div className="flex flex-col space-y-1.5">
                <Label>Category</Label>
                <Input {...register("category", { required: "Category is required" })} />
                {errors.category && <span className="text-destructive text-sm">{errors.category.message}</span>}
              </div>

              {/* Min Stock */}
              <div className="flex flex-col space-y-1.5">
                <Label>Min Stock</Label>
                <Input type="text" {...register("minStock", { required: "Min Stock is required" })} />
                {errors.minStock && <span className="text-destructive text-sm">{errors.minStock.message}</span>}
              </div>

              {/* Max Stock */}
              <div className="flex flex-col space-y-1.5">
                <Label>Max Stock</Label>
                <Input type="text" {...register("maxStock", { required: "Max Stock is required" })} />
                {errors.maxStock && <span className="text-destructive text-sm">{errors.maxStock.message}</span>}
              </div>

              {/* Reorder Level */}
              <div className="flex flex-col space-y-1.5">
                <Label>Reorder Level</Label>
                <Input type="text" {...register("reorderLevel", { required: "Reorder Level is required" })} />
                {errors.reorderLevel && <span className="text-destructive text-sm">{errors.reorderLevel.message}</span>}
              </div>

              {/* Current Stock */}
              <div className="flex flex-col space-y-1.5">
                <Label>Current Stock</Label>
                <Input type="text" {...register("currentStock", { required: "Current Stock is required" })} />
                {errors.currentStock && <span className="text-destructive text-sm">{errors.currentStock.message}</span>}
              </div>
            </CardContent>

            <CardFooter>
              <Button className="w-full" type="submit">
                {isSubmitSuccessful ? "Submitted" : "Submit"}
              </Button>
            </CardFooter>
          </Card>
        </form>
      </div>
    </>
  );
};

export default Inventory_Stock_insert;
