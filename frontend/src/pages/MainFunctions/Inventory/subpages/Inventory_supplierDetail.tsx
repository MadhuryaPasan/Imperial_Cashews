import React from "react";
import Inventory_supplierDetail_Table from "@/components/MainFunctions/Inventory/Inventory_supplierDetail_CHECK/Inventory_supplierDetail_Table";
// @ts-ignore
import WhatsAppPopup from '@/components/WhatsAppPopup';


 // Make sure this path is correct

const Inventory_supplierDetail = () => {
  return (
    <div>
      <div>Inventory supplierDetail</div>
      <Inventory_supplierDetail_Table />

      {/* WhatsApp button appears only on this page */}
      <WhatsAppPopup />
    </div>
  );
};

export default Inventory_supplierDetail;
