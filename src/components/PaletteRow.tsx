import {
  Box,
  Button,
  Chip,
  IconButton,
  Tooltip,
  Typography,
} from "@mui/material";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { checkIfHexIsDark } from "../helpers/checkHexIsLightOrDark";
import { Palette } from "../helpers/types";

type PaletteRowProps = {
  palette: Palette;
  primaryColor: string;
  setAsPrimaryColor: (color: string) => void;
  handleLikeColor: (palette: Palette) => void;
};

const PaletteRow: React.FC<PaletteRowProps> = ({
  palette,
  primaryColor,
  setAsPrimaryColor,
  handleLikeColor,
}) => {
  return (
    <Box
      sx={{
        width: "90%",
        height: 40,
        color: "primary.dark",
        margin: "0.7rem",
        display: "flex",
        justifyContent: "space-between",
      }}
      data-cy="colorPaletteRow"
    >
      <Tooltip title="Like">
        <IconButton
          aria-label="like"
          onClick={() => handleLikeColor(palette)}
          data-testid="likeButton"
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
      <Typography gutterBottom variant="h6" component="span">
        {palette.color}
      </Typography>
      <Chip
        label={`${palette.liked ? "LIKED" : ""}`}
        style={{
          backgroundColor: palette.color,
          width: "30%",
          color: checkIfHexIsDark(primaryColor) ? "white" : "dark",
        }}
        data-testid="backgroundColor"
      />
      <Button
        variant="outlined"
        onClick={() => setAsPrimaryColor(palette.color)}
        data-testid="setPrimaryButton"
      >
        Set As Primary Color
      </Button>
    </Box>
  );
};

export default PaletteRow;
