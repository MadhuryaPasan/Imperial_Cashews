import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import React from "react";

const Finance_BalanceSheet_mainInterface = () => {
  return (
    <>
      <div>Finance_BalanceSheet_mainInterface</div>

      <Card className="m-10">
        <CardHeader>
          <CardTitle>Month</CardTitle>
        </CardHeader>

        {/* Assets */}
        <CardContent className="flex  items-center gap-4">
          <CardTitle className=" text-lg font-bold">Assets</CardTitle>
          <div className="w-full">
            <Separator className="" />
          </div>
        </CardContent>
        <CardContent>
          <CardContent className="flex flex-col gap-3">
            <div className="flex justify-between">
              <p>Bank Balance</p>
              <p>RS.1000</p>
            </div>
            <div className="flex justify-between">
              <p>Inventory Value</p>
              <p>RS.1000</p>
            </div>
            <div className="flex justify-between">
              <p>Account Receivable</p>
              <p>RS.1000</p>
            </div>
            <div className="flex justify-between">
              <p>Equipment & Machinery</p>
              <p>RS.1000</p>
            </div>
            <Separator />
            <div className="flex justify-between">
              <p className="font-bold">Total Assets</p>
              <p>RS.1000</p>
            </div>
          </CardContent>
        </CardContent>




        {/* Liabilities */}
        <CardContent className="flex  items-center gap-4">
          <CardTitle className=" text-lg font-bold">Liabilities</CardTitle>
          <div className="w-full">
            <Separator className="" />
          </div>
        </CardContent>
        <CardContent>
          <CardContent className="flex flex-col gap-3">
            <div className="flex justify-between">
              <p>Accounts Payable</p>
              <p>RS.1000</p>
            </div>
            <div className="flex justify-between">
              <p>Loan Payable</p>
              <p>RS.1000</p>
            </div>
            <div className="flex justify-between">
              <p>Taxes Payable</p>
              <p>RS.1000</p>
            </div>
            <Separator />
            <div className="flex justify-between">
              <p className="font-bold">Total Liabilities</p>
              <p>RS.1000</p>
            </div>
          </CardContent>
        </CardContent>

        {/* Equity */}
        <CardContent className="flex  items-center gap-4">
          <CardTitle className=" text-lg font-bold">Equity</CardTitle>
          <div className="w-full">
            <Separator className="" />
          </div>
        </CardContent>
        <CardContent>
          <CardContent className="flex flex-col gap-3">
            <div className="flex justify-between">
              <p>Owner's Capital</p>
              <p>RS.1000</p>
            </div>
            <div className="flex justify-between">
              <p>Retained Earnings</p>
              <p>RS.1000</p>
            </div>
            <Separator />
            <div className="flex justify-between">
              <p className="font-bold">Total Equity</p>
              <p>RS.1000</p>
            </div>
          </CardContent>
        </CardContent>
      </Card>
    </>
  );
};

export default Finance_BalanceSheet_mainInterface;
