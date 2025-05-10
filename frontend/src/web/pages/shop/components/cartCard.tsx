import { Card, CardContent } from "@/components/ui/card";
import { Sales_Product_getDoc } from "@/utils/API/sales/Sales_Products_API";
import React, { useEffect, useState } from "react";

const cardCard = (id: any) => {

  console.log("id", id);
  const [productData, setProductData] = useState<any>();
  useEffect(() => {
    async function loadPost() {
      try {
        let result = await Sales_Product_getDoc(id);
        // await new Promise((resolve) => setTimeout(resolve, 2000));
        if (result) {
          setProductData(result);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
    loadPost();
  }, [id]);
  return (
    <Card className="w-full flex justify-between items-center p-2 m-2">
      <CardContent>
        <img src={productData?.image} alt="" width={100} height={100} className=" size-50" />
      </CardContent>
    </Card>
  );
};

export default cardCard;
