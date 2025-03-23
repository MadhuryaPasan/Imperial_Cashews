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
import { createNew_Sales_Sales } from '@/utils/sales/Sales_Sales_API';

const Sales_Sales_Insert = () => {

  //month
  const currentMonth: string = new Date().toLocaleString("en-US", {
    month: "long",
  });

  // insert data
  const CreateDoc: SubmitHandler<any> = async (data) => {
    await createNew_Sales_Sales(data);
    // await new Promise(resolve => setTimeout(resolve, 3000));
    window.location.reload();
  };

  const {
    register,
    formState: { errors, isSubmitSuccessful },
    handleSubmit,
  } = useForm({
    defaultValues: { customer_id: null, sales_date: null, sales_status: null, payment_status: null, total_amount: null, unit_price: null, quantity: null, month: currentMonth },
  });


  return (
    <div><form onSubmit={handleSubmit(CreateDoc)}>
      <Card
        className={`${errors.customer_id || errors.sales_date || errors.sales_status || errors.payment_status || errors.total_amount || errors.unit_price || errors.quantity || errors.month
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
              <Label htmlFor="sales_status">Sales Status</Label>
              <Input
                id="sales_status"
                placeholder="Insert Sales Status (completed|pending|canceled)"
                {...register("sales_status", {
                  required: "Sales Status is required",

                  pattern: {
                    value: /^(completed|pending|canceled)$/i,
                    message: "Please enter a valid sales status (completed, pending, or canceled)",
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
                placeholder="Payment Status (paid|pending|failed)"
                {...register("payment_status", {
                  required: "Payment Status is required",
                  pattern: {
                    value: /^(paid|pending|failed)$/i,
                    message: "Please enter a valid payment status (paid, pending, or failed)",
                  },
                })}
              />
              {errors.payment_status && (
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
                  pattern: {
                    value: /^\d+(\.\d{1,2})?$/i,
                    message: "Please enter a valid total amount (positive numbers with up to two decimal places)",
                  },
                })}
              />
              {errors.total_amount && (
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
                  pattern: {
                    value: /^\d+(\.\d{1,2})?$/i,
                    message: "Please enter a valid unit price (positive numbers with up to two decimal places)",
                  },
                })}
              />
              {errors.unit_price && (
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
                  minLength: { value: 1, message: "Quantity must be at least 1" },
                  maxLength: {
                    value: 100,
                    message: "Quantity cannot exceed 100.",
                  },
                  pattern: {
                    value: /^\d+[0-9]?$/i,
                    message: "Please enter a valid quantity ",
                  },
                })}
              />
              {errors.quantity && (
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
                disabled
                value={currentMonth}
                {...register("month", {
                  required: "month is required",
                })}
              />
              {errors.month && (
                <span className="text-destructive">
                  {errors.month.message}
                </span>
              )}
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button
            className={`cursor-pointer w-full ${errors.customer_id || errors.sales_date || errors.sales_status || errors.payment_status || errors.total_amount || errors.unit_price || errors.quantity || errors.month
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

export default Sales_Sales_Insert