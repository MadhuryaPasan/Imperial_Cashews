import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
// import Finance_PettyCash_Table from "@/components/MainFunctions/Finance/Finance_PettyCash/Finance_PettyCash_Table";
import FinanceBankBook_Insert from "@/components/admin/finance/financeBankBooks/financeBankBook_Insert";
import { Badge } from "@/components/ui/badge";
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
import { Progress } from "@/components/ui/progress";
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
import { Inventory_RawCashews_StockLevel_ReturnAll } from "@/utils/API/inventory/Inventory_RawCashews_StockLevel_API";
import InventorySideBar from "@/web/admin/inventory/layout/inventorySideBar";
import { BarChart, Download, Loader, ShieldAlert, Trash2 } from "lucide-react";
import { useState } from "react";
import { Inventory_FinalProduct_ReturnAll } from "@/utils/API/inventory/Inventory_FinalProduct_API";

const finishedProductStock = () => {
  const rawMaterialStocks = Inventory_FinalProduct_ReturnAll();

  const LastDocument = rawMaterialStocks.slice(-1)[0];
  const totalStockValue = LastDocument?.total_inventory_stock_value || 0;

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
            <div className="text-3xl font-bold ">Finished Products</div>
            <div className="flex gap-2 items-center">
              <FinanceBankBook_Insert />
              <Button variant="outline">
                Report <Download />
              </Button>
            </div>
          </div>
          <Separator className=" my-4" />

          <div className="grid md:grid-cols-4 gap-4 ">
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
          </div>
          <Separator className=" my-4" />

          {/* <div>{Records()}</div> */}

          {/* <div>{RawMaterialHoldinglevelChart()}</div> */}
          <Separator className=" my-4" />
          <div>{tableData()}</div>
        </main>
      </div>
    </>
  );
};

export default finishedProductStock;

//--------------------------------------

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
    name: "Raw Batch Code",
  },
  {
    id: 4,
    name: "Product Name",
  },
  {
    id: 5,
    name: "Category",
  },
  {
    id: 6,
    name: "Quantity",
  },
  { id: 7, name: "Current Quantity" },
  { id: 8, name: "Location" },
  {
    id: 9,
    name: "Unit Price",
    // icon: <ArrowUp className=" size-5 text-destructive" />,
  },
  {
    id: 10,
    name: "Weight",
  },

  {
    id: 11,
    name: "Quality Level",
    icon: <BarChart className=" size-5" />,
  },
  {
    id: 12,
    name: "QC Status",
  },
  {
    id: 13,
    name: "Expiry Date",
  },

  {
    id: 14,
    name: "Total Stock Value",
  },
];

const tableData = () => {
  //Assigning the data to
  const results = Inventory_FinalProduct_ReturnAll();
  //-------------------------------------------------------

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTab, setSelectedTab] = useState<String | null>("all");

  const handleTabChange = (value: string) => {
    setSelectedTab(value);
  };

  const filteredMaterials = results?.filter((data) => {
    if (selectedTab === "pending") {
      return data.quality_level.quality_status === "pending";
    } else if (selectedTab === "passed") {
      return data.quality_level.quality_status === "passed";
    } else if (selectedTab === "rejected") {
      return data.quality_level.quality_status === "rejected";
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

  const searchedMaterials = filteredMaterials.filter((data) => {
    const formattedDate = new Date(data.date_received).toLocaleDateString(
      "en-CA"
    ); // Gives "YYYY-MM-DD" format

    return (
      data.batch_code.toLowerCase().includes(searchTerm.toLowerCase()) ||
      formattedDate.includes(searchTerm) ||
      data.product_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      data.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
      data.categoryData.name.toLowerCase().includes(searchTerm.toLowerCase())
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
                placeholder="Search data here... (e.g. Batch Code, Date Received, Location, Category)"
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
                {searchedMaterials.reverse().map((data) => (
                  <TableRow key={data._id}>
                    <TableCell>{data?.batch_code}</TableCell>
                    <TableCell>
                      {data?.date_received
                        ? new Date(data?.date_received).toLocaleString(
                            "en-CA",
                            {
                              year: "numeric",
                              month: "numeric",
                              day: "numeric",
                            }
                          )
                        : "N/A"}
                    </TableCell>
                    {/* Raw Batch Code */}
                    <TableCell>{data?.RawBatch.batch_id}</TableCell>
                    {/* Product Name */}
                    <TableCell>{data.product_name}</TableCell>
                    {/* Category */}
                    <TableCell>{data.categoryData.name}</TableCell>

                    {/* Started Quantity(packs) */}
                    <TableCell>
                      {data.started_quantity_packs.toLocaleString()}
                      {" Packs"}
                    </TableCell>
                    {/* Current Quantity(packs) */}
                    <TableCell>
                      {data.current_quantity_packs.toLocaleString()}
                      {" Packs"}
                    </TableCell>
                    {/* Location */}
                    <TableCell>{data.location}</TableCell>
                    {/* Unit Price */}
                    <TableCell>
                      RS{" "}
                      {data.unit_price.toLocaleString("en-US", {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      })}
                    </TableCell>
                    {/* Single Pack Weight(kg) */}
                    <TableCell>
                      {data.pack_weight_grams.toLocaleString()}kg {" (1 Pack)"}
                    </TableCell>
                    {/* Quality Level */}

                    <TableCell>
                      <div className=" text-right px-2">
                        <span className="text-sm text-gray-700 ">
                          {data.quality_level.quality_percentage}
                          {"%"}
                        </span>
                        {data.quality_level.quality_percentage > 0 ? (
                          <Progress
                            value={data.quality_level.quality_percentage}
                          />
                        ) : (
                          <Progress
                            value={data.quality_level.quality_percentage}
                            className="bg-gray-200/80"
                          />
                        )}
                      </div>
                    </TableCell>
                    {/* QC Status */}
                    <TableCell>
                      {data.quality_level.quality_status === "passed" ? (
                        <Badge
                          variant="outline"
                          className="text-primary border-primary"
                        >
                          Passed
                        </Badge>
                      ) : data.quality_level.quality_status === "pending" ? (
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
                    {/* Expiry Date */}
                    <TableCell>
                      {data.expiry_date
                        ? new Date(data.expiry_date).toLocaleString("en-CA", {
                            year: "numeric",
                            month: "numeric",
                            day: "numeric",
                          })
                        : "N/A"}
                    </TableCell>

                    {/* Total Stock Value */}
                    <TableCell>
                      RS{" "}
                      {data.total_inventory_stock_value.toLocaleString(
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
