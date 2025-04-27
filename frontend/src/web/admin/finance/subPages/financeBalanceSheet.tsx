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

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Finance_ProfitLoss_ReturnAll } from "@/utils/API/finance/Finance_ProfitLoss_API";
import {
  Finance_BalanceSheet_auto,
  Finance_BalanceSheet_ReturnAll,
} from "@/utils/API/finance/Finance_BalanceSheet_API";

const financeBalanceSheet = () => {
  const setAutoUpdate = async () => {
    console.log("Button clicked!");
    await Finance_BalanceSheet_auto();
    window.location.reload();
  };

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
            <div className="text-3xl font-bold ">Balance Sheet</div>
            <div>
              <Button variant="outline">
                Report <Download />
              </Button>
              {/* auto update button */}
              <Button onClick={setAutoUpdate}>Update Balance Sheet</Button>
            </div>
          </div>
          <Separator className=" my-4" />

          <div className="grid grid-cols-3 gap-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-sm font-medium">
                  Current Balance
                </CardTitle>
                <CardContent className="p-0">
                  <div className="text-2xl font-bold line-clamp-1">1000</div>
                </CardContent>
              </CardHeader>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-sm font-medium">
                  Total Deposits
                </CardTitle>
                <CardContent className="p-0">
                  <div className="text-2xl font-bold line-clamp-1 text-primary">
                    1000
                  </div>
                </CardContent>
              </CardHeader>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-sm font-medium">
                  Total Withdrawals
                </CardTitle>
                <CardContent className="p-0">
                  <div className="text-2xl font-bold line-clamp-1 text-destructive">
                    1000
                  </div>
                </CardContent>
              </CardHeader>
            </Card>
          </div>
          <Separator className=" my-4" />

          {/* tables */}

          <Card>
            <CardContent>
              <div>
                <Tabs defaultValue="Assets">
                  <TabsList>
                    <TabsTrigger value="Assets" className="w-80">
                      Assets
                    </TabsTrigger>
                    <TabsTrigger value="Liabilities">Liabilities</TabsTrigger>
                    <TabsTrigger value="Equity">Equity</TabsTrigger>
                  </TabsList>
                  <TabsContent value="Assets">{AssetsTable()}</TabsContent>
                  <TabsContent value="Liabilities">
                    {LiabilityTable()}
                  </TabsContent>
                  <TabsContent value="Equity">{EquityTable()}</TabsContent>
                </Tabs>
              </div>
            </CardContent>
          </Card>
        </main>
      </div>
    </>
  );
};

export default financeBalanceSheet;

//-------------------------------------

const tableColumns = [
  {
    id: 1,
    name: "Date",
  },

  {
    id: 2,
    name: "Category",
  },

  {
    id: 3,
    name: "Amount",
    icon: <DollarSign className=" size-5" />,
  },
];

