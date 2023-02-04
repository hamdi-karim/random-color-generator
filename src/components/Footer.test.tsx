import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Footer from "./Footer";

describe("<Footer />", () => {
  it("shows light mode when passed white color", () => {
    render(<Footer primaryColor="#ffffff" />);

    expect(screen.getByText(/Light Mode/)).toBeInTheDocument();
  });

  it("shows dark mode when passed dark color", () => {
    render(<Footer primaryColor="#000000" />);

    expect(screen.getByText(/Dark Mode/)).toBeInTheDocument();
  });

  it("should fail if the hex code is invalid", () => {
    render(<Footer primaryColor="#000" />);

    expect(screen.queryByText(/Dark Mode/)).toBeFalsy();
  });
});
