import React from "react";
import Inventory_RawMaterial_insert from "@/components/MainFunctions/Inventory/Inventory_RawMaterial_CHECK/Inventory_RawMaterial_insert";
import Inventory_RawMaterial_Update from "@/components/MainFunctions/Inventory/Inventory_RawMaterial_CHECK/Inventory_RawMaterial_Update";
import Inventory_RawMaterial_Table from "@/components/MainFunctions/Inventory/Inventory_RawMaterial_CHECK/Inventory_RawMaterial_Table"

const Inventory_RawMaterial = () => {
  return (
    <div>
      <div>Inventory Raw Material</div>
      <Inventory_RawMaterial_Table />
      <Inventory_RawMaterial_insert />

    </div>

  );
}

export default Inventory_RawMaterial;