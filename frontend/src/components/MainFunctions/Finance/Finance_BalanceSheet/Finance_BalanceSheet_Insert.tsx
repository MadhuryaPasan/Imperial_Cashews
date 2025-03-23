import { SubmitHandler, useForm } from "react-hook-form"; // form validation
import { Finance_PettyCash_createNew } from "@/utils/Finance/Finance_PettyCash_API"; // API
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const Finance_PettyCash_Insert = () => {
  // get current month
  const currentMonth: string = new Date().toLocaleString("en-US", {
    month: "long",
  });

  // insert data
  const CreateDoc: SubmitHandler<any> = async (data) => {
    await Finance_PettyCash_createNew(data);
    // wait for 1 seconds
    await new Promise((resolve) => setTimeout(resolve, 2000));
    // reload the page
    window.location.reload();
  };

  // form validation and submission

  const {
    register,
    formState: { errors, isSubmitSuccessful },
    handleSubmit,
  } = useForm({
    defaultValues: {
      month: currentMonth,
      description: null,
      Bank_Balance: null,
      Inventory_Value: null,
      Account_Receivable: null,
      Equipment_Machinery: null,
      Accounts_Payable: null,
      Loan_Payable: null,
      Taxes_Payable: null,
      Owners_Capital: null,
      Retained_Earnings: null,
    },
  });

  return (
    <>
      <div>
        <form onSubmit={handleSubmit(CreateDoc)}>
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

              {/* Transaction Description */}
              <div className="flex flex-col space-y-1.5">
                <Label>Description</Label>
                <Textarea
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

              <div className=" flex flex-row justify-between gap-5">
                {/*Account Receivable */}
                <div>
                  {/* 	Bank Balance */}
                  <div className="flex flex-col space-y-1.5">
                    <Label> Bank Balance(Rs.)</Label>
                    <Input
                      {...register("Bank_Balance", {
                        required: " Amount is required",
                        min: {
                          value: 1,
                          message: "Please enter 0 if no amount",
                        },
                        max: {
                          value: 100000000,
                          message: "Amount should be at most 100000000",
                        },
                        pattern: {
                          value: /^[0-9.]+$/i,
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
                      {...register("Inventory_Value", {
                        required: " Amount is required",
                        min: {
                          value: 1,
                          message: "Please enter 0 if no amount",
                        },
                        max: {
                          value: 100000000,
                          message: "Amount should be at most 100000000",
                        },
                        pattern: {
                          value: /^[0-9.]+$/i,
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
                      {...register("Account_Receivable", {
                        required: " Amount is required",
                        min: {
                          value: 1,
                          message: "Please enter 0 if no amount",
                        },
                        max: {
                          value: 100000000,
                          message: "Amount should be at most 100000000",
                        },
                        pattern: {
                          value: /^[0-9.]+$/i,
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
                      {...register("Equipment_Machinery", {
                        required: " Amount is required",
                        min: {
                          value: 1,
                          message: "Please enter 0 if no amount",
                        },
                        max: {
                          value: 100000000,
                          message: "Amount should be at most 100000000",
                        },
                        pattern: {
                          value: /^[0-9.]+$/i,
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
                      {...register("Accounts_Payable", {
                        required: " Amount is required",
                        min: {
                          value: 1,
                          message: "Please enter 0 if no amount",
                        },
                        max: {
                          value: 100000000,
                          message: "Amount should be at most 100000000",
                        },
                        pattern: {
                          value: /^[0-9.]+$/i,
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
                      {...register("Loan_Payable", {
                        required: " Amount is required",
                        min: {
                          value: 1,
                          message: "Please enter 0 if no amount",
                        },
                        max: {
                          value: 100000000,
                          message: "Amount should be at most 100000000",
                        },
                        pattern: {
                          value: /^[0-9.]+$/i,
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
                      {...register("Taxes_Payable", {
                        required: " Amount is required",
                        min: {
                          value: 1,
                          message: "Please enter 0 if no amount",
                        },
                        max: {
                          value: 100000000,
                          message: "Amount should be at most 100000000",
                        },
                        pattern: {
                          value: /^[0-9.]+$/i,
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
                    {...register("Owners_Capital", {
                      required: " Amount is required",
                      min: {
                        value: 1,
                        message: "Please enter 0 if no amount",
                      },
                      max: {
                        value: 100000000,
                        message: "Amount should be at most 100000000",
                      },
                      pattern: {
                        value: /^[0-9.]+$/i,
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
                    {...register("Retained_Earnings", {
                      required: " Amount is required",
                      min: {
                        value: 1,
                        message: "Please enter 0 if no amount",
                      },
                      max: {
                        value: 100000000,
                        message: "Amount should be at most 100000000",
                      },
                      pattern: {
                        value: /^[0-9.]+$/i,
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
              </div>
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
                  {isSubmitSuccessful ? "Submitted" : "Sign in"}
                </Button>
              </div>
            </CardFooter>
          </Card>
        </form>
      </div>
    </>
  );
};

export default Finance_PettyCash_Insert;
