import { HeroParallax } from '@/components/ui/hero-parallax';

export const products = [
  {
    title: "Shop Now",
    link: "/shop",
    thumbnail:
      "https://img.freepik.com/free-photo/spicy-cashews-topped-with-chopped-hot-chilli_1150-24343.jpg?ga=GA1.1.887165461.1745142086&semt=ais_hybrid&w=740",
  },
  {
    title: "Shop Now",
    link: "/shop",
    thumbnail:"https://img.freepik.com/free-photo/cashew-heart-shaped-wooden-plate-top-view-wooden-table_176474-1482.jpg?t=st=1745149300~exp=1745152900~hmac=e78c3a0b6a2c6431bf310c8388e137f22a5ea7d8fa3566c1db2c84b8b7d06942&w=996"
      ,
  },
  {
    title: "Shop Now",
    link: "/shop",
    thumbnail:"https://img.freepik.com/premium-photo/falling-cashew-nuts-into-wooden-bowl-isolated-white-background-with-clipping-path_88281-4516.jpg?w=740"
      ,
  },
  {
    title: "Shop Now",
    link: "/shop",
    thumbnail:
     "https://img.freepik.com/free-photo/organic-cashew-nuts-sale-market_23-2148263756.jpg?t=st=1745149301~exp=1745152901~hmac=3aef5f16e5d70d7a6f1dfedea4fd93c1aa902eaf41a4c168b8d203b6c82a4da7&w=740" ,
  },
  {
    title: "Shop Now",
    link: "/shop",
    thumbnail:
     "https://img.freepik.com/premium-photo/honey-flavored-cashew_54391-961.jpg?w=996" ,
  },
  {
    title: "Shop Now",
    link: "/shop",
    thumbnail:
    "https://img.freepik.com/premium-photo/spicy-cashew_43137-26.jpg?w=996"
      ,
  },

  {
    title: "Shop Now",
    link: "/shop",
    thumbnail:
    "https://img.freepik.com/premium-photo/roasted-cashew-nuts_1339-31422.jpg?w=996"
      ,
  },
  {
    title: "Shop Now",
    link: "/shop",
    thumbnail:
    "https://img.freepik.com/premium-photo/roasted-cashew-nuts_1339-48950.jpg?w=996"
      ,
  },
  {
    title: "Shop Now",
    link: "/shop",
    thumbnail:
      "https://img.freepik.com/premium-photo/close-up-pile-roasted-cashew-nuts-texture-background_75775-576.jpg?w=996",
  },
  {
    title: "Shop Now",
    link: "/shop",
    thumbnail:
    "https://img.freepik.com/premium-photo/beautiful-bent-cashew-nuts-fresh-raw-cashew-nuts-kitchen-table-healthy-high-calorie-raw-cashews_252085-10575.jpg?w=996" ,
  },
  {
    title: "Shop Now",
    link: "/shop",
    thumbnail:
     "https://img.freepik.com/premium-photo/handful-roasted-spiced-cashew-nuts-masala-kaju-served-bowl-selective-focus_466689-65519.jpg?w=996" ,
  },
  {
    title: "Shop Now",
    link: "/shop",
    thumbnail:
     "https://img.freepik.com/premium-photo/pile-cashews-table_38172-182.jpg?w=996" ,
  },
  {
    title: "Shop Now",
    link: "/shop",
    thumbnail:
      "https://img.freepik.com/premium-photo/cashew-nuts-wooden-bowl-with-copy-space_1339-136133.jpg?w=996",
  },
  {
    title: "Shop Now",
    link: "/shop",
    thumbnail:
      "https://img.freepik.com/premium-photo/roasted-cashew-nuts_1339-48963.jpg?w=740",
  },
  {
    title: "Shop Now",
    link: "/shop",
    thumbnail:
      "https://img.freepik.com/premium-photo/cashew-nuts-closeup_35355-2915.jpg?w=740",
  },
  
];

const HeroParallaxSection = () => {
  return (
    <div >
      <HeroParallax products={products} />
    </div>
  )
}

export default HeroParallaxSection