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
import { createNew_Sales_Product } from '@/utils/sales/Sales_Product_API';

const Sales_Product_Insert = () => {

  //month
  const currentMonth: string = new Date().toLocaleString("en-US", {
    month: "long",
  });

  // insert data
  const CreateDoc: SubmitHandler<any> = async (data) => {
    await createNew_Sales_Product(data);
    // await new Promise(resolve => setTimeout(resolve, 3000));
    window.location.reload();
  };

  const {
    register,
    formState: { errors, isSubmitSuccessful },
    handleSubmit,
  } = useForm({
    defaultValues: { name: null, category: null, created_date: null, description: null, image: null, size: null, month: currentMonth, price_per_unit: null, stock_quantity: null },
  });


  return (
    <div><form onSubmit={handleSubmit(CreateDoc)}>
      <Card
        className={` ${errors.name || errors.category || errors.created_date || errors.description || errors.image || errors.size || errors.month || errors.price_per_unit || errors.stock_quantity
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
              <Label htmlFor="name">Name</Label>
              <Input

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

                  pattern: {
                    value: /^[A-Za-z\s-]{3,50}$/i,
                    message: "Please enter a valid category",
                  },
                })}
                {...(isSubmitSuccessful ? { disabled: true } : {})}
              />
              {errors.category && (
                <span className="text-destructive">{errors.category.message}</span>
              )}
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="description">Description</Label>
              <Input
                id="description"
                placeholder="Description"
                {...register("description", {
                  required: "Description is required",
                  minLength: { value: 10, message: "Description must be at least 10 characters long" },
                  maxLength: { value: 500, message: "Description cannot exceed 500 characters" },
                  pattern: {
                    value: /^[A-Za-z0-9\s.,;!?'"-]{10,500}$/i,
                    message: "Please enter a valid description",
                  },
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
                  pattern: {
                    value: /^(.*\.(?:jpg|jpeg|png|gif|bmp))$/i,
                    message: "Please enter a valid image URL (jpg, jpeg, png, gif, bmp)",
                  },
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
                  min: { value: 1, message: "Size must be at least 1 gram" },
                  max: { value: 5000, message: "Size cannot exceed 5000 grams" },
                  pattern: {
                    value: /^\d+[0-9]?$/i,
                    message: "Please enter a valid size "
                  },
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
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="price_per_unit">Price Per Unit</Label>
              <Input
                id="price_per_unit"
                placeholder="Price Per Unit"
                {...register("price_per_unit", {
                  required: "Price per unit  is required",
                  min: { value: 1, message: "Price per unit must be at least 1" },
                  max: { value: 1000, message: "Price per unit cannot exceed 1000" },
                  pattern: {
                    value: /^\d+(\.\d{1,2})?$/i,
                    message: "Please enter a valid price per unit"
                  },
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
                  min: { value: 1, message: "Stock quantity must be at least 1" },
                  max: { value: 1000, message: "Stock quantity cannot exceed 10000" },
                  pattern: {
                    value: /^\d+$/i,
                    message: "Please enter a valid stock quantity (positive whole numbers)"
                  },
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
            className={`cursor-pointer w-full ${errors.name || errors.category || errors.created_date || errors.description || errors.image || errors.size || errors.month || errors.price_per_unit || errors.stock_quantity
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

export default Sales_Product_Insert