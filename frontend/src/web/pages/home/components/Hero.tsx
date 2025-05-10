
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

import Autoplay from "embla-carousel-autoplay";

const Hero = () => {

const carouselItems = [{
    title: 'Slide 1',
    description: 'Slide 1 Description',
    image: "https://images.pexels.com/photos/3622475/pexels-photo-3622475.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    cta: 'Slide 1 CTA'
  }, {
    title: 'Slide 2',
    description: 'Slide 2 Description',
    image: "https://images.pexels.com/photos/10615965/pexels-photo-10615965.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    cta: 'Slide 2 CTA'
  }, {
    title: 'Slide 3',
    description: 'Slide 3 Description',
    image: "https://images.pexels.com/photos/4663476/pexels-photo-4663476.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    cta: 'Slide 3 CTA'
}]

  return (
    <>
      
        <Carousel className=" h-full relative" plugins={[
        Autoplay({
          delay: 3000,
        }),
      ]}>
          <CarouselContent>

          {carouselItems.map((item, index) => (

            <CarouselItem key={index}>
              <div className="p-1 bg ">
                <Card className="h-[50vh] p-0 relative">
                  <CardContent className="flex h-full items-center justify-center p-0">
                  <img src={item.image} alt="hero" className="w-full h-full object-cover p-0 " />
                    <span className="text-4xl absolute bottom-5 left-5 font-semibold ">
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
