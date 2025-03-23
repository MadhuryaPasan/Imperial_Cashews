import React, { useState } from "react";
import CartProductCard from "@/components/shop/Cart/CartProductCard";
import Image1 from "@/assets/carosousel/scsd.png";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Minus, Plus, ShoppingCart } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";

const cart = () => {
  const stock_quantity: number = 5;
  const [quantity, setQuantity] = useState<number>(1);




  let price = 2000;
  let Total = (price*quantity);

  return (
    <>
      <div className="p-3 flex flex-col items-center ">
        <div className="flex items-center gap-2 m-3 ">
          <ShoppingCart className=" size-[50px]"/>
          <p className="text-3xl font-bold">Your Cart</p>
        </div>

        <div className=" flex justify-center gap-4">
          <div>
            {/* card */}
            <Card className="flex flex-row w-fit">
              <CardHeader className=" m-0 w-[200px]">
                <img
                  src={Image1}
                  className=" rounded-2xl w-full h-full"
                  alt="image"
                />
              </CardHeader>
              <CardContent className=" w-[300px] relative flex flex-row justify-between items-center">
                <div className=" gap-y-2 flex flex-col">
                  <CardTitle className="text-lg">Product Name</CardTitle>
                  <CardDescription>RS.{price}.00</CardDescription>
                </div>
                <div className="">
                  {/* count */}
                  <div className=" ">
                    <div className="flex justify-between items-center">
                      <Button
                        variant={"ghost"}
                        onClick={() => setQuantity(quantity - 1)}
                        disabled={quantity === 0}
                      >
                        <Minus />
                      </Button>
                      <p>{quantity}</p>
                      <Button
                        variant={"ghost"}
                        onClick={() => setQuantity(quantity + 1)}
                        disabled={quantity === stock_quantity}
                      >
                        <Plus />
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card className=" w-[600px]">
            <CardHeader>
              <CardTitle>Order Summary</CardTitle>
            </CardHeader>
            <CardContent>
              <div className=" flex justify-between w-full">
                <CardDescription> Subtotal</CardDescription>
                <CardDescription> {price}</CardDescription>
              </div>
              <div className=" flex justify-between w-full">
                <CardDescription>Product Count</CardDescription>
                <CardDescription>{quantity}</CardDescription>
              </div>
            </CardContent>
            <Separator />
            <CardFooter className=" flex flex-col w-full gap-y-2">
              <div className=" flex justify-between w-full">
                <CardTitle>Total</CardTitle>
                <CardTitle>{Total}</CardTitle>
              </div>
              <Button className="w-full">Buy Now</Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </>
  );
};

export default cart;
