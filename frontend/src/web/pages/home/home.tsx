import Hero from "@/web/pages/home/components/Hero";
import CategoryCardsCarousel from "@/web/pages/home/components/categoryCardsCarousel";
import Features from "@/web/pages/home/components/Features";
import ProductSection from "@/web/pages/home/components/productSection";
import ShopNow from "@/web/pages/home/components/shopNow";
import MarqueeSection from "./components/marqueeSection";
import HeroParallaxSection from "./components/hero_parallax_section";
import WhyChoseUs from "./components/whyYouChooseus";
import Footer from "@/web/layout/components/footer";
import TextSection1 from "./components/TextSection1";
import TextSection2 from "./components/TextSection2";


const home = () => {
  return (
    <>



      

    
      <div className="bg-white">
        <HeroParallaxSection />
      </div>
      <div className="bg-white/15">
        <WhyChoseUs />
      </div>
      {/* <Features /> */}
      <div className="bg-white">
        <TextSection1 />
      </div>
      <section className="bg-white/15">
        <CategoryCardsCarousel />
      </section>
      {/* <MarqueeSection /> */}

      {/* <Hero /> */}
      <div className="bg-white">
        <TextSection2 />
      </div>
      <div className="bg-white/15">
        <ProductSection />
      </div>
      {/* <div className="bg-white/15">
        <ShopNow />
      </div> */}
      <div className=" border-t-2  ">
        <Footer />
      </div>
    </>
  );
};

export default home;
