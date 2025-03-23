import { SubmitHandler, useForm } from "react-hook-form"; // form validation
import { Inventory_FinalProduct_createNew } from "@/utils/inventory/Inventory_FinalProduct_API"; // API
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const Inventory_FinalProduct_insert = () => {
  // get current month
  const currentMonth: string = new Date().toLocaleString("en-US", {
    month: "long",
  });

  // insert data
  const CreateDoc: SubmitHandler<any> = async (data) => {
    await Inventory_FinalProduct_createNew(data);
  };

  // form validation and submission
  const {
    register,
    formState: { errors, isSubmitSuccessful },
    handleSubmit,
  } = useForm({
    defaultValues: {
     /*1*/ category: "",
    /*2*/ weight: "",
    /*3*/ manufacturerDate:  "",
    /*5*/ PackageCount: "",                    
    /*6*/ sellprice: "",
    },
  });

  return (
    <>
       <div className="">
      <form onSubmit={handleSubmit(CreateDoc)}>
        <Card
          className={` ${
            errors.category ||
            errors.weight ||
            errors.manufacturerDate  ||
            errors.PackageCount ||
            errors.sellprice 
              ? "bg-destructive/5 outline-1 outline-destructive"
              : ""
          } ${isSubmitSuccessful ? "bg-primary/10 outline-1 outline-primary" : ""}`}
        >
          <CardHeader>
            <CardTitle>Insert Final product</CardTitle>
            <CardDescription>Insert new final product</CardDescription>
          </CardHeader>
          <CardContent>
            {/* Category */}
            <div className="flex flex-col space-y-1.5">
              <Label>Category</Label>
              <Input
       
              {...register("category", { required: "Category is required" })} />
              {errors.category && <span className="text-destructive text-sm">{errors.category.message}</span>}
            </div>

              {/* Weight */}
              <div className="flex flex-col space-y-1.5">
              <Label>Weight</Label>
              <Input   
              type="number" {...register("weight", { required: "Weight is required" })} />
              {errors.weight && <span className="text-destructive text-sm">{errors.weight.message}</span>}
            </div>

            {/* Manufacturer Date */}
            <div className="flex flex-col space-y-1.5">
              <Label>Manufacturer Date</Label>
              
              <Input     
              type="date" {...register("manufacturerDate", { required: "Manufacturer Date is required" })} />
              {errors.manufacturerDate && <span className="text-destructive text-sm">{errors.manufacturerDate.message}</span>}
            </div>
            
            {/* Package Count */}
            <div className="flex flex-col space-y-1.5">
              <Label>Package Count</Label>
              <Input 
              type="number" {...register("PackageCount", { required: "Package Count is required" })} />
              {errors.PackageCount && <span className="text-destructive text-sm">{errors.PackageCount.message}</span>}
            </div>

             {/* Price */}
             <div className="flex flex-col space-y-1.5">
              <Label>Sell Price</Label>
              <Input 
 
              type="number" {...register("sellprice", { required: "Price is required" })} />
              {errors.sellprice && <span className="text-destructive text-sm">{errors.sellprice.message}</span>}
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

export default Inventory_FinalProduct_insert;
