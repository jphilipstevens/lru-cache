import { add } from "../";

test("it should add two numbers", () => {
  const result = add(1, 1);

  expect(result).toBe(2);
});

test("it should add two negative numbers", () => {
  const result = add(1, -1);

  expect(result).toBe(0);
});
