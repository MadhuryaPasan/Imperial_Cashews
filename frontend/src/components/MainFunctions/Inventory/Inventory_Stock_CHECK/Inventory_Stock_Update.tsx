import { SubmitHandler, useForm } from "react-hook-form"; // form validation
import {
  Inventory_Stock_getDoc,
  Inventory_Stock_updateDoc,
} from "@/utils/inventory/Inventory_Stock_API";// API
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

  let item_name: string = data?. item_name;
  let min_stock: string = data?.min_stock;
  let max_stock: string = data?.max_stock;
  let currentStock: string = data?.currentStock;
  let lastUpdateTime: string = data?.lastUpdateTime;
  let note : string = data?.note ;
  let ReorderLevel: string = data?.ReorderLevel ;
  

  const {
    register,
    formState: { errors, isSubmitSuccessful },
    handleSubmit,
  } = useForm({
    defaultValues: {
     /*1*/ item_name: item_name,
    /*2*/ min_stock: min_stock,
    /*3*/ max_stock: max_stock,
    /*4*/ currentStock : currentStock,
    /*5*/ lastUpdateTime: lastUpdateTime,                    
    /*6*/ note: note,
          ReorderLevel :ReorderLevel
   },
  });


  return (
    <>
      <div>
        {data ? (
          
          <div className=" ]">
          <form onSubmit={handleSubmit(UpdateDoc)}>
            <Card className={`  ${
              errors.item_name || errors.min_stock || errors.max_stock || errors.currentStock || errors.lastUpdateTime || errors.note || errors.ReorderLevel
                ? "bg-destructive/5 outline-1 outline-destructive"
                : null
            } ${isSubmitSuccessful ? "bg-primary/10 outline-1 outline-primary" : null}`}>
              <CardHeader>
                <CardTitle>Insert Inventory Stock</CardTitle>
                <CardDescription>Insert new inventory stock record</CardDescription>
              </CardHeader>
              <CardContent>
                {/* Item Name */}
                <div className="flex flex-col space-y-1.5">
                  <Label>Item Name</Label>
                  <Input
                    disabled
                    value="Raw Cashew nut"
                    {...register("item_name", {
                      required: "Item name is required",
                    })}
                  />
                  {errors.item_name && (
                    <span className="text-destructive text-sm">
                      {errors.item_name.message}
                    </span>
                  )}
                </div>
                
                {/* Min Stock */}
                <div className="flex flex-col space-y-1.5">
                  <Label>Min Stock</Label>
                  <Input
                    disabled
                    value="100KG"
                    {...register("min_stock", {
                      required: "Min stock is required",
                    })}
                  />
                  {errors.min_stock && (
                    <span className="text-destructive text-sm">
                      {errors.min_stock.message}
                    </span>
                  )}
                </div>
                
                {/* Max Stock */}
                <div className="flex flex-col space-y-1.5">
                  <Label>Max Stock</Label>
                  <Input
                    disabled
                    value="500KG"
                    {...register("max_stock", {
                      required: "Max stock is required",
                    })}
                  />
                  {errors.max_stock && (
                    <span className="text-destructive text-sm">
                      {errors.max_stock.message}
                    </span>
                  )}
                </div>
                
                {/* Current Stock */}
                <div className="flex flex-col space-y-1.5">
                  <Label>Current Stock</Label>
                  <Input
                    {...register("currentStock", {
                      required: "Current stock is required",
                      pattern: {
                        value: /^[0-9]+(KG)$/i,
                        message: "Current stock should be a number followed by 'KG'",
                      },
                    })}
                  />
                  {errors.currentStock && (
                    <span className="text-destructive text-sm">
                      {errors.currentStock.message}
                    </span>
                  )}
                </div>
  
                {/* Last Update Time */}
                <div className="flex flex-col space-y-1.5">
                  <Label>Last Update Time</Label>
                  <Input
                    disabled
                    {...register("lastUpdateTime", {
                      required: "Last update time is required",
                    })}
                  />
                  {errors.lastUpdateTime && (
                    <span className="text-destructive text-sm">
                      {errors.lastUpdateTime.message}
                    </span>
                  )}
                </div>
  
                {/* Note */}
                <div className="flex flex-col space-y-1.5">
                  <Label>Note</Label>
                  <Textarea
                    id="note"
                    placeholder="Enter note"
                    {...register("note", {
                      required: "Note is required",
                      minLength: {
                        value: 5,
                        message: "Note should be at least 5 characters",
                      },
                      maxLength: {
                        value: 100,
                        message: "Note should be at most 100 characters",
                      },
                    })}
                  />
                  {errors.note && (
                    <span className="text-destructive text-sm">
                      {errors.note.message}
                    </span>
                  )}
                </div>
  
                {/* Reorder Level */}
                <div className="flex flex-col space-y-1.5">
                  <Label>Reorder Level</Label>
                  <Input
                    disabled
                    value="50KG"
                    {...register("ReorderLevel", {
                      required: "Reorder level is required",
                    })}
                  />
                  {errors.ReorderLevel && (
                    <span className="text-destructive text-sm">
                      {errors.ReorderLevel.message}
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
         ) : (
          "Loading..."
        )}
      </div>
    </>
  );
};

export default Inventory_Stock_Update;