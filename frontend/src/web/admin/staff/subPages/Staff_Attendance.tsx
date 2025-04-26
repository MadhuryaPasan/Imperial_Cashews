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
import { Staff_Attendance_ReturnAll } from "@/utils/API/staff/Staff_Attendance_API";
import { Badge } from "@/components/ui/badge";

const sales_Attendance = () => {
  const data = Staff_Attendance_ReturnAll();
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
            <div className="text-3xl font-bold ">Attendance</div>
            <div className="flex gap-2 items-center">
              {/* <FinanceBankBook_Insert /> */}
              <Button variant="outline">
                Report <Download />
              </Button>
            </div>
          </div>
          <Separator className=" my-4" />

          <Separator className=" my-4" />
          <div className="grid md:grid-cols-3 gap-4 ">
            <Card>
              <CardHeader>
                <CardTitle className="text-sm font-medium">
                  Today's Total Work Time
                </CardTitle>
                <CardContent className="p-0">
                  <div className="text-2xl font-bold line-clamp-1 text-primary">
                    {(() => {
                      const today = new Date();
                      const todaysRecords = data.filter((item) =>
                        isSameDay(new Date(item.created_date), today)
                      );

                      const totalMinutes = todaysRecords.reduce((sum, item) => {
                        if (item.check_in && item.check_out) {
                          const checkIn = new Date(item.check_in);
                          const checkOut = new Date(item.check_out);
                          const minutes = differenceInMinutes(
                            checkOut,
                            checkIn
                          );
                          return sum + minutes;
                        }
                        return sum;
                      }, 0);

                      const hours = Math.floor(totalMinutes / 60);
                      const minutes = totalMinutes % 60;

                      return `${hours}h ${minutes}m`;
                    })()}
                  </div>
                </CardContent>
              </CardHeader>
            </Card>


            
<Card>
  <CardHeader>
    <CardTitle className="text-sm font-medium">
      This Month's Total Work Time
    </CardTitle>
    <CardContent className="p-0">
      <div className="text-2xl font-bold line-clamp-1 text-primary">
        {(() => {
          const now = new Date();

          const monthlyRecords = data.filter(item =>
            isSameMonth(new Date(item.created_date), now)
          );

          const totalMinutes = monthlyRecords.reduce((sum, item) => {
            if (item.check_in && item.check_out) {
              const checkIn = new Date(item.check_in);
              const checkOut = new Date(item.check_out);
              const minutes = differenceInMinutes(checkOut, checkIn);
              return sum + minutes;
            }
            return sum;
          }, 0);

          const hours = Math.floor(totalMinutes / 60);
          const minutes = totalMinutes % 60;

          return `${hours}h ${minutes}m`; 
        })()}
      </div>
    </CardContent>
  </CardHeader>
</Card>
          </div>
          <Separator className=" my-4" />
          <div>{MonthlyAvaregeWorkTimeChart()}</div>
          <Separator className=" my-4" />
          <div>{StaffAttendanceDataTable()}</div>
        </main>
      </div>
    </>
  );
};

export default sales_Attendance;

// ---------------------------------------------------

const tableColumns = [
  {
    id: 1,
    name: "Date",
  },
  {
    id: 2,
    name: "Name",
  },
  {
    id: 3,
    name: "Email",
  },
  {
    id: 4,
    name: "Mobile",
    icon: <Phone className="w-4 h-4" />,
  },
  {
    id: 5,
    name: "Status",
  },
  {
    id: 6,
    name: "Check-In",
  },
  {
    id: 7,
    name: "Check-Out",
  },
  {
    id: 8,
    name: "Department",
  },
  {
    id: 9,
    name: "Working Hours", // New column for working hours
  },
];

