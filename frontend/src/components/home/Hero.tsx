
import Image1 from "@/assets/carosousel/scsd.png"

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
    title: 'Slide 1',
    description: 'Slide 1 Description',
    image: Image1,
    cta: 'Slide 1 CTA'
  }, {
    title: 'Slide 2',
    description: 'Slide 2 Description',
    image: Image1,
    cta: 'Slide 2 CTA'
  }, {
    title: 'Slide 3',
    description: 'Slide 3 Description',
    image: Image1,
    cta: 'Slide 3 CTA'
}]

  return (
    <>
      
        <Carousel className=" h-full relative">
          <CarouselContent>

          {carouselItems.map((item, index) => (

            <CarouselItem key={index}>
              <div className="p-1 bg ">
                <Card className="h-[50vh] p-0 relative">
                  <CardContent className="flex h-full items-center justify-center p-0">
                  <img src={item.image} alt="hero" className="w-full h-full object-cover p-0 " />
                    <span className="text-4xl absolute bottom-5 left-5 font-semibold text-white">
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
