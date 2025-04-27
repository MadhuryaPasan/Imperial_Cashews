import { Button } from "@/components/ui/button";
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
import {
  Sales_Customer_Update,
  Sales_Customer_GetOne,
} from "@/utils/API/sales/Sales_Customer_API";
import { FileEdit } from "lucide-react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useEffect, useState } from "react";

const updatesalesClientDetails = ({ _id }: { _id: any }) => {
  const [loading, setLoading] = useState(true);

  const {
    register,
    formState: { errors, isSubmitSuccessful },
    handleSubmit,
    reset,
  } = useForm({
    defaultValues: {
      name: "",
      contact_number: "",
      email: "",
      address: "",
      password: "",
      country: "",
      district: "",
    },
    mode: "onChange",
  });

  // Fetch client details by ID
  useEffect(() => {
    const fetchClientDetails = async () => {
      try {
        const data = await Sales_Customer_GetOne(_id);

        reset(data); // insert data to form with fetched data
      } catch (error) {
        console.error("Failed to fetch client details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchClientDetails();
  }, [_id, reset]);

  //update client details
  const onSubmit: SubmitHandler<any> = async (data) => {
    try {
      await Sales_Customer_Update(_id, data);
      reset();
      window.location.reload(); // Reload the page to see the updated data
    } catch (error) {
      console.error("Failed to update client details:", error);
      window.location.reload();
    }
  };

  // Prevent unwanted characters in the input fields
  const unwantedCharacters = [
    "@",
    "#",
    "$",
    "%",
    "^",
    "&",
    "*",
    "(",
    ")",
    "-",
    "=",
    "+",
    "{",
    "}",
    "[",
    "]",
    ":",
    ";",
    '"',
    "'",
    "<",
    ">",
    ",",
    ".",
    "?",
    "/",
    "\\",
    "|",
    "`",
    "~",
  ];
  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (unwantedCharacters.includes(event.key)) {
      event.preventDefault();
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" >
          <FileEdit  className=" text-primary"/>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Update Client</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid gap-4 py-4">
            {/* Name */}
            <div className="grid grid-cols-4 items-center gap-x-4">
              <Label htmlFor="name" className="text-right">
                Name
              </Label>
              <Input
                id="name"
                placeholder="Full Name"
                className="col-span-3"
                onKeyDown={handleKeyDown}
                {...register("name", {
                  required: "Name is required",
                  minLength: {
                    value: 3,
                    message: "Name should be at least 3 characters",
                  },
                  pattern: {
                    value: /^[A-Za-z\s]+$/,
                    message: "Name should only contain letters and spaces",
                  },
                })}
              />
              {errors.name && (
                <span className="text-destructive text-sm col-span-3 w-full col-end-5">
                  {errors.name.message}
                </span>
              )}
            </div>

            {/* Contact Number */}
            <div className="grid grid-cols-4 items-center gap-x-4">
              <Label htmlFor="contact_number" className="text-left">
                Contact Number
              </Label>
              <Input
                id="contact_number"
                placeholder="e.g., 0789087213"
                onKeyDown={handleKeyDown}
                className="col-span-3"
                {...register("contact_number", {
                  required: "Contact number is required",
                  pattern: {
                    value: /^[0-9]{10}$/,
                    message: "Contact number must be 10 digits",
                  },
                })}
              />
              {errors.contact_number && (
                <span className="text-destructive text-sm col-span-3 w-full col-end-5">
                  {errors.contact_number.message}
                </span>
              )}
            </div>

            {/* Email */}
            <div className="grid grid-cols-4 items-center gap-x-4">
              <Label htmlFor="email" className="text-right">
                Email
              </Label>
              <Input
                id="email"
                placeholder="e.g., example@gmail.com"
                className="col-span-3"
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: "Invalid email format",
                  },
                })}
              />
              {errors.email && (
                <span className="text-destructive text-sm col-span-3 w-full col-end-5">
                  {errors.email.message}
                </span>
              )}
            </div>

            {/* Address */}
            <div className="grid grid-cols-4 items-center gap-x-4">
              <Label htmlFor="address" className="text-right">
                Address
              </Label>
              <Input
                id="address"
                placeholder="e.g., 22/3A, Samagi Mawatha, Kurunegala"
                className="col-span-3"
                {...register("address", {
                  required: "Address is required",
                  minLength: {
                    value: 5,
                    message: "Address should be at least 5 characters",
                  },
                })}
              />
              {errors.address && (
                <span className="text-destructive text-sm col-span-3 w-full col-end-5">
                  {errors.address.message}
                </span>
              )}
            </div>

            {/* Password */}
            <div className="grid grid-cols-4 items-center gap-x-4">
              <Label htmlFor="password" className="text-right">
                Password
              </Label>
              <Input
                id="password"
                type="password"
                placeholder="Enter a secure password"
                className="col-span-3"
                {...register("password", {
                  required: "Password is required",
                  pattern: {
                    value:
                      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                    message:
                      "Password must be at least 8 characters, include an uppercase letter, a lowercase letter, a number, and a special character",
                  },
                })}
              />
              {errors.password && (
                <span className="text-destructive text-sm col-span-3 w-full col-end-5">
                  {errors.password.message}
                </span>
              )}
            </div>

            {/* Country */}
            <div className="grid grid-cols-4 items-center gap-x-4">
              <Label htmlFor="country" className="text-right">
                Country
              </Label>
              <Input
                id="country"
                onKeyDown={handleKeyDown}
                placeholder="e.g., Sri Lanka"
                className="col-span-3"
                {...register("country", {
                  required: "Country is required",
                })}
              />
              {errors.country && (
                <span className="text-destructive text-sm col-span-3 w-full col-end-5">
                  {errors.country.message}
                </span>
              )}
            </div>

            {/* District */}
            <div className="grid grid-cols-4 items-center gap-x-4">
              <Label htmlFor="district" className="text-right">
                District
              </Label>
              <Input
                id="district"
                onKeyDown={handleKeyDown}
                placeholder="e.g., Kurunegala"
                className="col-span-3"
                {...register("district", {
                  required: "District is required",
                })}
              />
              {errors.district && (
                <span className="text-destructive text-sm col-span-3 w-full col-end-5">
                  {errors.district.message}
                </span>
              )}
            </div>
          </div>
          <DialogFooter>
            <Button
              className={`cursor-pointer w-full ${
                isSubmitSuccessful ? "bg-destructive/50 cursor-not-allowed" : ""
              }`}
              type="submit"
              disabled={isSubmitSuccessful}
            >
              {isSubmitSuccessful ? "Submitted" : "Submit"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default updatesalesClientDetails;
