import { exploreArticles } from "./exploreArticles";
import { locations } from "./locations";
import { products } from "./products";

export type SearchItem = {
  label: string;
  path: string;
  type: string;
  keywords: string;
  content: string;
};

// Extend these sources as new data modules or pages are added.
const basePages: SearchItem[] = [
  {
    label: "Home",
    path: "/",
    type: "Page",
    keywords: "home landing main bokku",
    content: "Welcome to the Bokku home page. This is the main landing area.",
  },
  {
    label: "All Products",
    path: "/products",
    type: "Page",
    keywords: "all products catalog list items inventory",
    content: "This is the All Products page where every item will be listed.",
  },
  {
    label: "Career",
    path: "/career",
    type: "Page",
    keywords: "career jobs roles hiring growth",
    content: "This is the Career page showing open roles and growth paths.",
  },
  {
    label: "Work With Us",
    path: "/work-with-us",
    type: "Page",
    keywords: "partners work with us collaboration suppliers landlords",
    content: "This is the Work With Us page. Choose a partner path below.",
  },
  {
    label: "Supplier",
    path: "/work-with-us/supplier",
    type: "Partner",
    keywords: "supplier vendor inventory supply manufacturing",
    content: "This is the Supplier page for vendors who want to work with Bokku.",
  },
  {
    label: "Landlord Agencies",
    path: "/work-with-us/landlord-agencies",
    type: "Partner",
    keywords: "landlord agencies property partnerships real estate",
    content: "This is the Landlord Agencies page for property partnerships.",
  },
  {
    label: "Locations",
    path: "/locations",
    type: "Page",
    keywords: "locations areas cities coverage stores",
    content: "This is the Locations page listing our operating areas.",
  },
  {
    label: "About Us",
    path: "/about",
    type: "Page",
    keywords: "about story company bokku",
    content: "This is the About Us page telling the Bokku story.",
  },
  {
    label: "FAQ",
    path: "/faq",
    type: "Page",
    keywords: "faq support questions help",
    content: "Answers to the most common questions about shopping with Bokku.",
  },
];

const productItems: SearchItem[] = products.map((product) => ({
  label: product.name,
  path: `/products/${product.slug}`,
  type: "Product",
  keywords: product.category,
  content: product.description,
}));

const categoryItems: SearchItem[] = Array.from(
  new Set(products.map((product) => product.category))
).map((category) => ({
  label: category,
  path: `/products?category=${encodeURIComponent(category)}`,
  type: "Category",
  keywords: `${category} products`,
  content: `Browse all ${category} products available on Bokku.`,
}));

const exploreItems: SearchItem[] = exploreArticles.map((article) => ({
  label: article.title,
  path: `/explore/${article.slug}`,
  type: "Explore",
  keywords: `${article.title} ${article.slug}`,
  content: article.description,
}));

const locationItems: SearchItem[] = locations.map((location) => ({
  label: location.name,
  path: `/locations?query=${encodeURIComponent(location.name)}`,
  type: "Location",
  keywords: `${location.city} ${location.state} ${location.address}`,
  content: `${location.address} ${location.city} ${location.state}`,
}));

export const searchItems: SearchItem[] = [
  ...basePages,
  ...productItems,
  ...categoryItems,
  ...exploreItems,
  ...locationItems,
];
