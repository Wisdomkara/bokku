export type ExploreArticle = {
  slug: string;
  title: string;
  description: string;
  image: string;
  content: string[];
};

export const exploreArticles: ExploreArticle[] = [
  {
    slug: "bakery-deli",
    title: "Bakery & Deli",
    description:
      "We serve delicious, fresh-baked goods and deli sandwiches to our community for years. We believe in using only the freshest ingredients, and all of our bread and pastries are made daily.",
    image: "/images/categories/bakery-fresh.jpg",
    content: [
      "We serve delicious, fresh-baked goods and deli sandwiches to our community for years. We believe in using only the freshest ingredients, and all of our bread and pastries are made daily.",
      "Stop by for artisan loaves, buttery pastries, and deli classics that are perfect for lunch, dinner, or a quick treat.",
    ],
  },
  {
    slug: "fruits-vegetables",
    title: "Fruits & Vegetables",
    description:
      "Providing the freshest and highest quality vegetables and fruits to our customers. Our produce is sourced from local farmers and markets, and we make sure to inspect each item to ensure it meets standards.",
    image: "/images/categories/produce.jpg",
    content: [
      "Providing the freshest and highest quality vegetables and fruits to our customers. Our produce is sourced from local farmers and markets, and we make sure to inspect each item to ensure it meets standards.",
      "From leafy greens to seasonal fruits, we keep the shelves stocked with produce you can feel good about.",
    ],
  },
  {
    slug: "meat-poultry",
    title: "Meat & Poultry",
    description:
      "Delicious as a roast with crisp crackling, irresistible as sticky finger-licking ribs dripping with mouth-watering flavour, or flash fried and served in a fragrant stir-fry, our selection is endlessly versatile.",
    image: "/images/categories/meat-poultry.jpg",
    content: [
      "Delicious as a roast with crisp crackling, irresistible as sticky finger-licking ribs dripping with mouth-watering flavour, or flash fried and served in a fragrant stir-fry, our selection is endlessly versatile.",
      "Choose from tender cuts, marinated options, and ready-to-cook favorites for every occasion.",
    ],
  },
  {
    slug: "recipes",
    title: "Recipes",
    description:
      "A recipe is a formula of ingredients and a list of instructions for creating prepared foods. It is used to control quality, quantity, and food costs in a foodservice operation.",
    image: "/images/categories/recipes.jpg",
    content: [
      "A recipe is a formula of ingredients and a list of instructions for creating prepared foods. It is used to control quality, quantity, and food costs in a foodservice operation.",
      "Explore step-by-step guides, seasonal inspiration, and quick meals made with BOKKU staples.",
    ],
  },
  {
    slug: "wine-liquor",
    title: "Wine & Liquor",
    description:
      "At BOKKU, we have made sure to stock the widest range of your favourite drinks, all at supermarket prices. From truly exclusive whiskies to the world's top wines, it has never been more accessible.",
    image: "/images/categories/beverages.jpg",
    content: [
      "At BOKKU, we have made sure to stock the widest range of your favourite drinks, all at supermarket prices. From truly exclusive whiskies to the world's top wines, it has never been more accessible.",
      "Celebrate every moment with curated bottles, mixers, and non-alcoholic options for every palate.",
    ],
  },
  {
    slug: "baby",
    title: "Baby",
    description:
      "Welcome to our Baby Hub. From pregnancy to your baby's first steps, we have all the baby tips you need to know for your child's development. We will be your guide as expecting parents through every stage.",
    image: "/images/categories/baby.jpg",
    content: [
      "Welcome to our Baby Hub. From pregnancy to your baby's first steps, we have all the baby tips you need to know for your child's development. We will be your guide as expecting parents through every stage.",
      "Shop trusted baby essentials, gentle care items, and parent-approved nutrition in one place.",
    ],
  },
];
