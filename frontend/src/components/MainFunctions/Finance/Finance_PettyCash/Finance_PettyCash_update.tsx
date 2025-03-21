import { SubmitHandler, useForm } from "react-hook-form"; // form validation
import {
  Finance_PettyCash_createNew,
  Finance_PettyCash_getDoc,
  Finance_PettyCash_updateDoc,
} from "@/utils/Finance/Finance_PettyCash_API"; // API
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
import { Textarea } from "@/components/ui/textarea";

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { use, useEffect, useState } from "react";
import {
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";

// const Finance_PettyCash_update = ({ UpdateId,currentData }: any) => {
const Finance_PettyCash_update:React.FC<any> = (currentData) => {
  // get current month
  const currentMonth: string = new Date().toLocaleString("en-US", {
    month: "long",
  });

console.log(currentData);
  
 


  // insert data
  const UpdateDoc: SubmitHandler<any> = async (data) => {
    await Finance_PettyCash_updateDoc(currentData._id, data);
  };

  // form validation and submission

  const {
    register,
    formState: { errors, isSubmitSuccessful },
    handleSubmit,
  } = useForm({
    defaultValues: {
      description: "",
      amount: "",
      transaction_type: "Expenses",
      month: currentMonth,
    },
  });

  // console.log(typeof currentDescription);
  // console.log(typeof currentAmount);

  return (
    <>
      <DialogHeader>
        <DialogTitle>Update Now.</DialogTitle>
        <DialogDescription>
          You are about to update this record.
        </DialogDescription>
      </DialogHeader>
      <Separator />

      <Card
        className={` m-3  ${
          errors.transaction_type ||
          errors.description ||
          errors.month ||
          errors.amount
            ? "bg-destructive/5 outline-1 outline-destructive"
            : null
        } ${
          isSubmitSuccessful ? "bg-primary/10 outline-1 outline-primary" : null
        }`}
      >
        <form onSubmit={handleSubmit(UpdateDoc)}>
          <CardContent>
            <div className="flex flex-col space-y-1.5">
              <Label>Transaction Type</Label>
              <Input
                disabled
                {...register("transaction_type", {
                  required: "error",
                })}
              />
              {errors.transaction_type && (
                <span className="text-destructive text-sm">
                  {errors.transaction_type.message}
                </span>
              )}
            </div>
            {/* Transaction Description */}
            <div className="flex flex-col space-y-1.5">
              <Label>Transaction Description</Label>
              <Textarea

                {...register("description", {
                  required: "Description is required",
                  minLength: {
                    value: 5,
                    message: "Description should be at least 5 characters",
                  },
                  maxLength: {
                    value: 100,
                    message: "Description should be at most 100 characters",
                  },
                  pattern: {
                    value: /^[A-Za-z.-_ ]+$/i,
                    message: "Only letters",
                  },
                })}
              />

              {errors.description && (
                <span className="text-destructive text-sm">
                  {errors.description.message}
                </span>
              )}
            </div>
            {/* month */}
            <div className="flex flex-col space-y-1.5">
              <Label>Month</Label>
              <Input
                disabled
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
            {/* amount */}
            <div className="flex flex-col space-y-1.5">
              <Label>Amount (Rs.)</Label>
              <Input
                {...register("amount", {
                  min: {
                    value: 1,
                    message: "Amount should be at least 1",
                  },
                  max: {
                    value: 1000000,
                    message: "Amount should be at most 1000000",
                  },
                  pattern: {
                    value: /^[0-9]+$/i,
                    message: "Only numbers",
                  },
                })}
              />

              {errors.amount && (
                <span className="text-destructive text-sm">
                  {errors.amount.message}
                </span>
              )}
            </div>
          </CardContent>

          <CardFooter className="flex flex-col">
            <Button
              type="submit"
              className={`cursor-pointer w-full ${
                errors.transaction_type ||
                errors.description ||
                errors.month ||
                errors.amount
                  ? "bg-destructive/50 hover:bg-destructive/70 cursor-not-allowed animate-pulse"
                  : null
              }`}
              // {...(currentType === "Replenishment" && {
              //   disabled: true,
              //   className: "bg-destructive/50 w-full",
              // })}
            >
              {isSubmitSuccessful ? "Updated" : "update"}
            </Button>
          </CardFooter>
        </form>
        <DialogClose asChild>
          <div className="flex flex-col items-center w-full ">
            <Button
              variant="outline"
              className="my-2 mx-0.5 border-1 border-primary w-full"
            >
              Close
            </Button>
          </div>
        </DialogClose>
      </Card>
    </>
  );
};

export default Finance_PettyCash_update;
