import { Input } from "@/components/ui/input";
import { useState } from "react";
import ProductCard from "@/web/pages/components/productCard";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { FileWarning, Filter, ShoppingBag } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import Sidebar from "@/web/pages/shop/components/sidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";

import { returnAllProducts } from "@/utils/API/sales/Sales_Products_API";
import { Badge } from "@/components/ui/badge";
import Footer from "@/web/layout/components/footer";
import { Link } from "react-router-dom";

const shop = () => {
  //  sidebar filter
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  console.log("selectedCategory", selectedCategory);

  // Filter products based on selected category
  //returnAllProducts() is a function that returns all products from the API
  const filteredProducts = selectedCategory
    ? returnAllProducts().filter(
        (item) => item.categoryData.name === selectedCategory
      )
    : returnAllProducts();

  const [searchTerm, setSearchTerm] = useState("");

  // Filter products based on search
  const searchedProducts = filteredProducts.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const productPerPage = 8;
  // total number of products
  const totalProductLength = searchedProducts.length;
  //slice(0,x)
  const [productLimit, setProductLimit] = useState(productPerPage);
  //slice(x,0)
  const [productIndex, setProductIndex] = useState(0);

  const finalProduct = searchedProducts.slice(productIndex, productLimit);

  console.log("selectedCategory", selectedCategory);

  return (
    <>
      <div className=" flex">
        {/*cart button */}
        <div className=" fixed bottom-4 right-4 z-10">
          <Link to="/shop/cart">
            <Button>
              <ShoppingBag />
              Cart ({JSON.parse(localStorage.getItem("cart") || "[]").length})
            </Button>
          </Link>

        {/* ------------------- */}
        </div>
        <div>
          <SidebarProvider>
            <Sidebar onSelectCategory={setSelectedCategory} />
            <SidebarTrigger className=" md:absolute md:z-99 md:hidden " />
          </SidebarProvider>
        </div>
        <div className=" mx-auto px-4 py-8 relative w-[100%]">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between  ">
            <div>
              <h1 className="text-3xl font-bold tracking-tight">Shop</h1>
              <p className="text-muted-foreground">
                Browse our collection of products
              </p>
              <Badge variant="outline" className=" font-medium text-gray-500 mt-2 ">{selectedCategory || "All Products"}</Badge>
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

          <div className="sm:px-10">
            {/* Products */}
            {searchedProducts.length > 0 ? (
              <>
                <div className=" grid grid-cols-2 gap-6 md:grid-cols-2 md:gap-3 lg:gap-10 lg:grid-cols-4  ">
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
              <div>
                <div className="flex min-h-full flex-col items-center justify-center">
                  <div className="flex flex-col items-center gap-4">
                    <FileWarning className="h-12 w-12 animate-bounce text-primary" />
                    <h1 className="text-xl font-semibold">
                      No Products Found!
                    </h1>
                    <p className="text-sm text-muted-foreground">
                      Please search for another product or check back later.
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default shop;
