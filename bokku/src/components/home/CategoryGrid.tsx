import { Link } from "react-router-dom";
import { products } from "../../data/products";

type CategoryInfo = {
  name: string;
  count: number;
  image: string;
};

const CategoryGrid = () => {
  const categoryImages: Record<string, string> = {
    "Bakery and fresh food": "/images/categories/bakery-fresh.jpg",
    "Groceries and pantry staple": "/images/categories/pantry.jpg",
    "Household and cleaning supplies": "/images/categories/household.jpg",
    Beverages: "/images/categories/beverages.jpg",
    Snacks: "/images/categories/snacks.jpg",
    "Health and beauty": "/images/categories/health-beauty.jpg",
  };

  const categories = products.reduce<CategoryInfo[]>((acc, product) => {
    const existing = acc.find((item) => item.name === product.category);
    if (existing) {
      existing.count += 1;
    } else {
      acc.push({
        name: product.category,
        count: 1,
        image: categoryImages[product.category] ?? "/images/categories/default.jpg",
      });
    }
    return acc;
  }, []);

  return (
    <section className="category-grid-section">
      <div className="category-grid-header">
        <h2>Browse by category</h2>
        <p>Pick a lane and see every product within that collection.</p>
      </div>
      <div className="category-grid-cards">
        {categories.map((category) => (
          <Link
            key={category.name}
            className="category-grid-card"
            to={`/products?category=${encodeURIComponent(category.name)}`}
          >
            <div className="category-grid-image">
              <img src={category.image} alt={category.name} />
            </div>
            <span className="category-title">{category.name}</span>
            <span className="category-count">{category.count} items</span>
            <span className="category-link">View products</span>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default CategoryGrid;
