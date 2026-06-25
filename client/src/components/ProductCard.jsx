/**
 * ProductCard Component
 *
 * Hindi:
 * Ye ek reusable card hai.
 * Har product ke liye same UI dubara likhne ki jagah
 * hum ProductCard component use karenge.
 */

function ProductCard({ product }) {

  // product object parent component se aata hai
  // Example:
  // {
  //   title: "Wireless Headphones",
  //   price: 2999,
  //   image: "...",
  //   description: "..."
  // }

  return (

    <div className="product-card">

      {/* Product Name */}
      <h2>
        {product.title}
      </h2>

      {/* Product Image */}
      <img
        src={product.image}
        alt={product.title}
      />

      {/* Product Price */}
      <p>
        <strong>
          ₹{product.price}
        </strong>
      </p>

      {/* Product Description */}
      <p>
        {product.description}
      </p>

    </div>

  );
}

export default ProductCard;