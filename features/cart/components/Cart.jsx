"use client";
import { useSelector, useDispatch } from "react-redux";
import { removeFromCart, updateQuantity } from "@/features/cart/cartSlice";
import { useState, useEffect } from "react";
import "./Cart.css";
import { calculateTotal } from "@/utils/calculateTotal";

function Cart() {
  const items = useSelector(state => state.cart.items);
  const dispatch = useDispatch();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null; // ✅ prevent mismatch

  // const total = items.reduce(
  //   (sum, item) => sum + item.price * item.quantity,
  //   0
  // );
 

  const total = calculateTotal(items);

  return (
    <div className="cart">
      <h2 className="cart-title">🛒 Your Cart</h2>

      {items.length === 0 && <p className="empty">Cart is empty</p>}

      {items.map(item => (
        <div key={item.id} className="cart-item">
          <div className="item-info">
            <h4>{item.title}</h4>
            <p>₹{item.price}</p>
            <p>Qty: {item.quantity}</p>
          </div>

          <div className="item-actions">
            <button 
              className="btn"
              onClick={() =>
                dispatch(updateQuantity({
                  id: item.id,
                  quantity: item.quantity + 1
                }))
              }
            >
              +
            </button>

            <button
              className="btn"
              onClick={() =>
                dispatch(updateQuantity({
                  id: item.id,
                  quantity: item.quantity - 1
                }))
              }
              disabled={item.quantity === 1}
            >
              -
            </button>

            <button
              className="remove-btn"
              onClick={() =>
                dispatch(removeFromCart(item.id))
              }
            >
              Remove
            </button>
          </div>
        </div>
      ))}

      {items.length > 0 && (
        <div className="cart-footer">
          <h3>Total: ₹{total}</h3>
        </div>
      )}
    </div>
  );
}

export default Cart;