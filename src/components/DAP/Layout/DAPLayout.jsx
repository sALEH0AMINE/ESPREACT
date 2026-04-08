import SideCard from "./SideCard/SideCard";
import { Box } from "@mui/material";

export default function DAPLayout({ children, setActiveSection, activeSection }) {
  return (
    <Box sx={{ display: "flex" }}>
      
      <SideCard activeSection={activeSection} setActiveSection={setActiveSection} />

      <Box sx={{ flex: 1, p: 3 }}>
        {children}
      </Box>

    </Box>
  );
}