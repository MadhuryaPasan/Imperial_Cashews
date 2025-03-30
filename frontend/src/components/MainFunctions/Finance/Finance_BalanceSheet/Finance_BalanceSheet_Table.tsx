import { Separator } from "@/components/ui/separator";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { useEffect, useState } from "react";
import {
  BookLock,
  DeleteIcon,
  Edit,
  Lock,
  MenuIcon,
  Recycle,
  Trash2,
} from "lucide-react";

import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const Finance_BalanceSheet_Table = ({ selectedMonth }: any) => {
  // grt current month
  const currentMonth: string = new Date().toLocaleString("en-US", {
    month: "long",
  });

  const [rows, setRows] = useState<any>([]);
  console.log("rows", rows);

  // get data from api
  useEffect(() => {
    async function getAll() {
      let result = await Finance_BalanceSheet_getAllData();
      setRows(result);
    }
    getAll();
  }, []);

  // table rows
  const columns = [
    { name: "Date" },
    { name: "Current Month" },
    { name: "Description" },

    { name: "Bank Balance" },
    { name: "Inventory Value" },
    { name: "Account Receivable" },
    { name: "Equipment Machinery" },

    { name: "Accounts Payable" },
    { name: "Loan Payable" },
    { name: "Taxes Payable" },

    { name: "Owners Capital" },
    { name: "Retained Earnings" },
  ];



  let Bank_Balance = 0;
  let Inventory_Value = 0;
  let Account_Receivable = 0;
  let Equipment_Machinery = 0;
  let Accounts_Payable = 0;
  let Loan_Payable = 0;
  let Taxes_Payable = 0;
  let Owners_Capital = 0;
  let Retained_Earnings = 0;



  rows.map((rowsData: any) => {
    Bank_Balance += rowsData.assets.Bank_Balance;
    Inventory_Value += rowsData.assets.Inventory_Value;
    Account_Receivable += rowsData.assets.Account_Receivable;
    Equipment_Machinery += rowsData.assets.Equipment_Machinery;
    Accounts_Payable += rowsData.Liabilities.Accounts_Payable;
    Loan_Payable += rowsData.Liabilities.Loan_Payable;
    Taxes_Payable += rowsData.Liabilities.Taxes_Payable;
    Owners_Capital += rowsData.Equity.Owners_Capital;
    Retained_Earnings += rowsData.Equity.Retained_Earnings;
    
  });


  let totalAssets = Bank_Balance + Inventory_Value + Account_Receivable + Equipment_Machinery;
  let totalLiabilities = Accounts_Payable + Loan_Payable + Taxes_Payable;
  let totalEquity = Owners_Capital + Retained_Earnings;
  
  return (

    

    <>
      {/* insert */}

      <div className="p-3">

      <div className="text-4xl font-bold text-center">Balance Sheet</div>
        <p className=" text-sm text-center px-[50px] py-4">
          
        </p>
        <Separator className="my-5" />

<div>
  {Finance_BalanceSheet_mainInterface  (totalAssets,totalLiabilities,totalEquity,Retained_Earnings, Owners_Capital,Taxes_Payable,Loan_Payable,Accounts_Payable,Equipment_Machinery,Account_Receivable,Inventory_Value,Bank_Balance)}
</div>

        <div className="flex justify-begin py-3">{insertBtn()}</div>
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableCell
                  colSpan={3}
                  className="text-center font-medium font text-[15px] border-r-1 "
                >
                  
           
                </TableCell>
                <TableCell
                  colSpan={4}
                  className="text-center font-medium text-[15px] border-r-1 "
                >
                  Assets
                
                </TableCell>
                <TableCell
                  colSpan={3}
                  className="text-center font-medium text-[15px] border-r-1 "
                >
                  Liabilities
                </TableCell>
                
                <TableCell
                  colSpan={2}
                  className="text-center font-medium text-[15px] border-r-1 "
                >
                  Equity
                </TableCell>

               
                <TableCell
                  colSpan={1}
                  className="text-center font-medium text-[15px]"
                >
                  
                </TableCell>
              </TableRow>

              {/* table rows here */}
              <TableRow className="font-bold">
                {columns.map((columns: any) => (
                  
                  <TableHead
                    className=" font-bold text-[15px] border-r-1 "
                    key={columns.name}
                  >
                    {columns.name}
                  </TableHead>
                  
                ))}
                <TableHead className=" font-bold text-[15px]">
                  Options
                </TableHead>
              </TableRow>
            </TableHeader>

            {/* columns */}
            <TableBody>
              {rows
                // .filter((rowsData: any) => rowsData.month === "March")
                .map((rowsData: any) => (
                  <TableRow key={rowsData._id} className="hover:bg-primary/10">
                    <TableCell className=" border-r-1 ">
                      {rowsData.date
                        ? new Date(rowsData.date).toLocaleString("en-US", {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          })
                        : "N/A"}
                    </TableCell>
                    <TableCell className=" border-r-1 ">{rowsData.month}</TableCell>
                    <TableCell className=" border-r-1 ">{rowsData.description}</TableCell>

                    {/* assets */}
                    <TableCell
                      className={`border ${
                        rowsData.assets.Bank_Balance < 0 && "text-destructive"
                      }`}
                    >
                      {rowsData.assets.Bank_Balance}
                    </TableCell>
                    <TableCell className=" border-r-1 ">{rowsData.assets.Inventory_Value}</TableCell>
                    <TableCell className=" border-r-1 ">{rowsData.assets.Account_Receivable}</TableCell>
                    <TableCell className=" border-r-1 ">{rowsData.assets.Equipment_Machinery}</TableCell>

                    {/* liabilities */}
                    <TableCell
                      className={`border ${
                        rowsData.Liabilities.Accounts_Payable > 0 &&
                        "text-destructive"
                      }`}
                    >
                      {rowsData.Liabilities.Accounts_Payable}
                    </TableCell>
                    <TableCell
                      className={`border ${
                        rowsData.Liabilities.Loan_Payable > 0 &&
                        "text-destructive"
                      }`}
                    >
                      {rowsData.Liabilities.Loan_Payable}
                    </TableCell>
                    <TableCell className=" border-r-1 ">{rowsData.Liabilities.Taxes_Payable}</TableCell>

                    {/* equity */}
                    <TableCell className=" border-r-1 ">{rowsData.Equity.Owners_Capital}</TableCell>
                    <TableCell className="border-r-1 ">{rowsData.Equity.Retained_Earnings}</TableCell>

                    {/* show current month only */}
                    {/* {rowsData.month === currentMonth ? ( */}
                    <div>
                      {/* Update */}
                      {UpdateBtn(rowsData._id)}

                      {/* Delete */}
                      {deleteBtn(rowsData._id)}
                    </div>
                    {/* ) : (
                      <TableCell>
                        <Lock className="size-5 opacity-20" />
                      </TableCell>
                    )} */}
                  </TableRow>
                ))}
            </TableBody>



            <TableFooter>
              <TableRow>
                <TableCell colSpan={3} className="border-r-1">
                  Total
                </TableCell>
                <TableCell className="border-r-1"> {Bank_Balance}
                </TableCell>
                <TableCell className="border-r-1"> {Inventory_Value}
                </TableCell>
                <TableCell className="border-r-1"> {Account_Receivable}
                </TableCell>
                <TableCell className="border-r-1"> {Equipment_Machinery}
                </TableCell>
                <TableCell className="border-r-1"> {Accounts_Payable}
                </TableCell>
                <TableCell className="border-r-1"> {Loan_Payable}
                </TableCell>
                <TableCell className="border-r-1"> {Taxes_Payable}
                </TableCell>
                <TableCell className="border-r-1"> {Owners_Capital}
                </TableCell>
                <TableCell className="border-r-1"> {Retained_Earnings}
                </TableCell>
                <TableCell> 
                </TableCell>
              </TableRow>
            </TableFooter>
          </Table>
        </div>
      </div>
    </>
  );
};

