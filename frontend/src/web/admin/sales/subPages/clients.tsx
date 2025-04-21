import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { SidebarProvider } from "@/components/ui/sidebar";
import { Download, Phone } from "lucide-react";
import SalesSideBar from "../layout/salesSideBar";

import React, { useState } from "react";

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
import {
  Sales_Customer_GetAll,
  Sales_Customer_ReturnAll,
} from "@/utils/API/sales/Sales_Customer_API";

const clients = () => {
  const data = Sales_Customer_ReturnAll();
  return (
    <>
      <div className="flex ">
        <div>
          <SidebarProvider>
            <SalesSideBar />
          </SidebarProvider>
        </div>
        <main className=" w-full mx-5 mt-4">
          <div className="flex justify-between">
            <div className="text-3xl font-bold ">Manage Clients</div>
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
                  Total User Count
                </CardTitle>
                <CardContent className="p-0">
                  <div className="text-2xl font-bold line-clamp-1 text-primary">
                    {data?.length}
                  </div>
                </CardContent>
              </CardHeader>
            </Card>
          </div>
          <Separator className=" my-4" />

          <div className="  mx-auto">{MonthlyUsersChart()}</div>
          <Separator className=" my-4" />

          <div>{UserDataTable()}</div>
        </main>
      </div>
    </>
  );
};

export default clients;

// ---------------------------------------------------

const tableColumns = [
  {
    id: 1,
    name: "Name",
  },
  {
    id: 2,
    name: "Email",
  },
  {
    id: 3,
    name: "Mobile",
    icon: <Phone className="w-4 h-4" />,
  },
  {
    id: 4,
    name: "Address",
  },
  {
    id: 5,
    name: "Password",
  },
  {
    id: 6,
    name: "Joined Date",
  },
];

const UserDataTable = () => {
  //Asigning the data to transactions from Finance_BankBook_ReturnAll function
  const data = Sales_Customer_ReturnAll();
  //-------------------------------------------------------

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTab, setSelectedTab] = useState<String | null>("all");

  const handleTabChange = (value: string) => {
    setSelectedTab(value);
  };

  const filteredData = data?.filter((data) => {
    // if (selectedTab === "hr") {
    //   return data.department === "HR";
    // } else if (selectedTab === "sales") {
    //   return data.department === "Sales";
    // } else if (selectedTab === "finance") {
    //   return data.department === "Finance";
    // } else if (selectedTab === "quality") {
    //   return data.department === "Quality Control";
    // } else if (selectedTab === "inventory") {
    //   return data.department === "Inventory";
    // }
    if (selectedTab === "all") {
      return true;
    }
    return true; // Default to showing all
  });

  const searchedData = filteredData.filter((data) => {
    return (
      data.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      data.address.toLowerCase().includes(searchTerm.toLowerCase()) ||
      data.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      data.contact_number.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  return (
    <>
      <Card>
        <CardContent>
          <div className="flex md:flex-row md:justify-between flex-col items-center mb-2">
            <div>
              <Tabs
                defaultValue="all"
                className=""
                onValueChange={handleTabChange}
              >
                <TabsList className=" w-[120%] gap-3 ">
                  <TabsTrigger value="all">All</TabsTrigger>
                </TabsList>
              </Tabs>
            </div>
            <div className="w-full md:w-1/2">
              <Input
                type="text"
                placeholder="Search data here... (e.g. Name, Mobile, Address, Email)"
                className=" w-full"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
          <div className="rounded-md border-1 shadow-lg min-h-[40vh]">
            <Table>
              <TableHeader>
                <TableRow className="bg-gray-200/80 hover:bg-gray-200/80">
                  {tableColumns.map((data) => (
                    <TableHead key={data.id}>
                      <span className="flex items-center gap-1">
                        {data?.icon}

                        {data.name}
                      </span>
                    </TableHead>
                  ))}
                </TableRow>
              </TableHeader>
              <TableBody>
                {searchedData.reverse().map((data) => (
                  <TableRow key={data._id}>
                    <TableCell>{data?.name}</TableCell>
                    <TableCell>{data?.email}</TableCell>
                    <TableCell>{data?.contact_number}</TableCell>
                    <TableCell>{data?.address}</TableCell>
                    <TableCell>{data?.password}</TableCell>
                    <TableCell>
                      {data?.created_date
                        ? new Date(data?.created_date).toLocaleString("en-CA", {
                            year: "numeric",
                            month: "numeric",
                            day: "numeric",
                          })
                        : "N/A"}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
    </>
  );
};

//---------------------------------------------------

("use client");

import { TrendingUp } from "lucide-react";
import { Bar, BarChart, CartesianGrid, LabelList, XAxis } from "recharts";

import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";


const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "rgb(0, 201, 81)",
  },
} satisfies ChartConfig;

const MonthlyUsersChart = () => {
  interface Employee {
    created_date: string | { $date: string };
    // add other fields if needed
  }

  interface MonthlyCount {
    month: string;
    count: number;
  }

  const getLastSixMonthsEmployeeCounts = (data: Employee[]): MonthlyCount[] => {
    const now = new Date();
    const result: MonthlyCount[] = [];

    for (let i = 9; i >= 0; i--) {
      const monthStart = new Date(now.getFullYear(), now.getMonth() - i, 1);
      const monthEnd = new Date(
        now.getFullYear(),
        now.getMonth() - i + 1,
        0,
        23,
        59,
        59
      );

      const count = data.filter((emp) => {
        let joinedDate: Date;

        if (typeof emp.created_date === "string") {
          joinedDate = new Date(emp.created_date);
        } else {
          joinedDate = new Date(emp.created_date.$date);
        }

        return joinedDate >= monthStart && joinedDate <= monthEnd;
      }).length;

      result.push({
        month: monthStart.toLocaleString("default", {
          month: "short",
          year: "numeric",
        }),
        count,
      });
    }

    return result;
  };

  // Usage
  const data = Sales_Customer_ReturnAll(); // returns Employee[]
  const chartData = getLastSixMonthsEmployeeCounts(data);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Bar Chart – Monthly New User Count</CardTitle>
        <CardDescription>Last 9 months</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer config={chartConfig} className="max-h-[350px] mx-auto ">
          <BarChart
            accessibilityLayer
            data={chartData}
            margin={{
              top: 20,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value.slice(0, 3)}
              
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Bar dataKey="count" fill="var(--color-desktop)" radius={8} >
              <LabelList
                position="top"
                offset={12}
                className="fill-foreground "
                fontSize={12}
              />
            </Bar>
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};
