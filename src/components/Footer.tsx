import { Typography, Paper } from "@mui/material";
import { checkIfHexIsDark } from "../helpers/checkHexIsLightOrDark";

type FooterProps = {
  primaryColor: string;
};

const Footer: React.FC<FooterProps> = ({ primaryColor }) => {
  return (
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
  );
};

export default Footer;
