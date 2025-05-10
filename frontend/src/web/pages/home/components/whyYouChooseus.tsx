import { AuroraText } from "@/components/magicui/aurora-text";
import { Ripple } from "@/components/magicui/ripple";
import { ShineBorder } from "@/components/magicui/shine-border";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { CheckCircle, Leaf, Truck, Zap } from "lucide-react";

const whyYouChooseus = () => {
  return (
    <section className="py-12 md:py-20 lg:py-32">
      <div className="relative  mx-auto max-w-2xl space-y-6 text-center">
        <h2 className="text-balance text-4xl font-bold lg:text-6xl">
          <AuroraText colors={["#19ce62", "#98e32f"]}>
            Why Choose Us?
          </AuroraText>
        </h2>
        <p className="text-lg opacity-80">
          We take pride in delivering the highest quality cashew nuts with
          exceptional service.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3  mx-auto px-20 mt-15">
        <Card className=" relative overflow-hidden order-none shadow-lg  hover:shadow-primary/15 transition-all duration-300 ease-in-out">
          <ShineBorder
            shineColor={["#19ce62", "#98e32f", "#B7FE4E"]}
            borderWidth={3}
          />
          <CardContent className=" relative h-45 overflow-hidden">
            <div className=" w-full h-full relative flex items-center justify-center  overflow-hidden">
              <Leaf className=" w-15 h-15 text-primary " />
              <Ripple
                mainCircleSize={110}
                mainCircleOpacity={0.15}
                numCircles={3}
                className=" text-primary  "
              />
            </div>
          </CardContent>
          <CardFooter className=" flex flex-col items-center justify-center text-center gap-3">
            <CardTitle className="text-2xl text-primary font-bold">
              100% Natural
            </CardTitle>
            <CardDescription>
              Our cashews are grown naturally without harmful chemicals or
              pesticides.
            </CardDescription>
          </CardFooter>
        </Card>
        <Card className=" relative overflow-hidden order-none shadow-lg  hover:shadow-primary/15 transition-all duration-300 ease-in-out  ">
          <ShineBorder
            shineColor={["#19ce62", "#98e32f", "#B7FE4E"]}
            borderWidth={3}
          />
          <CardContent className=" relative h-45 overflow-hidden">
            <div className=" w-full h-full relative flex items-center justify-center  overflow-hidden">
              <CheckCircle className="w-15 h-15 text-primary" />
              <Ripple
                mainCircleSize={110}
                mainCircleOpacity={0.15}
                numCircles={3}
                className=" text-primary  "
              />
            </div>
          </CardContent>
          <CardFooter className=" flex flex-col items-center justify-center text-center gap-3">
            <CardTitle className="text-2xl text-primary font-bold">
              Quality Guaranteed
            </CardTitle>
            <CardDescription>
              Every batch is carefully inspected to ensure premium quality and
              freshness.
            </CardDescription>
          </CardFooter>
        </Card>
        <Card className=" relative overflow-hidden order-none shadow-lg  hover:shadow-primary/15 transition-all duration-300 ease-in-out  ">
          <ShineBorder
            shineColor={["#19ce62", "#98e32f", "#B7FE4E"]}
            borderWidth={3}
          />
          <CardContent className=" relative h-45 overflow-hidden">
            <div className=" w-full h-full relative flex items-center justify-center  overflow-hidden">
              <Truck className="w-15 h-15 text-primary" />
              <Ripple
                mainCircleSize={110}
                mainCircleOpacity={0.15}
                numCircles={3}
                className=" text-primary  "
              />
            </div>
          </CardContent>
          <CardFooter className=" flex flex-col items-center justify-center text-center gap-3">
            <CardTitle className="text-2xl text-primary font-bold">
              Fast Delivery
            </CardTitle>
            <CardDescription>
              We ship within 24 hours to ensure you receive the freshest cashews
              possible.
            </CardDescription>
          </CardFooter>
        </Card>
      </div>
    </section>
  );
};

export default whyYouChooseus;
