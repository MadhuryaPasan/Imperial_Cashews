import React, { useEffect, useState } from "react";
import TableTemplate from "@/components/tables/tableTemplate";
import Finance_PettyCash_Table from "@/components/MainFunctions/Finance/Finance_PettyCash/Finance_PettyCash_Table";
import Finance_BalanceSheet_Table from "@/components/MainFunctions/Finance/Finance_BalanceSheet/Finance_BalanceSheet_Table";

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
      <div>{sidebarValue}</div>
      {sidebarValue === "Finance_PettyCash_Table" && (
        <Finance_PettyCash_Table />
      )}
      {sidebarValue === "Finance_BalanceSheet_Table" && (
        <Finance_BalanceSheet_Table />
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
