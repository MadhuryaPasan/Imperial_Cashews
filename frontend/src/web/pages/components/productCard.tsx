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
import noImage from "@/assets/NoImage.jpg";


const productCard: React.FC<any> = (product) => {

  return (
    <>
      <Link to={`/shop/product/${product?._id}`}>
      
        <Card className="m-0 p-0 rounded-lg gap-1 transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-2xl hover:border-primary/50 hover:-translate-y-3 ">
          <img src={product?.image || noImage} className="w-full h-full rounded-lg shadow-lg aspect-square object-cover " />
          <CardHeader className="mt-2">
            <Badge variant="outline" className=" text-gray-600 font-normal rounded-[5px]  m-0">{product?.categoryData?.name}</Badge>
            {/* <span className=" line-clamp-1 opacity-50 text-sm">
              {product?.categoryData?.name}
            </span> */}
          </CardHeader>
          <CardContent>
            <CardTitle className=" line-clamp-1 text-lg">{product?.name}</CardTitle>
            <CardDescription className=" line-clamp-2 mt-1 mb-2">
              {product?.description}
            </CardDescription>
          </CardContent>
          <CardFooter className="mb-3">
            <span className="font-medium">
              RS{" "}
              {product?.price_per_unit.toLocaleString("en-US", {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
            </span>
          </CardFooter>
        </Card>
      </Link>
    </>
  );
};

export default productCard;

// <Card className=" w-[100%] sm:w-[100%] gap-3 transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-lg">
//           <div className="h-[100%] mx-2 relative">
//             {product?.stock_quantity === 0 ? (
//               <Badge
//                 className="absolute bg-white top-2 right-2"
//                 variant={"outline"}
//               >
//                 Out of stock
//               </Badge>
//             ) : null}
//             <img src={Image1} className=" rounded-2xl w-full h-full" />
//           </div>
//           <CardHeader className="px-3 py-0">
//             <div>
//               <CardTitle className="line-clamp-1 text-lg ">{product?.name}</CardTitle>
//               <CardDescription>{product?.category}</CardDescription>
//             </div>
//             <div className="flex items-center justify-between mt-2">
//               <CardTitle className="font-bold">

//               RS{" "}
//                       {product?.price_per_unit.toLocaleString("en-US", {
//                         minimumFractionDigits: 2,
//                         maximumFractionDigits: 2,
//                       })}
//               </CardTitle>

//               <Button variant="outline" className=" border-primary">
//                 <ShoppingBag className=" text-primary" />
//                 </Button>
//             </div>

//           </CardHeader>
//           </Card>
