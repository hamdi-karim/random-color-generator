import { useEffect, useState, useMemo } from "react";
import {
  Box,
  CssBaseline,
  ButtonGroup,
  Button,
  Typography,
  ThemeProvider,
  Chip,
  Grid,
  IconButton,
  Tooltip,
  Paper,
} from "@mui/material";

import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";

import { createTheme } from "@mui/material/styles";
import { checkIfHexIsDark } from "./helpers/checkHexIsLightOrDark";
interface Palette {
  color: string;
  liked: boolean;
}

function App() {
  const [palettes, setPalettes] = useState<Palette[]>([]);
  const [primaryColor, setPrimaryColor] = useState<string>("");
  const [lastPrimaryColors, setLastPrimaryColors] = useState<string[]>([]);

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

  const generateColorPalette = () => {
    const newPalette = palettes.map((p) =>
      p.liked
        ? p
        : {
            color: "#" + Math.random().toString(16).slice(-6),
            liked: false,
          }
    );

    setPalettes(newPalette);
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
            <Box
              sx={{
                width: "90%",
                height: 40,
                color: "primary.dark",
                margin: "0.7rem",
                display: "flex",
                justifyContent: "space-between",
              }}
              key={palette.color}
            >
              <Tooltip title="Like">
                <IconButton
                  aria-label="like"
                  onClick={() => handleLikeColor(palette)}
                >
                  <FavoriteBorderIcon
                    sx={{
                      color: `${
                        palette.liked
                          ? "red"
                          : checkIfHexIsDark(primaryColor)
                          ? "white"
                          : "black"
                      }`,
                    }}
                  />
                </IconButton>
              </Tooltip>
              <span>{palette.color}</span>
              <Chip
                label={`${palette.liked ? "LIKED" : ""}`}
                style={{
                  backgroundColor: palette.color,
                  width: "30%",
                  color: checkIfHexIsDark(primaryColor) ? "white" : "dark",
                }}
              />
              <Button
                variant="outlined"
                onClick={() => setAsPrimaryColor(palette.color)}
              >
                Set As Primary Color
              </Button>
            </Box>
          ))}
        </Grid>
        <Grid item xs={12} md={12}>
          <Box display="flex" justifyContent="center" alignItems="center">
            <Button variant="text" onClick={generateColorPalette}>
              Generate Color Palette
            </Button>
          </Box>
        </Grid>
        <Grid item xs={12} md={8}>
          User History :{" "}
          <ButtonGroup variant="text" aria-label="text button group">
            {lastPrimaryColors.map((color) => (
              <Button
                key={color}
                style={{ color }}
                onClick={() => setAsPrimaryColor(color)}
              >
                {color}
              </Button>
            ))}
          </ButtonGroup>
        </Grid>
        <Grid item xs={12} md={4}>
          <Typography
            gutterBottom
            variant="h6"
            component="div"
            sx={{ textAlign: "center" }}
          >
            {primaryColor && "Primary Color :"} {primaryColor}
          </Typography>
        </Grid>
      </Grid>
      <Paper
        sx={{
          position: "fixed",
          bottom: 0,
          left: 0,
          right: 0,
          textAlign: "center",
        }}
        elevation={3}
        component="footer"
      >
        <Typography gutterBottom variant="h6" component="div">
          {checkIfHexIsDark(primaryColor) ? "Dark" : "Light"} Mode
        </Typography>
      </Paper>
    </ThemeProvider>
  );
}

export default App;
