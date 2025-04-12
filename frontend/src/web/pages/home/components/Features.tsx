import { Card, CardContent } from "@/components/ui/card";
import { Leaf, ShieldCheck, Truck } from "lucide-react";
import React from "react";

const Features = () => {
  return (
    <>
      <section className="w-full py-12">
        <div className="container px-4 md:px-6  mx-auto">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <div className="inline-block rounded-lg bg-primary/10 text-primary px-3 py-1 text-sm  ">
                Why Choose Us
              </div>
              <h2 className="text-5xl font-bold tracking-tighter text-center">
                The Imperial Cashews Difference
              </h2>
              <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                We take pride in delivering the highest quality cashew nuts with
                exceptional service.
              </p>
            </div>
          </div>
          <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-3 lg:gap-12">
            <Card className=" transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-lg">
              <CardContent>
                <div className="flex flex-col items-center space-y-4 text-center">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                    <Leaf className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold">100% Natural</h3>
                  <p className="text-muted-foreground">
                    Our cashews are grown naturally without harmful chemicals or
                    pesticides.
                  </p>
                </div>
              </CardContent>
            </Card>
            <Card className=" transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-lg">
              <CardContent>
                <div className="flex flex-col items-center space-y-4 text-center">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                    <ShieldCheck className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold">Quality Guaranteed</h3>
                  <p className="text-muted-foreground">
                    Every batch is carefully inspected to ensure premium quality
                    and freshness.
                  </p>
                </div>
              </CardContent>
            </Card>
            <Card className=" transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-lg">
              <CardContent>
                <div className="flex flex-col items-center space-y-4 text-center">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                    <Truck className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold">Fast Delivery</h3>
                  <p className="text-muted-foreground">
                    We ship within 24 hours to ensure you receive the freshest
                    cashews possible.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </>
  );
};

export default Features;
