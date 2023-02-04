import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import PaletteRow from "./PaletteRow";
import { Palette } from "../helpers/types";
import userEvent from "@testing-library/user-event";

describe("<PaletteRow />", () => {
  it("should display the correct color", () => {
    const palette: Palette = {
      color: "#ffe0f9",
      liked: false,
    };
    const primaryColor: string = "#000c8e";
    const setAsPrimaryColor = jest.fn();
    const handleLikeColor = jest.fn();

    render(
      <PaletteRow
        palette={palette}
        primaryColor={primaryColor}
        handleLikeColor={handleLikeColor}
        setAsPrimaryColor={setAsPrimaryColor}
      />
    );

    expect(screen.getByText(/#ffe0f9/)).toBeInTheDocument();
  });

  it("should display Set Primary color Button", async () => {
    const palette: Palette = {
      color: "#ffe0f9",
      liked: false,
    };
    const primaryColor: string = "#000c8e";
    const setAsPrimaryColor = jest.fn();
    const handleLikeColor = jest.fn();

    render(
      <PaletteRow
        palette={palette}
        primaryColor={primaryColor}
        handleLikeColor={handleLikeColor}
        setAsPrimaryColor={setAsPrimaryColor}
      />
    );

    await screen.findAllByText("Set As Primary Color");
  });

  it("should have a background color equal to the passed color palette", () => {
    const palette: Palette = {
      color: "#ffe0f9",
      liked: false,
    };
    const primaryColor: string = "#000c8e";
    const setAsPrimaryColor = jest.fn();
    const handleLikeColor = jest.fn();

    render(
      <PaletteRow
        palette={palette}
        primaryColor={primaryColor}
        handleLikeColor={handleLikeColor}
        setAsPrimaryColor={setAsPrimaryColor}
      />
    );

    const chip = screen.getByTestId("backgroundColor");

    expect(chip).toHaveStyle(`background-color: ${palette.color}`);
  });

  it("should call handler when user clicks like button", () => {
    const palette: Palette = {
      color: "#ffe0f9",
      liked: false,
    };
    const primaryColor: string = "#000c8e";
    const setAsPrimaryColor = jest.fn();
    const handleLikeColor = jest.fn();

    render(
      <PaletteRow
        palette={palette}
        primaryColor={primaryColor}
        handleLikeColor={handleLikeColor}
        setAsPrimaryColor={setAsPrimaryColor}
      />
    );

    const chip = screen.getByTestId("backgroundColor");
    expect(chip).toHaveTextContent("");

    const likeButton = screen.getByTestId("likeButton");
    userEvent.click(likeButton);

    expect(handleLikeColor.mock.calls).toHaveLength(1);
    expect(handleLikeColor).toHaveBeenCalledWith(palette);
  });

  it("should call setPrimaryColor function with the correct parms when user clicks button", () => {
    const palette: Palette = {
      color: "#ffe0f9",
      liked: false,
    };
    const primaryColor: string = "#000c8e";
    const setAsPrimaryColor = jest.fn();
    const handleLikeColor = jest.fn();

    render(
      <PaletteRow
        palette={palette}
        primaryColor={primaryColor}
        handleLikeColor={handleLikeColor}
        setAsPrimaryColor={setAsPrimaryColor}
      />
    );

    const setPrimaryButton = screen.getByTestId("setPrimaryButton");
    userEvent.click(setPrimaryButton);

    expect(setAsPrimaryColor.mock.calls).toHaveLength(1);
    expect(setAsPrimaryColor).toHaveBeenCalledWith(palette.color);
  });

  it("should display LIKED text inside chip when liked is true", () => {
    const palette: Palette = {
      color: "#ffe0f9",
      liked: true,
    };
    const primaryColor: string = "#000c8e";
    const setAsPrimaryColor = jest.fn();
    const handleLikeColor = jest.fn();

    render(
      <PaletteRow
        palette={palette}
        primaryColor={primaryColor}
        handleLikeColor={handleLikeColor}
        setAsPrimaryColor={setAsPrimaryColor}
      />
    );

    const chip = screen.getByTestId("backgroundColor");
    expect(chip).toHaveTextContent("LIKED");
  });
});
