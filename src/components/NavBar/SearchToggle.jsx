import React, { useState } from "react";
import { TextField, InputAdornment, IconButton, alpha } from "@mui/material";
import { Search as SearchIcon, Close as CloseIcon } from "@mui/icons-material";

export default function SearchToggle({ theme, value, onChange }) {
  const [active, setActive] = useState(false);

  return (
    <TextField
      size="small"
      placeholder="ابحث هنا..."
      value={value}
      onChange={onChange}
      onBlur={() => setActive(false)}
      onFocus={() => setActive(true)}
      sx={{
        minWidth: active ? 280 : 40,
        transition: "all 0.3s",
        "& .MuiInputBase-root": {
          paddingLeft: active ? "8px" : "0px",
        },
      }}
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <IconButton
              onClick={() => setActive((prev) => !prev)}
              sx={{
                padding: 0,
                color: theme.palette.primary.main,
              }}
            >
              {active ? <CloseIcon /> : <SearchIcon />}
            </IconButton>
          </InputAdornment>
        ),
        sx: {
          cursor: active ? "text" : "pointer",
        },
      }}
    />
  );
}
