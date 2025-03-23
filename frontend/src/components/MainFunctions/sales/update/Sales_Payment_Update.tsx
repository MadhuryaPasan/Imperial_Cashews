import { SubmitHandler, useForm } from "react-hook-form"; // form validation // API
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
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { createNew_Sales_getDoc, createNew_Sales_updateDoc } from "@/utils/sales/Sales_Customer_API";
import { Sales_Payment_getDoc, Sales_Payment_updateDoc } from "@/utils/sales/Sales_Payment_API";




const Sales_Payment_Update: React.FC<any> = (currentData) => {
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
        let result = await Sales_Payment_getDoc(updateId);
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
    await Sales_Payment_updateDoc(updateId, data);
  };

  let order_id: string = data?.order_id;
  let customer_id: string = data?.customer_id;
  let payment_date: string = data?.payment_date;
  let amount_paid: string = data?.amount_paid;
  let payment_method: string = data?.payment_method;
  let status: string = data?.status;


  const {
    register,
    formState: { errors, isSubmitSuccessful },
    handleSubmit,
  } = useForm({
    defaultValues: { order_id: order_id, customer_id: customer_id, payment_date: payment_date, amount_paid: amount_paid, payment_method: payment_method, status: status },
  });

  return (
    <>
      <div>
        {data ? (
          <div><form onSubmit={handleSubmit(UpdateDoc)}>
                <Card
                  className={` ${errors.order_id || errors.customer_id || errors.payment_date || errors.amount_paid || errors.payment_method || errors.status
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
                        <Label htmlFor="order_id">Order ID</Label>
                        <Input
          defaultValue={order_id}
                          placeholder="Insert Order ID"
                          {...register("order_id", {
                            required: "Order ID is required",
                            minLength: { value: 8, message: "Order ID must be at least 8 characters long" },
                            maxLength: {
                              value: 24,
                              message: "Order ID cannot exceed 24 characters",
                            },
                            pattern: {
                              value: /^[A-Za-z0-9]{8,24}$/i,
                              message: "Please enter a valid order ID (alphanumeric, between 8 and 15 characters)",
                            },
                          })}
                          {...(isSubmitSuccessful ? { disabled: true } : {})}
                        />
                        {errors.order_id && (
                          <span className="text-destructive">
                            {errors.order_id.message}
                          </span>
                        )}
                      </div>
                      <div className="flex flex-col space-y-1.5">
                        <Label htmlFor="customer_id">Customer ID</Label>
                        <Input
                          id="customer_id"
                          defaultValue={customer_id}
                          placeholder="Insert Customer ID"
                          {...register("customer_id", {
                            required: "Customer ID is required",
                            min: {
                              value: 6,
                              message: "Customer ID must be at least 6 characters long",
                            },
                            max: { value: 24, message: "Customer ID cannot exceed 24 characters" },
                            pattern: {
                              value: /^[A-Za-z0-9]{6,24}$/i,
                              message: "Please enter a valid customer ID",
                            },
                          })}
                          {...(isSubmitSuccessful ? { disabled: true } : {})}
                        />
                        {errors.customer_id && (
                          <span className="text-destructive">{errors.customer_id.message}</span>
                        )}
                      </div>
          
                      <div className="flex flex-col space-y-1.5">
                        <Label htmlFor="amount_paid">Amount Paid</Label>
                        <Input
                          id="amount_paid"
                          defaultValue={amount_paid}
                          placeholder="Amount Paid"
                          {...register("amount_paid", {
                            required: "Amount Paid is required",
                            pattern: {
                              value: /^\d+(\.\d{1,2})?$/i,
                              message: "Please enter a valid amount paid (positive numbers with up to two decimal places)",
                            },
                          })}
                        />
                        {errors.amount_paid && (
                          <span className="text-destructive">
                            {errors.amount_paid.message}
                          </span>
                        )}
                      </div>
                      <div className="flex flex-col space-y-1.5">
                        <Label htmlFor="payment_method">Payment Method</Label>
                        <Input
                          id="payment_method"
                          defaultValue={payment_method}
                          placeholder="Payment Method (credit, debit, cash, or online)"
                          {...register("payment_method", {
                            required: "Payment Method is required",
                            pattern: {
                              value: /^(credit|debit|cash|online)$/i,
                              message: "Please enter a valid payment method (credit, debit, cash, or online)",
                            },
                          })}
                        />
                        {errors.payment_method && (
                          <span className="text-destructive">
                            {errors.payment_method.message}
                          </span>
                        )}
                      </div>
                      <div className="flex flex-col space-y-1.5">
                        <Label htmlFor="status">Status</Label>
                        <Input
                          id="status"
                          defaultValue={status}
                          placeholder="Status (active, inactive, or pending)"
                          {...register("status", {
                            required: "Status is required",
                            pattern: {
                              value: /^(active|inactive|pending)$/i,
                              message: "Please enter a valid status (active, inactive, or pending)",
                            },
                          })}
                        />
                        {errors.status && (
                          <span className="text-destructive">
                            {errors.status.message}
                          </span>
                        )}
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    <Button
                      className={`cursor-pointer w-full ${errors.order_id || errors.customer_id || errors.payment_date || errors.amount_paid || errors.payment_method || errors.status
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

export default Sales_Payment_Update;