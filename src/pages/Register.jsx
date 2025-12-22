import { useEffect, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthenticationService from "../services/authentication.service";
import Swal from "sweetalert2";
import { UserContext } from "../context/UserContext";

function Register() {
  const [user, setUser] = useState({
    username: "",
    password: "",
  });

  const navigate = useNavigate();
  const { userInfo } = useContext(UserContext);
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
      const response = await AuthenticationService.register(
        user.username,
        user.password
      );

      Swal.fire({
        title: "Success",
        text: response?.data?.message,
        icon: "success",
      }).then(() => {
        navigate("/login");
      });
    } catch (error) {
      Swal.fire({
        title: "สมัครสมาชิกไม่สำเร็จ",
        text: error.response?.data?.message,
        icon: "error",
      });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-indigo-500 to-purple-500">
      <div className="card w-full max-w-sm bg-base-100 shadow-xl">
        <div className="card-body gap-4">
          <h2 className="text-2xl font-bold text-center">Register</h2>

          {/* Username */}
          <div className="form-control">
            <label className="label">
              <span className="label-text">Username</span>
            </label>
            <input
              type="text"
              name="username"
              placeholder="your username"
              className="input input-bordered"
              value={user.username}
              onChange={handleChange}
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
              placeholder="••••••••"
              className="input input-bordered"
              value={user.password}
              onChange={handleChange}
            />
          </div>

          <button
            className="btn btn-primary w-full mt-4"
            onClick={handleSubmit}
          >
            Register
          </button>
        </div>
      </div>
    </div>
  );
}

export default Register;
