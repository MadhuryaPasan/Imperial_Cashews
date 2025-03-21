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

const Sales_Product_Insert = () => {

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
        defaultValues: { name: null, category: null, created_date: null, description: null, image: null, size: null, month:null, price_per_unit:null,  stock_quantity:null},
      });
    

  return (
    <div><form onSubmit={handleSubmit(CreateDoc)}>
    <Card
      className={`w-[350px] ${
        errors.name || errors.category || errors.created_date || errors.description || errors.image || errors.size || errors.month || errors.price_per_unit || errors.stock_quantity
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
            <Label htmlFor="name">Name</Label>
            <Input
              
              placeholder="Insert Name"
              {...register("name", {
                required: "Name is required",
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
            {errors.name && (
              <span className="text-destructive">
                {errors.name.message}
              </span>
            )}
          </div>
          <div className="flex flex-col space-y-1.5">
            <Label htmlFor="category">Category</Label>
            <Input
              id="category"
              placeholder="Insert Category"
              {...register("category", {
                required: "Category is required",
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
            {errors.category && (
              <span className="text-destructive">{errors.category.message}</span>
            )}
          </div>
          <div className="flex flex-col space-y-1.5">
            <Label htmlFor="created_date">Created Date</Label>
            <Input
              id="created_date"
              placeholder="Insert Created Date"
              {...register("created_date", {
                required: "Created Date is required",
                min: { value: 0, message: "Minimum value is 0" },
                max: { value: 5.0, message: "Maximum value is 5.0" },
                pattern: {
                  value: /^[0-9.]+$/i,
                  message: "Only numbers can be inserted",
                },
              })}
              {...(isSubmitSuccessful ? { disabled: true } : {})}
            />
            {errors.created_date && (
              <span className="text-destructive">{errors.created_date.message}</span>
            )}
          </div>
          <div className="flex flex-col space-y-1.5">
            <Label htmlFor="description">Description</Label>
            <Input
              id="description"
              placeholder="Description"
              {...register("description", {
                required: "Description is required",
              })}
            />
            {errors.description && (
              <span className="text-destructive">
                {errors.description.message}
              </span>
            )}
          </div>
          <div className="flex flex-col space-y-1.5">
            <Label htmlFor="image">Image</Label>
            <Input
              id="image"
              placeholder="Image"
              {...register("image", {
                required: "Image is required",
              })}
            />
            {errors.image && (
              <span className="text-destructive">
                {errors.image.message}
              </span>
            )}
          </div>
          <div className="flex flex-col space-y-1.5">
            <Label htmlFor="size">Size</Label>
            <Input
              id="size"
              placeholder="Size"
              {...register("size", {
                required: "Size is required",
              })}
            />
            {errors.size && (
              <span className="text-destructive">
                {errors.size.message}
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
            {errors.month && (
              <span className="text-destructive">
                {errors.month.message}
              </span>
            )}
          </div>
          <div className="flex flex-col space-y-1.5">
            <Label htmlFor="price_per_unit">Price Per Unit</Label>
            <Input
              id="price_per_unit"
              placeholder="Price Per Unit"
              {...register("price_per_unit", {
                required: "Price per unit  is required",
              })}
            />
            {errors.price_per_unit && (
              <span className="text-destructive">
                {errors.price_per_unit.message}
              </span>
            )}
          </div>
          <div className="flex flex-col space-y-1.5">
            <Label htmlFor="stock_quantity">Stock Quantity</Label>
            <Input
              id="stock_quantity"
              placeholder="Stock Quantity"
              {...register("stock_quantity", {
                required: "Stock Qantity  is required",
              })}
            />
            {errors.stock_quantity && (
              <span className="text-destructive">
                {errors.stock_quantity.message}
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

export default Sales_Product_Insert