const StaffAttendanceDataTable = () => {
  const data = Staff_Attendance_ReturnAll();

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTab, setSelectedTab] = useState<String | null>("all");

  const handleTabChange = (value: string) => {
    setSelectedTab(value);
  };

  const filteredData = data?.filter((data) => {
    if (selectedTab === "hr") {
      return data.departmentData.name === "HR";
    } else if (selectedTab === "sales") {
      return data.departmentData.name === "Sales";
    } else if (selectedTab === "finance") {
      return data.departmentData.name === "Finance";
    } else if (selectedTab === "quality") {
      return data.departmentData.name === "Quality Control";
    } else if (selectedTab === "inventory") {
      return data.departmentData.name === "Inventory";
    }
    if (selectedTab === "all") {
      return true;
    }
    return true; // Default to showing all
  });

  const searchedData = filteredData.filter((data) => {
    return (
      data.employeeData.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      data.employeeData.email
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      data.status.toLowerCase().includes(searchTerm.toLowerCase()) ||
      data.employeeData.phoneNumber
        .toLowerCase()
        .includes(searchTerm.toLowerCase())
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
                placeholder="Search data here... (e.g. Name, Email, Mobile, Status)"
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
                    <TableCell>{data?.employeeData.name}</TableCell>
                    <TableCell>{data?.employeeData.email}</TableCell>
                    <TableCell>{data?.employeeData.phoneNumber}</TableCell>
                    <TableCell>
                      {data.status === "present" ? (
                        <Badge
                          variant="outline"
                          className="text-primary border-primary w-20"
                        >
                          Present
                        </Badge>
                      ) : data.status === "late" ? (
                        <Badge
                          variant="outline"
                          className="text-yellow-500 border-yellow-500 w-20"
                        >
                          Late
                        </Badge>
                      ) : (
                        <Badge
                          variant="outline"
                          className="text-destructive border-destructive w-20"
                        >
                          Absent
                        </Badge>
                      )}
                    </TableCell>
                    <TableCell>
                      {data?.check_in
                        ? new Date(data?.check_in).toLocaleString("en-CA", {
                            hour: "2-digit",
                            minute: "2-digit",
                            second: "2-digit",
                            hour12: false,
                          })
                        : "N/A"}
                    </TableCell>
                    <TableCell>
                      {data?.check_out
                        ? new Date(data?.check_out).toLocaleString("en-CA", {
                            hour: "2-digit",
                            minute: "2-digit",
                            second: "2-digit",
                            hour12: false,
                          })
                        : "N/A"}
                    </TableCell>
                    <TableCell>{data?.departmentData.name}</TableCell>
                    <TableCell>
                      {data?.working_hours
                        ? `${data?.working_hours} hrs`
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

//------------------------------------------------

("use client");

import { TrendingUp } from "lucide-react";
import { CartesianGrid, LabelList, Line, LineChart, XAxis } from "recharts";
import {
  format,
  subMonths,
  startOfMonth,
  endOfMonth,
  differenceInMinutes,
  isSameDay,
  isSameMonth,
} from "date-fns";

import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
// const chartData = [
//   { month: "January", workTime: 186},
//   { month: "February", workTime: 305 },
//   { month: "March", workTime: 237 },
//   { month: "April", workTime: 73 },
//   { month: "May", workTime: 209 },
//   { month: "June", workTime: 214},
// ]

const chartConfig = {
  workTime: {
    label: "Average Work Time",
    color: "rgb(0, 201, 81)",
  },
} satisfies ChartConfig;

type ChartItem = {
  month: string;
  workTime: number;
};

const MonthlyAvaregeWorkTimeChart = () => {
  const data: any[] = Staff_Attendance_ReturnAll(); // your existing function

  const now = new Date();
  const chartData: ChartItem[] = [];

  for (let i = 5; i >= 0; i--) {
    const monthStart = startOfMonth(subMonths(now, i));
    const monthEnd = endOfMonth(subMonths(now, i));
    const monthName = format(monthStart, "MMMM");

    const monthlyData = data.filter((item) => {
      const createdDate = new Date(item.created_date);
      return createdDate >= monthStart && createdDate <= monthEnd;
    });

    const workTimeEntries = monthlyData.filter(
      (item) => item.status === "present" || item.status === "late"
    );

    // Calculate total work time dynamically
    const totalWorkTime = workTimeEntries.reduce((sum, item) => {
      if (item.check_in && item.check_out) {
        const checkIn = new Date(item.check_in);
        const checkOut = new Date(item.check_out);
        const hoursWorked =
          (checkOut.getTime() - checkIn.getTime()) / (1000 * 60 * 60); // Convert ms to hours
        return sum + hoursWorked;
      }
      return sum;
    }, 0.0);

    const avgWorkTime =
      workTimeEntries.length > 0
        ? Math.round(totalWorkTime / workTimeEntries.length)
        : 0;

    chartData.push({ month: monthName, workTime: avgWorkTime });
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Line Chart - Average Work Time Per Month</CardTitle>
        <CardDescription>Last 6 month</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="max-h-[350px] mx-auto ">
          <LineChart
            accessibilityLayer
            data={chartData}
            margin={{
              top: 20,
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="line" />}
            />
            <Line
              dataKey="workTime"
              type="natural"
              stroke="var(--color-workTime)"
              strokeWidth={2}
              dot={{
                fill: "var(--color-workTime)",
              }}
              activeDot={{
                r: 6,
              }}
            >
              <LabelList
                position="top"
                offset={12}
                className="fill-foreground"
                fontSize={12}
              />
            </Line>
          </LineChart>
        </ChartContainer>
      </CardContent>
      
    </Card>
  );
};
