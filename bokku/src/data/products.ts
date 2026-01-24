export type Product = {
  slug: string;
  name: string;
  category: string;
  price: string;
  description: string;
  image: string;
  isTopSelling?: boolean;
};

export const products: Product[] = [
  {
    slug: "artisan-sourdough",
    name: "Artisan Sourdough",
    category: "Bakery and fresh food",
    price: "$6.80",
    description: "Naturally leavened bread with a crisp crust and tender crumb.",
    image: "/images/products/artisan-sourdough.jpg",
    isTopSelling: true,
  },
  {
    slug: "farmhouse-eggs",
    name: "Farmhouse Eggs",
    category: "Bakery and fresh food",
    price: "$4.20",
    description: "Free-range eggs with rich, golden yolks.",
    image: "/images/products/farmhouse-eggs.jpg",
  },
  {
    slug: "pantry-rice-bag",
    name: "Pantry Rice Bag",
    category: "Groceries and pantry staple",
    price: "$11.40",
    description: "Long-grain rice for everyday bowls and family dinners.",
    image: "/images/products/pantry-rice-bag.jpg",
    isTopSelling: true,
  },
  {
    slug: "heirloom-olive-oil",
    name: "Heirloom Olive Oil",
    category: "Groceries and pantry staple",
    price: "$14.90",
    description: "Cold-pressed extra virgin olive oil with a peppery finish.",
    image: "/images/products/heirloom-olive-oil.jpg",
  },
  {
    slug: "surface-sparkle-cleaner",
    name: "Surface Sparkle Cleaner",
    category: "Household and cleaning supplies",
    price: "$5.60",
    description: "Plant-based cleaner with a light citrus scent.",
    image: "/images/products/surface-sparkle-cleaner.jpg",
    isTopSelling: true,
  },
  {
    slug: "soft-touch-laundry",
    name: "Soft Touch Laundry",
    category: "Household and cleaning supplies",
    price: "$9.80",
    description: "Concentrated detergent with fabric care boosters.",
    image: "/images/products/soft-touch-laundry.jpg",
  },
  {
    slug: "sparkling-berry-soda",
    name: "Sparkling Berry Soda",
    category: "Beverages",
    price: "$3.40",
    description: "Lightly sweetened soda with real berry juice.",
    image: "/images/products/sparkling-berry-soda.jpg",
    isTopSelling: true,
  },
  {
    slug: "cold-brew-kit",
    name: "Cold Brew Kit",
    category: "Beverages",
    price: "$12.20",
    description: "Smooth cold brew concentrate with caramel notes.",
    image: "/images/products/cold-brew-kit.jpg",
  },
  {
    slug: "sea-salt-crackers",
    name: "Sea Salt Crackers",
    category: "Snacks",
    price: "$4.10",
    description: "Crisp crackers made with slow-baked grains.",
    image: "/images/products/sea-salt-crackers.jpg",
    isTopSelling: true,
  },
  {
    slug: "dark-chocolate-bites",
    name: "Dark Chocolate Bites",
    category: "Snacks",
    price: "$5.90",
    description: "Bite-size chocolate with a smooth, rich finish.",
    image: "/images/products/dark-chocolate-bites.jpg",
  },
  {
    slug: "glow-skin-serum",
    name: "Glow Skin Serum",
    category: "Health and beauty",
    price: "$16.70",
    description: "Hydrating serum with vitamin C and peptides.",
    image: "/images/products/glow-skin-serum.jpg",
    isTopSelling: true,
  },
  {
    slug: "herbal-body-wash",
    name: "Herbal Body Wash",
    category: "Health and beauty",
    price: "$7.50",
    description: "Gentle cleanser with calming botanical extracts.",
    image: "/images/products/herbal-body-wash.jpg",
  },
];
