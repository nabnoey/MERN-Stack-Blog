// import React, { useState } from "react";
// import { useLocation, useNavigate } from "react-router-dom";
// import { useAuth } from "../context/AuthContext";

// function Login() {
//   const navigate = useNavigate();
//   const location = useLocation();
//   const { login } = useAuth();
//   const [username, setUsername] = useState("");
//   const [password, setPassword] = useState("");
//   const [role, setRole] = useState("reader");
//   const [error, setError] = useState("");

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (!username.trim() || !password.trim()) {
//       setError("กรุณากรอกชื่อผู้ใช้และรหัสผ่าน");
//       return;
//     }
//     login({ username: username.trim(), role });
//     const redirectTo = location.state?.from || "/";
//     navigate(redirectTo, { replace: true });
//   };

//   return (
//     <div className="min-h-screen bg-gray-50 py-10 px-4">
//       <div className="max-w-md mx-auto bg-white rounded-xl shadow p-6">
//         <h1 className="text-2xl font-bold text-gray-900 mb-6">เข้าสู่ระบบ</h1>
//         <form onSubmit={handleSubmit} className="space-y-4">
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">ชื่อผู้ใช้</label>
//             <input
//               className="input input-bordered w-full"
//               value={username}
//               onChange={(e) => setUsername(e.target.value)}
//               placeholder="username"
//             />
//           </div>
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">รหัสผ่าน</label>
//             <input
//               type="password"
//               className="input input-bordered w-full"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               placeholder="••••••••"
//             />
//           </div>
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">สิทธิ์การใช้งาน</label>
//             <select className="select select-bordered w-full" value={role} onChange={(e) => setRole(e.target.value)}>
//               <option value="reader">ผู้ชม (อ่านข่าว)</option>
//               <option value="admin">ผู้ดูแล (เพิ่มข่าวได้)</option>
//             </select>
            
//           </div>
//           {error ? <p className="text-error text-sm">{error}</p> : null}
//           <div className="pt-2">
//             <button type="submit" className="btn btn-primary w-full">เข้าสู่ระบบ</button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// }

// export default Login;


import React from 'react'

function Login() {
  return (
    <div>Login</div>
  )
}

export default Login