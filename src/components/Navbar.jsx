import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";

const Navbar = () => {
  const { userInfo, logout } = useContext(UserContext);
  const navigate = useNavigate();
  const username = userInfo?.username;

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const menuItems = [];

  return (
    <div className="navbar bg-white shadow-lg border-b-2 border-blue-100 px-4 sticky top-0 z-50">
      {/* LEFT */}
      <div className="navbar-start">
        <Link to="/" className="btn btn-ghost text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:shadow-lg transition-all duration-300 rounded-lg px-4">
          📝 MyBlog
        </Link>
      </div>

      {/* CENTER */}
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal gap-2">
          {menuItems.map((item) => (
            <li key={item.link}>
              <Link className="font-medium hover:text-blue-600 transition-colors" to={item.link}>
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      {username ? (
        <div className="navbar-end space-x-2">
          <a className="btn btn-primary btn-outline gap-2" href="/create">
            ✍️ Create
          </a>
          <button className="btn btn-error btn-outline" onClick={handleLogout}>
            Logout ({username})
          </button>
        </div>
      ) : (
        <div className="navbar-end space-x-2">
          <a className="btn btn-primary" href="login">
            Login
          </a>
          <a className="btn" href="register">
            Register
          </a>
        </div>
      )}
    </div>
  );
};

export default Navbar;
