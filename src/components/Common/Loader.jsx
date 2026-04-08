import { CircularProgress, Box } from "@mui/material";

export default function Loader({ fullScreen = false }) {
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      height={fullScreen ? "100vh" : "200px"}
    >
      <CircularProgress />
    </Box>
  );
}   