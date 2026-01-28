const categoryImages: Record<string, string> = {
  "Bakery and fresh food": "/categoryimages/breadcategory.jpg",
  "Groceries and pantry staple": "/categoryimages/groceries.jpg",
  "Household and cleaning supplies": "/categoryimages/clean.jpg",
  Beverages: "/categoryimages/Drinks.jpg",
  Snacks: "/categoryimages/snack.jpg",
  "Health and beauty": "/categoryimages/beauty.jpg",
};

const categoryImageList = Object.values(categoryImages);

const getCategoryImage = (category?: string) =>
  (category && categoryImages[category]) || "/images/categories/default.jpg";

export { categoryImages, categoryImageList, getCategoryImage };
