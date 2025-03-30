import Hero from "@/components/home/Hero";
import { Award, Heart, Leaf } from "lucide-react";
import ProductCard from "@/components/shop/productCard";

const home = () => {
  let data = [
    { price_per_unit: "5000", name: "Cashew Nuts" },
    { price_per_unit: "6000", name: "Cashew salted" },
    { price_per_unit: "2000", name: " Spicy Cashew Nuts" },
    { price_per_unit: "3000", name: "Cashew Flavored" },
    { price_per_unit: "3500", name: "Cashew Chocolate" },
  ];
  return (
    <>
      <div className=" flex flex-col items-center pb-8 p-3">
        <Hero />

        <br />
        <br />
        <br />
        <section id="benefits" className="py-1">
          <div className="container">
            <div className="flex flex-col items-center text-center mb-12">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">
                Benefits of Cashews
              </h2>
              <p className="max-w-2xl text-muted-foreground">
                Cashews are not just delicious, they're packed with nutrients
                and health benefits.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  icon: <Heart className="h-10 w-10 text-primary" />,
                  title: "Heart Health",
                  description:
                    "Rich in monounsaturated and polyunsaturated fatty acids that promote good cardiovascular health.",
                },
                {
                  icon: <Leaf className="h-10 w-10  text-primary" />,
                  title: "Rich in Nutrients",
                  description:
                    "Excellent source of vitamins, minerals, and antioxidants essential for overall health.",
                },
                {
                  icon: <Award className="h-10 w-10  text-primary" />,
                  title: "Weight Management",
                  description:
                    "The protein and healthy fat content helps you feel fuller longer, aiding in weight management.",
                },
              ].map((benefit, index) => (
                <div
                  key={index}
                  className="flex flex-col items-center text-center p-6 rounded-lg border bg-white"
                >
                  <div className="mb-4">{benefit.icon}</div>
                  <h3 className="text-xl font-semibold mb-2">
                    {benefit.title}
                  </h3>
                  <p className="text-muted-foreground">{benefit.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <br />
        <br />
        <br />

        <section>
          <div className="flex flex-col items-center text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">
              New Arrivals{" "}
            </h2>
            <p className="max-w-2xl text-muted-foreground">
              Discover our latest additions! Fresh flavors and exciting new
              products have arrived.
            </p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-4 m-2 ">
            {data.map((post, index) => (
              <ProductCard key={index} {...post} />
            ))}
          </div>
        </section>

        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
      </div>
    </>
  );
};

export default home;
