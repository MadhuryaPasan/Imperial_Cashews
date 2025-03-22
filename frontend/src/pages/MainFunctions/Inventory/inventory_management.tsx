import React from 'react'
import Inventory_example from './subpages/inventory_example'
import Inventory_FinalProduct from "./subpages/Inventory_FinalProduct"
import Inventory_RawMaterial from './subpages/Inventory_RawMaterial'

const inventory_management = () => {
  return (
    <>
      <div>inventory_management</div>
      <Inventory_example />
      <Inventory_FinalProduct/>
      <Inventory_RawMaterial/>
    </>
  )
}

export default inventory_management