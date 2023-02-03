import { useEffect, useState, useMemo } from "react";
import { Box, CssBaseline, Button, ThemeProvider, Grid } from "@mui/material";

import { createTheme } from "@mui/material/styles";
import { checkIfHexIsDark } from "./helpers/checkHexIsLightOrDark";
import PaletteRow from "./components/PaletteRow";
import { Palette } from "./helpers/types";
import Footer from "./components/Footer";
import UserHistory from "./components/UserHistory";

function App() {
  const [palettes, setPalettes] = useState<Palette[]>([]);
  const [primaryColor, setPrimaryColor] = useState<string>("");
  const [lastPrimaryColors, setLastPrimaryColors] = useState<string[]>([]);

  // memoise creation of the Theme to optimize re-renders with the primaryColor dependency
  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          primary: {
            main: primaryColor ? primaryColor : "#000",
          },
          mode:
            primaryColor && checkIfHexIsDark(primaryColor) ? "dark" : "light",
        },
      }),
    [primaryColor]
  );

  // generate new hexadecimal color only if the color has not been liked by the user
  const generateColorPalette = () => {
    const newPalettes = palettes.map((p) =>
      p.liked
        ? p
        : {
            color: "#" + Math.random().toString(16).slice(-6),
            liked: false,
          }
    );

    setPalettes(newPalettes);
  };

  const handleLikeColor = (palette: Palette) => {
    setPalettes(
      palettes.map((p) =>
        p.color !== palette.color
          ? p
          : {
              color: palette.color,
              liked: !palette.liked,
            }
      )
    );
  };

  useEffect(() => {
    const newPalettes = Array(8)
      .fill(0)
      .map(() => ({
        color: "#" + Math.random().toString(16).slice(-6),
        liked: false,
      }));
    setPalettes(newPalettes);
  }, []);

  const setAsPrimaryColor = (color: string) => {
    if (color !== primaryColor) {
      setPrimaryColor(color);
    }

    // set only last 5 primary colors that the user had chosen
    if (!lastPrimaryColors.includes(color)) {
      setLastPrimaryColors([color, ...lastPrimaryColors.slice(0, 4)]);
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline enableColorScheme />
      <Grid container spacing={2} rowSpacing={4}>
        <Grid
          item
          xs={12}
          md={12}
          style={{
            display: "flex",
            justifyContent: "center",
            flexDirection: "column",
          }}
        >
          {palettes.map((palette) => (
            <PaletteRow
              key={palette.color}
              palette={palette}
              primaryColor={primaryColor}
              setAsPrimaryColor={setAsPrimaryColor}
              handleLikeColor={handleLikeColor}
            />
          ))}
        </Grid>

        {/* Generate Random Color Button */}
        <Grid item xs={12} md={12}>
          <Box display="flex" justifyContent="center" alignItems="center">
            <Button variant="text" onClick={generateColorPalette}>
              Generate Color Palette
            </Button>
          </Box>
        </Grid>

        <UserHistory
          primaryColor={primaryColor}
          lastPrimaryColors={lastPrimaryColors}
          setAsPrimaryColor={setAsPrimaryColor}
        />
      </Grid>

      <Footer primaryColor={primaryColor} />
    </ThemeProvider>
  );
}

export default App;
