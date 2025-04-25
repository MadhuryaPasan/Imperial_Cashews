import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { SidebarProvider } from "@/components/ui/sidebar";
import { Download, Eye, Phone } from "lucide-react";
import SalesSideBar from "../layout/salesSideBar";
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
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
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

const sales_orders = () => {
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
                    {data?.length}
                  </div>
                </CardContent>
              </CardHeader>
            </Card>
          </div>
          <Separator className=" my-4" />
          <div>{MonthlyOrdersChart()}</div>
          <Separator className=" my-4" />
          <div>{OrdersDataTable()}</div>
        </main>
      </div>
    </>
  );
};

export default sales_orders;

// ---------------------------------------------------

const tableColumns = [
  {
    id: 1,
    name: "Oder ID",
    icon: <Phone className=" size-5" />,
  },
  {
    id: 2,
    name: "Time",
    icon: <Phone className=" size-5" />,
  },
  {
    id: 3,
    name: "Status",
  },
  {
    id: 4,
    name: "Total Price",
  },
  {
    id: 5,
    name: "Customer Name",
  },
  {
    id: 6,
    name: "Customer Email",
  },
  {
    id: 7,
    name: "Customer Mobile",
  },
  {
    id: 8,
    name: "Order Details",
  },

];

const OrdersDataTable = () => {
  //Asigning the data to transactions from Finance_BankBook_ReturnAll function
  const data = Sales_Order_ReturnAll();
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
      data.customerData.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      data.oder_id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      data.customerData.email.toLowerCase().includes(searchTerm.toLowerCase())
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
                placeholder="Search data here... (e.g. customer name, order id, customer email)"
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
                    <TableCell>{data.oder_id}</TableCell>
                    <TableCell>
                      {data?.order_date
                        ? new Date(data?.order_date).toLocaleString("en-CA", {
                            year: "numeric",
                            month: "numeric",
                            day: "numeric",
                            hour: "2-digit",
                            minute: "2-digit",
                          })
                        : "N/A"}
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant="outline"
                        className="border-primary text-primary px-3 py-1 rounded-md"
                      >
                        {data.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <span className="">
                        RS{" "}
                        {data.total_price.toLocaleString("en-US", {
                          minimumFractionDigits: 2,
                          maximumFractionDigits: 2,
                        })}
                      </span>
                    </TableCell>
                    <TableCell>{data.customerData.name}</TableCell>
                    <TableCell>{data.customerData.email}</TableCell>
                    <TableCell>{data.customerData.contact_number}</TableCell>
                    <TableCell>
                      <Dialog>
                        <DialogTrigger>
                          <Button variant="ghost">
                            <Eye className=" h-4 w-4" />
                            View Details
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="bg-white">
                          <DialogHeader>
                            <DialogTitle>Order Details</DialogTitle>
                            </DialogHeader>
                            <DialogDescription className="h-[50vh] overflow-y-auto">
                              <Table>
                                <TableHeader>
                                  <TableRow>
                                    <TableHead>Product Name</TableHead>
                                    <TableHead>Product ID</TableHead>
                                    <TableHead>Quantity</TableHead>
                                    <TableHead>Final Price</TableHead>
                                  </TableRow>
                                </TableHeader>
                                <TableBody>
                                  {data.oder_details.map((item: any) => (
                                    <TableRow>
                                      <TableCell>{item.product_name}</TableCell>
                                      <TableCell>
                                        {item.shop_product_id}
                                      </TableCell>
                                      <TableCell>{item.quantity}</TableCell>
                                      <TableCell>{item.final_price}</TableCell>
                                    </TableRow>
                                  ))}
                                </TableBody>
                              </Table>
                            </DialogDescription>
                          
                        </DialogContent>
                      </Dialog>
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

const MonthlyOrdersChart = () => {
  interface Oder {
    order_date: string | { $date: string };
    // add other fields if needed
  }

  interface MonthlyCount {
    month: string;
    count: number;
  }

  const getLastSixMonthsOderCounts = (data: Oder[]): MonthlyCount[] => {
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

        if (typeof emp.order_date === "string") {
          joinedDate = new Date(emp.order_date);
        } else {
          joinedDate = new Date(emp.order_date.$date);
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
  const data = Sales_Order_ReturnAll(); // returns Oder[]
  const chartData = getLastSixMonthsOderCounts(data);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Bar Chart – Monthly New Orders Count</CardTitle>
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