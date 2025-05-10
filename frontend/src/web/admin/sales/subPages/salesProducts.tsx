import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { SidebarProvider } from "@/components/ui/sidebar";
import { Download, Eye, Package, Phone } from "lucide-react";
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
import { returnAllProducts } from "@/utils/API/sales/Sales_Products_API";

const salesProducts = () => {
  const data = returnAllProducts();
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
            <div className="text-3xl font-bold ">Products</div>
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
          {/* <div>{MonthlyOrdersChart()}</div> */}
          <Separator className=" my-4" />
          <div>{SalesProductTable()}</div>
        </main>
      </div>
    </>
  );
};

export default salesProducts;

// ---------------------------------------------------

const tableColumns = [
  { id: 1, name: "Product ID" },
  {
    id: 2,
    name: "Product Name",
    icon: <Package className=" size-5" />,
  },
  { id: 3, name: "Created Date" },
  { id: 4, name: "Category" },
  { id: 5, name: "Description" },
  { id: 6, name: "Image" },
  { id: 7, name: "Size (g)" },
  { id: 8, name: "Stock Quantity" },
  { id: 9, name: "Price per Unit (RS)" },
];

const SalesProductTable = () => {
  //Asigning the data to transactions from Finance_BankBook_ReturnAll function
  const data = returnAllProducts();
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
      data.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      data.categoryData.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      data.product_id.toLowerCase().includes(searchTerm.toLowerCase()) 
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
                    <TableCell>{data.product_id}</TableCell>
                    <TableCell>{data.name}</TableCell>
                    <TableCell>
                      {data?.created_date
                        ? new Date(data?.created_date).toLocaleString("en-CA", {
                            year: "numeric",
                            month: "numeric",
                            day: "numeric",
                          })
                        : "N/A"}
                    </TableCell>
                    <TableCell >{data.categoryData.name}</TableCell>
                    <TableCell >{data.description}</TableCell>
                    <TableCell >


                        <img src={data.image} alt=""  className=" size-9"/>
                    </TableCell>
                    <TableCell> {data.size.toLocaleString("en-US")}</TableCell>
                    <TableCell> {data.stock_quantity}</TableCell>
                    <TableCell>
                      <span className="">
                        RS{" "}
                        {data.price_per_unit.toLocaleString("en-US", {
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

//---------------------------------------------------
