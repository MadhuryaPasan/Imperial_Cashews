import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
// import Finance_PettyCash_Table from "@/components/MainFunctions/Finance/Finance_PettyCash/Finance_PettyCash_Table";
import FinanceBankBook_Insert from "@/components/admin/finance/financeBankBooks/financeBankBook_Insert";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
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
import InventorySideBar from "@/web/admin/inventory/layout/inventorySideBar";
import { BarChart, Download, Loader, ShieldAlert } from "lucide-react";
import { useState } from "react";
import { Inventory_RawCashews_StockLevel_ReturnAll } from "@/utils/API/inventory/Inventory_RawCashews_StockLevel_API";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";

const holdingLevel = 10000;
const minHoldingLevel = 500;

const rawMaterialStock = () => {
  //Asigning the data to
  const rawMaterialStocks = Inventory_RawCashews_StockLevel_ReturnAll();
  const totalStockLevel = rawMaterialStocks.reduce(
    (acc, curr) => acc + curr.current_quantity_kg,
    0
  );
  const totalStockValue = rawMaterialStocks.reduce(
    (acc, curr) => acc + curr.unit_price * curr.current_quantity_kg,
    0
  );

  //-------------------------------------------------------
  return (
    <>
      <div className="flex ">
        <div>
          <SidebarProvider>
            <InventorySideBar />
          </SidebarProvider>
        </div>
        <main className=" w-full mx-5 mt-4">
          <div className="flex justify-between">
            <div className="text-3xl font-bold ">Raw Materiels</div>
            <div className="flex gap-2 items-center">
              <FinanceBankBook_Insert />
              <Button variant="outline">
                Report <Download />
              </Button>
            </div>
          </div>
          <Separator className=" my-4" />

          {totalStockLevel > minHoldingLevel ? null : (
            <div>
              <Card className=" border-destructive items-center bg-destructive/10">
                <CardContent>
                  <div className="flex items-center gap-4  w-fit">
                    <ShieldAlert className="  size-15 text-destructive" />
                    <div>
                      <CardTitle className="text-2xl text-destructive font-bold">
                        Stock Level is low!
                      </CardTitle>
                      <CardDescription className="text-destructive">
                        Please order more raw materials
                      </CardDescription>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Separator className=" my-4" />
            </div>
          )}

          <div className="grid md:grid-cols-4 gap-4 ">
            <Card>
              <CardHeader>
                <CardTitle className="text-sm font-medium">
                  Current Stock Level
                </CardTitle>
                <CardContent className="p-0">
                  {totalStockLevel > minHoldingLevel ? (
                    <div className="text-2xl font-bold line-clamp-1 text-primary">
                      {totalStockLevel.toLocaleString()}kg
                    </div>
                  ) : (
                    <div className="text-2xl font-bold line-clamp-1 text-destructive">
                      {totalStockLevel.toLocaleString()}kg
                    </div>
                  )}
                </CardContent>
              </CardHeader>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-sm font-medium">
                  Total Stock Value
                </CardTitle>
                <CardContent className="p-0">
                  <div className="text-2xl font-bold line-clamp-1 text-primary">
                    RS{" "}
                    {totalStockValue.toLocaleString("en-US", {
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
                  Max Holding level
                </CardTitle>
                <CardContent className="p-0">
                  <div className="text-2xl font-bold line-clamp-1 text-primary">
                    {holdingLevel.toLocaleString()}kg
                  </div>
                </CardContent>
              </CardHeader>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-sm font-medium">
                  Min Holding level
                </CardTitle>
                <CardContent className="p-0">
                  <div className="text-2xl font-bold line-clamp-1 text-destructive">
                    {minHoldingLevel.toLocaleString()}kg
                  </div>
                </CardContent>
              </CardHeader>
            </Card>
          </div>
          <Separator className=" my-4" />

          {/* <div>{Records()}</div> */}

          <div>{RawMaterialHoldinglevelChart()}</div>
          <Separator className=" my-4" />
          <div>{tableData()}</div>
        </main>
      </div>
    </>
  );
};

export default rawMaterialStock;

const tableColumns = [
  {
    id: 1,
    name: "Batch Code",
  },
  {
    id: 2,
    name: "Date Received",
  },
  {
    id: 3,
    name: "Quantity(kg)",
  },
  { id: 4, name: "Current Quantity(kg)" },
  { id: 5, name: "Location" },
  {
    id: 6,
    name: "Unit Price",
    // icon: <ArrowUp className=" size-5 text-destructive" />,
  },
  {
    id: 7,
    name: "Quality Level",
    icon: <BarChart className=" size-5" />,
  },
  {
    id: 8,
    name: "Status",
  },
  {
    id: 9,
    name: "Supplier",
  },
  {
    id: 10,
    name: "Total Stock Level",
  },
  {
    id: 11,
    name: "Total Stock Value",
  },
];

const tableData = () => {
  //Assigning the data to
  const rawMaterialStocks = Inventory_RawCashews_StockLevel_ReturnAll();
  //-------------------------------------------------------

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTab, setSelectedTab] = useState<String | null>("all");

  const handleTabChange = (value: string) => {
    setSelectedTab(value);
  };

  const filteredMaterials = rawMaterialStocks?.filter((rawMaterialStocks) => {
    if (selectedTab === "pending") {
      return rawMaterialStocks.quality_level.quality_status === "pending";
    } else if (selectedTab === "passed") {
      return rawMaterialStocks.quality_level.quality_status === "passed";
    } else if (selectedTab === "rejected") {
      return rawMaterialStocks.quality_level.quality_status === "rejected";
    } else if (selectedTab === "all") {
      return true;
    }
    return true; // Default to showing all
  });

  // Filter products based on search

  // const searchedMaterials = filteredMaterials.filter(
  //   (rawMaterialStocks) =>
  //     rawMaterialStocks.batch_code
  //       .toLowerCase()
  //       .includes(searchTerm.toLowerCase()) ||
  //     rawMaterialStocks.date_received
  //       .toLowerCase()
  //       .includes(searchTerm.toLowerCase()) ||
  //     rawMaterialStocks.supplier_details.supplier_name
  //       .toLowerCase()
  //       .includes(searchTerm.toLowerCase())
  // );

  const searchedMaterials = filteredMaterials.filter((rawMaterialStocks) => {
    const formattedDate = new Date(
      rawMaterialStocks.date_received
    ).toLocaleDateString("en-CA"); // Gives "YYYY-MM-DD" format

    return (
      rawMaterialStocks.batch_code
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      formattedDate.includes(searchTerm) ||
      rawMaterialStocks.supplier_details.supplier_name
        .toLowerCase()
        .includes(searchTerm.toLowerCase())||
        rawMaterialStocks.location
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
                <TabsList className=" max-w-[100%] gap-3 ">
                  <TabsTrigger value="all">ALL</TabsTrigger>
                  <TabsTrigger value="pending">Pending QC</TabsTrigger>
                  <TabsTrigger value="passed">Passed QC</TabsTrigger>
                  <TabsTrigger value="rejected">Rejected QC</TabsTrigger>
                </TabsList>
              </Tabs>
            </div>
            <div className="w-full md:w-1/2">
              <Input
                type="text"
                placeholder="Search data here... (e.g. date, batch code, supplier, location)"
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
                {searchedMaterials.reverse().map((rawMaterialStocks) => (
                  <TableRow key={rawMaterialStocks._id}>
                    <TableCell>{rawMaterialStocks?.batch_code}</TableCell>
                    <TableCell>
                      {rawMaterialStocks?.date_received
                        ? new Date(
                            rawMaterialStocks?.date_received
                          ).toLocaleString("en-CA", {
                            year: "numeric",
                            month: "numeric",
                            day: "numeric",
                          })
                        : "N/A"}
                    </TableCell>
                    <TableCell>
                      {rawMaterialStocks.started_quantity_kg.toLocaleString()}kg
                    </TableCell>
                    <TableCell>
                      {rawMaterialStocks.current_quantity_kg.toLocaleString()}kg
                    </TableCell>
                    <TableCell>{rawMaterialStocks.location}</TableCell>
                    <TableCell>
                      RS{" "}
                      {rawMaterialStocks.unit_price.toLocaleString("en-US", {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      })}
                    </TableCell>

                    <TableCell>
                      <div className=" text-right px-2">
                        <span className="text-sm text-gray-700 ">
                          {rawMaterialStocks.quality_level.quality_percentage}
                          {"%"}
                        </span>
                        {rawMaterialStocks.quality_level.quality_percentage >
                        0 ? (
                          <Progress
                            value={
                              rawMaterialStocks.quality_level.quality_percentage
                            }
                          />
                        ) : (
                          <Progress
                            value={
                              rawMaterialStocks.quality_level.quality_percentage
                            }
                            className="bg-gray-200/80"
                          />
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      {rawMaterialStocks.quality_level.quality_status ===
                      "passed" ? (
                        <Badge
                          variant="outline"
                          className="text-primary border-primary"
                        >
                          Passed
                        </Badge>
                      ) : rawMaterialStocks.quality_level.quality_status ===
                        "pending" ? (
                        <Badge
                          variant="outline"
                          className="text-yellow-500 border-yellow-500"
                        >
                          Pending <Loader className=" animate-spin" />
                        </Badge>
                      ) : (
                        <Badge
                          variant="outline"
                          className="text-destructive border-destructive"
                        >
                          Rejected
                        </Badge>
                      )}
                    </TableCell>
                    <TableCell>
                      {rawMaterialStocks.supplier_details.supplier_name}
                    </TableCell>
                    <TableCell>
                      {rawMaterialStocks.total_inventory_stock_level.toLocaleString()}
                      kg
                    </TableCell>
                    <TableCell>
                      RS{" "}
                      {rawMaterialStocks.total_inventory_stock_value.toLocaleString(
                        "en-US",
                        {
                          minimumFractionDigits: 2,
                          maximumFractionDigits: 2,
                        }
                      )}
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

// -------------------------------------

("use client");

import { Label, Pie, PieChart } from "recharts";

import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

const RawMaterialHoldinglevelChart = () => {
  //Asigning the data to
  const rawMaterialStocks = Inventory_RawCashews_StockLevel_ReturnAll();
  const totalStockLevel = rawMaterialStocks.reduce(
    (acc, curr) => acc + curr.current_quantity_kg,
    0
  );

  const availableLevel = holdingLevel - totalStockLevel;
  const availableHoldingLevel = holdingLevel - availableLevel;

  //-------------------------------------------------------

  const chartData = [
    {
      browser: "Current Level",
      visitors: availableHoldingLevel,
      fill: "var(--color-chrome)",
    },
    {
      browser: "Available Level",
      visitors: availableLevel,
      fill: "var(--color-safari)",
    },
  ];

  const chartConfig = {
    visitors: {
      label: "Stock Level",
    },
    chrome: {
      label: "total",
      color: "rgb(0, 201, 81)",
    },
    safari: {
      label: "currentLevel",
      color: "#c7efd7",
    },
  } satisfies ChartConfig;

  return (
    <Card className="flex flex-col">
      <CardHeader className="items-center pb-0">
        <CardTitle>Current Stock Level</CardTitle>
        <CardDescription className="text-sm text-muted-foreground">
          Current stock level of raw materials in the factory
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[250px]"
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie
              data={chartData}
              dataKey="visitors"
              nameKey="browser"
              innerRadius={70}
              strokeWidth={5}
            >
              <Label
                content={({ viewBox }) => {
                  if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                    return (
                      <text
                        x={viewBox.cx}
                        y={viewBox.cy}
                        textAnchor="middle"
                        dominantBaseline="middle"
                      >
                        <tspan
                          x={viewBox.cx}
                          y={viewBox.cy}
                          className="fill-foreground text-3xl font-bold"
                        >
                          {totalStockLevel.toLocaleString()}kg
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 24}
                          className="fill-muted-foreground"
                        >
                          Current Stock Level
                        </tspan>
                      </text>
                    );
                  }
                }}
              />
            </Pie>
          </PieChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm">
        <div className="flex items-center gap-2 font-medium leading-none">
          Total holding level {holdingLevel}
        </div>
        <div className="leading-none text-muted-foreground">
          Showing the total holding level of raw materials in the factory
        </div>
      </CardFooter>
    </Card>
  );
};
