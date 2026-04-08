import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import LogoutIcon from "@mui/icons-material/Logout";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import "simplebar-react/dist/simplebar.min.css";

import {
  Toolbar,
  Divider,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Collapse,
  Box,
  Avatar,
  Typography,
  Menu,
  MenuItem,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from "@mui/material";

import {
  Bed,
  Event,
  Handshake,
  MedicalInformation,
  Newspaper,
  Savings,
} from "@mui/icons-material";

import SimpleBar from "simplebar-react";
import { useAuth } from "../context/AuthContext";

export default function Sidebar() {
  const [openMenu, setOpenMenu] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);
  const [confirmOpen, setConfirmOpen] = useState(false);

  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleClick = (text) => {
    setOpenMenu((prev) => (prev === text ? null : text));
  };

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogoutClick = () => {
    setConfirmOpen(true);
  };

  const confirmLogout = async () => {
    await logout();
    navigate("/login");
    handleMenuClose();
    setConfirmOpen(false);
  };

  const cancelLogout = () => {
    setConfirmOpen(false);
  };

  const menuItems = [
    { text: "بلاغات و أخبار", icon: <Newspaper />, url: "/news" },
    {
      text: "طلبات المنح",
      icon: <Savings />,
      subUrls: [
        { text: "إضافة طلب", url: "/grants/add" },
        { text: "لائحة الطلبات", url: "/grants/list" },
      ],
    },
    {
      text: "الحجوزات",
      icon: <Bed />,
      subUrls: [
        { text: "حجوزاتي", url: "/reservations/my" },
        { text: "مراكز الاصطياف", url: "/reservations/centers" },
      ],
    },
    {
      text: "الملفات الطبية",
      icon: <MedicalInformation />,
      subUrls: [
        { text: "ملفاتي", url: "/medical/my" },
        { text: "إضافة ملف", url: "/medical/add" },
      ],
    },
    {
      text: "الأنشطة",
      icon: <Event />,
      subUrls: [
        { text: "ثقافية وترفيهية", url: "/activities/cultural" },
        { text: "رياضية", url: "/activities/sports" },
      ],
    },
    {
      text: "الشراكات",
      icon: <Handshake />,
      subUrls: [
        { text: "الأبناك", url: "/partnerships/banks" },
        { text: "الشركات", url: "/partnerships/companies" },
        { text: "الجمعيات", url: "/partnerships/ngos" },
      ],
    },
  ];

  return (
    <Box
      sx={{
        height: "100vh",
        background: "linear-gradient(180deg, #1e1e1e, #121212)",
        color: "#fff",
        borderRight: "1px solid rgba(255,255,255,0.05)",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Logout Dialog */}
      <Dialog open={confirmOpen} onClose={cancelLogout}>
        <DialogTitle>تأكيد تسجيل الخروج</DialogTitle>
        <DialogContent>هل تريد فعلاً تسجيل الخروج؟</DialogContent>
        <DialogActions>
          <Button onClick={cancelLogout}>إلغاء</Button>
          <Button onClick={confirmLogout} color="error" variant="contained">
            تسجيل الخروج
          </Button>
        </DialogActions>
      </Dialog>

      {/* User Section */}
      <Toolbar
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 2,
          background: "rgba(255,255,255,0.03)",
          borderRadius: "12px",
          m: 1,
          p: 1,
        }}
      >
        <IconButton onClick={handleMenuOpen}>
          <Avatar
            sx={{
              boxShadow: "0 0 10px rgba(0,255,150,0.4)",
            }}
          />
        </IconButton>

        <Box sx={{ flexGrow: 1 }}>
          <Typography variant="subtitle2">
            {user?.email || "Non connecté"}
          </Typography>
        </Box>
      </Toolbar>

      {/* Dropdown */}
      <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleMenuClose}>
        <MenuItem onClick={handleMenuClose}>
          <AccountCircleIcon fontSize="small" sx={{ mr: 1 }} />
          الملف الشخصي
        </MenuItem>
        <MenuItem onClick={handleLogoutClick}>
          <LogoutIcon fontSize="small" sx={{ mr: 1 }} />
          تسجيل الخروج
        </MenuItem>
      </Menu>

      <Divider sx={{ borderColor: "rgba(255,255,255,0.05)" }} />

      {/* Menu */}
      <SimpleBar style={{ maxHeight: "90vh", flex: 1 }}>
        <List>
          {menuItems.map((item, index) => (
            <Box key={index}>
              {/* Parent */}
              <ListItemButton
                component={!item.subUrls ? NavLink : "div"}
                to={!item.subUrls ? item.url : undefined}
                onClick={() => item.subUrls && handleClick(item.text)}
                className={({ isActive }) => (isActive ? "active" : "")}
                sx={{
                  mb: 0.5,
                  mx: 1,
                  borderRadius: "10px",
                  color: "#ccc",
                  transition: "all 0.2s ease",

                  "&:hover": {
                    background: "rgba(255,255,255,0.05)",
                    color: "#fff",
                  },

                  "&.active": {
                    background: "rgba(0,255,150,0.12)",
                    color: "#00ff99",
                    boxShadow: "inset 4px 0 0 #00ff99",
                  },
                }}
              >
                <ListItemIcon sx={{ minWidth: 40, color: "inherit" }}>
                  {item.icon}
                </ListItemIcon>

                <ListItemText primary={item.text} />

                {item.subUrls &&
                  (openMenu === item.text ? <ExpandLess /> : <ExpandMore />)}
              </ListItemButton>

              {/* Submenu */}
              {item.subUrls && (
                <Collapse in={openMenu === item.text} timeout="auto" unmountOnExit>
                  <List>
                    {item.subUrls.map((sub, subIndex) => (
                      <ListItemButton
                        key={subIndex}
                        component={NavLink}
                        to={sub.url}
                        className={({ isActive }) =>
                          isActive ? "active" : ""
                        }
                        sx={{
                          mb: 0.5,
                          mx: 2,
                          borderRadius: "8px",
                          fontSize: "0.9rem",
                          color: "#aaa",

                          "&:hover": {
                            background: "rgba(255,255,255,0.05)",
                            color: "#fff",
                          },

                          "&.active": {
                            background: "rgba(0,255,150,0.08)",
                            color: "#00ff99",
                          },
                        }}
                      >
                        <ListItemText sx={{ pl: 2 }} primary={sub.text} />
                      </ListItemButton>
                    ))}
                  </List>
                </Collapse>
              )}
            </Box>
          ))}
        </List>
      </SimpleBar>
    </Box>
  );
}