import { Box, List, ListItemButton, ListItemText } from "@mui/material";
import { navData } from "./navData";
import { useEffect, useState } from "react";

export default function SideCard({ setActiveSection, activeSection }) {
  const [active, setActive] = useState("infoPerso");

  useEffect(() => {
    if (activeSection) {
      setActive(activeSection);
    }
  }, [activeSection]);

  const handleClick = (key) => {
    setActive(key);
    setActiveSection(key);
  };

  return (
    <Box
      sx={{
        width: 280,
        height: "100vh",
        borderRight: "1px solid #eee",
        backgroundColor: "#f9fafb",
        p: 2,
      }}
    >
      <List>
        {navData.map((item) => (
          <ListItemButton
            key={item.key}
            onClick={() => handleClick(item.key)}
            selected={active === item.key}
            sx={{
              borderRadius: 2,
              mb: 1,
              textAlign: "right",
              direction: "rtl",

              "&.Mui-selected": {
                backgroundColor: "#c8e6c9",
                color: "#1b5e20",
              },
              "&.Mui-selected:hover": {
                backgroundColor: "#b7dfb9",
              },
            }}
          >
            <ListItemText primary={item.label} />
          </ListItemButton>
        ))}
      </List>
    </Box>
  );
}