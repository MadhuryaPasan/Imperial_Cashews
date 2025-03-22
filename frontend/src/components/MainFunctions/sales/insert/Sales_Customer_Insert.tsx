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

const Sales_Customer_Insert = () => {

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
        defaultValues: { address: null, contact_number: null, email: null, name: null, created_date:null, orders_count:null, total_spent:null},
      });
    

  return (
    <div><form onSubmit={handleSubmit(CreateDoc)}>
    <Card
      className={`w-[350px] ${
        errors.address || errors.contact_number || errors.email || errors.name || errors.created_date || errors. orders_count ||  errors. total_spent
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
            <Label htmlFor="address">Address</Label>
            <Input
              
              placeholder="Insert Address"
              {...register("address", {
                required: "Address is required",
                minLength: { value: 5, message: "Minimum 5 characters" },
                maxLength: {
                  value: 100,
                  message: "maximum 100 characters",
                },
                pattern: {
                  value: /^[A-Za-z0-9\s,.-/#]+$/i,
                  message: "Please enter a valid address."

                },
              })}
              {...(isSubmitSuccessful ? { disabled: true } : {})}
            />
            {errors.address && (
              <span className="text-destructive">
                {errors.address.message}
              </span>
            )}
          </div>
          <div className="flex flex-col space-y-1.5">
            <Label htmlFor="contact_number">Contact Number</Label>
            <Input
              
              placeholder="Contact Number"
              {...register("contact_number", {
                required: "Contact Number is required",
          
                pattern: {
                  value: /^\+?\d{1,4}?[-.\s]?\(?\d{2,4}?\)?[-.\s]?\d{3,4}[-.\s]?\d{3,6}$/i,
                  message: "Please enter a valid contact number (7 to 15 digits)."

                },
              })}
              {...(isSubmitSuccessful ? { disabled: true } : {})}
            />
            {errors.contact_number && (
              <span className="text-destructive">
                {errors.contact_number.message}
              </span>
            )}
          </div>
          <div className="flex flex-col space-y-1.5">
            <Label htmlFor="email">Email</Label>
            <Input
              
              placeholder="Insert Email"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[\w\.-]+@[\w\.-]+\.\w{2,}$/i,
                  message: "Please enter a valid email address.",
                },
              })}
              {...(isSubmitSuccessful ? { disabled: true } : {})}
            />
            {errors.email && (
              <span className="text-destructive">{errors.email.message}</span>
            )}
          </div>
          <div className="flex flex-col space-y-1.5">
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              placeholder="Insert Name"
              {...register("name", {
                required: "Name is required",
                minLength: { value: 2, message: "Name must be at least 2 characters long" },
                maxLength: { value: 50, message: "Name cannot exceed 50 characters" },
                pattern: {
                  value: /^[A-Za-z\s'-]{2,50}$/i,
                  message: "Please enter a valid name (only letters, spaces, apostrophes, and hyphens, between 2 to 50 characters)",
                },
              })}
              {...(isSubmitSuccessful ? { disabled: true } : {})}
            />
            {errors.name&& (
              <span className="text-destructive">{errors.name.message}</span>
            )}
          </div>
          <div className="flex flex-col space-y-1.5">
            <Label htmlFor="created_date">Created Date</Label>
            <Input
              id="created_date"
              placeholder="Created Date"
              {...register("created_date", {
                required: "Created Date is required",
              
                pattern: {
                  value: /^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])$ /i,
                  message: "Please enter a valid date in YYYY-MM-DD format",
                },
              })}
            />
            {errors.created_date && (
              <span className="text-destructive">
                {errors.created_date.message}
              </span>
            )}
          </div>
          <div className="flex flex-col space-y-1.5">
            <Label htmlFor="orders_count">Orders Count</Label>
            <Input
              id="orders_count"
              placeholder="Orders Count"
              {...register("orders_count", {
                required: "Orders Count is required",
                min: { value: 1, message: "Order count must be at least 1" },
                max: { value: 100, message: "Order count cannot exceed 1000" },
                pattern: {
                  value: /^\d+$/i,
                  message: "Please enter a valid order count (only positive whole numbers)",
                },
              })}
              {...(isSubmitSuccessful ? { disabled: true } : {})}
            />
            {errors.orders_count&& (
              <span className="text-destructive">{errors.orders_count.message}</span>
            )}
          </div>
          <div className="flex flex-col space-y-1.5">
            <Label htmlFor="total_spent">Total Spent</Label>
            <Input
              id="total_spent"
              placeholder="Insert Total Spent"
              {...register("total_spent", {
                required: "Total Spent is required",
              
                pattern: {
                  value: /^\d+(\.\d{1,2})?$ /i,
                  message: "Please enter a valid total spent amount (positive numbers with up to two decimal places)",
                },
              })}
              {...(isSubmitSuccessful ? { disabled: true } : {})}
            />
            {errors.total_spent&& (
              <span className="text-destructive">{errors.total_spent.message}</span>
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

export default Sales_Customer_Insert