const AssetsTable = () => {
  const data = Finance_BalanceSheet_ReturnAll();
  //-------------------------------------------------------

  //get the last data from the array
  const newData = data[data.length - 1];

  return (
    <>
      <Card className=" border-none shadow-none">
        <CardContent>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold">Assets</h2>
          </div>
          <div className="rounded-md border-1 shadow-lg ">
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
                {/* Cash In Hand */}
                <TableRow>
                  <TableCell>
                    {newData?.created_date
                      ? new Date(newData?.created_date).toLocaleString(
                          "en-CA",
                          {
                            year: "numeric",
                            month: "numeric",
                            day: "numeric",
                            hour: "numeric",
                            minute: "numeric",
                          }
                        )
                      : "N/A"}
                  </TableCell>

                  <TableCell>Cash In Hand</TableCell>
                  <TableCell>
                    <span className="">
                      RS{" "}
                      {newData?.assets.cash_in_hand
                        ? newData?.assets.cash_in_hand.toLocaleString("en-US", {
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2,
                          })
                        : "0.00"}
                    </span>
                  </TableCell>
                </TableRow>

                {/* bank_balance */}

                <TableRow>
                  <TableCell>
                    {newData?.created_date
                      ? new Date(newData?.created_date).toLocaleString(
                          "en-CA",
                          {
                            year: "numeric",
                            month: "numeric",
                            day: "numeric",
                            hour: "numeric",
                            minute: "numeric",
                          }
                        )
                      : "N/A"}
                  </TableCell>

                  <TableCell>Bank Balance</TableCell>
                  <TableCell>
                    <span className="">
                      RS{" "}
                      {newData?.assets.bank_balance
                        ? newData?.assets.bank_balance.toLocaleString("en-US", {
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2,
                          })
                        : "0.00"}
                    </span>
                  </TableCell>
                </TableRow>

                {/* inventory Raw material */}

                <TableRow>
                  <TableCell>
                    {newData?.created_date
                      ? new Date(newData?.created_date).toLocaleString(
                          "en-CA",
                          {
                            year: "numeric",
                            month: "numeric",
                            day: "numeric",
                            hour: "numeric",
                            minute: "numeric",
                          }
                        )
                      : "N/A"}
                  </TableCell>

                  <TableCell>Inventory Raw Material value</TableCell>
                  <TableCell>
                    <span className="">
                      RS{" "}
                      {newData?.assets.inventory.raw_material_value
                        ? newData?.assets.inventory.raw_material_value.toLocaleString(
                            "en-US",
                            {
                              minimumFractionDigits: 2,
                              maximumFractionDigits: 2,
                            }
                          )
                        : "0.00"}
                    </span>
                  </TableCell>
                </TableRow>

                {/* inventory finished product value */}

                <TableRow>
                  <TableCell>
                    {newData?.created_date
                      ? new Date(newData?.created_date).toLocaleString(
                          "en-CA",
                          {
                            year: "numeric",
                            month: "numeric",
                            day: "numeric",
                            hour: "numeric",
                            minute: "numeric",
                          }
                        )
                      : "N/A"}
                  </TableCell>

                  <TableCell>Inventory finished product value</TableCell>
                  <TableCell>
                    <span className="">
                      RS{" "}
                      {newData?.assets.inventory.finished_Product_value
                        ? newData?.assets.inventory.finished_Product_value.toLocaleString(
                            "en-US",
                            {
                              minimumFractionDigits: 2,
                              maximumFractionDigits: 2,
                            }
                          )
                        : "0.00"}
                    </span>
                  </TableCell>
                </TableRow>

                {/* fixed assets vehicle */}

                <TableRow>
                  <TableCell>
                    {newData?.created_date
                      ? new Date(newData?.created_date).toLocaleString(
                          "en-CA",
                          {
                            year: "numeric",
                            month: "numeric",
                            day: "numeric",
                            hour: "numeric",
                            minute: "numeric",
                          }
                        )
                      : "N/A"}
                  </TableCell>

                  <TableCell>Fixed assets vehicle</TableCell>
                  <TableCell>
                    <span className="">
                      RS{" "}
                      {newData?.assets.fixed_assets.vehicles
                        ? newData?.assets.fixed_assets.vehicles.toLocaleString(
                            "en-US",
                            {
                              minimumFractionDigits: 2,
                              maximumFractionDigits: 2,
                            }
                          )
                        : "0.00"}
                    </span>
                  </TableCell>
                </TableRow>

                {/* fixed assets equipment */}

                <TableRow>
                  <TableCell>
                    {newData?.created_date
                      ? new Date(newData?.created_date).toLocaleString(
                          "en-CA",
                          {
                            year: "numeric",
                            month: "numeric",
                            day: "numeric",
                            hour: "numeric",
                            minute: "numeric",
                          }
                        )
                      : "N/A"}
                  </TableCell>

                  <TableCell>Fixed assets equipments</TableCell>
                  <TableCell>
                    <span className="">
                      RS{" "}
                      {newData?.assets.fixed_assets.equipment
                        ? newData?.assets.fixed_assets.equipment.toLocaleString(
                            "en-US",
                            {
                              minimumFractionDigits: 2,
                              maximumFractionDigits: 2,
                            }
                          )
                        : "0.00"}
                    </span>
                  </TableCell>
                </TableRow>

                {/* fixed assets land  */}

                <TableRow>
                  <TableCell>
                    {newData?.created_date
                      ? new Date(newData?.created_date).toLocaleString(
                          "en-CA",
                          {
                            year: "numeric",
                            month: "numeric",
                            day: "numeric",
                            hour: "numeric",
                            minute: "numeric",
                          }
                        )
                      : "N/A"}
                  </TableCell>

                  <TableCell>Fixed assets land</TableCell>
                  <TableCell>
                    <span className="">
                      RS{" "}
                      {newData?.assets.fixed_assets.land
                        ? newData?.assets.fixed_assets.land.toLocaleString(
                            "en-US",
                            {
                              minimumFractionDigits: 2,
                              maximumFractionDigits: 2,
                            }
                          )
                        : "0.00"}
                    </span>
                  </TableCell>
                </TableRow>

                {/* fixed assets other  */}

                <TableRow>
                  <TableCell>
                    {newData?.created_date
                      ? new Date(newData?.created_date).toLocaleString(
                          "en-CA",
                          {
                            year: "numeric",
                            month: "numeric",
                            day: "numeric",
                            hour: "numeric",
                            minute: "numeric",
                          }
                        )
                      : "N/A"}
                  </TableCell>

                  <TableCell>Fixed assets other</TableCell>
                  <TableCell>
                    <span className="">
                      RS{" "}
                      {newData?.assets.fixed_assets.other
                        ? newData?.assets.fixed_assets.other.toLocaleString(
                            "en-US",
                            {
                              minimumFractionDigits: 2,
                              maximumFractionDigits: 2,
                            }
                          )
                        : "0.00"}
                    </span>
                  </TableCell>
                </TableRow>
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

//-------------------------------------

const LiabilityTable = () => {
  const data = Finance_BalanceSheet_ReturnAll();
  //-------------------------------------------------------

  //get the last data from the array
  const newData = data[data.length - 1];

  return (
    <>
      <Card className=" border-none shadow-none">
        <CardContent>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold">Liabilities</h2>
          </div>
          <div className="rounded-md border-1 shadow-lg ">
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
                {/* salaries_payable */}
                <TableRow>
                  <TableCell>
                    {newData?.created_date
                      ? new Date(newData?.created_date).toLocaleString(
                          "en-CA",
                          {
                            year: "numeric",
                            month: "numeric",
                            day: "numeric",
                            hour: "numeric",
                            minute: "numeric",
                          }
                        )
                      : "N/A"}
                  </TableCell>

                  <TableCell>Salaries Payable</TableCell>
                  <TableCell>
                    <span className="">
                      RS{" "}
                      {newData?.liabilities.salaries_payable
                        ? newData?.liabilities.salaries_payable.toLocaleString(
                            "en-US",
                            {
                              minimumFractionDigits: 2,
                              maximumFractionDigits: 2,
                            }
                          )
                        : "0.00"}
                    </span>
                  </TableCell>
                </TableRow>

                {/* epf_payable */}

                <TableRow>
                  <TableCell>
                    {newData?.created_date
                      ? new Date(newData?.created_date).toLocaleString(
                          "en-CA",
                          {
                            year: "numeric",
                            month: "numeric",
                            day: "numeric",
                            hour: "numeric",
                            minute: "numeric",
                          }
                        )
                      : "N/A"}
                  </TableCell>

                  <TableCell>EPF Payable</TableCell>
                  <TableCell>
                    <span className="">
                      RS{" "}
                      {newData?.liabilities.epf_payable
                        ? newData?.liabilities.epf_payable.toLocaleString(
                            "en-US",
                            {
                              minimumFractionDigits: 2,
                              maximumFractionDigits: 2,
                            }
                          )
                        : "0.00"}
                    </span>
                  </TableCell>
                </TableRow>

                {/* other_liabilities */}

                <TableRow>
                  <TableCell>
                    {newData?.created_date
                      ? new Date(newData?.created_date).toLocaleString(
                          "en-CA",
                          {
                            year: "numeric",
                            month: "numeric",
                            day: "numeric",
                            hour: "numeric",
                            minute: "numeric",
                          }
                        )
                      : "N/A"}
                  </TableCell>

                  <TableCell>Other Liabilities</TableCell>
                  <TableCell>
                    <span className="">
                      RS{" "}
                      {newData?.liabilities.other_liabilities
                        ? newData?.liabilities.other_liabilities.toLocaleString(
                            "en-US",
                            {
                              minimumFractionDigits: 2,
                              maximumFractionDigits: 2,
                            }
                          )
                        : "0.00"}
                    </span>
                  </TableCell>
                </TableRow>
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

///-------------------------------------

const EquityTable = () => {
  const data = Finance_BalanceSheet_ReturnAll();
  //-------------------------------------------------------

  //get the last data from the array
  const newData = data[data.length - 1];

  return (
    <>
      <Card className=" border-none shadow-none">
        <CardContent>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold">Equity</h2>
          </div>
          <div className="rounded-md border-1 shadow-lg">
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
                {/* Capital Invested */}
                <TableRow>
                  <TableCell>
                    {newData?.created_date
                      ? new Date(newData?.created_date).toLocaleString(
                          "en-CA",
                          {
                            year: "numeric",
                            month: "numeric",
                            day: "numeric",
                            hour: "numeric",
                            minute: "numeric",
                          }
                        )
                      : "N/A"}
                  </TableCell>

                  <TableCell>Capital Invested</TableCell>
                  <TableCell>
                    <span className="">
                      RS{" "}
                      {newData?.equity.capital_invested
                        ? newData?.equity.capital_invested.toLocaleString(
                            "en-US",
                            {
                              minimumFractionDigits: 2,
                              maximumFractionDigits: 2,
                            }
                          )
                        : "0.00"}
                    </span>
                  </TableCell>
                </TableRow>

                {/* retained_earnings */}

                <TableRow>
                  <TableCell>
                    {newData?.created_date
                      ? new Date(newData?.created_date).toLocaleString(
                          "en-CA",
                          {
                            year: "numeric",
                            month: "numeric",
                            day: "numeric",
                            hour: "numeric",
                            minute: "numeric",
                          }
                        )
                      : "N/A"}
                  </TableCell>

                  <TableCell>Retained Earnings</TableCell>
                  <TableCell>
                    <span className="">
                      RS{" "}
                      {newData?.equity.retained_earnings
                        ? newData?.equity.retained_earnings.toLocaleString(
                            "en-US",
                            {
                              minimumFractionDigits: 2,
                              maximumFractionDigits: 2,
                            }
                          )
                        : "0.00"}
                    </span>
                  </TableCell>
                </TableRow>

                {/* Current Year Profit */}

                <TableRow>
                  <TableCell>
                    {newData?.created_date
                      ? new Date(newData?.created_date).toLocaleString(
                          "en-CA",
                          {
                            year: "numeric",
                            month: "numeric",
                            day: "numeric",
                            hour: "numeric",
                            minute: "numeric",
                          }
                        )
                      : "N/A"}
                  </TableCell>

                  <TableCell>Current Year Profit</TableCell>
                  <TableCell>
                    <span className="">
                      RS{" "}
                      {newData?.equity.current_year_profit
                        ? newData?.equity.current_year_profit.toLocaleString(
                            "en-US",
                            {
                              minimumFractionDigits: 2,
                              maximumFractionDigits: 2,
                            }
                          )
                        : "0.00"}
                    </span>
                  </TableCell>
                </TableRow>
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
