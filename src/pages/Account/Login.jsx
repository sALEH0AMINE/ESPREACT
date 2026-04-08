import {
  Box,
  Button,
  TextField,
  Typography,
  Card,
  CardContent,
  Link,
  CircularProgress,
} from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "../../context/AuthContext";

function Login() {
  const { login, loading, error } = useAuth(); // depuis AuthContext
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    await login(email, password);
    // La redirection vers "/" est déjà gérée dans AuthContext après LOGIN_SUCCESS
  };

  return (
    <Box
      maxWidth={400}
      mx="auto"
      display="flex"
      justifyContent="center"
      alignItems="center"
      flexDirection="column"
      minHeight="100vh"
      gap={2}
    >


   

      {/* Login Card */}
      <Card sx={{ width: "100%", boxShadow: 3, borderRadius: 2 }}>
        <CardContent>
          <Typography variant="h5" mb={2} align="center">
            تسجيل الدخول
          </Typography>

          <form onSubmit={handleSubmit}>
            <TextField
              label="البريد الإلكتروني"
              fullWidth
              margin="normal"
              dir="rtl"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <TextField
              label="كلمة المرور"
              type="password"
              fullWidth
              margin="normal"
              dir="rtl"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            {error && (
              <Typography color="error" variant="body2" mt={1} align="center">
                {error}
              </Typography>
            )}

            <Button
              type="submit"
              variant="contained"
              fullWidth
              sx={{ mt: 2 }}
              disabled={loading}
            >
              {loading ? <CircularProgress size={24} /> : "دخول"}
            </Button>
          </form>

          {/* Links below button */}
          <Box
            mt={2}
            display="flex"
            flexDirection="column"
            alignItems="center"
            gap={1}
          >
            <Link
              component={RouterLink}
              to="/forgot-password"
              underline="hover"
              dir="rtl"
            >
              نسيت كلمة المرور؟
            </Link>

            <Link
              component={RouterLink}
              to="/first-activation"
              underline="hover"
              dir="rtl"
            >
              تفعيل الحساب لأول مرة
            </Link>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
}

export default Login;
