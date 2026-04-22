import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Cart from "./Cart";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "@/features/cart/cartSlice";

// helper to create mock store
const createMockStore = (items) =>
  configureStore({
    reducer: {
      cart: () => ({
        items,
      }),
    },
  });

describe("Cart Component(UI- mock data)", () => {

  //Empty cart test
  test("should show empty cart message", () => {
    const store = createMockStore([]);

    render(
      <Provider store={store}>
        <Cart />
      </Provider>
    );

    expect(screen.getByText(/cart is empty/i)).toBeInTheDocument();
  });

  //Render items
  test("should render cart items correctly", () => {
    const items = [
      { id: 1, title: "Product A", price: 100, quantity: 2 },
    ];

    const store = createMockStore(items);

    render(
      <Provider store={store}>
        <Cart />
      </Provider>
    );

    expect(screen.getByText("Product A")).toBeInTheDocument();
    expect(screen.getByText("₹100")).toBeInTheDocument();
    expect(screen.getByText(/Qty: 2/i)).toBeInTheDocument();
  });

  //Total price display
  test("should display total price correctly", () => {
    const items = [
      { id: 1, title: "Product A", price: 100, quantity: 2 },
    ];

    const store = createMockStore(items);

    render(
      <Provider store={store}>
        <Cart />
      </Provider>
    );

    expect(screen.getByText(/Total: ₹200/i)).toBeInTheDocument();
  });

  //Buttons exist
  test("should render action buttons", () => {
    const items = [
      { id: 1, title: "Product A", price: 100, quantity: 2 },
    ];

    const store = createMockStore(items);

    render(
      <Provider store={store}>
        <Cart />
      </Provider>
    );

    expect(screen.getByText("+")).toBeInTheDocument();
    expect(screen.getByText("-")).toBeInTheDocument();
    expect(screen.getByText(/remove/i)).toBeInTheDocument();
  });
});




describe("Cart component behavior(real data)",() =>{
    //Click test
  test("should increase quantity when + is clicked", async () => {
    const store = configureStore({
        reducer: {
        cart: cartReducer,
        },
    });

    // add initial item
    store.dispatch({
        type: "cart/addToCart",
        payload: {
        id: 1,
        title: "Product A",
        price: 100,
        quantity: 1,
        },
    });

    render(
        <Provider store={store}>
        <Cart />
        </Provider>
    );

    // check initial quantity
    expect(screen.getByText(/Qty: 1/i)).toBeInTheDocument();

    // click +
    const plusButton = screen.getByText("+");
    await userEvent.click(plusButton);

    // check updated quantity
    expect(screen.getByText(/Qty: 2/i)).toBeInTheDocument();
    });

  });
  



