import React from 'react'
import Sales_Product_Table from "@/components/MainFunctions/sales/Sales_Manage_Products/Sales_Products_table"
import Sales_Customer_table from "@/components/MainFunctions/sales/Sales_Manage_Products/Sales_Customer_table"
import Sales_Order_table from "@/components/MainFunctions/sales/Sales_Manage_Products/Sales_Order_table"
import Sales_Payment_table from "@/components/MainFunctions/sales/Sales_Manage_Products/Sales_Payment_table"
import Sales_Sales_table from "@/components/MainFunctions/sales/Sales_Manage_Products/Sales_Sales_table"

import Sales_Payment_Insert from "@/components/MainFunctions/sales/insert/Sales_Payment_Insert"

const sales_Manage_Payment = () => {
  return (
    <>
    
    <div> payment</div>
    <Sales_Payment_table/>
    <Sales_Payment_Insert/>
    </>
  )
}

export default sales_Manage_Payment