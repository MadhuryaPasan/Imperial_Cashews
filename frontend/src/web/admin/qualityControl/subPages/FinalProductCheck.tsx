import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { SidebarProvider } from "@/components/ui/sidebar";
import { Calendar, Clock, Download, Loader, User, Weight } from "lucide-react";
import QualityControlSideBar from "../layout/qualityControlSideBar";
import FinanceBankBook_Insert from "@/components/admin/finance/financeBankBooks/financeBankBook_Insert";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Inventory_RawCashews_StockLevel_ReturnAll } from "@/utils/API/inventory/Inventory_RawCashews_StockLevel_API";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useState } from "react";
import { quality_raw_material_check_ReturnAll } from "@/utils/API/quality/quality_raw_material_check_API";
import { Progress } from "@/components/ui/progress";
import { quality_end_product_check_ReturnAll } from "@/utils/API/quality/quality_end_product_check_API";

const FinalProductCheck = () => {
  return (
    <>
      <div className="flex ">
        <div>
          <SidebarProvider>
            <QualityControlSideBar />
          </SidebarProvider>
        </div>
        <main className=" w-full mx-5 mt-4">
          <div className="flex justify-between">
            <div className="text-3xl font-bold ">Final Product</div>
            <div className="flex gap-2 items-center">
              {/* <FinanceBankBook_Insert /> */}
              <Button variant="outline">
                Report <Download />
              </Button>
            </div>
          </div>
          <Separator className=" my-4" />

          <Separator className=" my-4" />
          <div>{FinalProductCheckTable()}</div>
        </main>
      </div>
    </>
  );
};

export default FinalProductCheck;

const qualityMinLevel = 91;
const tableColumns = [
  {
    id: 1,
    name: "Batch ID",
  },
  {
    id: 2,
    name: "Checked By",
  },
  {
    id: 3,
    name: "Taste Test",
  },
  {
    id: 4,
    name: "Packaging",
  },
  {
    id: 5,
    name: "Color Appearance",
  },
  {
    id: 6,
    name: "Quality Percentage",
  },
  {
    id: 7,
    name: "Quality Status",
  },

  {
    id: 8,
    name: "Checked Time",
    icon: <Clock className=" text-gray-400 size-5" />,
  },
];

const FinalProductCheckTable = () => {
  //Asigning the data to transactions from Finance_BankBook_ReturnAll function
  const data = quality_end_product_check_ReturnAll();
  //-------------------------------------------------------

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTab, setSelectedTab] = useState<String | null>("all");

  const handleTabChange = (value: string) => {
    setSelectedTab(value);
  };

  const filteredData = data?.filter((data) => {
    // if (selectedTab === "Withdrawals") {
    //   return transaction.Withdrawals > 0;
    // } else if (selectedTab === "Deposits") {
    //   return transaction.Deposits > 0;
    // }
    if (selectedTab === "all") {
      return true;
    }
    return true; // Default to showing all
  });

  const searchedData = filteredData.filter((data) => {
    return (
      data.batch.batch_id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      data.checked_by.name.toLowerCase().includes(searchTerm.toLowerCase())
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
                  {/* <TabsTrigger value="Withdrawals">Withdrawals</TabsTrigger>
                          <TabsTrigger value="Deposits">Deposits</TabsTrigger> */}
                </TabsList>
              </Tabs>
            </div>
            <div className="w-full md:w-1/2">
              <Input
                type="text"
                placeholder="Search data here... (e.g. Batch ID, Supplier , Checked By)"
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
                    <TableCell>{data.batch.batch_id}</TableCell>
                    <TableCell>{data.checked_by.name}</TableCell>
                    <TableCell>
                      {data.taste_test === "passed" ? (
                        <Badge
                          variant="outline"
                          className="text-primary border-primary"
                        >
                          Passed
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
                        {data.packaging_integrity === "excellent" ? (
                            <Badge
                            variant="outline"
                            className="text-primary border-primary"
                            >
                            Exellent
                            </Badge>
                        ) : data.packaging_integrity === "good" ? (
                            <Badge
                            variant="outline"
                            className="text-primary border-primary"
                            >
                            Good
                            </Badge>
                        ) : data.packaging_integrity === "fair" ? (
                            <Badge
                            variant="outline"
                            className="text-yellow-500 border-yellow-500"
                            >
                            Fair 
                            </Badge>
                        ) : (
                            <Badge
                            variant="outline"
                            className="text-destructive border-destructive"
                            >
                            Poor
                            </Badge>
                        )}
                    </TableCell>
                    <TableCell>
                        {data.color_appearance === "excellent" ? (
                            <Badge
                            variant="outline"
                            className="text-primary border-primary"
                            >
                            Exellent
                            </Badge>
                        ) : data.color_appearance === "good" ? (
                            <Badge
                            variant="outline"
                            className="text-primary border-primary"
                            >
                            Good
                            </Badge>
                        ) : data.color_appearance === "fair" ? (
                            <Badge
                            variant="outline"
                            className="text-yellow-500 border-yellow-500"
                            >
                            Fair 
                            </Badge>
                        ) : (
                            <Badge
                            variant="outline"
                            className="text-destructive border-destructive"
                            >
                            Poor
                            </Badge>
                        )}
                    </TableCell>

                    <TableCell>
                      <div className=" text-right px-2">
                        <span className="text-sm text-gray-700  ">
                          {data.quality_percentage}
                          {"%"}
                        </span>
                        {data.quality_percentage > qualityMinLevel ? (
                          <Progress value={data.quality_percentage} />
                        ) : (
                          <Progress
                            value={data.quality_percentage}
                            className="bg-gray-200/80  [&>div]:bg-destructive"
                          />
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      {data.quality_status === "passed" ? (
                        <Badge
                          variant="outline"
                          className="text-primary border-primary"
                        >
                          Passed
                        </Badge>
                      ) : data.quality_status === "pending" ? (
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
                      {new Date(data.checked_time).toLocaleString("en-CA", {
                        year: "numeric",
                        month: "short",
                        day: "2-digit",
                        hour: "2-digit",
                        minute: "2-digit",
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
