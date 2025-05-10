import { Separator } from "@/components/ui/separator";
import { SidebarProvider } from "@/components/ui/sidebar";
import { Calendar, Loader, User, Weight } from "lucide-react";
import QualityControlSideBar from "../layout/qualityControlSideBar";
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
import { useState } from "react";
import { Link } from "react-router-dom";

const rawMaterialCheckList = () => {
  const [searchTerm, setSearchTerm] = useState("");
  //Assigning the data to
  const rawMaterialStocks = Inventory_RawCashews_StockLevel_ReturnAll();
  //-------------------------------------------------------

  const pendingData = rawMaterialStocks?.filter(
    (material) => material.quality_level.quality_status === "pending"
  );

  const filteredMaterials = pendingData.filter((data) => {
    const formattedDate = new Date(data.date_received).toLocaleDateString(
      "en-CA"
    ); // Gives "YYYY-MM-DD" format
    return (
      formattedDate.includes(searchTerm) ||
      data.batch_code.toLowerCase().includes(searchTerm.toLowerCase()) ||
      data.supplier_details.supplier_name
        .toLowerCase()
        .includes(searchTerm.toLowerCase())
    );
  });

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
            <div className="text-3xl font-bold w-full ">Raw Materiels List</div>
            <div className="flex gap-2 items-center w-full">
              {/* <FinanceBankBook_Insert /> */}
              {/* <Button variant="outline">
              Report <Download />
            </Button> */}
              <div className="w-full ">
                <Input
                  type="text"
                  placeholder="Search data here... (e.g. batch code, supplier name, date)"
                  className=" w-full bg-white"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
          </div>
          <Separator className=" my-4" />

          <section>
            <div className="flex flex-wrap gap-4 justify-center items-center ">
              {filteredMaterials.map((data) => (
                <>
                  <Link
                    to={`/admin/quality-control/raw-material-check-form/${data?._id}`}
                    key={data._id}
                  >
                    <Card
                      className="min-w-[450px]  h-fit shadow-md hover:shadow-lg transition-all duration-100 ease-in-out border-l-yellow-500 border-l-3  active:border-yellow-500 active:shadow-lg active:border-3"
                      
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
                                  ? new Date(
                                      data?.date_received
                                    ).toLocaleString("en-CA", {
                                      year: "numeric",
                                      month: "numeric",
                                      day: "numeric",
                                    })
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
                          <span>
                            Click hear to give feedback on this batch.
                          </span>
                        </CardDescription>
                      </CardFooter>
                    </Card>
                  </Link>
                </>
              ))}
            </div>
          </section>
          <Separator className=" my-4" />
        </main>
      </div>
    </>
  );
};

export default rawMaterialCheckList;

