// src/components/NavButton.jsx

import { Button } from "@mui/material";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import { alpha } from "@mui/material/styles";

export default function NavButton({
  label,
  anchor,
  setAnchor,
  theme,
  hasMenu = true,
  active = false,
  ...props
}) {
  return (
    <Button
      color="inherit"
      endIcon={hasMenu ? <ArrowDropDownIcon /> : null}
      onClick={(e) => hasMenu && setAnchor && setAnchor(e.currentTarget)}
      sx={{
        textTransform: "none",
        fontWeight: "bold",
        position: "relative",
        color: theme.palette.primary.main,
        backgroundColor:
          active || anchor
            ? alpha(theme.palette.primary.main, 0.2)
            : "transparent",
        transition: "all 0.3s",
        cursor: hasMenu ? "pointer" : "default",

        "&:hover": {
          backgroundColor: alpha(theme.palette.primary.main, 0.1),
          "&::after": {
            width: "100%",
          },
        },

        "&::after": {
          content: '""',
          position: "absolute",
          bottom: 0,
          left: 0,
          height: 3,
          width: active || anchor ? "100%" : "0%",
          backgroundColor: theme.palette.primary.main,
          borderRadius: 2,
          transition: "width 0.3s",
        },

        ...(props.sx || {}),
      }}
      {...props}
    >
      {label}
    </Button>
  );
}
