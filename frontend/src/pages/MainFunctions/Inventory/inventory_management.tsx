import React from 'react'
import Inventory_example from './subpages/inventory_example'
import Inventory_FinalProduct from "./subpages/Inventory_FinalProduct"
import Inventory_Material from './subpages/Inventory_Material'
import Inventory_supplierDetail from './subpages/Inventory_supplierDetail'

const inventory_management = () => {
  return (
    <>
      <div>inventory_management</div>
      <Inventory_example />
      <Inventory_FinalProduct/>
      <Inventory_Material/>
      <Inventory_supplierDetail/>
    </>
  )
}

export default inventory_management