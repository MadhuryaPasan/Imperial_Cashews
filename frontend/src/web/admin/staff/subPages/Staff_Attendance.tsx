import { SidebarProvider } from "@/components/ui/sidebar";
import StaffSideBar from "../layout/staffSideBar";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Download, Phone } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { Staff_Employee_ReturnAll } from "@/utils/API/staff/Staff_Employee_API";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";


const sales_Attendance = () => {
  return (
    <>
      <div className="flex ">
      <div>
          <SidebarProvider>
            <StaffSideBar />
          </SidebarProvider>
        </div>
        <main className=" w-full mx-5 mt-4">
          <div className="flex justify-between">
            <div className="text-3xl font-bold ">Orders</div>
            <div className="flex gap-2 items-center">
              {/* <FinanceBankBook_Insert /> */}
              <Button variant="outline">
                Report <Download />
              </Button>
            </div>
          </div>
          <Separator className=" my-4" />

          <Separator className=" my-4" />
          <div className="grid grid-cols-3">
            <Card>
              <CardHeader>
                <CardTitle className="text-sm font-medium">
                  Total Order Count
                </CardTitle>
                <CardContent className="p-0">
                  <div className="text-2xl font-bold line-clamp-1 text-primary">
                    {/* {data?.length} */}444
                  </div>
                </CardContent>
              </CardHeader>
            </Card>
          </div>
          <Separator className=" my-4" />
          {/* <div>{MonthlyOrdersChart()}</div>
          <Separator className=" my-4" />
          <div>{OrdersDataTable()}</div> */}
        </main>
      </div>
    </>
  )
}

export default sales_Attendance