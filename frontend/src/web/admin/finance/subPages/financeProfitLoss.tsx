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

const financeProfitLoss = () => {
  const data = Finance_ProfitLoss_ReturnAll();

  const totalRevenue = data
    ?.filter((item) => item.type === "Revenue")
    .reduce((acc, curr) => acc + curr.amount, 0);
  const TotalExpenses = data
    ?.filter((item) => item.type === "Expenses")
    .reduce((acc, curr) => acc + curr.amount, 0);

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
                  Total Deposits
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


import FinanceProfitInsert from "@/components/admin/finance/finaneProfitLoss/financeProfitinsert";

const tableColumns = [
  {
    id: 1,
    name: "Date",
  },

  {
    id: 3,
    name: "Description",
  },
  {
    id: 3,
    name: "Category",
  },
  {
    id: 3,
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
                        {data.amount.toLocaleString("en-US", {
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
                        {data.amount.toLocaleString("en-US", {
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
    </>
  );
};
