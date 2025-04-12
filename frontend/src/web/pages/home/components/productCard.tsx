import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card";
  import React from "react";
  import { Badge } from "@/components/ui/badge";
  import { Link } from "react-router-dom";
  import Image1 from "@/assets/NoImage.jpg"
  
  const productCard: React.FC<any> = (product) => {
  
    return (
      <>
        <Link to={`/shop/product/${product?.id}`}>
          <Card className=" w-[100%] sm:w-[100%] gap-3 transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-lg">
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
              <CardTitle className="line-clamp-1 text-lg">{product?.name}</CardTitle>
              <CardDescription>

              RS{" "}
                      {product?.price_per_unit.toLocaleString("en-US", {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      })}
              </CardDescription>
              
            </CardHeader>
            </Card>
        </Link>
      </>
    );
  };
  
  export default productCard;