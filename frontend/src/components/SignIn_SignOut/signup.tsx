import { Button } from "@/components/ui/button";
import { SubmitHandler, useForm } from "react-hook-form";
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
import Logo from "@/components/layouts/Logo";

interface iFormData {
  name: string;
  age: number;
  gpa: number;
  month: string;
}

const signin = () => {
  const currentMonth: string = new Date().toLocaleString("en-US", {
    month: "long",
  });

  // insert data
  const CreateDoc: SubmitHandler<iFormData | any> = async (data) => {
    //await createNew(data);
    // await new Promise(resolve => setTimeout(resolve, 3000));
    // window.location.reload();
  };

  const {
    register,
    formState: { errors, isSubmitSuccessful },
    handleSubmit,
  } = useForm({
    defaultValues: { name:null, email: null, password: null }, // default values
  });

  return (
    <>
      <form onSubmit={handleSubmit(CreateDoc)}>
        <Card
          className={`md:w-[90vw] p-[25px] lg:w-[40vw]  ${
            errors.password || errors.email || errors.name
              ? "bg-destructive/5 outline-1 outline-destructive"
              : null
          } ${
            isSubmitSuccessful ? "bg-primary/10 outline-1 outline-primary" : null
          }`}
        >
          {/* content begin */}
          <div className="md:flex justify-between  ">
            <div className="w-full">
              {/* head */}
              <CardHeader className=" h-full">
                <CardTitle className="text-lg">Sign Up to Imperial Cashews</CardTitle>
                <CardDescription>
                  Welcome! Sign Up to Login
                </CardDescription>
                <div className="h-[200px]">
                  <Logo />
                </div>
              </CardHeader>
            </div>

            <div className="w-full h-[350px] flex flex-col justify-around">
              {/* body */}
              <CardContent>
                <div className="flex flex-col justify-around h-full w-[300px] gap-5 ">
                    {/* name */}
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
                    pattern: {
                      value: /^[A-Za-z ]+$/i,
                      message: "Only letters can be inserted",
                    },
                  })}
                  {...(isSubmitSuccessful ? { disabled: true } : {})}
                />
                {errors.name && (
                  <span className="text-destructive text-sm">
                    {errors.name.message}
                  </span>
                )}
              </div>
                  <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="name">Email</Label>
                    <Input
                      id="email"
                      placeholder="Your email"
                      {...register("email", {
                        required: "Email is required",
                        pattern: {
                          value:
                            /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/i,
                          message: "Please Enter a valid email",
                        },
                      })}
                      {...(isSubmitSuccessful ? { disabled: true } : {})}
                    />
                    {errors.email && (
                      <span className="text-destructive text-sm">
                        {errors.email.message}
                      </span>
                    )}
                  </div>
                  <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="age">Password</Label>
                    <Input
                      type="password"
                      id="password"
                      placeholder="Enter your password"
                      {...register("password", {
                        required: "Password is required",
                        pattern: {
                          value:
                            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                          message: "Please make sure the password contains at least one lowercase letter, one uppercase letter, one digit, and one special character (@$!%*?&), and is at least 8 characters long.",
                        },
                      })}
                      {...(isSubmitSuccessful ? { disabled: true } : {})}
                    />
                    {errors.password && (
                      <span className="text-destructive text-sm">
                        {errors.password.message}
                      </span>
                    )}
                  </div>
                </div>
              </CardContent>

              {/* footer */}
              <CardFooter className="flex flex-col gap-3">
                <div className="w-full ">
                  {/* <Button
                      variant="outline"
                      className=" border-1 border-primary cursor-pointer"
                    >
                      Cancel
                    </Button> */}
                  <Button
                    className={`cursor-pointer w-full ${
            errors.password || errors.email || errors.name
              ? "bg-destructive/50 hover:bg-destructive/70 cursor-not-allowed animate-pulse"
              : null
          }`}
                    type="submit"
                    {...(isSubmitSuccessful ? { disabled: true } : {})}
                  >
                    {isSubmitSuccessful ? "Submitted" : "Register"}
                  </Button>
                </div>
              </CardFooter>
            </div>
          </div>
        </Card>
      </form>
    </>
  );
};

export default signin;
