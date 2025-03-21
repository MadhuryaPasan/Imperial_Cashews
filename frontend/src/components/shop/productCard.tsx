import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import React from "react";
import Image1 from "@/assets/carosousel/scsd.png";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";

const productCard: React.FC<any> = (product) => {
  return (
    <>
      <Link to={`/shop/${product?.id}`}>
        <Card className=" w-[100%] sm:w-[100%] gap-3">
          <div className="h-[100%] mx-2 relative">
            {product?.stock_quantity === 0 ? (
              <Badge
                className="absolute bg-white top-2 right-2"
                variant={"outline"}
              >
                Out of stock
              </Badge>
            ) : null}
            <img src={Image1} className=" rounded-2xl w-full h-full" />
          </div>
          <CardHeader className="px-3 py-0">
            <CardDescription>RS.{product?.price_per_unit}.00</CardDescription>
            <CardTitle className="line-clamp-1 text-lg">{product?.name}</CardTitle>
          </CardHeader>
          </Card>
      </Link>
    </>
  );
};

export default productCard;
