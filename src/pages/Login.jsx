import { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AuthenticationService from "../services/authentication.service";
import Swal from "sweetalert2";
import { UserContext } from "../context/UserContext.jsx";

const Login = () => {
  const [user, setUser] = useState({
    username: "",
    password: "",
  });

  const { logIn, userInfo } = useContext(UserContext);
  const navigate = useNavigate();
  useEffect(() => {
    if (userInfo) {
      navigate("/");
    }
  }, [userInfo, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((user) => ({
      ...user,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    if (!user.username || !user.password) {
      Swal.fire({
        title: "Error",
        text: "กรุณากรอก username และ password ให้ครบ",
        icon: "error",
      });
      return;
    }

    try {
      const response = await AuthenticationService.login(
        user.username,
        user.password
      );

      Swal.fire({
        title: "Success",
        text: "สมัครสำเร็จ",
        icon: "success",
      }).then(() => {
        logIn({
          id: response.data.id,
          username: response.data.username,
          accessToken: response.data.accessToken,
        });
        navigate("/");
      });
    } catch (error) {
      Swal.fire({
        title: "Login ไม่สำเร็จ",
        text: error.response?.data?.message || "เกิดข้อผิดพลาด",
        icon: "error",
      });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-indigo-500 to-purple-500">
      <div className="card w-full max-w-sm bg-base-100 shadow-xl">
        <div className="card-body gap-4">
          <h2 className="text-2xl font-bold text-center">Login</h2>

          {/* Username */}
          <div className="form-control">
            <label className="label">
              <span className="label-text">Username</span>
            </label>
            <input
              type="text"
              name="username"
              value={user.username}
              onChange={handleChange}
              className="input input-bordered"
              placeholder="username"
            />
          </div>

          {/* Password */}
          <div className="form-control">
            <label className="label">
              <span className="label-text">Password</span>
            </label>
            <input
              type="password"
              name="password"
              value={user.password}
              onChange={handleChange}
              className="input input-bordered"
              placeholder="••••••••"
            />
          </div>

          <div className="form-control mt-5">
            <div className="flex justify-end">
              <button className="btn btn-primary" onClick={handleSubmit}>
                Login
              </button>
            </div>
          </div>

          {/* Register link */}
          <p className="text-center text-sm opacity-70">
            ยังไม่มีบัญชี?{" "}
            <span
              className="link link-primary cursor-pointer"
              onClick={() => navigate("/register")}
            >
              สมัครสมาชิก
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
