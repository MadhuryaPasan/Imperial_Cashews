import { SubmitHandler, useForm } from "react-hook-form"; // form validation
import {
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

import { Textarea } from "@/components/ui/textarea";

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { createNew_Sales_getDoc, createNew_Sales_updateDoc } from "@/utils/sales/Sales_Customer_API";




const Sales_Customer_Update: React.FC<any> = (currentData) => {
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
        let result = await createNew_Sales_getDoc(updateId);
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
    await createNew_Sales_updateDoc(updateId, data);
  };

  let address: string = data?.address;
  let contact_number: string = data?.contact_number;
  let email: string = data?.email;
  let name: string = data?.name;
  let orders_count: string = data?.orders_count;
  let total_spent: string = data?.total_spent;

  const {
    register,
    formState: { errors, isSubmitSuccessful },
    handleSubmit,
  } = useForm({
    defaultValues: { address: address, contact_number: contact_number, email: email, name: name, created_date: null, orders_count: orders_count, total_spent: total_spent },
  });

  return (
    <>
      <div>
        {data ? (
          <div><form onSubmit={handleSubmit(UpdateDoc)}>
                <Card
                  className={` ${errors.address || errors.contact_number || errors.email || errors.name || errors.created_date || errors.orders_count || errors.total_spent
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
                          id="name"
                          defaultValue={name}
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
                          <span className="text-destructive">{errors.name.message}</span>
                        )}
                      </div>
                      <div className="flex flex-col space-y-1.5">
                        <Label htmlFor="address">Address</Label>
                        <Input
          defaultValue={address}
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
          defaultValue={contact_number}
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
          defaultValue={email}
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
                        <Label htmlFor="orders_count">Orders Count</Label>
                        <Input
                          id="orders_count"
                          defaultValue={orders_count}
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
                        {errors.orders_count && (
                          <span className="text-destructive">{errors.orders_count.message}</span>
                        )}
                      </div>
                      <div className="flex flex-col space-y-1.5">
                        <Label htmlFor="total_spent">Total Spent</Label>
                        <Input
                          id="total_spent"
                          placeholder="Insert Total Spent"
                          defaultValue={total_spent}
                          {...register("total_spent", {
                            required: "Total Spent is required",
          
                            pattern: {
                              value: /^\d+(\.\d{1,2})?$/,
                              message: "Please enter a valid total spent amount (positive numbers with up to two decimal places)",
                            },
                          })}
                          {...(isSubmitSuccessful ? { disabled: true } : {})}
                        />
                        {errors.total_spent && (
                          <span className="text-destructive">{errors.total_spent.message}</span>
                        )}
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    <Button
                      className={`cursor-pointer w-full ${
                        errors.address || errors.contact_number || errors.email || errors.name || errors.created_date || errors.orders_count || errors.total_spent
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
        ) : (
          "Loading..."
        )}
      </div>
    </>
  );
};

export default Sales_Customer_Update;