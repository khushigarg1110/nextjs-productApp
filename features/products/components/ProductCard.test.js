import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import ProductCard from "./ProductCard";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import cartReducer, { addToCart } from "../../cart/cartSlice";

describe("ProductCard Component", () => {

  const product = {
    id: 1,
    title: "Test Product",
    price: 500,
  };

  const renderWithStore = () => {
    const store = configureStore({
      reducer: {
        cart: cartReducer,
      },
    });

    render(
      <Provider store={store}>
        <ProductCard product={product} />
      </Provider>
    );

    return store;
  };

  // Render product info
  test("should render product details correctly", () => {
    renderWithStore();

    expect(screen.getByText("Test Product")).toBeInTheDocument();
    expect(screen.getByText("₹500")).toBeInTheDocument();
  });

  // Button exists
  test("should render Add to Cart button", () => {
    renderWithStore();

    expect(
      screen.getByRole("button", { name: /add .* to cart/i })
    ).toBeInTheDocument();
  });

  // Click adds item to cart (REAL behavior)
  test("should add product to cart when button is clicked", async () => {
    const store = renderWithStore();

    const button = screen.getByRole("button", {
      name: /add .* to cart/i,
    });

    await userEvent.click(button);

    const state = store.getState();

    expect(state.cart.items.length).toBe(1);
    expect(state.cart.items[0].title).toBe("Test Product");
  });

});