import { format } from "date-fns";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { Finance_BankBook_Add } from "@/utils/API/finance/Finance_BankBook_API";
import { Finance_ProfitLoss_Add } from "@/utils/API/finance/Finance_ProfitLoss_API";

const FinanceLosesInsert = () => {
  const newTransaction: SubmitHandler<any> = async (data) => {
    console.log(data);
    await Finance_ProfitLoss_Add(data);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    reset({
      type: "Expenses",
      category: "",
      created_date: new Date(),
      description: "",
      amount: null,
    });
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
      type: "Expenses",
      category: "",
      created_date: new Date(),
      description: "",
      amount: null,
    },
    mode: "onChange",
  });

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>New Transaction</Button>
      </DialogTrigger>
      <DialogContent className={`sm:max-w-[425px] border-2 ${errors.amount || errors.type || errors.category || errors.description ? "border-destructive/50" : ""}`}>
        <DialogHeader>
          <DialogTitle>Losses</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(newTransaction)}>
          <div className="grid gap-4 py-4">
            {/* Type */}
            <div className="grid grid-cols-4 items-center gap-x-4">
              <Label htmlFor="type" className="text-right">Type</Label>
              <Controller
                name="type"
                control={control}
                rules={{ required: "Type is required" }}
                render={({ field }) => (
                  <Select onValueChange={field.onChange} value={field.value}>
                    <SelectTrigger className="col-span-3 w-full">
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      {/* <SelectItem value="Revenue">Revenue</SelectItem> */}
                      <SelectItem value="Expenses">Expenses</SelectItem>
                    </SelectContent>
                  </Select>
                )}
              />
              {errors.type && <span className="text-destructive text-sm col-span-3">{errors.type.message}</span>}
            </div>

            {/* Category */}
            <div className="grid grid-cols-4 items-center gap-x-4">
              <Label htmlFor="category" className="text-right">Category</Label>
              <Controller
                name="category"
                control={control}
                rules={{ required: "Category is required" }}
                render={({ field }) => (
                  <Select onValueChange={field.onChange} value={field.value}>
                    <SelectTrigger className="col-span-3 w-full">
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Maintenance">Maintenance</SelectItem>
                      <SelectItem value="Other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                )}
              />
              {errors.category && <span className="text-destructive text-sm col-span-3">{errors.category.message}</span>}
            </div>

            {/* Date */}
            <div className="grid grid-cols-4 items-center gap-x-4">
              <Label htmlFor="created_date" className="text-right">Date</Label>
              <Controller
                name="created_date"
                control={control}
                render={({ field }) => (
                  <Button
                    variant="outline"
                    className="w-full justify-start text-left font-normal col-span-3"
                    onClick={() => field.onChange(new Date())}
                  >
                    {field.value ? format(new Date(field.value), "PPP") : "Pick a date"}
                  </Button>
                )}
              />
            </div>

            {/* Description */}
            <div className="grid grid-cols-4 items-center gap-x-4">
              <Label htmlFor="description" className="text-right">Description</Label>
              <Input
                id="description"
                placeholder="Transaction description"
                className="col-span-3"
                {...register("description", {
                  required: "Description is required",
                  minLength: { value: 5, message: "Description should be at least 5 characters" },
                  maxLength: { value: 100, message: "Description should be at most 100 characters" },
                })}
              />
              {errors.description && <span className="text-destructive text-sm col-span-3">{errors.description.message}</span>}
            </div>

            {/* Amount */}
            <div className="grid grid-cols-4 items-center gap-x-4">
              <Label htmlFor="amount" className="text-right">Amount</Label>
              <Input
                id="amount"
                placeholder="0.00"
                className="col-span-3"
                {...register("amount", {
                  required: "Amount is required",
                  min: { value: 0, message: "Amount should be greater than 0" },
                  pattern: { value: /^\d+(\.\d{1,2})?$/, message: "Invalid amount format" },
                })}
              />
              {errors.amount && <span className="text-destructive text-sm col-span-3">{errors.amount.message}</span>}
            </div>
          </div>
          <DialogFooter>
            <Button
              className={`cursor-pointer w-full ${errors.amount || errors.type || errors.category || errors.description ? "bg-destructive/50 hover:bg-destructive/70 cursor-not-allowed animate-pulse" : ""}`}
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

export default FinanceLosesInsert;
