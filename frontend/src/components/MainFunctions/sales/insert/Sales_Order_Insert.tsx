import React from 'react'
import { Button } from "@/components/ui/button";
import { SubmitHandler, useForm } from "react-hook-form";
import { createNew } from "@/utils/dbAPI";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

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
import { useState } from "react";
import { createNew_Sales_Customer } from '@/utils/sales/Sales_Customer_API';
import { createNew_Sales_Order } from '@/utils/sales/Sales_Order_API';

const Sales_Order_Insert = () => {

  // insert data
  const CreateDoc: SubmitHandler<any> = async (data) => {
    await createNew_Sales_Order(data);
    // await new Promise(resolve => setTimeout(resolve, 3000));
    window.location.reload();
  };

  const {
    register,
    formState: { errors, isSubmitSuccessful },
    handleSubmit,
  } = useForm({
    defaultValues: { customer_id: null, order_date: null, status: null, total_price: null },
  });


  return (
    <div><form onSubmit={handleSubmit(CreateDoc)}>
      <Card
        className={`${errors.customer_id || errors.order_date || errors.status || errors.total_price
          ? "bg-destructive/5 outline-1 outline-destructive"
          : null
          } ${isSubmitSuccessful ? "bg-primary/5 outline-1 outline-primary" : null
          }`}
      >
        <CardHeader>
          <CardTitle>Insert Now</CardTitle>
          <CardDescription>Insert new data to the table</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="customer_id">Customer ID</Label>
              <Input

                placeholder="Insert Customer ID"
                {...register("customer_id", {
                  required: "Customer ID is required",
                  minLength: { value: 6, message: "Customer ID must be at least 6 characters long" },
                  maxLength: {
                    value: 24,
                    message: "Customer ID cannot exceed 24 characters",
                  },
                  pattern: {
                    value: /^[A-Za-z0-9]{6,24}$/i,
                    message: "Please enter a valid customer ID",
                  },
                })}
                {...(isSubmitSuccessful ? { disabled: true } : {})}
              />
              {errors.customer_id && (
                <span className="text-destructive">
                  {errors.customer_id.message}
                </span>
              )}
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="status"> Status </Label>
              <Input
                id="status"
                placeholder="Insert Status (active, inactive, or pending)"
                {...register("status", {
                  required: "Status is required",

                  pattern: {
                    value: /^(active|inactive|pending)$/i,
                    message: "Please enter a valid status (active, inactive, or pending)",
                  },
                })}
                {...(isSubmitSuccessful ? { disabled: true } : {})}
              />
              {errors.status && (
                <span className="text-destructive">{errors.status.message}</span>
              )}
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="total_price">Total Price</Label>
              <Input
                id="total_price"
                placeholder="total_price"
                {...register("total_price", {
                  required: "Total price is required",
                  pattern: {
                    value: /^\d+(\.\d{1,2})?$/i,
                    message: "Please enter a valid total price (positive numbers with up to two decimal places)",
                  },

                })}
              />
              {errors.total_price && (
                <span className="text-destructive">
                  {errors.total_price.message}
                </span>
              )}
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button
            className={`cursor-pointer w-full ${errors.customer_id || errors.order_date || errors.status || errors.total_price
                ? "bg-destructive/50 hover:bg-destructive/70 cursor-not-allowed animate-pulse"
                : null
              }`}
            type="submit"
            {...(isSubmitSuccessful ? { disabled: true } : {})}
          >
            {isSubmitSuccessful ? "Submitted" : "Submit"}
          </Button>
        </CardFooter>
      </Card>
    </form></div>
  )
}

export default Sales_Order_Insert