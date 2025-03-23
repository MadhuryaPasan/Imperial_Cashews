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




const Finance_PettyCash_update: React.FC<any> = (currentData) => {
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
        let result = await Finance_PettyCash_getDoc(updateId);
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
    await Finance_PettyCash_updateDoc(updateId, data);
  };

  let Description: string = data?.description;
  let Amount: string = data?.amount;
  const {
    register,
    formState: { errors, isSubmitSuccessful },
    handleSubmit,
  } = useForm({
    defaultValues: {
      description: Description,
      amount: Amount,
      transaction_type: "Expenses",
      month: currentMonth,
    },
  });

  return (
    <>
      <div>
        {data ? (
          <div>
            <form onSubmit={handleSubmit(UpdateDoc)}>
              <Card
                className={` p-[25px]   ${
                  errors.transaction_type ||
                  errors.description ||
                  errors.month ||
                  errors.amount
                    ? "bg-destructive/5 outline-1 outline-destructive"
                    : null
                } ${
                  isSubmitSuccessful
                    ? "bg-primary/10 outline-1 outline-primary"
                    : null
                }`}
              >
                <CardHeader>
                  <CardTitle>Insert Petty Cash</CardTitle>
                  <CardDescription>
                    Insert new petty cash record
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-col space-y-1.5">
                    <Label>Transaction Type</Label>
                    <Input
                      disabled
                      value="Expenses"
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
                      id="description"
                      defaultValue={Description}
                      placeholder="Enter description"
                      {...register("description", {
                        required: "Description is required",
                        minLength: {
                          value: 5,
                          message:
                            "Description should be at least 5 characters",
                        },
                        maxLength: {
                          value: 100,
                          message:
                            "Description should be at most 100 characters",
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
                      value={currentMonth}
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
                    defaultValue={Amount}
                      {...register("amount", {
                        required: " Amount is required",
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

                <CardFooter>
                  <Button className="w-full">
                    {isSubmitSuccessful ? "Submitted" : "Submit"}
                  </Button>
                </CardFooter>
              </Card>
            </form>
          </div>
        ) : (
          "Loading..."
        )}
      </div>
    </>
  );
};

export default Finance_PettyCash_update;
