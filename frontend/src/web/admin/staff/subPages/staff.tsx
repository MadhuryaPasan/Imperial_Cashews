"use client";

import { SidebarProvider } from "@/components/ui/sidebar";
import StaffSideBar from "../layout/staffSideBar";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { ClipboardCheck, Download, Phone, TrendingUp } from "lucide-react";
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
import { Bar, BarChart, CartesianGrid, LabelList, XAxis } from "recharts";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

const StaffPage = () => {
  const data = Staff_Employee_ReturnAll();

  // ✨ Download Handler
  const handleDownload = () => {
    const printContent = document.getElementById("staff-table");
    const newWindow = window.open("", "", "width=800,height=600");
    if (newWindow && printContent) {
      newWindow.document.write("<html><head><title>Staff Report</title></head><body>");
      newWindow.document.write(printContent.outerHTML);
      newWindow.document.write("</body></html>");
      newWindow.document.close();
      newWindow.print();
    }
  };

  return (
    <>
      <div className="flex">
        <div>
          <SidebarProvider>
            <StaffSideBar />
          </SidebarProvider>
        </div>

        <main className="w-full mx-5 mt-4">
          <div className="flex justify-between">
            <div className="text-3xl font-bold">Manage Staff</div>
            <div className="flex gap-2 items-center">
              <Button variant="outline" onClick={handleDownload}>
                Report <Download className="ml-2" />
              </Button>
            </div>
          </div>

          <Separator className="my-4" />

          <div className="grid grid-cols-3">
            <Card>
              <CardHeader>
                <CardTitle className="text-sm font-medium">Total Staff count</CardTitle>
                <CardContent className="p-0">
                  <div className="text-2xl font-bold line-clamp-1 text-primary">
                    {data?.length}
                  </div>
                </CardContent>
              </CardHeader>
            </Card>
          </div>

          <Separator className="my-4" />
          <div className="mx-auto">{MonthlyEmployeeChart()}</div>
          <Separator className="my-4" />
          <div id="staff-table">{StaffDataTable()}</div>
        </main>
      </div>
    </>
  );
};

export default StaffPage;

//---------------------------------------------------

const tableColumns = [
  { id: 1, name: "Name" },
  { id: 2, name: "Email" },
  { id: 3, name: "Mobile", icon: <Phone className="w-4 h-4" /> },
  { id: 4, name: "Address" },
  { id: 5, name: "Position" },
  { id: 6, name: "Department" },
  { id: 7, name: "Joined Date" },
  { id: 8, name: "Attendance Today" },
];

const StaffDataTable = () => {
  const data = Staff_Employee_ReturnAll();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTab, setSelectedTab] = useState<string>("all");

  const handleTabChange = (value: string) => {
    setSelectedTab(value);
  };

  const filteredData = data?.filter((d) => {
    if (selectedTab === "hr") return d.department === "HR";
    if (selectedTab === "sales") return d.department === "Sales";
    if (selectedTab === "finance") return d.department === "Finance";
    if (selectedTab === "quality") return d.department === "Quality Control";
    if (selectedTab === "inventory") return d.department === "Inventory";
    return true;
  });

  const searchedData = filteredData?.filter((d) => {
    return (
      d.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      d.position.toLowerCase().includes(searchTerm.toLowerCase()) ||
      d.address.toLowerCase().includes(searchTerm.toLowerCase()) ||
      d.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      d.phoneNumber.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  return (
    <Card>
      <CardContent>
        <div className="flex md:flex-row md:justify-between flex-col items-center mb-2">
          <div>
            <Tabs defaultValue="all" onValueChange={handleTabChange}>
              <TabsList className="w-[120%] gap-3">
                <TabsTrigger value="all">All</TabsTrigger>
                <TabsTrigger value="hr">HR</TabsTrigger>
                <TabsTrigger value="sales">Sales</TabsTrigger>
                <TabsTrigger value="finance">Finance</TabsTrigger>
                <TabsTrigger value="quality">Quality Control</TabsTrigger>
                <TabsTrigger value="inventory">Inventory</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
          <div className="w-full md:w-1/2">
            <Input
              type="text"
              placeholder="Search data here... (e.g. Name, Position, Mobile, Address, Email)"
              className="w-full"
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
                  <TableCell>{data?.phoneNumber}</TableCell>
                  <TableCell>{data?.address}</TableCell>
                  <TableCell>{data?.position}</TableCell>
                  <TableCell>{data?.department}</TableCell>
                  <TableCell>
                    {data?.dateJoined
                      ? new Date(data?.dateJoined).toLocaleString("en-CA", {
                          year: "numeric",
                          month: "numeric",
                          day: "numeric",
                        })
                      : "N/A"}
                  </TableCell>
                  <TableCell className="flex gap-2">
                    <Button variant="outline">
                      <ClipboardCheck /> Check In
                    </Button>
                    <Button variant="outline">
                      <ClipboardCheck /> Check Out
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
};

//---------------------------------------------------

const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "rgb(0, 201, 81)",
  },
} satisfies ChartConfig;

const MonthlyEmployeeChart = () => {
  interface Employee {
    dateJoined: string | { $date: string };
  }

  interface MonthlyCount {
    month: string;
    count: number;
  }

  const getLastSixMonthsEmployeeCounts = (data: Employee[]): MonthlyCount[] => {
    const now = new Date();
    const result: MonthlyCount[] = [];

    for (let i = 5; i >= 0; i--) {
      const monthStart = new Date(now.getFullYear(), now.getMonth() - i, 1);
      const monthEnd = new Date(now.getFullYear(), now.getMonth() - i + 1, 0, 23, 59, 59);

      const count = data.filter((emp) => {
        let joinedDate: Date;
        if (typeof emp.dateJoined === "string") {
          joinedDate = new Date(emp.dateJoined);
        } else {
          joinedDate = new Date(emp.dateJoined.$date);
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

  const data = Staff_Employee_ReturnAll();
  const chartData = getLastSixMonthsEmployeeCounts(data);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Bar Chart – Monthly New Staff Count</CardTitle>
        <CardDescription>Last 6 months</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer config={chartConfig} className="max-h-[350px] mx-auto">
          <BarChart data={chartData} margin={{ top: 20 }}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
            <Bar dataKey="count" fill="var(--color-desktop)" radius={8}>
              <LabelList position="top" offset={12} className="fill-foreground" fontSize={12} />
            </Bar>
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};
