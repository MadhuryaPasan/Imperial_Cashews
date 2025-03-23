import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Car, Minus, Plus } from "lucide-react";
import React, { useState } from "react";
import Image1 from "@/assets/carosousel/scsd.png";

const CartProductCard = () => {
  const stock_quantity: number = 5;

  const [quantity, setQuantity] = useState<number>(1);
  return (
    <>
      <Card className="flex flex-row w-fit">
        <CardHeader className=" p-0 m-0 w-[200px]">
          <img src={Image1} className=" rounded-2xl w-full h-full" alt="image" />
        </CardHeader>
        <CardContent className=" w-[300px] relative flex flex-row justify-between items-center">
          <div className=" gap-y-2 flex flex-col">
            <CardTitle className="text-lg">Product Name</CardTitle>
            <CardDescription>RS.0000.00</CardDescription>
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
    </>
  );
};

export default CartProductCard;
