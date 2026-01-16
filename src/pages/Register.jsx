import { useEffect, useContext, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
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
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-100 to-slate-200 px-4">
      <div className="card w-full max-w-sm bg-white shadow-2xl border border-blue-100 overflow-hidden">
        <div className="bg-gradient-to-r from-green-600 to-blue-600 px-8 py-6">
          <h2 className="text-3xl font-bold text-white">สมัครสมาชิก ✨</h2>
          <p className="text-green-100 text-sm mt-1">สร้างบัญชีใหม่เพื่อเริ่มต้นใช้งาน</p>
        </div>
        <div className="card-body gap-5 p-8">
          {/* Username */}
          <div className="form-control">
            <label className="label">
              <span className="label-text font-semibold text-slate-700">Username</span>
            </label>
            <input
              type="text"
              name="username"
              placeholder="your username"
              className="input input-bordered border-slate-300 focus:outline-none focus:ring-2 focus:ring-green-500 transition-all"
              value={user.username}
              onChange={handleChange}
            />
          </div>

          {/* Password */}
          <div className="form-control">
            <label className="label">
              <span className="label-text font-semibold text-slate-700">Password</span>
            </label>
            <input
              type="password"
              name="password"
              placeholder="••••••••"
              className="input input-bordered border-slate-300 focus:outline-none focus:ring-2 focus:ring-green-500 transition-all"
              value={user.password}
              onChange={handleChange}
            />
          </div>

          <button
            className="btn btn-success w-full mt-2 text-white font-semibold hover:shadow-lg transition-all"
            onClick={handleSubmit}
          >
            สมัครสมาชิก
          </button>
          <div className="divider my-2"></div>
          
          <div className="text-center">
            <p className="text-sm text-slate-600">
              มีบัญชีแล้ว? 
              <Link to="/login" className="text-blue-600 font-semibold hover:text-blue-700 ml-1">
                เข้าสู่ระบบ
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;
