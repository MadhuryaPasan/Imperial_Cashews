import React from "react";
import { Button } from "../ui/button";
import { ChevronRight } from "lucide-react";
import Image1 from "@/assets/carosousel/image1.jpg"
import Image2 from "@/assets/carosousel/image2.jpg"
import Image3 from "@/assets/carosousel/image3.jpg"

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Card, CardContent } from "../ui/card";

const Hero = () => {

const carouselItems = [{
    title: 'Premium Cashews, Delivered Fresh to Your Doorstep',
    description: '',
    image: Image1,
    cta: 'Slide 1 CTA'
  }, {
    title: 'Taste the Crunch, Savor the Quality – Shop Cashews Online',
    description: '',
    image: Image2,
    cta: 'Slide 2 CTA'
  }, {
    title: 'Pure, Crunchy, and Nutritious – The Finest Cashews Await!',
    description: '',
    image: Image3,
    cta: 'Slide 3 CTA'
}]

  return (
    <>
      
        <Carousel className=" h-full relative ">
          <CarouselContent>

          {carouselItems.map((item, index) => (

            <CarouselItem key={index}>
              <div className="p-1 ">
                <Card className="h-[50vh] p-0 relative rounded-3xl">
                  <CardContent className="flex h-full items-center justify-center p-0 ">
                  <img src={item.image} alt="hero" className="w-full h-full object-cover p-0 brightness-50 rounded-3xl" />
                    <span className="text-5xl absolute font-bold text-white w-[50vw] text-center">
                      {item.title}
                    </span>
                  </CardContent>
                </Card>
              </div>
            </CarouselItem>


          ))}


            {/* {Array.from({ length: 5 }).map((_, index) => (
              <CarouselItem key={index}>
                <div className="p-1 ">
                  <Card className="h-[50vh]">
                    <CardContent className="flex h-full items-center justify-center p-6">
                      <span className="text-4xl font-semibold">
                        {index + 1}
                      </span>
                    </CardContent>
                  </Card>
                </div>
              </CarouselItem>
            ))} */}
          </CarouselContent>
          <CarouselPrevious className=" absolute left-5" />
          <CarouselNext className=" absolute right-5"  />
        </Carousel>
      
    </>
  );
};

export default Hero;
