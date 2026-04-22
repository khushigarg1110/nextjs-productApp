
import { useDispatch } from "react-redux";
import { addToCart } from "@/features/cart/cartSlice";
import "./ProductCard.css";
import { toast } from "react-toastify";

function ProductCard({ product }) {
  const dispatch = useDispatch();


  const handleAddToCart= () => {dispatch(addToCart(product));
  toast.success("Item successfully added to cart!");};

  return (
    <div className="product-card">
      <h2 className="product-title">{product.title}</h2>
      <img src={product.image} alt={product.title} loading="lazy" className = "product-image"/>

      <p className="product-price">₹{product.price}</p>

      <button
        className="add-btn"
        onClick={handleAddToCart}
        aria-label={`Add ${product.title} to cart`}
      >
        Add to Cart
      </button>
    </div>
  );
}

export default ProductCard;