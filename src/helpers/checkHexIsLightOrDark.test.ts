import { checkIfHexIsDark } from "./checkHexIsLightOrDark";

describe("test checkIfHexIsDark method", () => {
  it("should return false when passed a white color", () => {
    expect(checkIfHexIsDark("#ffffff")).toBe(false);
  });

  it("should return true when passed a black color", () => {
    expect(checkIfHexIsDark("#000000")).toBe(true);
  });

  it("should return false (default light theme) when passed a wrong hex color format", () => {
    expect(checkIfHexIsDark("#000")).toBe(false);
    expect(checkIfHexIsDark("#000FFFFFF")).toBe(false);
  });
});
