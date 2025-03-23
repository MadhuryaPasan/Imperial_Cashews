import { SubmitHandler, useForm } from "react-hook-form"; // form validation
import {
  Inventory_FinalProduct_getDoc,
  Inventory_FinalProduct_updateDoc,
} from "@/utils/inventory/Inventory_FinalProduct_API";// API
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
import { useEffect, useState } from "react";





const Inventory_FinalProduct_Update: React.FC<any> = (currentData) => {
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
        let result = await Inventory_FinalProduct_getDoc(updateId);
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
  await Inventory_FinalProduct_updateDoc(updateId, data);
  };

  let  category: string = data?. category;
  let weight: string = data?.weight;
  let manufacturerDate: string = data?.manufacturerDate;
  let PackageCount: string = data?.PackageCount;
  let sellprice : string = data?.sellprice ;

  const {
    register,
    formState: { errors, isSubmitSuccessful },
    handleSubmit,
  } = useForm({
    defaultValues: {
     /*1*/ category: category,
    /*2*/ weight: weight,
    /*3*/ manufacturerDate:  manufacturerDate,
    /*5*/ PackageCount: PackageCount,                    
    /*6*/ sellprice: sellprice
    },
  });


  return (
    <>
      <div>
        {data ? (
          
      <div className="">
      <form onSubmit={handleSubmit(UpdateDoc)}>
        <Card
          className={` ${
            errors.category ||
            errors.weight ||
            errors.sellprice ||
            errors.manufacturerDate ||
            errors.PackageCount 
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
       defaultValue={category}       
              {...register("category", { required: "Category is required" })} />
              {errors.category && <span className="text-destructive text-sm">{errors.category.message}</span>}
            </div>

              {/* Weight */}
              <div className="flex flex-col space-y-1.5">
              <Label>Weight</Label>
              <Input
         defaultValue={weight}     
              type="number" {...register("weight", { required: "Weight is required" })} />
              {errors.weight && <span className="text-destructive text-sm">{errors.weight.message}</span>}
            </div>

            {/* Manufacturer Date */}
            <div className="flex flex-col space-y-1.5">
              <Label>Manufacturer Date</Label>
              
              <Input 
              
         defaultValue={manufacturerDate}     
              type="date" {...register("manufacturerDate", { required: "Manufacturer Date is required" })} />
              {errors.manufacturerDate && <span className="text-destructive text-sm">{errors.manufacturerDate.message}</span>}
            </div>

            {/* Package Count */}
            <div className="flex flex-col space-y-1.5">
              <Label>Package Count</Label>
              <Input
          defaultValue={PackageCount }    
              type="number" {...register("PackageCount", { required: "Package Count is required" })} />
              {errors.PackageCount && <span className="text-destructive text-sm">{errors.PackageCount.message}</span>}
            </div>

             {/* Price */}
             <div className="flex flex-col space-y-1.5">
              <Label>Sell Price</Label>
              <Input 
         defaultValue={sellprice } 
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
        ) : (
          "Loading..."
        )}
      </div>
    </>
  );
};

export default Inventory_FinalProduct_Update;