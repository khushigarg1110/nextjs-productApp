import { calculateTotal } from "./calculateTotal";

describe("calculateTotal", () => {

  test("should calculate total price correctly", () => {
    const items = [
      { price: 100, quantity: 2 },
      { price: 50, quantity: 1 },
    ];

    const result = calculateTotal(items);

    expect(result).toBe(250);
  });

  test("should return 0 for empty cart", () => {
    const items = [];

    const result = calculateTotal(items);

    expect(result).toBe(0);
  });

  test("should handle single item correctly", () => {
    const items = [
      { price: 200, quantity: 3 }
    ];

    const result = calculateTotal(items);

    expect(result).toBe(600);
  });

});