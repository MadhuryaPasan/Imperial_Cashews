import React, { useState } from "react";
import Image1 from "@/assets/carosousel/scsd.png";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Minus, Plus } from "lucide-react";
import { Label } from "@/components/ui/label";

const productRead = () => {
  const stock_quantity: number = 5;

  const [quantity, setQuantity] = useState<number>(1);

  return (
    <>
      <div>productRead</div>
      <Card>
        <div className="flex justify-between px-4 w-full gap-4">
          <div className="w-[50%]">
            <div>
              <img src={Image1} className=" rounded-2xl w-full h-full" alt="" />
            </div>
          </div>
          <div className=" w-[50%] flex flex-col gap-8 relative">
            <CardHeader>
              <CardTitle className=" text-4xl font-bold">
                Product Name
              </CardTitle>
              <CardDescription className="text-lg">category</CardDescription>
              <CardTitle className=" text-3xl font-bold">RS.0000.00</CardTitle>
              {stock_quantity === 0 ? (
                <Badge variant={"outline"}>Out of Stock</Badge>
              ) : (
                <Badge>in Stock</Badge>
              )}
            </CardHeader>
            <CardContent className="gap-y-4 flex flex-col">
              <Label>Select Count:</Label>
              <div className="w-[20%] border-1 rounded-lg">
                <div className="flex justify-between items-center">
                  <Button
                    variant={"ghost"}
                    onClick={() => setQuantity(quantity - 1)}
                    disabled={quantity === 0}
                  >
                    {" "}
                    <Minus />
                  </Button>
                  <p>{quantity}</p>
                  <Button
                    variant={"ghost"}
                    onClick={() => setQuantity(quantity + 1)}
                    disabled={quantity === stock_quantity}
                  >
                    {" "}
                    <Plus />
                  </Button>
                </div>
              </div>
              {/* description */}
              <div className="flex flex-col gap-2">
                <Label>Description:</Label>
                <p className="overflow-y-auto break-words h-[100px]">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Voluptatibus, quae.xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxcccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccjhicuzhuichzuochozhcozhchzdiuchuzdhcodhcuhdohhdochdiochidochioshcoihdoichoichoidhcoidhcoihcoihciohcohdochdoichdoichdoichdochohcodhciohipchspichzoishcoishcoihzlihvczhchvkzhckvjhivh8hdv0hsdvhvpihpivdhpihvsiphviodhvoihsoihvoidhvoishoivhoisdhxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
                </p>
              </div>
            </CardContent>
            <CardFooter className="absolute bottom-0 w-full">
              <Button className="w-full">Buy Now</Button>
            </CardFooter>
          </div>
        </div>
      </Card>
    </>
  );
};

export default productRead;
