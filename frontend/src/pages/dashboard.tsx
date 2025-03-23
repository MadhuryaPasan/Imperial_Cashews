import React, { useEffect, useState } from "react";
import TableTemplate from "@/components/tables/tableTemplate";
import Finance_PettyCash_Table from "@/components/MainFunctions/Finance/Finance_PettyCash/Finance_PettyCash_Table";
import Finance_BalanceSheet_Table from "@/components/MainFunctions/Finance/Finance_BalanceSheet/Finance_BalanceSheet_Table";
import Sales_Customer_table from "@/components/MainFunctions/sales/Sales_Manage_Products/Sales_Customer_table"
import Sales_Order_table from "@/components/MainFunctions/sales/Sales_Manage_Products/Sales_Order_table"
import Sales_Payment_table from "@/components/MainFunctions/sales/Sales_Manage_Products/Sales_Payment_table"
import Sales_Products_table from "@/components/MainFunctions/sales/Sales_Manage_Products/Sales_Products_table"
import Sales_Sales_table from "@/components/MainFunctions/sales/Sales_Manage_Products/Sales_Sales_table"

const dashboard = () => {
  const [sidebarValue, setSidebarValue] = useState(
    localStorage.getItem("sidebarToken") || ""
  );

  useEffect(() => {
    const interval = setInterval(() => {
      setSidebarValue(localStorage.getItem("sidebarToken") || "");
    }, 300); // Check every 1 second

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      {sidebarValue === "Finance_PettyCash_Table" && (
        <Finance_PettyCash_Table />
      )}
      {sidebarValue === "Finance_BalanceSheet_Table" && (
        <Finance_BalanceSheet_Table />
      )}


      {sidebarValue === "Sales_Customer_table" && (
        <Sales_Customer_table />
      )}
      {sidebarValue === "Sales_Order_table" && (
        <Sales_Order_table />
      )}
      {sidebarValue === "Sales_Payment_table" && (
        <Sales_Payment_table />
      )}
      {sidebarValue === "Sales_Products_table" && (
        <Sales_Products_table />
      )}
      {sidebarValue === "Sales_Sales_table" && (
        <Sales_Sales_table />
      )}
      














      {/* <div className=" mx-5 mt-5">
        <TableTemplate selectedMonth={"March"} />
      </div>
      <div>dashboard</div>
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br /> */}
    </>
  );
};

export default dashboard;
