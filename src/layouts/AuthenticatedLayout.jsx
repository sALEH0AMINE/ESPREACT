import * as React from "react";
import { Outlet } from "react-router-dom";
import {
  Box,
  CssBaseline,
  AppBar,
  Toolbar,
  Typography,
  Drawer,
  IconButton,
  Divider,
  Badge,
  TextField,
  InputAdornment,
  ThemeProvider,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import MailIcon from "@mui/icons-material/Mail";
import NotificationsIcon from "@mui/icons-material/Notifications";
import Sidebar from "../components/Sidebar";
import { dark, theme } from "../themes/main";
import ThemeSwitcher from "../components/ThemeSwitcher";
import Navbar from "../components/NavBar/Navbar";


export default function AuthenticatedLayout() {
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [AppThemeMode, setAppThemeMode] = React.useState('light');


  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  return (
    <ThemeProvider theme={AppThemeMode === "light" ? theme : dark}>
      <Box  sx={{
        height:"90vh",
        backgroundColor:"#f5f5f5"
      }}>
   
      
        {/* Navbar */}
        <AppBar
          position="fixed"
          sx={{
            backgroundColor: "transparent",
            boxShadow: "none",
          }}
        >
          <Navbar/>
        </AppBar>



        {/* Main Content */}
        <Box
          component="main"
          sx={{
            p: 3,
            mt: "128px",
            backgroundColor: "#f5f5f5",
            pb: "80px",
          }}
        >
          <Outlet />

          {/* Footer */}
          <Box
            component="footer"
            position={"fixed"}
            bottom={0}
            left={0}
            right={0}
            sx={{
              mt: 4,
              py: 2,
              borderTop: "1px solid #ddd",
              textAlign: "center",
              backgroundColor: "#fff",
            }}
          >
            <Typography
    variant="body2"
    sx={(theme) => ({
      color: theme.palette.secondary.main, 
      fontWeight: "bold",
    })}
  >
    © {new Date().getFullYear()}نظام تدبير وضعيات القضاة
  </Typography>

          </Box>
        </Box>
      </Box>
    </ThemeProvider>
  );
}


