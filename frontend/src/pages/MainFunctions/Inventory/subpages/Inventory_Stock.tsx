import React from "react";
import Inventory_Stock_insert from "@/components/MainFunctions/Inventory/Inventory_Stock_CHECK/Inventory_Stock_insert";
import Inventory_Stock_Table from "@/components/MainFunctions/Inventory/Inventory_Stock_CHECK/Inventory_Stock_Table";
const Inventory_Stock = () => {
    return (
      <div>
      <div>Inventory Stock</div>
      <Inventory_Stock_Table/>
      <Inventory_Stock_insert/>
    

      </div>
    );
  }
  
  export default Inventory_Stock;