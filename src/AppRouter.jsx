import { Routes, Route, Navigate } from "react-router-dom";
import GuestLayout from "./layouts/GuestLayout";
import AuthenticatedLayout from "./layouts/AuthenticatedLayout";
import { Login, FirstActivation, ForgotPassword } from "./pages/Account";
import FonctionnairePage from "./pages/FonctionnairePage";
import { useAuth } from "./context/AuthContext";
import { BYPASS_AUTH_LOCAL } from "./config/devLocal";
import DiplomePage from "@/pages/DiplomePage";


function ProtectedRoute({ children }) {
  const { isAuthenticated } = useAuth();
  return BYPASS_AUTH_LOCAL || isAuthenticated ? children : <Navigate to="/login" replace />;
}

function GuestRoute({ children }) {
  const { isAuthenticated } = useAuth();
  return !isAuthenticated ? children : <Navigate to="/" replace />;
}

function AppRouter() {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <AuthenticatedLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<FonctionnairePage />} />
        <Route path="diplomes" element={<DiplomePage />} />
      </Route>

      <Route
        path="/"
        element={
          <GuestRoute>
            <GuestLayout />
          </GuestRoute>
        }
      >
        <Route path="login" element={<Login />} />
        <Route path="first-activation" element={<FirstActivation />} />
        <Route path="forgot-password" element={<ForgotPassword />} />
      </Route>

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default AppRouter;
