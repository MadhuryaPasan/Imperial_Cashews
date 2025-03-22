import React, { useState } from "react";
import Image1 from "@/assets/NoImage.jpg";
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
import { Label } from "@/components/ui/label";
import { useParams } from "react-router-dom";

const productRead = () => {
  const stock_quantity: number = 5;

  const params = useParams();
  const id = params.id ?? "";

  return (
    <>
        <div>{id}</div>
      <Card className="grid grid-cols-1 sm:grid-cols-2 px-4 gap-4  ">
       
          <div>
            <div className=" h-full">
              <img
                src={Image1}
                className=" rounded-2xl w-full h-full"
                alt="image"
              />
            </div>
          </div>
          <div className="flex flex-col gap-10 relative ">
            <CardHeader>
              <CardTitle className=" text-4xl font-bold">
                Product Name
              </CardTitle>
              <CardDescription className="text-lg">Category</CardDescription>
              <CardTitle className=" text-3xl font-bold">RS.0000.00</CardTitle>
              {stock_quantity === 0 ? (
                <Badge variant={"outline"}>Out of Stock</Badge>
              ) : (
                <>
                  <Badge>in Stock</Badge>
                  <CardDescription>
                    Stock level : {stock_quantity}{" "}
                  </CardDescription>
                </>
              )}
            </CardHeader>
            <CardContent className="gap-y-4 flex flex-col h-full ">
              {/* description */}

              <Label>Description:</Label>
              <p className="overflow-y-auto break-words h-[150px]">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Voluptatibus,
                quae.xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxccccccc
                ccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
                cccccccccccccccccccccccccjhicuzhuichzuochozhcozhchzdiuchuzdhcodhcuhdohhdochdiochidochioshcoi
                hdoichoichoidhcoidhcoihcoihciohcohdochdoichdoichdoichdochohcodhciohipchspichzoishcoishcoihzl
                ihvczhchvkzhckvjhivh8hdv0hsdvhvpihpivdhpihvsiphjjjj\hhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhviodhvoihsoihvoidhvoishoivhoisdhxxxxxxxxxxxxx
                xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
              </p>
            </CardContent>
            <CardFooter className="bottom-0 w-full ">
              <Button className="w-full">Buy Now</Button>
            </CardFooter>
          </div>

      </Card>
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
    </>
  );
};

export default productRead;
