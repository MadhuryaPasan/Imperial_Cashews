import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
// import Finance_PettyCash_Table from "@/components/MainFunctions/Finance/Finance_PettyCash/Finance_PettyCash_Table";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { SidebarProvider } from "@/components/ui/sidebar";
import FinanceSideBar from "@/web/admin/finance/layout/financeSideBar";
import { ArrowDown, ArrowUp, Download, Plus } from "lucide-react";
import FinanceBankBook_Insert from "@/components/admin/finance/financeBankBooks/financeBankBook_Insert";

const financeBankBook = () => {
  const totalDeposits = transactions.reduce(
    (acc, curr) => acc + curr.Deposits,
    0
  );
  const totalWithdrawals = transactions.reduce(
    (acc, curr) => acc + curr.Withdrawals,
    0
  );

  const currentBalance = totalDeposits - totalWithdrawals;

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
            <div className="text-3xl font-bold ">Bank Book</div>
            <div className="flex gap-2 items-center">
              <FinanceBankBook_Insert />
              <Button variant="outline">
                Report <Download />
              </Button>
            </div>
          </div>
          <Separator className=" my-4" />

          <div className="grid md:grid-cols-3 gap-4 ">
            <Card>
              <CardHeader>
                <CardTitle className="text-sm font-medium">
                  Current Balance
                </CardTitle>
                <CardContent className="p-0">
                  <div className="text-2xl font-bold line-clamp-1">
                    RS{" "}
                    {currentBalance.toLocaleString("en-US", {
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
                  Total Deposits
                </CardTitle>
                <CardContent className="p-0">
                  <div className="text-2xl font-bold line-clamp-1 text-primary">
                    RS{" "}
                    {totalDeposits.toLocaleString("en-US", {
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
                  Total Withdrawals
                </CardTitle>
                <CardContent className="p-0">
                  <div className="text-2xl font-bold line-clamp-1 text-destructive">
                    RS{" "}
                    {totalWithdrawals.toLocaleString("en-US", {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })}
                  </div>
                </CardContent>
              </CardHeader>
            </Card>
          </div>
          <Separator className=" my-4" />

          {/* <div>{Records()}</div> */}

          <div>{chart2()}</div>
          <Separator className=" my-4" />
          <div>{tableData()}</div>
        </main>
      </div>
    </>
  );
};

export default financeBankBook;

// const Records = () => {
//   return (
//     <div>
//       <Finance_PettyCash_Table />
//     </div>
//   );
// };

const transactions = [
  // March 2025
  {
    id: "1",
    date: "2025-03-01",
    description: "Client Payment - ABC Corp",
    reference: "INV-2025-001",
    Withdrawals: 0,
    Deposits: 12500,
    balance: 12500,
  },
  {
    id: "2",
    date: "2025-03-03",
    description: "Office Rent Payment",
    reference: "CHK-1001",
    Withdrawals: 5000,
    Deposits: 0,
    balance: 7500,
  },
  {
    id: "3",
    date: "2025-03-05",
    description: "Service Income",
    reference: "INV-2025-002",
    Withdrawals: 0,
    Deposits: 8000,
    balance: 15500,
  },
  {
    id: "4",
    date: "2025-03-07",
    description: "Utility Bill Payment",
    reference: "CHK-1002",
    Withdrawals: 2000,
    Deposits: 0,
    balance: 13500,
  },
  {
    id: "5",
    date: "2025-03-10",
    description: "Client Payment - XYZ Ltd",
    reference: "INV-2025-003",
    Withdrawals: 0,
    Deposits: 6000,
    balance: 19500,
  },
  {
    id: "6",
    date: "2025-03-13",
    description: "Office Supplies",
    reference: "CHK-1003",
    Withdrawals: 1200,
    Deposits: 0,
    balance: 18300,
  },
  {
    id: "7",
    date: "2025-03-16",
    description: "Client Payment - QRS Inc",
    reference: "INV-2025-004",
    Withdrawals: 0,
    Deposits: 7000,
    balance: 25300,
  },
  {
    id: "8",
    date: "2025-03-20",
    description: "Internet Bill",
    reference: "CHK-1004",
    Withdrawals: 1500,
    Deposits: 0,
    balance: 23800,
  },
  {
    id: "9",
    date: "2025-03-24",
    description: "Travel Reimbursement",
    reference: "TRV-2025-001",
    Withdrawals: 0,
    Deposits: 3000,
    balance: 26800,
  },
  {
    id: "10",
    date: "2025-03-28",
    description: "Miscellaneous Expense",
    reference: "CHK-1005",
    Withdrawals: 1000,
    Deposits: 0,
    balance: 25800,
  },

  // April 2025
  {
    id: "11",
    date: "2025-04-01",
    description: "Client Payment - LMN Ltd",
    reference: "INV-2025-005",
    Withdrawals: 0,
    Deposits: 10000,
    balance: 35800,
  },
  {
    id: "12",
    date: "2025-04-03",
    description: "Office Rent Payment",
    reference: "CHK-1006",
    Withdrawals: 5000,
    Deposits: 0,
    balance: 30800,
  },
  {
    id: "13",
    date: "2025-04-05",
    description: "Client Payment - DEF Ltd",
    reference: "INV-2025-006",
    Withdrawals: 0,
    Deposits: 6500,
    balance: 37300,
  },
  {
    id: "14",
    date: "2025-04-08",
    description: "Electricity Bill",
    reference: "CHK-1007",
    Withdrawals: 1800,
    Deposits: 0,
    balance: 35500,
  },
  {
    id: "15",
    date: "2025-04-09",
    description: "Client Payment - GHI Co",
    reference: "INV-2025-007",
    Withdrawals: 0,
    Deposits: 7200,
    balance: 42700,
  },
  {
    id: "16",
    date: "2025-04-10",
    description: "Stationery",
    reference: "CHK-1008",
    Withdrawals: 1000,
    Deposits: 0,
    balance: 41700,
  },
  {
    id: "17",
    date: "2025-04-11",
    description: "Client Payment - JKL Group",
    reference: "INV-2025-008",
    Withdrawals: 0,
    Deposits: 9000,
    balance: 50700,
  },
  {
    id: "18",
    date: "2025-04-12",
    description: "Internet Bill",
    reference: "CHK-1009",
    Withdrawals: 1500,
    Deposits: 0,
    balance: 49200,
  },
  {
    id: "19",
    date: "2025-04-13",
    description: "Repair Expenses",
    reference: "CHK-1010",
    Withdrawals: 2500,
    Deposits: 0,
    balance: 46700,
  },
  {
    id: "20",
    date: "2025-04-14",
    description: "Client Payment - MNO Corp",
    reference: "INV-2025-009",
    Withdrawals: 0,
    Deposits: 8800,
    balance: 55500,
  },

  // Similarly, you can add May, June, and July using the same pattern...
];

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
    name: "Reference",
  },
  {
    id: 4,
    name: "Withdrawals",
    icon: <ArrowUp className=" size-5 text-destructive" />,
  },
  {
    id: 5,
    name: "Deposits",
    icon: <ArrowDown className=" size-5 text-primary" />,
  },
  {
    id: 6,
    name: "Balance",
  },
];

const tableData = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTab, setSelectedTab] = useState<String | null>("all");

  const handleTabChange = (value: string) => {
    setSelectedTab(value);
  };

  const filteredProducts = transactions.filter((transaction) => {
    if (selectedTab === "Withdrawals") {
      return transaction.Withdrawals > 0;
    } else if (selectedTab === "Deposits") {
      return transaction.Deposits > 0;
    } else if (selectedTab === "all") {
      return true;
    }
    return true; // Default to showing all
  });

  // Filter products based on search
  const searchedTransactions = filteredProducts.filter(
    (transaction) =>
      transaction.description
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      transaction.date.toLowerCase().includes(searchTerm.toLowerCase()) ||
      transaction.reference.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
                  <TabsTrigger value="all">All Transactions</TabsTrigger>
                  <TabsTrigger value="Withdrawals">Withdrawals</TabsTrigger>
                  <TabsTrigger value="Deposits">Deposits</TabsTrigger>
                </TabsList>
              </Tabs>
            </div>
            <div className="w-full md:w-1/2">
              <Input
                type="text"
                placeholder="Search data..."
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
                {searchedTransactions.reverse().map((transaction) => (
                  <TableRow key={transaction.id}>
                    <TableCell>{transaction?.date}</TableCell>
                    <TableCell>{transaction?.description}</TableCell>
                    <TableCell>{transaction?.reference}</TableCell>
                    <TableCell className="text-destructive font-semibold">
                      {transaction?.Withdrawals <= 0 ? (
                        <span>{"-"}</span>
                      ) : (
                        <span className="">
                          RS{" "}
                          {transaction?.Withdrawals.toLocaleString("en-US", {
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2,
                          })}
                        </span>
                      )}
                    </TableCell>
                    <TableCell className="text-primary font-semibold">
                      {transaction?.Deposits <= 0 ? (
                        <span>{"-"}</span>
                      ) : (
                        <span className="">
                          RS{" "}
                          {transaction?.Deposits.toLocaleString("en-US", {
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2,
                          })}
                        </span>
                      )}
                    </TableCell>
                    <TableCell>
                      <span className="">
                        RS{" "}
                        {transaction?.balance.toLocaleString("en-US", {
                          minimumFractionDigits: 2,
                          maximumFractionDigits: 2,
                        })}
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
      <br />
      <br />
      <br />
      <br />
      <br />
    </>
  );
};

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

const chartConfig = {
  transactions: {
    label: "transactions",
  },
  Deposits: {
    label: "Deposits",
    color: "rgb(0, 201, 81)",
  },
  Withdrawals: {
    label: "Withdrawals",
    color: "rgb(255, 100, 100)",
  },
} satisfies ChartConfig;

const chart2 = () => {
  const [timeRange, setTimeRange] = React.useState("90d");

  const filteredData = transactions.filter((item) => {
    const date = new Date(item.date);
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
              <linearGradient id="fillDeposits" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="var(--color-Deposits)"
                  stopOpacity={0.8}
                />
                <stop
                  offset="95%"
                  stopColor="var(--color-Deposits)"
                  stopOpacity={0.1}
                />
              </linearGradient>
              <linearGradient id="fillWithdrawals" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="var(--color-Withdrawals)"
                  stopOpacity={0.8}
                />
                <stop
                  offset="95%"
                  stopColor="var(--color-Withdrawals)"
                  stopOpacity={0.1}
                />
              </linearGradient>
            </defs>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="date"
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
              dataKey="Withdrawals"
              type="natural"
              fill="url(#fillWithdrawals)"
              stroke="var(--color-Withdrawals)"
              stackId="a"
            />
            <Area
              dataKey="Deposits"
              type="natural"
              fill="url(#fillDeposits)"
              stroke="var(--color-Deposits)"
              stackId="a"
            />
            <ChartLegend content={<ChartLegendContent />} />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};

// const chart=() => {
//   const [activeChart, setActiveChart] =
//     React.useState<keyof typeof chartConfig>("Withdrawals")

//   const total = React.useMemo(
//     () => ({
//       Deposits: transactions.reduce((acc, curr) => acc + curr.Deposits, 0),
//       Withdrawals: transactions.reduce((acc, curr) => acc + curr.Withdrawals, 0),
//     }),
//     []
//   )

//   return (
//     <Card>
//       <CardHeader className="flex flex-col items-stretch space-y-0 border-b p-0 sm:flex-row">
//         <div className="flex flex-1 flex-col justify-center gap-1 px-6 py-5 sm:py-6">
//           <CardTitle>Line Chart - Interactive</CardTitle>
//           <CardDescription>
//             Showing total visitors for the last 3 months
//           </CardDescription>
//         </div>
//         <div className="flex">
//           {["Deposits", "Withdrawals"].map((key) => {
//             const chart = key as keyof typeof chartConfig
//             return (
//               <button
//                 key={chart}
//                 data-active={activeChart === chart}
//                 className="flex flex-1 flex-col justify-center gap-1 border-t px-6 py-4 text-left even:border-l data-[active=true]:border-primary sm:border-l sm:border-t-0 sm:px-8 sm:py-6"
//                 onClick={() => setActiveChart(chart)}
//               >
//                 <span className="text-xs text-muted-foreground">
//                   {chartConfig[chart].label}
//                 </span>
//                 <span className="text-lg font-bold leading-none sm:text-3xl">
//                   RS{" "}
//                   {total[key as keyof typeof total].toLocaleString("en-US", {
//                           minimumFractionDigits: 2,
//                           maximumFractionDigits: 2,
//                         })}
//                 </span>
//               </button>
//             )
//           })}
//         </div>
//       </CardHeader>
//       <CardContent className="px-2 sm:p-6">
//         <ChartContainer
//           config={chartConfig}
//           className="aspect-auto h-[250px] w-full"
//         >
//           <LineChart
//             accessibilityLayer
//             data={transactions}
//             margin={{
//               left: 12,
//               right: 12,
//             }}
//           >
//             <CartesianGrid vertical={false} />
//             <XAxis
//               dataKey="date"
//               tickLine={false}
//               axisLine={false}
//               tickMargin={8}
//               minTickGap={32}
//               tickFormatter={(value) => {
//                 const date = new Date(value)
//                 return date.toLocaleDateString("en-US", {
//                   month: "short",
//                   day: "numeric",
//                 })
//               }}
//             />
//             <ChartTooltip
//               content={
//                 <ChartTooltipContent
//                   className="w-[150px]"
//                   nameKey="views"
//                   labelFormatter={(value) => {
//                     return new Date(value).toLocaleDateString("en-US", {
//                       month: "short",
//                       day: "numeric",
//                       year: "numeric",
//                     })
//                   }}
//                 />
//               }
//             />
//             <Line
//               dataKey={activeChart}
//               type="monotone"
//               stroke={`var(--color-${activeChart})`}
//               strokeWidth={2}
//               dot={false}
//             />
//           </LineChart>
//         </ChartContainer>
//       </CardContent>
//     </Card>
//   )
// }
