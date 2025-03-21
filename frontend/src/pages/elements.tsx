import { Button } from "@/components/ui/button";
import { SubmitHandler, useForm } from "react-hook-form";
import TableTemplate from "@/components/tables/tableTemplate";
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

interface iFormData {
  name: string;
  age: number;
  gpa: number;
  month: string;
}

const elements = () => {
  const currentMonth: string = new Date().toLocaleString("en-US", {
    month: "long",
  });

  const currentMonthNumber: number = new Date().getMonth() + 1;
  console.log(currentMonthNumber);

  // insert data
  const CreateDoc: SubmitHandler<iFormData | any> = async (data) => {
    await createNew(data);
    // await new Promise(resolve => setTimeout(resolve, 3000));
    // window.location.reload();
  };

  const {
    register,
    formState: { errors, isSubmitSuccessful },
    handleSubmit,
  } = useForm({
    defaultValues: { name: null, age: null, gpa: null, month: currentMonth },
  });

  const months = [
    {monthName:"January" , monthNumber:1},
    {monthName:"February" , monthNumber:2},
    {monthName:"March" , monthNumber:3},
    {monthName:"April" , monthNumber:4},
    {monthName:"May" , monthNumber:5},
    {monthName:"June" , monthNumber:6},
    {monthName:"July" , monthNumber:7},
    {monthName:"August" , monthNumber:8},
    {monthName:"September" , monthNumber:9},
    {monthName:"October" , monthNumber:10},
    {monthName:"November" , monthNumber:11},
    {monthName:"December" , monthNumber:12},

  ];

  
  const [selectedMonth, setSelectedMonth] = useState<string>(currentMonth);
  // console.log(selectedMonth);
  
  return (
    <>
      <div>elements</div>

      <Select onValueChange={(value)=>setSelectedMonth(value)}>
        <SelectTrigger className="">
          <SelectValue placeholder="Select Month" />
        </SelectTrigger>
        <SelectContent>
          {months.map((data) => (
            <SelectItem key={data.monthNumber} value={data.monthName}>
              {data.monthName}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <TableTemplate selectedMonth={selectedMonth} />



      {/* form */}
      <form onSubmit={handleSubmit(CreateDoc)}>
        <Card
          className={`w-[350px] ${
            errors.age || errors.name || errors.gpa
              ? "bg-destructive/5 outline-1 outline-destructive"
              : null
          } ${
            isSubmitSuccessful ? "bg-primary/5 outline-1 outline-primary" : null
          }`}
        >
          <CardHeader >
            <CardTitle className=" bg-primary ">Insert Now</CardTitle>
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
                <Label htmlFor="age">Age</Label>
                <Input
                  id="age"
                  placeholder="Insert Age"
                  {...register("age", {
                    required: "name is required",
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
                {errors.age && (
                  <span className="text-destructive">{errors.age.message}</span>
                )}
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="gpa">GPA</Label>
                <Input
                  id="gpa"
                  placeholder="Insert GPA"
                  {...register("gpa", {
                    required: "Gpa is required",
                    min: { value: 0, message: "Minimum value is 0" },
                    max: { value: 5.0, message: "Maximum value is 5.0" },
                    pattern: {
                      value: /^[0-9.]+$/i,
                      message: "Only numbers can be inserted",
                    },
                  })}
                  {...(isSubmitSuccessful ? { disabled: true } : {})}
                />
                {errors.gpa && (
                  <span className="text-destructive">{errors.gpa.message}</span>
                )}
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="data">Month</Label>
                <Input
                 
                  placeholder="Month"
                  disabled
                  value={currentMonth}
                  {...register("month", {
                    required: "Name is required",
                  })}
                />
                {errors.month && (
                  <span className="text-destructive">
                    {errors.month.message}
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
      </form>
    </>
  );
};

export default elements;