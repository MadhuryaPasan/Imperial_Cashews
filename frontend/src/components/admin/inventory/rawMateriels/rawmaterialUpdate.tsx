import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Inventory_RawCashews_StockLevel_GetOne } from "@/utils/API/inventory/Inventory_RawCashews_StockLevel_API";
import { quality_raw_material_check_Add } from "@/utils/API/quality/quality_raw_material_check_API";
import { Staff_Employee_GetOne } from "@/utils/API/staff/Staff_Employee_API";

import React, { useEffect, useState } from "react";
import { Controller, SubmitHandler, useForm, useWatch } from "react-hook-form";
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { FileEdit } from "lucide-react";
  

//login user id temp
const userId = "67e100072de94f31e0b63a8f";

const rawmaterialUpdate = (id: any) => {
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
    <>
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
      <Card>
        <CardContent>
         
        </CardContent>
      </Card>
      </DialogContent>
    </Dialog>
    </>
  );
};

export default rawmaterialUpdate;
