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

const rawMaterialCheck = () => {
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
            <div className="text-3xl font-bold ">Raw Materiels</div>
            <div className="flex gap-2 items-center">
              {/* <FinanceBankBook_Insert /> */}
              <Button variant="outline">
                Report <Download />
              </Button>
            </div>
          </div>
          <Separator className=" my-4" />

          <section>{pendingRawMaterialCards()}</section>
          <Separator className=" my-4" />

          <Separator className=" my-4" />
          <div>{QualityCheckTable()}</div>
        </main>
      </div>
    </>
  );
};

export default rawMaterialCheck;

const pendingRawMaterialCards = () => {
  //Assigning the data to
  const rawMaterialStocks = Inventory_RawCashews_StockLevel_ReturnAll();
  //-------------------------------------------------------

  const filteredMaterials = rawMaterialStocks?.filter(
    (material) => material.quality_level.quality_status === "pending"
  );

  return (
    <>
      <div className="overscroll-auto md:overscroll-contain overflow-x-auto h-[40vh]">
        <Card>
          <CardContent>
            <div className="flex flex-wrap gap-4 justify-center items-center ">
              {filteredMaterials.map((data) => (
                <Card
                  className="min-w-[450px]  h-fit shadow-md hover:shadow-lg transition-all duration-100 ease-in-out border-l-yellow-500 border-l-3  active:border-yellow-500 active:shadow-lg active:border-3"
                  key={data._id}
                >
                  <CardHeader>
                    <div className="flex items-center justify-between h-full">
                      <CardTitle>Batch Code : {data.batch_code}</CardTitle>
                      <Badge
                        variant="outline"
                        className="text-yellow-500 border-yellow-500"
                      >
                        Pending <Loader className=" animate-spin" />
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between h-full">
                      <div className="flex items-center gap-2">
                        <Calendar className=" text-gray-400 size-5" />
                        <span>
                          Received Data :{" "}
                          <span className="font-medium">
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
                          </span>
                        </span>
                      </div>
                      <div className="flex items-center gap-2 w-fit">
                        <Weight className=" text-gray-400 size-5" />
                        <span>
                          Size(kg) :{" "}
                          <span className="font-medium">
                            {data?.started_quantity_kg.toLocaleString()}kg
                          </span>
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between h-full mt-2">
                      <div className="flex items-center gap-2">
                        <User className=" text-gray-400 size-5" />
                        <span>
                          Supplier :{" "}
                          <span className="font-medium">
                            {data?.supplier_details.supplier_name}{" "}
                          </span>
                        </span>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <CardDescription>
                      <span>Click hear to give feedback on this batch.</span>
                    </CardDescription>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
};

// const tableColumns = [
//   { id: 1, name: "Batch Code" },
//   { id: 2, name: "Supplier" },
//   { id: 3, name: "Color Appearance" },
//   { id: 4, name: "Moisture Content (%)" },
//   { id: 5, name: "Foreign Matter (%)" },
//   { id: 6, name: "Damage Percentage (%)" },
//   { id: 7, name: "Size" },
//   { id: 8, name: "Checked By" },
//   { id: 9, name: "Checked Time" },
// ];

// const QualityCheckTable = () => {
//   const rawQualityChecks = quality_raw_material_check_ReturnAll();

//   const [searchTerm, setSearchTerm] = useState("");
//   const [selectedTab, setSelectedTab] = useState<string | null>("all");

//   const handleTabChange = (value: string) => {
//     setSelectedTab(value);
//   };

//   const filteredChecks = rawQualityChecks?.filter((entry) => {
//     return true; // Can be expanded to add tab-based filtering later
//   });

//   const searchedMaterials = filteredChecks?.filter((entry) => {
//     const formattedDate = new Date(
//       entry.checked_time?.t * 1000
//     ).toLocaleDateString("en-CA");

//     return (
//       entry.batch.batch_id.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       entry.supplier.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       formattedDate.includes(searchTerm)
//     );
//   });

//   return (
//     <Card>
//       <CardContent>
//         <div className="flex md:flex-row md:justify-between flex-col items-center mb-2">
//           <Tabs defaultValue="all" onValueChange={handleTabChange}>
//             <TabsList className="max-w-[100%] gap-3">
//               <TabsTrigger value="all">ALL</TabsTrigger>
//             </TabsList>
//           </Tabs>

//           <div className="w-full md:w-1/2">
//             <Input
//               type="text"
//               placeholder="Search by batch, supplier or date..."
//               className="w-full"
//               value={searchTerm}
//               onChange={(e) => setSearchTerm(e.target.value)}
//             />
//           </div>
//         </div>

//         <div className="rounded-md border shadow-lg min-h-[40vh]">
//           <Table>
//             <TableHeader>
//               <TableRow className="bg-gray-200/80 hover:bg-gray-200/80">
//                 {tableColumns.map((data) => (
//                   <TableHead key={data.id}>
//                     <span className="flex items-center gap-1">{data.name}</span>
//                   </TableHead>
//                 ))}
//               </TableRow>
//             </TableHeader>
//             <TableBody>
//               {searchedMaterials?.reverse().map((entry) => (
//                 <TableRow key={entry._id}>
//                   <TableCell>{entry.batch?.batch_id}</TableCell>
//                   <TableCell>{entry.supplier?.name}</TableCell>
//                   <TableCell>{entry.color_appearance}</TableCell>
//                   <TableCell>{entry.moisture_content}%</TableCell>
//                   <TableCell>{entry.foreign_matter}%</TableCell>
//                   <TableCell>{entry.damage_percentage}%</TableCell>
//                   <TableCell>{entry.size}</TableCell>
//                   <TableCell>{entry.checked_by?.name}</TableCell>
//                   <TableCell>
//                     {new Date(entry.checked_time?.t * 1000).toLocaleString("en-CA", {
//                       year: "numeric",
//                       month: "short",
//                       day: "2-digit",
//                       hour: "2-digit",
//                       minute: "2-digit",
//                     })}
//                   </TableCell>
//                 </TableRow>
//               ))}
//             </TableBody>
//           </Table>
//         </div>
//       </CardContent>
//     </Card>
//   );
// };



const qualityMinLevel = 87; // Minimum quality percentage
const tableColumns = [
  {
    id: 1,
    name: "Batch ID",
  },
  {
    id: 2,
    name: "Supplier",
  },
  {
    id: 3,
    name: "Color Appearance",
  },
  {
    id: 4,
    name: "Moisture Content",
  },
  {
    id: 5,
    name: "Foreign Matter",
  },
  {
    id: 6,
    name: "Damage Percentage",
  },
  {
    id: 7,
    name: "Quality Percentage (min 87%)",
  },
  {
    id: 8,
    name: "Size",
  },
  {
    id: 9,
    name: "Checked By",
  },
  {
    id: 10,
    name: "Checked Time",
    icon: <Clock className=" text-gray-400 size-5" />,
  },
];

const QualityCheckTable = () => {
  //Asigning the data to transactions from Finance_BankBook_ReturnAll function
  const data = quality_raw_material_check_ReturnAll();
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
      data.supplier.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
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
                    <TableCell>{data.supplier.name}</TableCell>
                    <TableCell>{data.color_appearance}</TableCell>
                    <TableCell>
                      <div className=" text-right px-2">
                        <span className="text-sm text-gray-700 ">
                          {data.moisture_content}
                          {"%"}
                        </span>
                        {data.moisture_content > 0 ? (
                          <Progress value={data.moisture_content} />
                        ) : (
                          <Progress
                            value={data.moisture_content}
                            className="bg-gray-200/80"
                          />
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className=" text-right px-2">
                        <span className="text-sm text-gray-700 ">
                          {data.foreign_matter}
                          {"%"}
                        </span>
                        {data.foreign_matter > 0 ? (
                          <Progress value={data.foreign_matter} />
                        ) : (
                          <Progress
                            value={data.foreign_matter}
                            className="bg-gray-200/80"
                          />
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className=" text-right px-2">
                        <span className="text-sm text-gray-700 ">
                          {data.damage_percentage}
                          {"%"}
                        </span>
                        {data.damage_percentage > 0 ? (
                          <Progress value={data.damage_percentage} />
                        ) : (
                          <Progress
                            value={data.damage_percentage}
                            className="bg-gray-200/80"
                          />
                        )}
                      </div>
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
                    <TableCell>{data.size}</TableCell>
                    <TableCell>{data.checked_by.name}</TableCell>
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
