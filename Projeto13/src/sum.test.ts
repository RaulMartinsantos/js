import { test, expect, describe, it, beforeAll, afterAll } from "@jest/globals";
import { sum } from "./sum";

describe("function sum", () => {
  let sumResult: Number;

  beforeAll(() => {
    sumResult = 4;
    console.log("Antes", sumResult);
  });

  afterAll(() => {
    sumResult = 0;
    console.log("Depois", sumResult);
  });

  it("should do sum of 1 + 3 must be 4", () => {
    const result = sum(1, 3);

    expect(result).toBe(sumResult);
  });

  test("sum of 2 + 2 must be 4", () => {
    const result = sum(2, 2);
    expect(result).toBe(4);
  });
});

describe("sum 2", () => {
  test("sum of 3 + 9 must be 12", () => {
    const result = sum(3, 9);
    expect(result).toBe(12);
  });
});
