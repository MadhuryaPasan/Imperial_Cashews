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
import { Finance_BalanceSheet_getDoc, Finance_BalanceSheet_updateDoc } from "@/utils/Finance/Finance_BalanceSheet_API";




const Finance_BalanceSheet_Update: React.FC<any> = (currentData) => {
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
        let result = await Finance_BalanceSheet_getDoc(updateId);
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
    await Finance_BalanceSheet_updateDoc(updateId, data);
  };

  let month: string = data?.month;
  let description: string = data?.description;
  let Bank_Balance: string = data?.assets.Bank_Balance;
  let Inventory_Value: string = data?.assets.Inventory_Value;
  let Account_Receivable: string = data?.assets.Bank_Balance;
  let Equipment_Machinery: string = data?.assets.Equipment_Machinery;
  let Accounts_Payable: string = data?.Liabilities.Accounts_Payable;
  let Loan_Payable: string = data?.Liabilities.Loan_Payable;
  let Taxes_Payable: string = data?.Liabilities.Taxes_Payable;
  let Owners_Capital: string = data?.Equity.Owners_Capital;
  let Retained_Earnings: string = data?.Equity.Retained_Earnings;
  


  const {
    register,
    formState: { errors, isSubmitSuccessful },
    handleSubmit,
  } = useForm({
    defaultValues: {
      month: month,
      description: description,
      Bank_Balance: Bank_Balance,
      Inventory_Value: Inventory_Value,
      Account_Receivable: Account_Receivable,
      Equipment_Machinery: Equipment_Machinery,
      Accounts_Payable: Accounts_Payable,
      Loan_Payable: Loan_Payable,
      Taxes_Payable: Taxes_Payable,
      Owners_Capital: Owners_Capital,
      Retained_Earnings: Retained_Earnings,
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
                errors.month ||
                errors.description ||
                errors.Bank_Balance ||
                errors.Inventory_Value ||
                errors.Account_Receivable ||
                errors.Equipment_Machinery ||
                errors.Accounts_Payable ||
                errors.Loan_Payable ||
                errors.Taxes_Payable ||
                errors.Owners_Capital ||
                errors.Retained_Earnings
                  ? "bg-destructive/5 outline-1 outline-destructive"
                  : null
              } ${
                isSubmitSuccessful
                  ? "bg-primary/10 outline-1 outline-primary"
                  : null
              }`}
            >
              <CardHeader>
                <CardTitle>Insert Balance Sheet</CardTitle>
                <CardDescription>Insert new Balance Sheet record</CardDescription>
              </CardHeader>
              <CardContent>
                {/* month */}
                <div className="flex flex-col space-y-1.5">
                  <Label>Month</Label>
                  <Input
                    disabled
                    value={month}
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
  
                {/* Transaction Description */}
                <div className="flex flex-col space-y-1.5">
                  <Label>Description</Label>
                  <Textarea
                  defaultValue={description}
                    id="description"
                    placeholder="Enter description"
                    {...register("description", {
                      required: "Description is required",
                      minLength: {
                        value: 5,
                        message: "Description should be at least 5 characters",
                      },
                      maxLength: {
                        value: 500,
                        message: "Description should be at most 500 characters",
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
  
                {/* <div className=" flex flex-row justify-between gap-5"> */}
                  {/*Account Receivable */}
                  <div>
                    {/* 	Bank Balance */}
                    <div className="flex flex-col space-y-1.5">
                      <Label> Bank Balance(Rs.)</Label>
                      <Input
                      defaultValue={Bank_Balance}
                        {...register("Bank_Balance", {
                          required: " Amount is required",
                          // min: {
                          //   value: 1,
                          //   message: "Please enter 0 if no amount",
                          // },
                          max: {
                            value: 100000000,
                            message: "Amount should be at most 100000000",
                          },
                          pattern: {
                            value: /^[0-9.-]+$/i,
                            message: "Only numbers",
                          },
                        })}
                      />
                  
                      {errors.Bank_Balance && (
                        <span className="text-destructive text-sm">
                          {errors.Bank_Balance.message}
                        </span>
                      )}
                    </div>
                  
                    {/* 	Inventory Value */}
                    <div className="flex flex-col space-y-1.5">
                      <Label> Inventory Value(Rs.)</Label>
                      <Input
                      defaultValue={Inventory_Value}
                        {...register("Inventory_Value", {
                          required: " Amount is required",
                          // min: {
                          //   value: 1,
                          //   message: "Please enter 0 if no amount",
                          // },
                          max: {
                            value: 100000000,
                            message: "Amount should be at most 100000000",
                          },
                          pattern: {
                            value: /^[0-9.-]+$/i,
                            message: "Only numbers",
                          },
                        })}
                      />
                  
                      {errors.Inventory_Value && (
                        <span className="text-destructive text-sm">
                          {errors.Inventory_Value.message}
                        </span>
                      )}
                    </div>
                  
                    {/* 	Account Receivable */}
                    <div className="flex flex-col space-y-1.5">
                      <Label> Account Receivable(Rs.)</Label>
                      <Input
                      defaultValue={Account_Receivable}
                        {...register("Account_Receivable", {
                          required: " Amount is required",
                          // min: {
                          //   value: 1,
                          //   message: "Please enter 0 if no amount",
                          // },
                          max: {
                            value: 100000000,
                            message: "Amount should be at most 100000000",
                          },
                          pattern: {
                            value: /^[0-9.-]+$/i,
                            message: "Only numbers",
                          },
                        })}
                      />
                  
                      {errors.Account_Receivable && (
                        <span className="text-destructive text-sm">
                          {errors.Account_Receivable.message}
                        </span>
                      )}
                    </div>
                  
                    {/* 	Equipment Machinery */}
                    <div className="flex flex-col space-y-1.5">
                      <Label> Equipment Machinery(Rs.)</Label>
                      <Input
                      defaultValue={Equipment_Machinery}
                        {...register("Equipment_Machinery", {
                          required: " Amount is required",
                          // min: {
                          //   value: 1,
                          //   message: "Please enter 0 if no amount",
                          // },
                          max: {
                            value: 100000000,
                            message: "Amount should be at most 100000000",
                          },
                          pattern: {
                            value: /^[0-9.-]+$/i,
                            message: "Only numbers",
                          },
                        })}
                      />
                  
                      {errors.Equipment_Machinery && (
                        <span className="text-destructive text-sm">
                          {errors.Equipment_Machinery.message}
                        </span>
                      )}
                    </div>
                  </div>
                  
                  {/*  Liabilities*/}
                  <div>
                    {/* Accounts Payable */}
                    <div className="flex flex-col space-y-1.5">
                      <Label> Accounts Payable(Rs.)</Label>
                      <Input
                      defaultValue={Accounts_Payable}
                        {...register("Accounts_Payable", {
                          required: " Amount is required",
                          // min: {
                          //   value: 1,
                          //   message: "Please enter 0 if no amount",
                          // },
                          max: {
                            value: 100000000,
                            message: "Amount should be at most 100000000",
                          },
                          pattern: {
                            value: /^[0-9.-]+$/i,
                            message: "Only numbers",
                          },
                        })}
                      />
                  
                      {errors.Accounts_Payable && (
                        <span className="text-destructive text-sm">
                          {errors.Accounts_Payable.message}
                        </span>
                      )}
                    </div>
                  
                    {/* Loan Payable */}
                    <div className="flex flex-col space-y-1.5">
                      <Label> Loan Payable(Rs.)</Label>
                      <Input
                        defaultValue={Loan_Payable}
                        {...register("Loan_Payable", {
                          required: " Amount is required",
                          // min: {
                          //   value: 1,
                          //   message: "Please enter 0 if no amount",
                          // },
                          max: {
                            value: 100000000,
                            message: "Amount should be at most 100000000",
                          },
                          pattern: {
                            value: /^[0-9.-]+$/i,
                            message: "Only numbers",
                          },
                        })}
                      />
                  
                      {errors.Loan_Payable && (
                        <span className="text-destructive text-sm">
                          {errors.Loan_Payable.message}
                        </span>
                      )}
                    </div>
                  
                    {/* Taxes Payable */}
                    <div className="flex flex-col space-y-1.5">
                      <Label> Taxes Payable(Rs.)</Label>
                      <Input
                        defaultValue={Taxes_Payable}
                        {...register("Taxes_Payable", {
                          required: " Amount is required",
                          // min: {
                          //   value: 1,
                          //   message: "Please enter 0 if no amount",
                          // },
                          max: {
                            value: 100000000,
                            message: "Amount should be at most 100000000",
                          },
                          pattern: {
                            value: /^[0-9.-]+$/i,
                            message: "Only numbers",
                          },
                        })}
                      />
                  
                      {errors.Taxes_Payable && (
                        <span className="text-destructive text-sm">
                          {errors.Taxes_Payable.message}
                        </span>
                      )}
                    </div>
                  </div>
               
  
                {/* Equity */}
                <div>
                  {/* Owner's Capital */}
                  <div className="flex flex-col space-y-1.5">
                    <Label> Owner's Capital(Rs.)</Label>
                    <Input
                        defaultValue={Owners_Capital}
                      {...register("Owners_Capital", {
                        required: " Amount is required",
                        // min: {
                        //   value: 1,
                        //   message: "Please enter 0 if no amount",
                        // },
                        max: {
                          value: 100000000,
                          message: "Amount should be at most 100000000",
                        },
                        pattern: {
                          value: /^[0-9.-]+$/i,
                          message: "Only numbers",
                        },
                      })}
                    />
  
                    {errors.Owners_Capital && (
                      <span className="text-destructive text-sm">
                        {errors.Owners_Capital.message}
                      </span>
                    )}
                  </div>
  
                  {/* Retained Earnings */}
                  <div className="flex flex-col space-y-1.5">
                    <Label> Retained Earnings(Rs.)</Label>
                    <Input
                        defaultValue={Retained_Earnings}
                      {...register("Retained_Earnings", {
                        required: " Amount is required",
                        // min: {
                        //   value: 1,
                        //   message: "Please enter 0 if no amount",
                        // },
                        max: {
                          value: 100000000,
                          message: "Amount should be at most 100000000",
                        },
                        pattern: {
                          value: /^[0-9.-]+$/i,
                          message: "Only numbers",
                        },
                      })}
                    />
  
                    {errors.Retained_Earnings && (
                      <span className="text-destructive text-sm">
                        {errors.Retained_Earnings.message}
                      </span>
                    )}
                  </div>
                </div>
                {/* </div> */}
              </CardContent>
  
              <CardFooter className="flex flex-col gap-3">
                <div className="w-full ">
                  <Button
                    className={`cursor-pointer w-full ${
                      errors.month ||
                      errors.description ||
                      errors.Bank_Balance ||
                      errors.Inventory_Value ||
                      errors.Account_Receivable ||
                      errors.Equipment_Machinery ||
                      errors.Accounts_Payable ||
                      errors.Loan_Payable ||
                      errors.Taxes_Payable ||
                      errors.Owners_Capital ||
                      errors.Retained_Earnings
                        ? "bg-destructive/50 hover:bg-destructive/70 cursor-not-allowed animate-pulse"
                        : null
                    }`}
                    type="submit"
                    {...(isSubmitSuccessful ? { disabled: true } : {})}
                  >
                    {isSubmitSuccessful ? "Submitted" : "Submit"}
                  </Button>
                </div>
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

export default Finance_BalanceSheet_Update;
