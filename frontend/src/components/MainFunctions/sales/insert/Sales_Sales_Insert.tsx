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

const Sales_Sales_Insert = () => {

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
        defaultValues: { customer_id: null, sales_date: null, sales_status: null, payment_status: null, total_amount: null, unit_price: null, quantity: null, month: null },
      });
    

  return (
    <div><form onSubmit={handleSubmit(CreateDoc)}>
    <Card
      className={`w-[350px] ${
        errors.customer_id || errors.sales_date || errors.sales_status || errors.payment_status || errors.total_amount || errors.unit_price || errors.quantity || errors.month
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
            <Label htmlFor="sales_date">Sales Date</Label>
            <Input
              id="sales_date"
              placeholder="Insert Sales Date"
              {...register("sales_date", {
                required: "Sales Date is required",
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
            {errors.sales_date && (
              <span className="text-destructive">{errors.sales_date.message}</span>
            )}
          </div>
          <div className="flex flex-col space-y-1.5">
            <Label htmlFor="sales_status">Sales Status</Label>
            <Input
              id="sales_status"
              placeholder="Insert Sales Status"
              {...register("sales_status", {
                required: "Sales Status is required",
                min: { value: 0, message: "Minimum value is 0" },
                max: { value: 5.0, message: "Maximum value is 5.0" },
                pattern: {
                  value: /^[0-9.]+$/i,
                  message: "Only numbers can be inserted",
                },
              })}
              {...(isSubmitSuccessful ? { disabled: true } : {})}
            />
            {errors.sales_status && (
              <span className="text-destructive">{errors.sales_status.message}</span>
            )}
          </div>
          <div className="flex flex-col space-y-1.5">
            <Label htmlFor="payment_status">Payment Status</Label>
            <Input
              id="payment_status"
              placeholder="Payment Status"
              {...register("payment_status", {
                required: "Payment Status is required",
              })}
            />
            {errors.payment_status&& (
              <span className="text-destructive">
                {errors.payment_status.message}
              </span>
            )}
          </div>
          <div className="flex flex-col space-y-1.5">
            <Label htmlFor="total_amount">Total Amount</Label>
            <Input
              id="total_amount"
              placeholder="Total Amount"
              {...register("total_amount", {
                required: " Total Amount is required",
              })}
            />
            {errors.total_amount&& (
              <span className="text-destructive">
                {errors.total_amount.message}
              </span>
            )}
          </div>
          <div className="flex flex-col space-y-1.5">
            <Label htmlFor="unit_price">Unit Price</Label>
            <Input
              id="unit_price"
              placeholder="Unit Price"
              {...register("unit_price", {
                required: " Unit Price is required",
              })}
            />
            {errors.unit_price&& (
              <span className="text-destructive">
                {errors.unit_price.message}
              </span>
            )}
          </div>
          <div className="flex flex-col space-y-1.5">
            <Label htmlFor="quantity">Quantity</Label>
            <Input
              id="quantity"
              placeholder="Quantity"
              {...register("quantity", {
                required: "Quantity is required",
              })}
            />
            {errors.quantity&& (
              <span className="text-destructive">
                {errors.quantity.message}
              </span>
            )}
          </div>
          <div className="flex flex-col space-y-1.5">
            <Label htmlFor="month">Month</Label>
            <Input
              id="month"
              placeholder="Month"
              {...register("month", {
                required: "Month is required",
              })}
            />
            {errors.month&& (
              <span className="text-destructive">
                {errors.month.message}
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

export default Sales_Sales_Insert