import { ThreeDMarquee } from '@/components/ui/3d-marquee'
import React from 'react'

const images = [
    "https://img.freepik.com/free-photo/spicy-cashews-topped-with-chopped-hot-chilli_1150-24343.jpg?ga=GA1.1.887165461.1745142086&semt=ais_hybrid&w=740",
    "https://img.freepik.com/free-photo/cashew-heart-shaped-wooden-plate-top-view-wooden-table_176474-1482.jpg?t=st=1745149300~exp=1745152900~hmac=e78c3a0b6a2c6431bf310c8388e137f22a5ea7d8fa3566c1db2c84b8b7d06942&w=996",
    "https://img.freepik.com/premium-photo/falling-cashew-nuts-into-wooden-bowl-isolated-white-background-with-clipping-path_88281-4516.jpg?w=740",
    "https://img.freepik.com/premium-photo/heap-salted-roasted-cashew-nuts_67721-344.jpg?w=996",
    "https://img.freepik.com/free-photo/organic-cashew-nuts-sale-market_23-2148263756.jpg?t=st=1745149301~exp=1745152901~hmac=3aef5f16e5d70d7a6f1dfedea4fd93c1aa902eaf41a4c168b8d203b6c82a4da7&w=740",
    "https://img.freepik.com/premium-photo/honey-flavored-cashew_54391-961.jpg?w=996",
    "https://img.freepik.com/premium-photo/spicy-cashew_43137-26.jpg?w=996",
    "https://img.freepik.com/premium-photo/view-from-top-close-look-many-cashews_483949-5622.jpg?w=996",
    "https://img.freepik.com/premium-photo/roasted-cashew-nuts_1339-31422.jpg?w=996",
    "https://img.freepik.com/premium-photo/roasted-cashew-nuts_1339-48950.jpg?w=996",
    "https://img.freepik.com/premium-photo/close-up-pile-roasted-cashew-nuts-texture-background_75775-576.jpg?w=996",
    "https://img.freepik.com/premium-photo/beautiful-bent-cashew-nuts-fresh-raw-cashew-nuts-kitchen-table-healthy-high-calorie-raw-cashews_252085-10575.jpg?w=996",
    "https://img.freepik.com/premium-photo/handful-roasted-spiced-cashew-nuts-masala-kaju-served-bowl-selective-focus_466689-65519.jpg?w=996",
    "https://img.freepik.com/premium-photo/pile-cashews-table_38172-182.jpg?w=996",
    "https://img.freepik.com/premium-photo/cashew-nuts-burlap-bag-wooden-gray-background-healthy-food_94046-2143.jpg?w=996",
    "https://img.freepik.com/premium-photo/roasted-cashew-nuts_1339-48934.jpg?w=740",
    "https://img.freepik.com/premium-photo/cashew-nuts-wooden-bowl-with-copy-space_1339-136133.jpg?w=996",
    "https://img.freepik.com/premium-photo/roasted-cashew-nuts_1339-48963.jpg?w=740",
    "https://img.freepik.com/premium-photo/cashew-nuts-closeup_35355-2915.jpg?w=740",
    "https://img.freepik.com/premium-photo/roasted-cashew-nuts_1339-48978.jpg?w=996",
    "https://img.freepik.com/premium-photo/masala-kaju-spicy-cashew-bowl-popular-festival-snack-from-india-asia-also-known-as-chakna-recipe_466689-41944.jpg?w=740",
    "https://img.freepik.com/premium-photo/roasted-cashew-nuts_1339-22878.jpg?w=996",
    "https://img.freepik.com/premium-photo/cashew-group-close-up-white-background-isolated_323569-482.jpg?w=740",
    "https://img.freepik.com/premium-photo/close-up-cashew-nuts_252085-8949.jpg?w=996",
    "https://img.freepik.com/premium-photo/cashew-nuts-wood-bowl-wood-background_70216-9025.jpg?w=996",
    "https://img.freepik.com/premium-photo/cashew-nuts-closeup_1341597-26078.jpg?w=996",
    "https://img.freepik.com/premium-photo/cashew-nuts-cup-it-snack-food_43520-82.jpg?w=996",
    "https://img.freepik.com/premium-photo/cashew-nuts-wooden-bowl-with-copy-space_1339-128567.jpg?w=996",
    "https://img.freepik.com/premium-photo/handful-roasted-spiced-cashew-nuts-masala-kaju-served-bowl-selective-focus_466689-65513.jpg?w=740",
    "https://img.freepik.com/premium-photo/cashews-nuts_949228-92994.jpg?w=996",
    "https://img.freepik.com/premium-photo/roasted-cashew-nuts_38700-368.jpg?w=996",
    "https://img.freepik.com/premium-photo/cashew-with-green-leaves_220925-22062.jpg?w=996",
    "https://img.freepik.com/premium-photo/background-wallpaper-with-cashew-nuts-glass-cup_43520-269.jpg?w=996",
    "https://img.freepik.com/premium-photo/roasted-cashew-nuts_38700-308.jpg?w=996",
    "https://img.freepik.com/premium-photo/roasted-cashews-nuts-bowl_632261-5316.jpg?w=996",
    "https://img.freepik.com/premium-photo/pile-cashew-nuts-sackcloth_38172-203.jpg?w=740",
    "https://img.freepik.com/premium-photo/box-with-fresh-nuts-supermarket_283617-8477.jpg?w=996",
    "https://img.freepik.com/premium-photo/cashew-nuts-white-bowl-wood-background_70216-9014.jpg?w=996",
    "https://img.freepik.com/premium-photo/raw-cashew-nuts_252085-11805.jpg?w=996",
    "https://img.freepik.com/premium-photo/handful-roasted-spiced-cashew-nuts-masala-kaju-served-bowl-selective-focus_466689-60933.jpg?w=996",
    "https://img.freepik.com/premium-photo/cashew-plate-hd-8k-wallpaper-stock-photographic-image_890746-91412.jpg?w=996",
    "https://img.freepik.com/premium-photo/cashew-nutsin-wooden-bowl-wooden-background-roasted-cashew-nuts_157837-2424.jpg?w=996",
    "https://img.freepik.com/premium-photo/enticing-display-cashew-nuts-portrait_980928-89876.jpg?w=996",
    "https://images.pexels.com/photos/4499222/pexels-photo-4499222.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    "https://images.pexels.com/photos/15104329/pexels-photo-15104329/free-photo-of-meal-in-bowl.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    "https://images.pexels.com/photos/6730156/pexels-photo-6730156.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    "https://images.pexels.com/photos/18876238/pexels-photo-18876238/free-photo-of-nuts-on-yellow-background.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    "https://images.pexels.com/photos/12717147/pexels-photo-12717147.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    "https://images.pexels.com/photos/18876242/pexels-photo-18876242/free-photo-of-closeup-of-cashew-nuts-on-a-table.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    "https://images.pexels.com/photos/18301125/pexels-photo-18301125/free-photo-of-roast-nuts-in-steel-bowl.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  ];

const marqueeSection = () => {
  return (
    <div className="w-screen ">
      <ThreeDMarquee images={images} />
    </div>
  )
}

export default marqueeSection