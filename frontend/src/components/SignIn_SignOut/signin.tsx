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
    defaultValues: { email: null, password: null }, // default values
  });

  return (
    <>
      <form onSubmit={handleSubmit(CreateDoc)}>
        <Card
          className={`w-[700px] p-[50px]   ${
            errors.password || errors.email
              ? "bg-destructive/5 outline-1 outline-destructive"
              : null
          } ${
            isSubmitSuccessful ? "bg-primary/5 outline-1 outline-primary" : null
          }`}
        >
          {/* content begin */}
          <div className="flex justify-between ">
            <div className="w-full">
              {/* head */}
              <CardHeader>
                <CardTitle>Sign In to Imperial Cashews</CardTitle>
                <CardDescription>
                  Welcome back! Sign in to continue
                </CardDescription>
              </CardHeader>
            </div>

            <div className="w-full h-[300px] flex flex-col justify-around">
              {/* body */}
              <CardContent>
                <div className="flex flex-col justify-around h-full w-[300px] gap-9 ">
                  <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="name">Email</Label>
                    <Input
                      id="email"
                      placeholder="Your email"
                      {...register("email", {
                        required: "Email is required",
                        minLength: {
                          value: 3,
                          message: "Minimum 3 characters",
                        },
                        maxLength: {
                          value: 100,
                          message: "maximum 100 characters",
                        },
                        pattern: {
                          value:
                            /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/i,
                          message: "Please Enter a valid email",
                        },
                      })}
                      {...(isSubmitSuccessful ? { disabled: true } : {})}
                    />
                    {errors.email && (
                      <span className="text-destructive">
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
                      <span className="text-destructive">
                        {errors.password.message}
                      </span>
                    )}
                  </div>
                </div>
              </CardContent>

              {/* footer */}
              <CardFooter className="flex justify-center">
                <div className="w-full ">
                  {/* <Button
                      variant="outline"
                      className=" border-1 border-primary cursor-pointer"
                    >
                      Cancel
                    </Button> */}
                  <Button
                    className="cursor-pointer w-full"
                    type="submit"
                    {...(isSubmitSuccessful ? { disabled: true } : {})}
                  >
                    {isSubmitSuccessful ? "Submitted" : "Submit"}
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
