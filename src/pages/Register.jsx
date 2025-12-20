import React from "react";

function Register() {
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
              placeholder="your username"
              className="input input-bordered"
            />
          </div>

          {/* Email */}
          <div className="form-control">
            <label className="label">
              <span className="label-text">Email</span>
            </label>
            <input
              type="email"
              placeholder="email@example.com"
              className="input input-bordered"
            />
          </div>

          {/* Password */}
          <div className="form-control">
            <label className="label">
              <span className="label-text">Password</span>
            </label>
            <input
              type="password"
              placeholder="••••••••"
              className="input input-bordered"
            />
          </div>

          {/* Confirm Password */}
          <div className="form-control">
            <label className="label">
              <span className="label-text">Confirm Password</span>
            </label>
            <input
              type="password"
              placeholder="••••••••"
              className="input input-bordered"
            />
          </div>

          {/* Button */}
          <div className="form-control mt-5 flex items-end">
            <button className="btn btn-primary">Register</button>
          </div>

          {/* Login link */}
          <p className="text-center text-sm opacity-70">
            มีบัญชีอยู่แล้ว?{" "}
            <span className="link link-primary cursor-pointer">
              เข้าสู่ระบบ
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Register;
