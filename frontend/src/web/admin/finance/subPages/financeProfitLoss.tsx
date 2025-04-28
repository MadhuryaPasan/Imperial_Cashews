import FinanceSideBar from "@/web/admin/finance/layout/financeSideBar";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { SidebarProvider } from "@/components/ui/sidebar";
import { Clock, DollarSign, Download, Eye, Phone } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { useState } from "react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Sales_Customer_ReturnAll } from "@/utils/API/sales/Sales_Customer_API";
import { Sales_Order_ReturnAll } from "@/utils/API/sales/Sales_Order_API";
import { console } from "inspector";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Finance_ProfitLoss_ReturnAll } from "@/utils/API/finance/Finance_ProfitLoss_API";
import Pdf from "@/web/test/reactpdf/pdf";

const financeProfitLoss = () => {
  const data = Finance_ProfitLoss_ReturnAll();

  const totalRevenue = data
    ?.filter((item) => item.type === "Revenue")
    .reduce((acc, curr) => acc + curr.amount_revenue, 0);
  const TotalExpenses = data
    ?.filter((item) => item.type === "Expenses")
    .reduce((acc, curr) => acc + curr.amount_expense, 0);

  const netProfit = totalRevenue - TotalExpenses;

  return (
    <>
      <div className="flex ">
        <div>
          <SidebarProvider>
            <FinanceSideBar />
          </SidebarProvider>
        </div>
        <main className=" w-full mx-5 mt-4">
          <div className="flex justify-between">
            <div className="text-3xl font-bold ">Profit & Loss</div>
            <div>
              {/* <Button variant="outline">
                Report <Download />
              </Button> */}
              <Pdf/>
            </div>
          </div>
          <Separator className=" my-4" />

          <div className="grid grid-cols-3 gap-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-sm font-medium">
                  Total Revenue
                </CardTitle>
                <CardContent className="p-0">
                  <div className="text-2xl font-bold line-clamp-1 text-primary">
                    RS{" "}
                    {totalRevenue.toLocaleString("en-US", {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })}
                  </div>
                </CardContent>
              </CardHeader>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-sm font-medium">
                  Total amount_revenue
                </CardTitle>
                <CardContent className="p-0">
                  <div className="text-2xl font-bold line-clamp-1 text-destructive">
                    RS{" "}
                    {TotalExpenses.toLocaleString("en-US", {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })}
                  </div>
                </CardContent>
              </CardHeader>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-sm font-medium">
                  Net Profit
                </CardTitle>
                <CardContent className="p-0">
                  <div className="text-2xl font-bold line-clamp-1 ">
                    RS{" "}
                    {netProfit.toLocaleString("en-US", {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })}
                  </div>
                </CardContent>
              </CardHeader>
            </Card>
          </div>
          <Separator className=" my-4" />

          {ProfiLossChart()}
          <Separator className=" my-4" />

          {/* tables */}

          <Card>
            <CardContent>
              <Tabs defaultValue="profit">
                <TabsList>
                  <TabsTrigger value="profit" className="w-80">
                    Profits
                  </TabsTrigger>
                  <TabsTrigger value="loss">Losses</TabsTrigger>
                </TabsList>
                <TabsContent value="profit">{profitsTable()}</TabsContent>
                <TabsContent value="loss">{profitLossTable()}</TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </main>
      </div>
    </>
  );
};

export default financeProfitLoss;

//--------------------------------------------


import FinanceProfitInsert from "@/components/admin/finance/finaneProfitLoss/FinanceProfitInsert";

const tableColumns = [
  {
    id: 1,
    name: "Date",
  },

  {
    id: 2,
    name: "Description",
  },
  {
    id: 3,
    name: "Category",
  },
  {
    id: 4,
    name: "Amount",
    icon: <DollarSign className=" size-5" />,
  },
];

