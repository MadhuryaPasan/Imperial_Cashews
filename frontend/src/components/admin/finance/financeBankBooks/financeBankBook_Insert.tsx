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
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { Finance_BankBook_Add } from "@/utils/API/finance/Finance_BankBook_API";

const financeBankBook_Insert = () => {


  const newTransaction: SubmitHandler<any> = async (data) => {
    // console.log(data);
     await Finance_BankBook_Add(data);
    // // wait for 1 seconds
    await new Promise((resolve) => setTimeout(resolve, 1000));
    // // reload the page
     window.location.reload();
    // console.log(data);
  };

  const {
    register,
    formState: { errors, isSubmitSuccessful },
    handleSubmit,
    control, //used in the controller for date
  } = useForm({
    defaultValues: {
      
      reference: null,
      date: new Date(),
      type: "",
      amount: null,
      description: null,
    },
    mode:"onChange",
    // shouldUseNativeValidation: true,
    
  });
  

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
        errors.amount ||
        errors.type ||
        errors.description ||
        errors.reference ||
        errors.date
          ? "border-destructive/50 "
          : null
      }`}
      >
        <DialogHeader>
          <DialogTitle>New Bank Transaction</DialogTitle>
          <DialogDescription>
            Add a new bank transaction to your records
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit(newTransaction)}>
          <div className="grid gap-4 py-4">
            {/* Date Start ----------*/}
            <div className="grid grid-cols-4 items-center gap-x-4">
              <Label htmlFor="name" className="text-right">
                Date
              </Label>
              <Controller
                name="date"
                control={control} // rules={{ required: "Date is required" }} // Add required validation
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
                          className=" hover:bg-gray-200  h-full"
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

            {/* Date end---------------- */}

            {/* Type start------------ */}
            <div className="grid grid-cols-4 items-center gap-x-4">
              <Label htmlFor="name" className="text-right">
                Type
              </Label>

              {/* <Select>
                <SelectTrigger className="col-span-3 w-full ">
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="wight">Withdrawals</SelectItem>
                  <SelectItem value="deposits">Deposits</SelectItem>
                </SelectContent>
              </Select> */}

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
                      <SelectItem value="Withdrawals">Withdrawals</SelectItem>
                      <SelectItem value="Deposits">Deposits</SelectItem>
                    </SelectContent>
                  </Select>
                )}
              />
              {errors.type && (
                <span className="text-destructive text-sm col-span-3 w-full col-end-5">
                  {errors.type.message}
                </span>
              )}
            </div>
            {/* type end---------- */}

            {/* Amount start------------ */}
            <div className="grid grid-cols-4 items-center gap-x-4">
              <Label htmlFor="name" className="text-right">
                Amount
              </Label>
              <Input
                id="amount"
                placeholder="0.00"
                className="col-span-3"
                {...register("amount", {
                  required: "Amount is required",
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
              {errors.amount && (
                <span className="text-destructive text-sm col-span-3 w-full col-end-5">
                  {errors.amount.message}
                </span>
              )}
            </div>
            {/* Amount end------------------ */}

            {/* Description start------------ */}
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
                  pattern: {
                    value: /^[A-Za-z0-9-_,. ]+$/,
                    message:
                      "Only letters, numbers, hyphens, and underscores are allowed",
                  },
                })}
              />
              {errors.description && (
                <span className="text-destructive text-sm col-span-3 w-full col-end-5">
                  {errors.description.message}
                </span>
              )}
            </div>
            {/* Description end------------------ */}

            {/* Reference start------------ */}
            <div className="grid grid-cols-4 items-center gap-x-4">
              <Label htmlFor="reference" className="text-right">
                Reference
              </Label>
              <Input
                id="reference"
                placeholder="Check number or reference"
                className="col-span-3 "
                {...register("reference", {
                  required: "Reference is required",
                  minLength: {
                    value: 5,
                    message: "Reference should be at least 5 characters",
                  },
                  maxLength: {
                    value: 100,
                    message: "Reference should be at most 100 characters",
                  },
                  pattern: {
                    value: /^[A-Za-z0-9-_. ]+$/,
                    message:
                      "Only letters, numbers, hyphens, and underscores are allowed",
                  },
                })}
              />
              {errors.reference && (
                <span className="text-destructive text-sm col-span-3 w-full col-end-5 ">
                  {errors.reference.message}
                </span>
              )}
            </div>
            {/* Reference end------------------ */}
          </div>
          <DialogFooter>
          <Button
                  className={`cursor-pointer w-full ${
                    errors.amount ||
                    errors.type ||
                    errors.description ||
                    errors.reference ||
                    errors.date
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

export default financeBankBook_Insert;

// {/* Date Start ----------*/}
// <div className="grid grid-cols-4 items-center gap-x-4">
// <Label htmlFor="name" className="text-right">
//   Date
// </Label>
// {/* <Popover>
//   <PopoverTrigger asChild className="col-span-3 w-full ">
//     <Button
//       variant={"outline"}
//       className={cn(
//         "w-full justify-start text-left font-normal",
//         !date && "text-muted-foreground"
//       )}
//     >
//       <CalendarIcon />
//       {date ? format(date, "PPP") : <span>Pick a date</span>}
//     </Button>
//   </PopoverTrigger>
//   <PopoverContent className="w-full p-0" align="center">
//     <Calendar
//       mode="single"
//       selected={date}
//       onSelect={setDate}
//       initialFocus
//     />
//   </PopoverContent>
// </Popover> */}

// <Controller
//   name="date"
//   control={control}
//   // rules={{ required: "Date is required" }} // Add required validation
//   render={({ field }) => (
//     <Popover>
//       <PopoverTrigger asChild className="col-span-3 w-full ">
//         <Button
//           variant={"outline"}
//           className=" justify-start text-left font-normal"
//         >
//           <CalendarIcon className="mr-2 h-4 w-4" />
//           {field.value ? (
//             format(new Date(field.value), "PPP")
//           ) : (
//             <span>Pick a date</span>
//           )}
//         </Button>
//       </PopoverTrigger>
//       <PopoverContent className="w-auto p-0" align="start">
//         <Calendar
//           mode="single"
//           selected={
//             field.value ? new Date(field.value) : undefined
//           }
//           onSelect={(date) =>
//             field.onChange(
//               date ? format(date, "yyyy-MM-dd") : null
//             )
//           }
//           initialFocus
//         />
//       </PopoverContent>
//     </Popover>
//   )}
// />
// {errors.date && (
//   <span className="text-destructive text-sm col-span-3 w-full col-end-5">
//     {errors.date.message}
//   </span>
// )}
// </div>

// {/* Date end---------------- */}

//<Controller
//   name="date"
//   control={control}
//   // rules={{ required: "Date is required" }} // Add required validation
//   render={({ field }) => (

//     <Popover>
//       <PopoverTrigger asChild className="col-span-3 w-full ">
//         <Button
//           variant={"outline"}
//           className=" justify-start text-left font-normal"
//         >
//           <CalendarIcon className="mr-2 h-4 w-4" />
//           {field.value ? (
//             format(new Date(field.value), "PPP")
//           ) : (
//             <span>Pick a date</span>
//           )}
//         </Button>
//       </PopoverTrigger>
//       <PopoverContent className="w-auto p-0" align="start">
//         <Calendar
//           mode="single"
//           selected={
//             field.value ? new Date(field.value) : undefined
//           }
//           onSelect={(date) =>
//             field.onChange(
//               date ? format(date, "yyyy-MM-dd") : null
//             )
//           }
//           initialFocus
//         />
//       </PopoverContent>
//     </Popover>

//   )}
// />
