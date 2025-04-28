import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Plus } from "lucide-react";
import "react-day-picker/dist/style.css";
import { Controller, SubmitHandler, useForm, useWatch } from "react-hook-form";
import { Finance_PettyCash_Add } from "@/utils/API/finance/Finance_PettyCash_API";

const financePettyCash_insert = () => {
  const newTransaction: SubmitHandler<any> = async (data) => {
    // console.log(data);
    await Finance_PettyCash_Add(data);
    reset();//reset fields after submit
    await new Promise((resolve) => setTimeout(resolve, 1000));
    window.location.reload();
  };

  const {
    register,
    formState: { errors, isSubmitSuccessful },
    handleSubmit,
    control,
    reset,
  } = useForm({
    defaultValues: {
      transaction_date: new Date(),
      transaction_type: "",
      replenishment_amount: null,
      expense_amount: null,
      description: "",
    },
    mode: "onChange",
  });

  const transactionType = useWatch({ control, name: "transaction_type" });



    // Prevent unwanted characters in the input fields
    const unwantedCharacters = ['@', '#', '$', '%', '^', '&', '*', '<', '>', '?', '/', '\\', '|', '`', '~'];
    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
      if (unwantedCharacters.includes(event.key)) {
        event.preventDefault();
      }
    };
  

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>
          <Plus />
          New Transaction
        </Button>
      </DialogTrigger>
      <DialogContent
        className={`sm:max-w-[425px] border-2 ${
          errors.transaction_type || errors.description || errors.transaction_date
            ? "border-destructive/50 "
            : null
        }`}
      >
        <DialogHeader>
          <DialogTitle>New Petty Cash Transaction</DialogTitle>
          <DialogDescription>
            Add a new petty cash transaction to your records
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit(newTransaction)}>
          <div className="grid gap-4 py-4">
            {/* Date Start */}
            <div className="grid grid-cols-4 items-center gap-x-4">
              <Label htmlFor="transaction_date" className="text-right">
                Date
              </Label>
              <Controller
                name="transaction_date"
                control={control}
                render={({ field }) => (
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button
                        variant={"outline"}
                        className="w-full justify-start text-left font-normal col-span-3"
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {field.value ? (
                          format(new Date(field.value), "PPP")
                        ) : (
                          <span>Pick a date</span>
                        )}
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="z-52 w-fit bg-gray-200 ">
                      <DialogClose>
                        <Button
                          variant="ghost"
                          className="hover:bg-gray-200 h-full"
                        >
                          <Calendar
                            mode="single"
                            selected={
                              field.value ? new Date(field.value) : undefined
                            }
                            onSelect={(date) =>
                              field.onChange(
                                date ? format(date, "yyyy-MM-dd") : null
                              )
                            }
                            initialFocus
                          />
                        </Button>
                      </DialogClose>
                    </DialogContent>
                  </Dialog>
                )}
              />
            </div>
            {/* Date End */}

            {/* Transaction Type Start */}
            <div className="grid grid-cols-4 items-center gap-x-4">
              <Label htmlFor="transaction_type" className="text-right">
                Type
              </Label>
              <Controller
                name="transaction_type"
                control={control}
                rules={{ required: "Transaction type is required" }}
                render={({ field }) => (
                  <Select onValueChange={field.onChange} value={field.value}>
                    <SelectTrigger className="col-span-3 w-full">
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Replenishment">Replenishment</SelectItem>
                      <SelectItem value="Expenses">Expenses</SelectItem>
                    </SelectContent>
                  </Select>
                )}
              />
              {errors.transaction_type && (
                <span className="text-destructive text-sm col-span-3 w-full col-end-5">
                  {errors.transaction_type.message}
                </span>
              )}
            </div>
            {/* Transaction Type End */}

            {/* Replenishment Amount Start */}
            {transactionType === "Replenishment" && (
              <div className="grid grid-cols-4 items-center gap-x-4">
                <Label htmlFor="replenishment_amount" className="text-right">
                  Replenishment Amount
                </Label>
                <Input
                  id="replenishment_amount"
                   onKeyDown={handleKeyDown}
                  placeholder="0.00"
                  className="col-span-3"
                  {...register("replenishment_amount", {
                    required: "Replenishment amount is required",
                    min: {
                      value: 0,
                      message: "Amount should be greater than 0",
                    },
                    pattern: {
                      value: /^\d+(\.\d{1,2})?$/,
                      message: "Invalid amount format",
                    },
                  })}
                />
                {errors.replenishment_amount && (
                  <span className="text-destructive text-sm col-span-3 w-full col-end-5">
                    {errors.replenishment_amount.message}
                  </span>
                )}
              </div>
            )}
            {/* Replenishment Amount End */}

            {/* Expense Amount Start */}
            {transactionType === "Expenses" && (
              <div className="grid grid-cols-4 items-center gap-x-4">
                <Label htmlFor="expense_amount" className="text-right">
                  Expense Amount
                </Label>
                <Input
                  id="expense_amount"
                  placeholder="0.00"
                  className="col-span-3"
                  {...register("expense_amount", {
                    required: "Expense amount is required",
                    min: {
                      value: 0,
                      message: "Amount should be greater than 0",
                    },
                    pattern: {
                      value: /^\d+(\.\d{1,2})?$/,
                      message: "Invalid amount format",
                    },
                  })}
                />
                {errors.expense_amount && (
                  <span className="text-destructive text-sm col-span-3 w-full col-end-5">
                    {errors.expense_amount.message}
                  </span>
                )}
              </div>
            )}
            {/* Expense Amount End */}

            {/* Description Start */}
            <div className="grid grid-cols-4 items-center gap-x-4">
              <Label htmlFor="description" className="text-right">
                Description
              </Label>
              <Input
                id="description"
                placeholder="Transaction description"
                onKeyDown={handleKeyDown}
                className="col-span-3"
                {...register("description", {
                  required: "Description is required",
                  minLength: {
                    value: 5,
                    message: "Description should be at least 5 characters",
                  },
                  maxLength: {
                    value: 100,
                    message: "Description should be at most 100 characters",
                  },
                })}
              />
              {errors.description && (
                <span className="text-destructive text-sm col-span-3 w-full col-end-5">
                  {errors.description.message}
                </span>
              )}
            </div>
            {/* Description End */}
          </div>
          <DialogFooter>
            <Button
              className={`cursor-pointer w-full ${
                errors.transaction_type ||
                errors.description ||
                errors.transaction_date
                  ? "bg-destructive/50 hover:bg-destructive/70 cursor-not-allowed animate-pulse"
                  : null
              }`}
              type="submit"
              {...(isSubmitSuccessful ? { disabled: true } : {})}
            >
              {isSubmitSuccessful ? "Submitted" : "Submit"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default financePettyCash_insert;
