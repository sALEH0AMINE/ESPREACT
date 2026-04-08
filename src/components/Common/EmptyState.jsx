import { Box, Typography } from "@mui/material";

export default function EmptyState({ message = "لا توجد بيانات" }) {
  return (
    <Box
      textAlign="center"
      py={4}
      sx={{ opacity: 0.7 }}
    >
      <Typography variant="h6">{message}</Typography>
    </Box>
  );
}