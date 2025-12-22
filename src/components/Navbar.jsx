import { useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../context/UserContext";

const Navbar = () => {
  const { userInfo, logout } = useContext(UserContext);
  const username = userInfo?.username;
  // const logout = () => {
  //   setUserInfo(null);
  // };

  const menuItems = [
    { link: "/", label: "Home" },
    { link: "/create", label: "Create New Post" },
  ];

  return (
    <div className="navbar bg-base-100 shadow-md px-4">
      {/* LEFT */}
      <div className="navbar-start">
        <Link to="/" className="btn btn-ghost text-2xl font-bold text-primary">
          📝 MyBlog
        </Link>
      </div>

      {/* CENTER */}
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal gap-2">
          {menuItems.map((item) => (
            <li key={item.link}>
              <Link className="font-medium" to={item.link}>
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      <div className="navbar-end space-x-3">
        {!username ? (
          <>
            <a
              href="/register"
              className="btn btn-outline btn-primary rounded-xl"
            >
              Register
            </a>
            <a href="/login" className="btn btn-outline btn-success rounded-xl">
              Login
            </a>
          </>
        ) : (
          <>
            <a
              href="/create"
              className="btn btn-outline btn-primary rounded-xl"
            >
              Create New Post
            </a>
            <button
              onClick={logout}
              className="btn btn-outline btn-error rounded-xl"
            >
              Logout ({username})
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default Navbar;
