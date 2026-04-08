import {jwtDecode} from "jwt-decode";
import Swal from "sweetalert2";
import * as authService from "../services/authService";

export const scheduleTokenExpiration = (token, navigate) => {
  if (!token) return;

  try {
    const { exp } = jwtDecode(token); // exp en secondes
    const now = Date.now();
    const delay = exp * 1000 - now;

    if (delay <= 0) {
      authService.logout();
      navigate("/login");
      return;
    }

    setTimeout(() => {
      authService.logout();
      Swal.fire({
        icon: "warning",
        title: "انتهت الجلسة",
        text: "لقد انتهت صلاحية الجلسة، يرجى تسجيل الدخول مرة أخرى.",
        confirmButtonText: "تسجيل الدخول",
        confirmButtonColor: "#006766",
      }).then(() => {
        navigate("/login");
      });
    }, delay);

  } catch (err) {
    authService.logout();
    navigate("/login");
  }
};
