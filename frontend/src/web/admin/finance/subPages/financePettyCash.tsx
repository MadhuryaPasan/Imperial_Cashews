import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { SidebarProvider } from "@/components/ui/sidebar";
import FinanceSideBar from "@/web/admin/finance/layout/financeSideBar";
import { ArrowDown, ArrowUp, Coins, Download } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Progress } from "@/components/ui/progress";
import { useState } from "react";
import { Finance_PettyCash_ReturnAll } from "@/utils/API/finance/Finance_PettyCash_API";
import { Input } from "@/components/ui/input";
import FinancePettyCash_insert from "@/components/admin/finance/financePettyCash/financePettyCash_insert";

const financePettyCash = () => {
  interface FinanceDocument {
    _id: string;
    transaction_date: string | { $date: string };
    description: string;
    current_balance: number;
    transaction_type: string;
    replenishment_amount: number;
    expense_amount: number;
  }

  // Get all data
  const data: FinanceDocument[] = Finance_PettyCash_ReturnAll();

  const now = new Date();
  const currentMonth = now.getMonth();
  const currentYear = now.getFullYear();

  // Filter documents in the current month
  const thisMonthData = data.filter((doc) => {
    const rawDate =
      typeof doc.transaction_date === "string"
        ? doc.transaction_date
        : doc.transaction_date.$date;
    const docDate = new Date(rawDate);

    return (
      docDate.getMonth() === currentMonth &&
      docDate.getFullYear() === currentYear
    );
  });

  // Sort by transaction_date ascending
  thisMonthData.sort((a, b) => {
    const dateA = new Date(
      typeof a.transaction_date === "string"
        ? a.transaction_date
        : a.transaction_date.$date
    );
    const dateB = new Date(
      typeof b.transaction_date === "string"
        ? b.transaction_date
        : b.transaction_date.$date
    );
    return dateA.getTime() - dateB.getTime();
  });

  // Last document in current month
  const LastDocument: FinanceDocument | undefined = thisMonthData.slice(-1)[0];
  const lastCurrentBalance: number | null =
    LastDocument?.current_balance ?? null;

  // Calculate totals
  const totalExpenses = thisMonthData.reduce(
    (sum, doc) => sum + doc.expense_amount,
    0
  );
  const totalReplenishments = thisMonthData.reduce(
    (sum, doc) => sum + doc.replenishment_amount,
    0
  );

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
            <div className="text-3xl font-bold ">Petty Cash</div>
            <div className="flex gap-2 items-center">
              <FinancePettyCash_insert />
              <Button variant="outline">
                Report <Download />
              </Button>
            </div>
          </div>
          <Separator className=" my-4" />

          <div className="grid grid-cols-3 gap-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-sm font-medium">
                  Current Balance (Current Month)
                </CardTitle>
                <CardContent className="p-0">
                  <div className="text-2xl font-bold line-clamp-1">
                    {lastCurrentBalance ? (
                      <span className="">
                        RS{" "}
                        {lastCurrentBalance.toLocaleString("en-US", {
                          minimumFractionDigits: 2,
                          maximumFractionDigits: 2,
                        })}
                      </span>
                    ) : (
                      <span className="text-destructive">0</span>
                    )}
                  </div>
                </CardContent>
              </CardHeader>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-sm font-medium">
                  Replenishment (Current Month)
                </CardTitle>
                <CardContent className="p-0">
                  <div className="text-2xl font-bold line-clamp-1 text-primary">
                    {totalReplenishments ? (
                      <span className="">
                        RS{" "}
                        {totalReplenishments.toLocaleString("en-US", {
                          minimumFractionDigits: 2,
                          maximumFractionDigits: 2,
                        })}
                      </span>
                    ) : (
                      <span className="text-destructive">0</span>
                    )}
                  </div>
                </CardContent>
              </CardHeader>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-sm font-medium">
                  Total Expenses (Current Month)
                </CardTitle>
                <CardContent className="p-0">
                  <div className="text-2xl font-bold line-clamp-1 text-destructive">
                    {totalExpenses ? (
                      <span className="">
                        RS{" "}
                        {totalExpenses.toLocaleString("en-US", {
                          minimumFractionDigits: 2,
                          maximumFractionDigits: 2,
                        })}
                      </span>
                    ) : (
                      <span className="text-destructive">0</span>
                    )}
                  </div>
                </CardContent>
              </CardHeader>
            </Card>
          </div>
          <Separator className=" my-4" />

          <div>{PettyCashChart()}</div>
          <Separator className=" my-4" />
          <div>{pettyCashTable()}</div>
        </main>
      </div>
    </>
  );
};

export default financePettyCash;

//---------------------------------------------------

const tableColumns = [
  {
    id: 1,
    name: "Transaction Date",
  },
  {
    id: 2,
    name: "Transaction Type",
  },
  {
    id: 3,
    name: "Description",
  },
  {
    id: 4,
    name: "Expense Amount",
    icon: <ArrowUp className=" size-5 text-destructive" />,
  },
  {
    id: 5,
    name: "Replenishment Amount",
    icon: <ArrowDown className=" size-5 text-primary" />,
  },
  {
    id: 6,
    name: "Current Balance",
    icon: <Coins className="h-4 w-4" />,
  },
];

