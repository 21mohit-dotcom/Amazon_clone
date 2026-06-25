import "./CategoryBar.css";

const categories = [
  { name: "All", icon: "🏪" },
  { name: "Electronics", icon: "📱" },
  { name: "Fashion", icon: "👕" },
  { name: "Footwear", icon: "👟" },
  { name: "Accessories", icon: "🎒" },
  { name: "Sports", icon: "⚽" },
  { name: "Home", icon: "🏠" }
];

function CategoryBar({ activeCategory, setActiveCategory }) {
  return (
    <div className="category-bar">
      {categories.map((cat) => (
        <button
          key={cat.name}
          className={`category-pill ${activeCategory === cat.name ? "active" : ""}`}
          onClick={() => setActiveCategory(cat.name)}
        >
          <span className="category-pill-icon">{cat.icon}</span>
          <span className="category-pill-text">{cat.name}</span>
        </button>
      ))}
    </div>
  );
}

export default CategoryBar;
