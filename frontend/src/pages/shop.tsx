import ProductCard from "@/components/shop/productCard";
import { ShoppingBag } from "lucide-react";

const shop = () => {
  let data = [
    { price_per_unit: "5000", name: "Cashew Nuts" },
    { price_per_unit: "6000", name: "Cashew salted" },
    { price_per_unit: "2000", name: " Spicy Cashew Nuts" },
    { price_per_unit: "3000", name: "Cashew Flavored" },
    { price_per_unit: "3500", name: "Cashew Chocolate" },
  ];

  return (
    <>
      <div className="p-3 flex flex-col items-center pb-8 ">
        <div className="flex items-center gap-2 m-3 ">
          <ShoppingBag className=" size-[50px]" />

          <p className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">Shop</p>
        </div>
        <p className=" text-sm">
          Welcome to our All Products page, where you’ll find a wide range of
          high-quality cashew nuts and cashew-based products. Whether you’re
          looking for raw, roasted, salted, spicy, or flavored cashews, we have
          something for every taste.
        </p>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-4 m-2 ">
        {data.map((post, index) => (
          <ProductCard key={index} {...post} />
        ))}
      </div>
    </>
  );
};

export default shop;