export default Finance_BalanceSheet_Table;

import { Button } from "@/components/ui/button";
import { DialogClose } from "@radix-ui/react-dialog";
import {
  Finance_PettyCash_deleteDoc,
  Finance_PettyCash_getAllData,
  Finance_PettyCash_getDoc,
} from "@/utils/Finance/Finance_PettyCash_API";



import {Finance_BalanceSheet_deleteDoc} from "@/utils/Finance/Finance_BalanceSheet_API"

// import Finance_PettyCash_update from "./Finance_PettyCash_update";

const UpdateBtn = (updateId: any) => {
  return (
    <>
      <Dialog>
        <DialogTrigger>
          <Button variant="ghost" className="my-2 mx-0.5">
            <Edit className="  stroke-primary" />
          </Button>
        </DialogTrigger>
        <DialogContent>
          <div>
            {/* {currentData ? <Finance_PettyCash_update {...currentData} /> : <p>Loading...</p>} */}
            <Finance_BalanceSheet_Update currentData={updateId}/>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

const deleteBtn = (deleteId: any) => {
  // delete one
  const deleteOne = async (id: string) => {
    await Finance_BalanceSheet_deleteDoc(id);
    window.location.reload();
  };

  return (
    <>
      <Dialog>
        <DialogTrigger>
          <Button variant="ghost" className="my-2 mx-0.5">
            <Trash2 className="  stroke-destructive" />
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Are you absolutely sure?</DialogTitle>
            <DialogDescription>
              This action cannot be undone. This will permanently delete your
              account and remove your data from our servers.
            </DialogDescription>
          </DialogHeader>
          <Separator />
          {/* deleteNow */}

          <DialogFooter className="sm:justify-start">
            <DialogClose asChild>
              <div className="flex flex-col items-center w-full ">
                <Button
                  variant="destructive"
                  type="submit"
                  onClick={() => deleteOne(deleteId)}
                  className="w-full"
                >
                  Delete
                </Button>
                <Button
                  variant="outline"
                  className="my-2 mx-0.5 border-1 border-primary w-full"
                >
                  Close
                </Button>
              </div>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

import Finance_BalanceSheet_Insert from "./Finance_BalanceSheet_Insert";
import { Finance_BalanceSheet_getAllData } from "@/utils/Finance/Finance_BalanceSheet_API";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Finance_BalanceSheet_Update from "./Finance_BalanceSheet_Update";
const insertBtn = () => {
  return (
    <>
      <Dialog>
        <DialogTrigger>
          <Button className="left-0">Insert Now</Button>
        </DialogTrigger>
        <DialogContent><Finance_BalanceSheet_Insert /></DialogContent>
      </Dialog>
    </>
  );
};











const Finance_BalanceSheet_mainInterface = ( totalAssets:number, totalLiabilities:number, totalEquity:number,
  Retained_Earnings: number, Owners_Capital: number, Taxes_Payable: number, Loan_Payable: number, Accounts_Payable: number, Equipment_Machinery: number, Account_Receivable: number, Inventory_Value: number, Bank_Balance: number
) => {
  return (
    <>

      <Card className={`m-10 ${totalAssets !== totalLiabilities+totalEquity ? "border-2 border-destructive" : "border-2 border-primary"}`}>
        <CardHeader>
          {totalAssets !== totalLiabilities+totalEquity ? <CardTitle className="text-destructive" >Not Balanced. please check the record</CardTitle> : <CardTitle className=" text-primary" >Balanced</CardTitle>}

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
              <p>RS.{Bank_Balance}</p>
            </div>
            <div className="flex justify-between">
              <p>Inventory Value</p>
              <p>RS.{Inventory_Value}</p>
            </div>
            <div className="flex justify-between">
              <p>Account Receivable</p>
              <p>RS.{Account_Receivable}</p>
            </div>
            <div className="flex justify-between">
              <p>Equipment & Machinery</p>
              <p>RS.{Equipment_Machinery}</p>
            </div>
            <Separator />
            <div className="flex justify-between">
              <p className="font-bold">Total Assets</p>
              <p>RS.{totalAssets}</p>
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
              <p>RS.{Accounts_Payable}</p>
            </div>
            <div className="flex justify-between">
              <p>Loan Payable</p>
              <p>RS.{Loan_Payable}</p>
            </div>
            <div className="flex justify-between">
              <p>Taxes Payable</p>
              <p>RS.{Taxes_Payable}</p>
            </div>
            <Separator />
            <div className="flex justify-between">
              <p className="font-bold">Total Liabilities</p>
              <p>RS.{totalLiabilities}</p>
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
              <p>RS.{Owners_Capital}</p>
            </div>
            <div className="flex justify-between">
              <p>Retained Earnings</p>
              <p>RS.{Retained_Earnings}</p>
            </div>
            <Separator />
            <div className="flex justify-between">
              <p className="font-bold">Total Equity</p>
              <p>RS.{totalEquity}</p>
            </div>
          </CardContent>
        </CardContent>
      </Card>
    </>
  );
};


