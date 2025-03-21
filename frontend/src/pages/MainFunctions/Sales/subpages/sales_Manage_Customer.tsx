import React from 'react'
import Sales_Product_Table from "@/components/MainFunctions/sales/Sales_Manage_Products/Sales_Products_table"
import Sales_Customer_table from "@/components/MainFunctions/sales/Sales_Manage_Products/Sales_Customer_table"

import Sales_Customer_Insert from '@/components/MainFunctions/sales/insert/Sales_Customer_Insert'

const sales_Manage_Customer = () => {
  return (
    <>
    
    <div>Sales_Customer</div>
    <Sales_Customer_table/>
    <Sales_Customer_Insert/>
    
    </>
  )
}

export default sales_Manage_Customer