import ProductCard from "@/components/shop/productCard";
import ProductRead from "@/components/shop/productRead";

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
      <div>shop</div>
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-4 m-2 ">
        {data.map((post, index) => (
          <ProductCard key={index} {...post} />
        ))}
      </div>
      <ProductRead />
    </>
  );
};

export default shop;
