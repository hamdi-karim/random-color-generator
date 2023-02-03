import { ButtonGroup, Button, Typography, Grid } from "@mui/material";

type UserHistoryProps = {
  primaryColor: string;
  lastPrimaryColors: string[];
  setAsPrimaryColor: (color: string) => void;
};

const UserHistory: React.FC<UserHistoryProps> = ({
  primaryColor,
  lastPrimaryColors,
  setAsPrimaryColor,
}) => {
  return (
    <>
      <Grid item xs={12} md={8}>
        <Typography gutterBottom variant="h6" component="span">
          {primaryColor && "User History :"}
        </Typography>
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
    </>
  );
};

export default UserHistory;
