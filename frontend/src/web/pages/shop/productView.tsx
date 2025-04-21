import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Lens } from "@/components/ui/lens";
import ProductCard from "@/web/pages/components/productCard";
import noImage from "@/assets/NoImage.jpg";
import {
  returnAllProducts,
  Sales_Product_getDoc,
} from "@/utils/API/sales/Sales_Products_API";
import {
  ArrowLeft,
  CalendarDays,
  ChevronRight,
  Loader2,
  Minus,
  Plus,
  ShoppingCart,
  Weight,
} from "lucide-react";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Footer from "@/web/layout/components/footer";

const productView = () => {
  const Navigate = useNavigate();

  const params = useParams();
  const id = params.id ?? "";
  // const productData = returnOneProducts(id);

  const [productData, setProductData] = useState<any>();
  useEffect(() => {
    async function loadPost() {
      try {
        let result = await Sales_Product_getDoc(id);
        // await new Promise((resolve) => setTimeout(resolve, 2000));
        if (result) {
          setProductData(result);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
    loadPost();
  }, [id]);

  const stock_quantity: number = productData?.stock_quantity;
  const [quantity, setQuantity] = useState<number>(1);

  return (
    <>
      <div className=" mx-10 ">
        <Button
          onClick={() => Navigate(-1)}
          variant="ghost"
          className=" opacity-50 hover:opacity-75 my-4 "
        >
          <ArrowLeft />
          Go Back
        </Button>

        <main>
          <div>
            <Card className="overflow-hidden p-5">
              {productData ? (
                <div className="grid md:grid-cols-2 gap-6">
                  {/* Product Image */}
                  <div className="flex items-center justify-center">
                    <Lens lensSize={200}>
                      <img
                        src={productData?.image || noImage}
                        alt={productData?.name}
                        width={1000}
                        height={1000}
                        className="object-cover h-[40vh] md:h-[60vh]  rounded-md border-2  "
                      />
                    </Lens>
                  </div>

                  {/* Product Details */}
                  <CardContent className="flex flex-col p-6">
                    <div className="flex flex-col h-full">
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <div className="md:flex md:justify-between">
                            <Badge variant="outline" className="text-sm">
                              {productData?.categoryData?.name}
                            </Badge>
                            <div className="flex items-center text-sm text-muted-foreground mt-1 md:mt-0">
                              <CalendarDays className="h-4 w-4 mr-1" />
                              <span>
                                Added on{" "}
                                {productData?.created_date
                                  ? new Date(
                                      productData?.created_date
                                    ).toLocaleString("en-US", {
                                      year: "numeric",
                                      month: "long",
                                      day: "numeric",
                                    })
                                  : "N/A"}
                              </span>
                            </div>
                          </div>
                          <h1 className="text-3xl font-bold tracking-tight">
                            {productData?.name}
                          </h1>
                          <div className="flex items-center text-sm text-muted-foreground">
                            <Weight className="h-4 w-4 mr-1" />
                            <span>{productData?.size} grams</span>
                          </div>
                        </div>

                        <div className="text-2xl font-bold">
                          RS{" "}
                          {productData?.price_per_unit.toLocaleString("en-US", {
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2,
                          })}
                        </div>

                        <div className="prose max-w-none">
                          <p>{productData?.description}</p>
                        </div>
                      </div>

                      <div className="mt-auto pt-6 space-y-4">
                        {stock_quantity > 0 ? (
                          <div className="flex items-center space-x-4">
                            <div className="w-32">
                              <div className="flex justify-between items-center">
                                <Button
                                  variant={"ghost"}
                                  onClick={() => setQuantity(quantity - 1)}
                                  disabled={quantity === 1}
                                >
                                  <Minus />
                                </Button>
                                <p>{quantity}</p>
                                <Button
                                  variant={"ghost"}
                                  onClick={() => setQuantity(quantity + 1)}
                                  disabled={quantity >= stock_quantity}
                                >
                                  <Plus />
                                </Button>
                              </div>
                            </div>
                            <Button size="lg" className="flex-1" asChild>
                              <Link to="/shop/cart">
                                <ShoppingCart className="mr-2 h-5 w-5" />
                                Add to Cart
                              </Link>
                            </Button>
                          </div>
                        ) : (
                          <Button
                            disabled
                            variant="outline"
                            className="text-sm text-destructive w-full border-destructive/40 animate-pulse"
                          >
                            Out of Stock
                          </Button>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </div>
              ) : (
                <div className="flex min-h-full flex-col items-center justify-center">
                  <div className="flex flex-col items-center gap-4">
                    <Loader2 className="h-12 w-12 animate-spin text-primary" />
                    <h1 className="text-xl font-semibold">Loading...</h1>
                    <p className="text-sm text-muted-foreground">
                      Please wait while we prepare your content
                    </p>
                  </div>
                </div>
              )}
            </Card>
          </div>
        </main>

        <section className="container mx-auto px-4 md:px-6 py-12">
          <h3 className="text-2xl font-medium mb-5">You May Also Like</h3>
          <div className="grid grid-cols-2 gap-6 lg:grid-cols-4  ">
            {returnAllProducts()
              .slice(0, 4)
              .reverse()
              .map((data, index) => (
                <ProductCard key={index} {...data} />
              ))}
          </div>
          <div className="mt-12 flex justify-center">
            <Button
              variant="outline"
              className="rounded-[10px] border-primary hover:translate-y-1 transition-all duration-300 ease-in-out "
              asChild
            >
              <Link to="/shop">
                View All Products <ChevronRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </section>
      </div>
      <Footer />
    </>
  );
};

export default productView;
