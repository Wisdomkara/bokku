export type ExploreArticle = {
  slug: string;
  title: string;
  description: string;
  image: string;
  content: string[];
};

export const exploreArticles: ExploreArticle[] = [
  {
    slug: "bakery",
    title: "Bakery",
    description:
      "We serve delicious, fresh-baked goods and deli sandwiches to our community for years. We believe in using only the freshest ingredients, and all of our bread and pastries are made daily.",
    image: "/categoryimages/bread22.jpg",
    content: [
      "We serve delicious, fresh-baked bread to our community for years. We believe in using only the freshest ingredients, and all of our bread and pastries are made daily.",
      "Stop for a bite you will live the taste",
    ],
  },
  {
    slug: "Groceries",
    title: "Groceries",
    description:
      "Fresh groceries and everyday essentials, from produce and pantry staples to snacks and household items—all available to shop conveniently on Bokku.",
    image: "/categoryimages/grogro.jpg",
    content: [
      "Shop fresh and essential groceries all in one place. From farm-fresh fruits and vegetables to pantry staples, snacks, beverages, and everyday household essentials, Bokku makes grocery shopping simple, reliable, and convenient. Everything you need for daily meals and home essentials—just a few clicks away.",
    ],
  },
  {
    slug: "Frozen Food",
    title: "Frozen Food",
    description:
      "Convenient frozen foods including vegetables, meats, seafood, and ready-to-cook meals—kept fresh and easy to prepare on Bokku..",
    image: "/categoryimages/frozen.jpg",
    content: [
      "Discover a wide selection of frozen foods designed for freshness and convenience. From frozen vegetables, meats, seafood, and ready-to-cook meals to snacks and desserts, Bokku offers quality frozen options that help you save time without compromising taste or nutrition.",
    ],
  },
  {
    slug: "Wine and Liquor",
    title: "Wine and Liquor",
    description:
      "A curated range of wines, spirits, and liquors—perfect for celebrations, gatherings, or relaxed moments at home.",
    image: "/categoryimages/wine.jpg",
    content: [
      "Explore a curated selection of wines, spirits, and liquors for every occasion. From fine wines and classic spirits to popular liquors and mixers, Bokku offers quality options whether you’re celebrating, entertaining, or simply unwinding at home.",
    ],
  },
  {
    slug: "Beauty",
    title: "Beauty",
    description:
      "Skincare, haircare, cosmetics, and everyday beauty essentials—quality products to support your daily beauty routine.",
    image: "/categoryimages/beauty2.jpg",
    content: [
      "Discover a carefully selected range of beauty and personal care products designed to help you look and feel your best. From skincare, haircare, and cosmetics to everyday grooming essentials, Bokku offers quality beauty products for all skin types and routines—simple, effective, and reliable.",
    ],
  },
  {
    slug: "home",
    title: "Home",
    description:
      "Everyday cooking tools, cookware, and family household essentials—designed to support daily meals and home living.",
    image: "/categoryimages/home.jpg",
    content: [
      "Find everything your home needs for everyday cooking and family care. From cooking utensils, cookware, and kitchen tools to essential household items, Bokku brings together practical products that make meal preparation easier and family life more comfortable.",
    ],
  },
];
