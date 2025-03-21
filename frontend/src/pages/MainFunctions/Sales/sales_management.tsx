import React from 'react'
import Sales_example from './subpages/sales_example'
import Sales_Manage_Customer from './subpages/sales_Manage_Customer'
import Sales_Manage_Order from './subpages/sales_Manage_Order'
import Sales_Manage_Payment from './subpages/sales_Manage_Payment'
import Sales_Manage_Products from './subpages/sales_Manage_Products'
import Sales_Manage_Sales from './subpages/sales_Manage_Sales'


const sales_management = () => {
  return (
    <>
      <div>sales_management</div>
      <Sales_example />
      <Sales_Manage_Customer/>
      <Sales_Manage_Order/>
      <Sales_Manage_Payment/>
      <Sales_Manage_Products/>
      <Sales_Manage_Sales/>

    </>
  )
}

export default sales_management