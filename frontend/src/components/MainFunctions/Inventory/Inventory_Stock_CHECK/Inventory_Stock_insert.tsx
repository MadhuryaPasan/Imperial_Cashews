import { SubmitHandler, useForm } from "react-hook-form"; // form validation
import { Inventory_Stock_createNew } from "@/utils/inventory/Inventory_Stock_API"; // API
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




const Inventory_Stock_insert = () => {
  // get current month
  const currentMonth: string = new Date().toLocaleString("en-US", {
    month: "long",
  });

  // insert data
  const CreateDoc: SubmitHandler<any> = async (data) => {
    await Inventory_Stock_createNew(data);
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
      itemname:null,
      minstock:null,
      maxstock:null,
      currentStock:null,
      description:null,
      ReorderLevel:null,
      month: currentMonth,
    },
  });

  return (
    <>
      <div>
        <form onSubmit={handleSubmit(CreateDoc)}>
          <Card className={` p-[25px]   ${
            errors.itemname || errors.minstock ||errors.maxstock||errors.currentStock||errors.description||errors.ReorderLevel|| errors.month 
              ? "bg-destructive/5 outline-1 outline-destructive"
              : null
          } ${
            isSubmitSuccessful ? "bg-primary/10 outline-1 outline-primary" : null
          }`}>
            <CardHeader>
              <CardTitle>Insert Stock</CardTitle>
              <CardDescription>Insert Stock Detail</CardDescription>
            </CardHeader>
            <CardContent>

               {/* Name */}
              <div className="flex flex-col space-y-1.5">
                <Label>itemname</Label>
                <Input
                  {...register("itemname", {
                    required: "itemname is required",
                  })}
                />
                {errors.itemname && (
                  <span className="text-destructive text-sm">
                    {errors.itemname.message}
                  </span>
                )}
              </div>

                  {/* min stock */}
                <div className="flex flex-col space-y-1.5">
                <Label>minstock</Label>
                <Input
                  {...register("minstock", {
                    required: "minstock is required",
                  })}
                />
                {errors.minstock && (
                  <span className="text-destructive text-sm">
                    {errors.minstock.message}
                  </span>
                )}
              </div>

                 {/* max stock*/}
                <div className="flex flex-col space-y-1.5">
                <Label>maxstock</Label>
                <Input
                  {...register("maxstock", {
                    required: "maxstock is required",
                  })}
                />
                {errors.maxstock && (
                  <span className="text-destructive text-sm">
                    {errors.maxstock.message}
                  </span>
                )}
              </div>

                 {/* currentStock */}
                <div className="flex flex-col space-y-1.5">
                <Label>currentStock</Label>
                <Input
                  {...register("currentStock", {
                    required: "currentStock is required",
                  })}
                />
                {errors.currentStock && (
                  <span className="text-destructive text-sm">
                    {errors.currentStock.message}
                  </span>
                )}
              </div>

                 {/* description */}
                <div className="flex flex-col space-y-1.5">
                <Label>description</Label>
                <Input
                  {...register("description", {
                    required: "description is required",
                  })}
                />
                {errors.description && (
                  <span className="text-destructive text-sm">
                    {errors.description.message}
                  </span>
                )}
              </div>

                 {/* ReorderLevel*/}
                <div className="flex flex-col space-y-1.5">
                <Label>ReorderLevel</Label>
                <Input
                  {...register("ReorderLevel", {
                    required: "Department is required",
                  })}
                />
                {errors.ReorderLevel && (
                  <span className="text-destructive text-sm">
                    {errors.ReorderLevel.message}
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

export default Inventory_Stock_insert;