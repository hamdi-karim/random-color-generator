import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import UserHistory from "./UserHistory";
import userEvent from "@testing-library/user-event";

describe("<UserHistory />", () => {
  it("should display the passed primary color", () => {
    const primaryColor: string = "#000c8e";
    const lastPrimaryColors: string[] = ["#000c8e", "#000fff", "#fff094"];
    const setAsPrimaryColor = jest.fn();

    render(
      <UserHistory
        primaryColor={primaryColor}
        lastPrimaryColors={lastPrimaryColors}
        setAsPrimaryColor={setAsPrimaryColor}
      />
    );

    expect(screen.queryAllByText(/#000c8e/)).toHaveLength(2);
  });

  it("should check that the lastPrimaryColors exist", () => {
    const primaryColor: string = "#000c8e";
    const lastPrimaryColors: string[] = ["#000c8e", "#000fff", "#fff094"];
    const setAsPrimaryColor = jest.fn();

    render(
      <UserHistory
        primaryColor={primaryColor}
        lastPrimaryColors={lastPrimaryColors}
        setAsPrimaryColor={setAsPrimaryColor}
      />
    );

    expect(screen.queryAllByText(/#000c8e/)).toHaveLength(2);
    expect(screen.getByText(/#000fff/)).toBeInTheDocument();
    expect(screen.getByText(/#fff094/)).toBeInTheDocument();
  });

  it("should pass the correct color when user clicks on a primary color", () => {
    const primaryColor: string = "#000c8e";
    const lastPrimaryColors: string[] = ["#000c8e", "#000fff", "#fff094"];
    const setAsPrimaryColor = jest.fn();

    render(
      <UserHistory
        primaryColor={primaryColor}
        lastPrimaryColors={lastPrimaryColors}
        setAsPrimaryColor={setAsPrimaryColor}
      />
    );

    userEvent.click(screen.getByText("#fff094"));

    expect(setAsPrimaryColor.mock.calls).toHaveLength(1);
    expect(setAsPrimaryColor).toHaveBeenCalledWith("#fff094");
  });
});
