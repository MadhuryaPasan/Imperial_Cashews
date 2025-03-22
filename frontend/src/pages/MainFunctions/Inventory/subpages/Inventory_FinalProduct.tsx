import React from 'react';
import Inventory_FinalProduct_Table from "@/components/MainFunctions/Inventory/Inventory_FinalProduct_CHECK/Inventory_FinalProduct_Table";
import Inventory_FinalProduct_Insert from "@/components/MainFunctions/Inventory/Inventory_FinalProduct_CHECK/Inventory_FinalProduct_insert";
import Inventory_FinalProduct_Update from '@/components/MainFunctions/Inventory/Inventory_FinalProduct_CHECK/Inventory_FinalProduct_Update';

const Inventory_FinalProduct = () => {
  return (
    <>
      <div>Inventory Final Product</div>
      <Inventory_FinalProduct_Table />
      <Inventory_FinalProduct_Insert />
       {/*<Inventory_FinalProduct_Update/>*/}
    </>
  );
};

export default Inventory_FinalProduct;


