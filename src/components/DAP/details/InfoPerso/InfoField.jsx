import { Grid, Typography } from "@mui/material";

export default function InfoField({ label, value }) {
  return (
    <Grid item xs={12} md={6}>
      <Typography variant="body2" color="text.secondary">
        {label}
      </Typography>
      <Typography variant="subtitle1" fontWeight="bold">
        {value || "-"}
      </Typography>
    </Grid>
  );
}