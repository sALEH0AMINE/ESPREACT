import {
  Box,
  Button,
  TextField,
  Typography,
  Card,
  CardContent,
} from '@mui/material';


function ForgotPassword() {
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
            استرجاع كلمة المرور
          </Typography>

          <Typography variant="body2" mb={3} align="center">
            المرجو إدخال رقم البطاقة الوطنية أو رقم الهاتف لاسترجاع كلمة المرور.
          </Typography>

          <TextField
            label="رقم البطاقة الوطنية أو رقم الهاتف"
            fullWidth
            margin="normal"
            dir="rtl"
          />

          <Button variant="contained" fullWidth sx={{ mt: 2 }}>
            إرسال رابط الاسترجاع
          </Button>
        </CardContent>
      </Card>
    </Box>
  );
}

export default ForgotPassword;