const profitsTable = () => {
  const data = Finance_ProfitLoss_ReturnAll();
  //-------------------------------------------------------

  const [searchTerm, setSearchTerm] = useState("");

  const filteredData = data?.filter((data) => {
    return data.type === "Revenue";
  });

  const searchedData = filteredData.filter((data) => {
    const formattedDate = new Date(data.created_date).toLocaleDateString(
      "en-CA"
    );
    return (
      data.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      formattedDate.includes(searchTerm) ||
      data.category.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  return (
    <>
      <Card className=" border-none shadow-none">
        <CardContent>
          <div className="flex md:flex-row md:justify-between flex-col items-center mb-2">
            <FinanceProfitInsert />
            <div className="w-full md:w-1/2 ">
              <Input
                type="text"
                placeholder="Search data here... (e.g. Date, Description, Category)"
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
                    <TableCell>
                      {data?.created_date
                        ? new Date(data?.created_date).toLocaleString("en-CA", {
                            year: "numeric",
                            month: "numeric",
                            day: "numeric",
                          })
                        : "N/A"}
                    </TableCell>
                    <TableCell>{data.description}</TableCell>
                    <TableCell>{data.category}</TableCell>
                    <TableCell>
                    <span className="">
          RS{" "}
          {data?.amount_revenue
            ? data.amount_revenue.toLocaleString("en-US", {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })
            : "0.00"}
        </span>
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
    </>
  );
};

//-----------------------------------------


import FinanceLosesInsert from "@/components/admin/finance/finaneProfitLoss/FinanceLosesInsert";

const profitLossTable = () => {
  const data = Finance_ProfitLoss_ReturnAll();
  //-------------------------------------------------------

  const [searchTerm, setSearchTerm] = useState("");

  const filteredData = data?.filter((data) => {
    return data.type === "Expenses";
  });

  const searchedData = filteredData.filter((data) => {
    const formattedDate = new Date(data.created_date).toLocaleDateString(
      "en-CA"
    );
    return (
      data.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      formattedDate.includes(searchTerm) ||
      data.category.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  return (
    <>
      <Card className=" border-none shadow-none">
        <CardContent>
          <div className="flex md:flex-row md:justify-between flex-col items-center mb-2">
            <FinanceLosesInsert />
            <div className="w-full md:w-1/2 ">
              <Input
                type="text"
                placeholder="Search data here... (e.g. Date, Description, Category)"
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
                    <TableCell>
                      {data?.created_date
                        ? new Date(data?.created_date).toLocaleString("en-CA", {
                            year: "numeric",
                            month: "numeric",
                            day: "numeric",
                          })
                        : "N/A"}
                    </TableCell>
                    <TableCell>{data.description}</TableCell>
                    <TableCell>{data.category}</TableCell>
                    <TableCell>
                    <span className="">
          RS{" "}
          {data?.amount_expense
            ? data.amount_expense.toLocaleString("en-US", {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })
            : "0.00"}
        </span>
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
    </>
  );
};




//-----------------------------



("use client");

import * as React from "react";
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";

import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Finance_BankBook_Delete,
  Finance_BankBook_ReturnAll,
} from "@/utils/API/finance/Finance_BankBook_API";

const chartConfig = {
  transactions: {
    label: "transactions",
  },
  amount_revenue: {
    label: "amount_revenue",
    color: "rgb(0, 201, 81)",
  },
  amount_expense: {
    label: "amount_expense",
    color: "rgb(255, 100, 100)",
  },
} satisfies ChartConfig;

const ProfiLossChart = () => {
  //Asigning the data to transactions from Finance_BankBook_ReturnAll function
  const transactions = Finance_ProfitLoss_ReturnAll();
  //-------------------------------------------------------


  const sortedTransactionsAsc = transactions.sort((a, b) => {
    const dateA = new Date(typeof a.created_date === 'string' ? a.created_date : a.created_date.$created_date);
    const dateB = new Date(typeof b.created_date === 'string' ? b.created_date : b.created_date.$created_date);
    return dateA.getTime() - dateB.getTime(); // ascending
  });
  

  const [timeRange, setTimeRange] = React.useState("90d");

  const filteredData = sortedTransactionsAsc.filter((item) => {
    const date = new Date(item.created_date);
    const referenceDate = new Date();
    let daysToSubtract = 90;
    if (timeRange === "30d") {
      daysToSubtract = 30;
    } else if (timeRange === "7d") {
      daysToSubtract = 7;
    }
    const startDate = new Date(referenceDate);
    startDate.setDate(startDate.getDate() - daysToSubtract);
    return date >= startDate;
  });

  return (
    <Card>
      <CardHeader className="flex items-center gap-2 space-y-0 border-b py-5 sm:flex-row">
        <div className="grid flex-1 gap-1 text-center sm:text-left">
          <CardTitle>Transactions chart</CardTitle>
          <CardDescription>
            Showing transactions for the last 3 months
          </CardDescription>
        </div>
        <Select value={timeRange} onValueChange={setTimeRange}>
          <SelectTrigger
            className="w-[160px] rounded-lg sm:ml-auto"
            aria-label="Select a value"
          >
            <SelectValue placeholder="Last 3 months" />
          </SelectTrigger>
          <SelectContent className="rounded-xl">
            <SelectItem value="90d" className="rounded-lg">
              Last 3 months
            </SelectItem>
            <SelectItem value="30d" className="rounded-lg">
              Last 30 days
            </SelectItem>
            <SelectItem value="7d" className="rounded-lg">
              Last 7 days
            </SelectItem>
          </SelectContent>
        </Select>
      </CardHeader>
      <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
        <ChartContainer
          config={chartConfig}
          className="aspect-auto h-[250px] w-full"
        >
          <AreaChart data={filteredData}>
            <defs>
              <linearGradient id="fillamount_revenue" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="var(--color-amount_revenue)"
                  stopOpacity={0.8}
                />
                <stop
                  offset="95%"
                  stopColor="var(--color-amount_revenue)"
                  stopOpacity={0.1}
                />
              </linearGradient>
              <linearGradient id="fillamount_expense" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="var(--color-amount_expense)"
                  stopOpacity={0.8}
                />
                <stop
                  offset="95%"
                  stopColor="var(--color-amount_expense)"
                  stopOpacity={0.1}
                />
              </linearGradient>
            </defs>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="created_date"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              minTickGap={32}
              tickFormatter={(value) => {
                const date = new Date(value);
                return date.toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                });
              }}
            />
            <ChartTooltip
              cursor={false}
              content={
                <ChartTooltipContent
                  labelFormatter={(value) => {
                    return new Date(value).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                    });
                  }}
                  indicator="dot"
                />
              }
            />
            <Area
              dataKey="amount_expense"
              type="natural"
              fill="url(#fillamount_expense)"
              stroke="var(--color-amount_expense)"
              stackId="a"
            />
            <Area
              dataKey="amount_revenue"
              type="natural"
              fill="url(#fillamount_revenue)"
              stroke="var(--color-amount_revenue)"
              stackId="a"
            />
            <ChartLegend content={<ChartLegendContent />} />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};
