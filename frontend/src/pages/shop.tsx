import ProductCard from "@/components/shop/productCard";
import { ShoppingBag } from "lucide-react";

const shop = () => {
  let data = [
    { cx: "cscs" },
    { cx: "cscs" },
    { cx: "cscs" },
    { cx: "cscs" },
    { cx: "cscs" },
    { cx: "cscs" },
  ];

  return (
    <>
      <div className="p-3 flex flex-col items-center pb-8 ">
        <div className="flex items-center gap-2 m-3 ">
          <ShoppingBag className=" size-[50px]" />

          <p className="text-3xl font-bold">Shop</p>
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
