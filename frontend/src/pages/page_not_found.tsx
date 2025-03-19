import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ShieldAlert } from "lucide-react";
import React from "react";

const page_not_found = () => {
  return (
    <>
      <div className="flex justify-center items-center h-screen">
        <Card className="bg-destructive/5 outline-1 outline-destructive w-[400px]">
          <CardHeader className="flex justify-between items-center">
            
          
           
                <CardTitle className=" text-9xl font-bold text-destructive">404</CardTitle>
                <CardDescription className=" text-2xl font-bold">
                  Page Not Found
                </CardDescription>
            
          </CardHeader>
        </Card>
      </div>
    </>
  );
};

export default page_not_found;
