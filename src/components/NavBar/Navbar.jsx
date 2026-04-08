import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  Menu,
  MenuItem,
  IconButton,
  Avatar,
} from "@mui/material";
import { KeyboardArrowDown } from "@mui/icons-material";
import { Link } from "react-router-dom";
import { menuStructure } from "./menuData";

export default function Navbar() {
  const [anchors, setAnchors] = useState({});
  const [activeParent, setActiveParent] = useState("home");
  const [activeChild, setActiveChild] = useState(null);

  const openMenu = (key, event) => {
    setAnchors((prev) => ({ ...prev, [key]: event.currentTarget }));
  };

  const closeMenu = (key) => {
    setAnchors((prev) => ({ ...prev, [key]: null }));
  };

  return (
    <AppBar
      position="sticky"
      elevation={0}
      sx={{
        bgcolor: "#ffffff",
        color: "#1f2937",
        borderBottom: "1px solid #e5e7eb",
      }}
    >
      <Toolbar sx={{ minHeight: 52, px: 2, gap: 1 }}>
        <Typography sx={{ fontWeight: 700, ml: 2, whiteSpace: "nowrap" }}>
          فضاء الموظف
        </Typography>

        <Box sx={{ display: "flex", alignItems: "stretch", gap: 0.5, flexGrow: 1, overflowX: "auto" }}>
          {menuStructure.map((parent) => (
            <Box key={parent.key}>
              <Box
                component={!parent.children?.length && parent.to ? Link : "div"}
                to={!parent.children?.length ? parent.to : undefined}
                onClick={(e) => {
                  setActiveParent(parent.key);
                  if (parent.children?.length) openMenu(parent.key, e);
                }}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 0.25,
                  px: 1.3,
                  py: 1.2,
                  fontSize: 18,
                  fontWeight: 500,
                  borderRadius: 0.5,
                  cursor: "pointer",
                  bgcolor: activeParent === parent.key ? "#f4ddb3" : "transparent",
                  color: "#111827",
                  whiteSpace: "nowrap",
                  "&:hover": { bgcolor: "#f8e7c7" },
                }}
              >
                <span>{parent.label}</span>
                {parent.children?.length ? <KeyboardArrowDown fontSize="small" /> : null}
              </Box>

              <Menu
                anchorEl={anchors[parent.key] || null}
                open={Boolean(anchors[parent.key])}
                onClose={() => closeMenu(parent.key)}
                anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                transformOrigin={{ vertical: "top", horizontal: "right" }}
              >
                {(parent.children || []).map((child) => (
                  <MenuItem
                    key={`${parent.key}-${child.label}`}
                    component={child.to ? Link : "div"}
                    to={child.to}
                    onClick={() => {
                      setActiveParent(parent.key);
                      setActiveChild(child.label);
                      closeMenu(parent.key);
                    }}
                    sx={{
                      minWidth: 230,
                      bgcolor: activeChild === child.label ? "#f9f0df" : "transparent",
                    }}
                  >
                    {child.label}
                  </MenuItem>
                ))}
              </Menu>
            </Box>
          ))}
        </Box>

        <Box sx={{ display: "flex", alignItems: "center", gap: 1, whiteSpace: "nowrap" }}>
          <Typography sx={{ fontSize: 16, color: "#111827" }}>توفيق الغزاوي</Typography>
          <IconButton size="small">
            <Avatar sx={{ width: 28, height: 28 }} />
          </IconButton>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
