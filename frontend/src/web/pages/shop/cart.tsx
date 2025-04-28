import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Sales_Order_Add } from "@/utils/API/sales/Sales_Order_API";
import { Minus, Plus, ShoppingCart } from "lucide-react";
import { useEffect, useState } from "react";


const userID = "680e45fc716e41b4a82cb430";
const Cart = () => {
  const [cartItems, setCartItems] = useState<
    { id: string; quantity: number; productData: any }[]
  >([]);

  // Effect to load cart items from local storage on component mount
  useEffect(() => {
    const storedCart = localStorage.getItem("cart");
    if (storedCart) {
      setCartItems(JSON.parse(storedCart));
    }
  }, []);

  // Function to update quantity in the cart
  const updateQuantity = (id: string, newQuantity: number) => {
    const updatedCart = cartItems.map((item) =>
      item.id === id ? { ...item, quantity: newQuantity } : item
    );
    setCartItems(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart)); // Update local storage
  };

  // Function to remove an item from the cart
  const removeItem = (id: string) => {
    const updatedCart = cartItems.filter((item) => item.id !== id);
    setCartItems(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart)); // Update local storage
  };


  //checkout function-----------
  const handleCheckout = async () => {
    const order = {
      customer_id: userID, // Replace with dynamic customer ID if available
      status: "competed", // Set initial status
      total_price: cartItems.reduce(
        (total, item) =>
          total + item.productData.price_per_unit * item.quantity,
        0
      ),
      oder_details: cartItems.map((item) => ({
        product_name: item.productData.name,
        product_id: item.productData._id,
        quantity: item.quantity,
        final_price: item.productData.price_per_unit * item.quantity,
        shop_product_id: item.productData.product_id,
      })),
    };

    console.log("order", order);
    await Sales_Order_Add(order);
    alert("Order created successfully!");

    // Clear cart data from local storage
    localStorage.removeItem("cart");
    setCartItems([]); // Clear cart state
  };

  return (
    <>
      <h1 className="text-3xl font-bold m-5">Your Shopping Cart</h1>
      <section className="flex flex-col lg:flex-row justify-center gap-5 m-5">
        <Card className="w-full lg:w-[60%] shadow-md">
          <CardHeader>
            <CardTitle className="text-2xl font-bold">
              Cart Items ({cartItems.length})
            </CardTitle>
          </CardHeader>
          <CardContent>
            {cartItems.length > 0 ? (
              <ul className="space-y-4">
                {cartItems.map((item) => (
                  <Card key={item.id} className="border rounded-lg shadow-sm">
                    <CardContent className="grid grid-cols-1 md:grid-cols-4 gap-4 items-center">
                      <img
                        src={item.productData.image}
                        alt={item.productData.name}
                        className="w-full md:w-auto h-32 object-cover rounded-md aspect-square"
                      />
                      <div className="col-span-3">
                        <CardHeader className="flex justify-between">
                          <CardTitle className="text-lg font-semibold text-gray-800">
                            {item.productData.name}
                          </CardTitle>
                          <p className="text-lg font-bold">
                            RS{" "}
                            {(
                              item.productData.price_per_unit * item.quantity
                            ).toLocaleString("en-US", {
                              minimumFractionDigits: 2,
                              maximumFractionDigits: 2,
                            })}
                          </p>
                        </CardHeader>

                        <div className="flex justify-between">
                          <div className="flex items-center space-x-4">
                            <div className="w-32">
                              <div className="flex justify-between items-center">
                                <Button
                                  variant={"ghost"}
                                  onClick={() =>
                                    updateQuantity(
                                      item.id,
                                      Math.max(1, item.quantity - 1)
                                    )
                                  }
                                  disabled={item.quantity === 1}
                                >
                                  <Minus />
                                </Button>
                                <p>{item.quantity}</p>
                                <Button
                                  variant={"ghost"}
                                  onClick={() =>
                                    updateQuantity(
                                      item.id,
                                      Math.min(
                                        item.quantity + 1,
                                        item.productData.stock_quantity
                                      )
                                    )
                                  }
                                  disabled={
                                    item.quantity >=
                                    item.productData.stock_quantity
                                  }
                                >
                                  <Plus />
                                </Button>
                              </div>
                            </div>
                          </div>
                          <Button
                            variant="destructive"
                            onClick={() => removeItem(item.id)}
                            className="mt-2"
                          >
                            Remove
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </ul>
            ) : (
              <p className="text-center text-gray-500">Your cart is empty.</p>
            )}
          </CardContent>
        </Card>
        <Card className="w-full lg:w-[40%] h-fit sticky top-0 shadow-md">
          <CardHeader>
            <CardTitle className="text-xl font-bold">Summary</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="">
              <div className="flex justify-between p-4 border-b">
                <p className="text-lg ">Total Items:</p>
                <p className="text-lg font-semibold">{cartItems.length}</p>
              </div>
              <div className="flex justify-between p-4 border-b">
                <p className="text-lg ">Shipping</p>
                <p className="text-lg font-semibold">free</p>
              </div>
              <div className="flex justify-between p-4 border-b">
                <p className="text-lg ">Total Price:</p>
                <p className="text-lg font-semibold">
                  RS{" "}
                  {cartItems
                    .reduce(
                      (total, item) =>
                        total + item.productData.price_per_unit * item.quantity,
                      0
                    )
                    .toLocaleString("en-US", {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })}
                </p>
              </div>
              <Button
                className="w-full mt-4"
                onClick={() => handleCheckout()}
              >
                Checkout
              </Button>
            </div>
          </CardContent>
        </Card>
      </section>
    </>
  );
};

export default Cart;
