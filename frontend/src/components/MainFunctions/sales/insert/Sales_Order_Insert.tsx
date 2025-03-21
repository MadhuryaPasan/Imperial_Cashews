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

const Sales_Order_Insert = () => {

      // insert data
      const CreateDoc: SubmitHandler<any> = async (data) => {
        await createNew_Sales_Customer(data);
        // await new Promise(resolve => setTimeout(resolve, 3000));
        window.location.reload();
      };
    
      const {
        register,
        formState: { errors, isSubmitSuccessful },
        handleSubmit,
      } = useForm({
        defaultValues: { customer_id: null, order_date: null, status: null, order_price: null },
      });
    

  return (
    <div><form onSubmit={handleSubmit(CreateDoc)}>
    <Card
      className={`w-[350px] ${
        errors.customer_id|| errors.order_date || errors.status || errors.order_price
          ? "bg-destructive/5 outline-1 outline-destructive"
          : null
      } ${
        isSubmitSuccessful ? "bg-primary/5 outline-1 outline-primary" : null
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
                minLength: { value: 3, message: "Minimum 3 characters" },
                maxLength: {
                  value: 100,
                  message: "maximum 100 characters",
                },
                pattern: {
                  value: /^[A-Za-z ]+$/i,
                  message: "Only letters can be inserted",
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
            <Label htmlFor="order_date">Order Date</Label>
            <Input
              id="order_date"
              placeholder="Insert Order Date "
              {...register("order_date", {
                required: "Order date is required",
                min: {
                  value: 18,
                  message: "you need to be at least 18 years old",
                },
                max: { value: 100, message: "Maximum value is 100" },
                pattern: {
                  value: /^[0-9]+$/i,
                  message: "Only numbers can be inserted",
                },
              })}
              {...(isSubmitSuccessful ? { disabled: true } : {})}
            />
            {errors.order_date && (
              <span className="text-destructive">{errors.order_date.message}</span>
            )}
          </div>
          <div className="flex flex-col space-y-1.5">
            <Label htmlFor="status"> Status </Label>
            <Input
              id="status"
              placeholder="Insert Status"
              {...register("status", {
                required: "Status is required",
                min: { value: 0, message: "Minimum value is 0" },
                max: { value: 5.0, message: "Maximum value is 5.0" },
                pattern: {
                  value: /^[0-9.]+$/i,
                  message: "Only numbers can be inserted",
                },
              })}
              {...(isSubmitSuccessful ? { disabled: true } : {})}
            />
            {errors.status && (
              <span className="text-destructive">{errors.status.message}</span>
            )}
          </div>
          <div className="flex flex-col space-y-1.5">
            <Label htmlFor="order_price">Order Price</Label>
            <Input
              id="order_price"
              placeholder="Order Price"
              {...register("order_price", {
                required: "Order price is required",
              })}
            />
            {errors.order_price && (
              <span className="text-destructive">
                {errors.order_price.message}
              </span>
            )}
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button
          variant="outline"
          className=" border-1 border-primary cursor-pointer"
        >
          Cancel
        </Button>
        <Button
          className="cursor-pointer"
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