import React from "react";

function Login() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-indigo-500 to-purple-500">
      <div className="card w-full max-w-sm bg-base-100 shadow-xl">
        <div className="card-body gap-4">
          <h2 className="text-2xl font-bold text-center">Login</h2>

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


<div className="form-control mt-5">
  <div className="flex justify-end">
    <button className="btn btn-primary">Login</button>
  </div>
</div>


          {/* Register link */}
          <p className="text-center text-sm opacity-70">
            ยังไม่มีบัญชี?{" "}
            <span className="link link-primary cursor-pointer">
              สมัครสมาชิก
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
