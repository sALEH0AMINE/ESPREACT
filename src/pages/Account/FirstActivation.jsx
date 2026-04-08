import {
  Box,
  Button,
  TextField,
  Typography,
  Card,
  CardContent,
} from '@mui/material';


function FirstActivation() {
  return (
    <Box
      maxWidth={500}
      mx="auto"
      display="flex"
      justifyContent="center"
      alignItems="center"
      flexDirection="column"
      minHeight="100vh"
      gap={2}
    >
    

      <Card sx={{ width: '100%', boxShadow: 3, borderRadius: 2 }}>
        <CardContent>
          <Typography variant="h5" mb={2} align="center">
            تفعيل الحساب لأول مرة
          </Typography>

          <TextField
            label="رقم البطاقة الوطنية"
            fullWidth
            margin="normal"
            dir="rtl"
          />

          <TextField
            label="رقم التأجير"
            fullWidth
            margin="normal"
            dir="rtl"
          />

          <TextField
            label="تاريخ الازدياد"
            type="date"
            fullWidth
            margin="normal"
            InputLabelProps={{ shrink: true }}
            dir="rtl"
          />

          <TextField
            label="رقم الهاتف"
            fullWidth
            margin="normal"
            dir="rtl"
          />

          <Button variant="contained" fullWidth sx={{ mt: 2 }}>
            تأكيد
          </Button>
        </CardContent>
      </Card>
    </Box>
  );
}

export default FirstActivation;
