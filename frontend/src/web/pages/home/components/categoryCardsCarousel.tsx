import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const products = [
  {
    id: 1,
    name: "iPhone 15 Pro",
    description: "The ultimate iPhone with A17 Pro chip and titanium design.",
    image:
      "https://images.pexels.com/photos/4663476/pexels-photo-4663476.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  },
  {
    id: 2,
    name: "Samsung Galaxy S23",
    description: "The latest flagship phone from Samsung.",
    image:
      "https://images.pexels.com/photos/3622475/pexels-photo-3622475.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  },
  {
    id: 3,
    name: "Google Pixel 8",
    description: "Experience the best of Google with the Pixel 8.",
    image:
      "https://images.pexels.com/photos/10615965/pexels-photo-10615965.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  },
  {
    id: 4,
    name: "OnePlus 11",
    description: "Fast and smooth performance with OnePlus 11.",
    image:
      "https://images.pexels.com/photos/4663476/pexels-photo-4663476.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  },
];

const categoryCardsCarousel = () => {
  return (
    <div className="w-full py-12 ">
        <div className="container px-4 md:px-6 mx-auto  ">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <div className="inline-block rounded-lg bg-primary/10 text-primary px-3 py-1 text-sm ">
              Our Collection
            </div>
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
              Premium Cashew Varieties
            </h2>
            <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Explore our selection of high-quality cashew nuts for every taste
              and occasion.
            </p>
          </div>
        </div>
        
          <Carousel
            opts={{
              align: "start",
              loop: true,
            }}
            className="w-full"
          >
            <CarouselContent className="-ml-2 md:-ml-4 ">
              {products.map((product) => (
                <CarouselItem
                  key={product.id}
                  className="pl-2 md:pl-5 md:basis-1/2 lg:basis-1/4 py-5 "
                >
                  <Card className="overflow-hidden p-0 rounded-2xl transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-lg h-full ">
                    <CardContent className="p-0  relative h-full">
                      <div className="aspect-square relative  flex items-center justify-center p-3">
                        <img
                          src={product.image || "/placeholder.svg"}
                          alt={product.name}
                          className=" h-full w-full  object-cover rounded-lg"
                        />
                      </div>
                      <div className="px-6 pb-5 ">
                        <h3 className="text-lg font-bold text-[#1d1d1f] mb-2">
                          {product.name}
                        </h3>
                        <p className="text-[#86868b] mb-4 text-sm line-clamp-2">
                          {product.description}
                        </p>
                      </div>
                      <div className=" px-6 w-full absolute bottom-1 pb-1">
                        <button className="text-sm font-medium text-primary hover:underline ">
                          Shop Now
                        </button>
                      </div>
                    </CardContent>
                  </Card>
                </CarouselItem>
              ))}
            </CarouselContent>
            <div className="flex justify-center mt-8 gap-2">
              <CarouselPrevious className="relative inset-0 translate-y-0 bg-white/80 backdrop-blur-sm border border-[#d2d2d7] text-[#1d1d1f] hover:bg-white/90" />
              <CarouselNext className="relative inset-0 translate-y-0 bg-white/80 backdrop-blur-sm border border-[#d2d2d7] text-[#1d1d1f] hover:bg-white/90" />
            </div>
          </Carousel>
        </div>
    </div>
  );
};

export default categoryCardsCarousel;
