import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
// import Finance_PettyCash_Table from "@/components/MainFunctions/Finance/Finance_PettyCash/Finance_PettyCash_Table";
import FinanceBankBook_Insert from "@/components/admin/finance/financeBankBooks/financeBankBook_Insert";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { SidebarProvider } from "@/components/ui/sidebar";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import FinanceSideBar from "@/web/admin/finance/layout/financeSideBar";
import { ArrowDown, ArrowUp, Download, Edit, Trash } from "lucide-react";
import { useState } from "react";

const financeBankBook = () => {
  //Assigning the data to transactions from Finance_BankBook_ReturnAll function
  const transactions = Finance_BankBook_ReturnAll();
  //-------------------------------------------------------

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
  {
    id: 7,
    name: "Options",
    icon: <Edit className=" size-5" />,
  },
];

const tableData = () => {
  //Asigning the data to transactions from Finance_BankBook_ReturnAll function
  const transactions = Finance_BankBook_ReturnAll();
  //-------------------------------------------------------

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTab, setSelectedTab] = useState<String | null>("all");

  const handleTabChange = (value: string) => {
    setSelectedTab(value);
  };

  const filteredProducts = transactions?.filter((transaction) => {
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
                placeholder="Search data here... (e.g. date, description, reference)"
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
                  <TableRow key={transaction._id}>
                    <TableCell>
                      {transaction?.date
                        ? new Date(transaction?.date).toLocaleString("en-CA", {
                            year: "numeric",
                            month: "numeric",
                            day: "numeric",
                          })
                        : "N/A"}
                    </TableCell>
                    {["description", "reference"].map((key) => (
                      <TableCell key={key}>{transaction?.[key]}</TableCell>
                    ))}
                    {/* <TableCell>{transaction?.description}</TableCell>
                    <TableCell>{transaction?.reference}</TableCell> */}
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

                    <TableCell className="flex gap-2 ">
                      
                        <Button variant="outline" size="icon">
                          <Edit className=" size-5 text-primary" />
                        </Button>
                        {DeleteTransaction(transaction._id)}
                      
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

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const DeleteTransaction = (id: string) => {
  const deleteRow = async (id: string) => {
    await Finance_BankBook_Delete(id);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    window.location.reload();
  };

  return (
    
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="outline" size="icon">
            <Trash className=" size-5 text-destructive" />
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Are you absolutely sure?</DialogTitle>
            <DialogDescription>
              This action cannot be undone. This will permanently remove your
              data from our servers.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className=" justify-between">
            <DialogClose asChild>
              <Button type="button" variant="outline" className="">
                Close
              </Button>
            </DialogClose>
            <Button
              type="button"
              className=" bg-destructive"
              onClick={() => deleteRow(id)}
            >
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    
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
import {
  Finance_BankBook_Delete,
  Finance_BankBook_ReturnAll,
} from "@/utils/API/finance/Finance_BankBook_API";

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
  //Asigning the data to transactions from Finance_BankBook_ReturnAll function
  const transactions = Finance_BankBook_ReturnAll();
  //-------------------------------------------------------

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

//  // db

//   const [transactions, setTransactions] = useState<any[]>([]);

//   React.useEffect(() => {
//       async function getAll() {
//           try {
//               let result = await Finance_BankBook_GetAll();
//               setTransactions(result);
//           } catch (error) {
//               console.error("Error fetching BankBook transactions:", error);
//           }
//       }
//       getAll();
//   }, []);

// //----------------------------
