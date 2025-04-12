import { Input } from "@/components/ui/input";
import { useState } from "react";
import ProductCard from "@/web/pages/home/components/productCard";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Filter } from "lucide-react";
import { Separator } from "@/components/ui/separator";

let product = [
  {
    name: "1cscs",
    price_per_unit: 100.05,
    stock_quantity: 2,
    image: "https://example.com/image1.jpg",
  },
  {
    name: "2sdsd",
    price_per_unit: 100,
    stock_quantity: 2,
    image: "https://example.com/image1.jpg",
  },
  {
    name: "3cssdsdcs",
    price_per_unit: 100,
    stock_quantity: 2,
    image: "https://example.com/image1.jpg",
  },
  {
    name: "4sfsf",
    price_per_unit: 100.0,
    stock_quantity: 2,
    image: "https://example.com/image1.jpg",
  },
  {
    name: "5sqweqwefsf",
    price_per_unit: 100.0,
    stock_quantity: 2,
    image: "https://example.com/image1.jpg",
  },
  {
    name: "6qedvbfdbsfsf",
    price_per_unit: 100.0,
    stock_quantity: 2,
    image: "https://example.com/image1.jpg",
  },
  {
    name: "7nyusfsf",
    price_per_unit: 100.0,
    stock_quantity: 2,
    image: "https://example.com/image1.jpg",
  },
  {
    name: "8okukisfsf",
    price_per_unit: 100.0,
    stock_quantity: 2,
    image: "https://example.com/image1.jpg",
  },
  {
    name: "9p;polosfsf",
    price_per_unit: 100.0,
    stock_quantity: 2,
    image: "https://example.com/image1.jpg",
  },
  {
    name: "10hh57657sfsf",
    price_per_unit: 100.0,
    stock_quantity: 2,
    image: "https://example.com/image1.jpg",
  },
  {
    name: "11/io;o;sfsf",
    price_per_unit: 100.0,
    stock_quantity: 2,
    image: "https://example.com/image1.jpg",
  },
  {
    name: "12ewrtrwetsfsf",
    price_per_unit: 100.0,
    stock_quantity: 2,
    image: "https://example.com/image1.jpg",
  },
  {
    name: "13uo,sfsf",
    price_per_unit: 100.0,
    stock_quantity: 2,
    image: "https://example.com/image1.jpg",
  },
  {
    name: "14erwertsfsf",
    price_per_unit: 100.0,
    stock_quantity: 2,
    image: "https://example.com/image1.jpg",
  },
];

const shop = () => {
  const [searchTerm, setSearchTerm] = useState("");

  // Filter products based on search
  const filteredProducts = product.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const productPerPage = 9;
  // total number of products
  const totalProductLength = filteredProducts.length;
  //slice(0,x)
  const [productLimit, setProductLimit] = useState(productPerPage);
  //slice(x,0)
  const [productIndex, setProductIndex] = useState(0);

  const finalProduct = filteredProducts.slice(productIndex, productLimit);

  return (
    <>
      <div className=" mx-auto px-4 py-8 relative ">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between ">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Shop</h1>
            <p className="text-muted-foreground">
              Browse our collection of products
            </p>
          </div>
          <div className="flex items-center gap-4">
            <div className="relative w-full md:w-64">
              <Input
                type="text"
                placeholder="Search products..."
                className="pr-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <button
                className="absolute right-3 top-1/2 -translate-y-1/2"
                type="submit"
                aria-label="Search"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-4 w-4"
                >
                  <circle cx="11" cy="11" r="8" />
                  <path d="m21 21-4.3-4.3" />
                </svg>
              </button>
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="icon">
                  <Filter className="h-4 w-4" />
                  <span className="sr-only">Filter</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel>Filter by</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Price: Low to High</DropdownMenuItem>
                <DropdownMenuItem>Price: High to Low</DropdownMenuItem>
                <DropdownMenuItem>Newest</DropdownMenuItem>
                <DropdownMenuItem>Popular</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
        <Separator className="my-6" />

        <div className="">
          {/* Products */}
          {filteredProducts.length > 0 ? (
            <>
              <div className=" grid grid-cols-2 gap-6 lg:gap-10 lg:grid-cols-3  ">
                {finalProduct.map((data, index) => (
                  <ProductCard key={index} {...data} />
                ))}
              </div>
              <div className=" flex justify-end pt-5">
          <div className=" flex items-center gap-4">
            <Button
             className=" disabled:border-2 w-[100px]"
              {...(productLimit <= productPerPage
                ? { disabled: true, variant: "ghost" }
                : {})}
              onClick={() => {
                setProductLimit(productLimit - productPerPage),
                  setProductIndex(productIndex - productPerPage);
              }}
            >
              prev
            </Button>
            <Button
              className=" w-[100px]"
              {...(totalProductLength >= productLimit
                ? {}
                : { disabled: true, variant: "ghost" })}
              onClick={() => {
                setProductLimit(productLimit + productPerPage),
                  setProductIndex(productIndex + productPerPage);
              }}
            >
              Next
            </Button>
          </div>
        </div>
            </>
          ) : (
            <p>No products found.</p>
          )}
        </div>

        
      </div>
    </>
  );
};

export default shop;