const pettyCashTable = () => {
  //Asigning the data to transactions from Finance_BankBook_ReturnAll function
  const data = Finance_PettyCash_ReturnAll();
  //-------------------------------------------------------

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTab, setSelectedTab] = useState<String | null>("all");

  const handleTabChange = (value: string) => {
    setSelectedTab(value);
  };

  const filteredData = data?.filter((data) => {
    if (selectedTab === "Replenishment") {
      return data.transaction_type === "Replenishment";
    } else if (selectedTab === "Expenses") {
      return data.transaction_type === "Expenses";
    }
    if (selectedTab === "all") {
      return true;
    }
    return true; // Default to showing all
  });

  const searchedData = filteredData.filter((data) => {
    const formattedDate = new Date(data.transaction_date).toLocaleDateString(
      "en-CA"
    ); // Gives "YYYY-MM-DD" format

    return (
      formattedDate.includes(searchTerm) ||
      data.description.toLowerCase().includes(searchTerm.toLowerCase())
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
                  <TabsTrigger value="Expenses">Expenses</TabsTrigger>
                  <TabsTrigger value="Replenishment">Replenishment</TabsTrigger>
                </TabsList>
              </Tabs>
            </div>
            <div className="w-full md:w-1/2">
              <Input
                type="text"
                placeholder="Search data here... (e.g. Transaction Type, Transaction Date, Description)"
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
                      {data?.transaction_date
                        ? new Date(data?.transaction_date).toLocaleString(
                            "en-CA",
                            {
                              year: "numeric",
                              month: "numeric",
                              day: "numeric",
                            }
                          )
                        : "N/A"}
                    </TableCell>
                    <TableCell>{data.transaction_type}</TableCell>
                    <TableCell>{data.description}</TableCell>
                    <TableCell className="text-destructive font-semibold">
                      {data?.expense_amount <= 0 ? (
                        <span>{"-"}</span>
                      ) : (
                        <span className="">
                          RS{" "}
                          {data?.expense_amount.toLocaleString("en-US", {
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2,
                          })}
                        </span>
                      )}
                    </TableCell>
                    <TableCell className="text-primary font-semibold">
                      {data?.replenishment_amount <= 0 ? (
                        <span>{"-"}</span>
                      ) : (
                        <span className="">
                          RS{" "}
                          {data?.replenishment_amount.toLocaleString("en-US", {
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2,
                          })}
                        </span>
                      )}
                    </TableCell>
                    <TableCell>
                      RS{" "}
                      {data?.current_balance.toLocaleString("en-US", {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      })}
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
  replenishment_amount: {
    label: "Replenishment",
    color: "rgb(0, 201, 81)",
  },
  expense_amount: {
    label: "Expenses",
    color: "rgb(255, 100, 100)",
  },
} satisfies ChartConfig;

const PettyCashChart = () => {
  const transactions = Finance_PettyCash_ReturnAll();

  const sortedTransactionsAsc = transactions.sort((a, b) => {
    const dateA = new Date(typeof a.transaction_date === 'string' ? a.transaction_date : a.transaction_date.$date);
    const dateB = new Date(typeof b.transaction_date === 'string' ? b.transaction_date : b.transaction_date.$date);
    return dateA.getTime() - dateB.getTime(); // ascending
  });

  const [timeRange, setTimeRange] = React.useState("90d");

  const filteredData = sortedTransactionsAsc.filter((item) => {
    const date = new Date(item.transaction_date);
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
          <CardTitle>Area Chart - Interactive</CardTitle>
          <CardDescription>
            Showing total visitors for the last 3 months
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
              <linearGradient id="fillreplenishment_amount" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="var(--color-replenishment_amount)"
                  stopOpacity={0.8}
                />
                <stop
                  offset="95%"
                  stopColor="var(--color-replenishment_amount)"
                  stopOpacity={0.1}
                />
              </linearGradient>
              <linearGradient id="fillexpense_amount" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="var(--color-expense_amount)"
                  stopOpacity={0.8}
                />
                <stop
                  offset="95%"
                  stopColor="var(--color-expense_amount)"
                  stopOpacity={0.1}
                />
              </linearGradient>
            </defs>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="transaction_date"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              minTickGap={32}
              tickFormatter={(value) => {
                const date = new Date(value)
                return date.toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                })
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
                    })
                  }}
                  indicator="dot"
                />
              }
            />
            <Area
              dataKey="expense_amount"
              type="natural"
              fill="url(#fillexpense_amount)"
              stroke="var(--color-expense_amount)"
              stackId="a"
            />
            <Area
              dataKey="replenishment_amount"
              type="natural"
              fill="url(#fillreplenishment_amount)"
              stroke="var(--color-replenishment_amount)"
              stackId="a"
            />
            <ChartLegend content={<ChartLegendContent />} />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};
