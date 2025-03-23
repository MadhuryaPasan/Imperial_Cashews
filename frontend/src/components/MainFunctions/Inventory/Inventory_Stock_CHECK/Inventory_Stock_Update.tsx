import { SubmitHandler, useForm } from "react-hook-form"; // form validation
import {
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
import {Inventory_Stock_getDoc,Inventory_Stock_updateDoc } from "@/utils/inventory/Inventory_Stock_API";




const Inventory_Stock_Update: React.FC<any> = (currentData) => {
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
        let result = await Inventory_Stock_getDoc(updateId);
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
    await Inventory_Stock_updateDoc(updateId, data);
  };

  /* itemname: req.body.itemname,
      minstock: req.body.minstock,
      maxstock : req.body.maxstock ,
      currentStock: req.body.currentStock,
      description: req.body.description,*/

  let itemname: string = data?.itemname;
  let minstock: string = data?.minstock;
  let maxstock: string = data?.maxstock;
  let currentStock: string = data?.currentStock;
  let description: string = data?.description;
  

  const {
    register,
    formState: { errors, isSubmitSuccessful },
    handleSubmit,
  } = useForm({
    defaultValues: {
      itemname:itemname,
      minstock:minstock,
      maxstock:maxstock,
      currentStock:currentStock,
      description:description,
    
    },
  });
  return (
    <>
      <div>
        {data ? (
           <div>
           <form onSubmit={handleSubmit(UpdateDoc)}>
             <Card className={` p-[25px]   ${
               errors.itemname || errors.minstock ||errors.maxstock||errors.currentStock||errors.description
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
                   <Label>Position</Label>
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

             
            </CardContent>

            <CardFooter>
              <Button className="w-full">
                {isSubmitSuccessful ? "Submitted" : "Submit"}
              </Button>
            </CardFooter>
          </Card>
        </form></div>
        ) : (
          "Loading..."
        )}
      </div>
    </>
  );
};

export default Inventory_Stock_Update;