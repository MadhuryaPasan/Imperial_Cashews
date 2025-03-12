import { Button } from "@/components/ui/button";
import { SubmitHandler, useForm } from "react-hook-form";
import TableTemplate from "../components/tables/tableTemplate";

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

  const Create: SubmitHandler<iFormData> = async (data) => {
    // await createDoc(data);
  };

  const {
    register,
    formState: { errors, isSubmitSuccessful },
    handleSubmit,
  } = useForm({
    defaultValues: { name: null, age: null, gpa: null, month: currentMonth },
  });

  const test = true;

  return (
    <>
      <div>elements</div>
      <TableTemplate />

      <form onSubmit={handleSubmit(Create)} >
        <Card
          className={`w-[350px] ${
            errors.age || errors.name || errors.gpa
              ? "bg-destructive/5 outline-1 outline-destructive"
              : null
          } ${isSubmitSuccessful ? "bg-primary/5 outline-1 outline-primary" : null}`}
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
                  placeholder="Insert Name"
                  {...register("name", {
                    required: "Name is required",
                    minLength: { value: 3, message: "Minimum 3 characters" },
                    maxLength: {
                      value: 100,
                      message: "maximum 100 characters",
                    },
                    pattern: { value: /^[A-Za-z ]+$/i, message: "Only letters can be inserted" },
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
                    min:{value:18,message:"you need to be at least 18 years old"},
                    max:{value:100,message:"Maximum value is 100"},
                    pattern: { value: /^[0-9]+$/i, message: "Only numbers can be inserted" },
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
                    min:{value:0,message:"Minimum value is 0"},
                    max:{value:5.0,message:"Maximum value is 5.0"},
                    pattern: { value: /^[0-9]+$/i, message: "Only numbers can be inserted" },
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
                  id="month"
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
            <Button variant="outline" className=" border-1 border-primary cursor-pointer">
              Cancel
            </Button>
            <Button className="cursor-pointer"
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
