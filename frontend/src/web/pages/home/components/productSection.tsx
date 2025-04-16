import { Button } from "@/components/ui/button";
import { returnAllProducts } from "@/utils/API/sales/Sales_Products_API";
import ProductCard from "@/web/pages/components/productCard";
import { ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";



const productSection = () => {
  return (
    <section id="products" className="w-full py-12 ">
      <div className="container px-4 md:px-6 mx-auto ">
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

        <div className="grid grid-cols-2 gap-6 lg:grid-cols-4  mt-8">
          {returnAllProducts().slice(0, 4).reverse().map((data, index) => (
            <ProductCard key={index} {...data} />
          ))}
        </div>
        <div className="mt-12 flex justify-center">
          <Button variant="outline" className="rounded-[10px] border-primary hover:translate-y-1 transition-all duration-300 ease-in-out " asChild>
           <Link to="/shop">
            View All Products <ChevronRight className="ml-2 h-4 w-4" />
           </Link>
            
          </Button>
        </div>
      </div>
    </section>
  );
};

export default productSection;
