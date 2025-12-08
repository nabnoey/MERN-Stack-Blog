import { createBrowserRouter} from "react-router-dom";
import Home from "../pages/Home";
import { MainLayouts } from "../layouts/MainLayouts";
import NewsList from "../pages/NewsList";
import NewsDetail from "../pages/NewsDetail";
import Login from "../pages/Login";
import Register from "../pages/Register";
import AdminCreatePost from "../pages/AdminCreatePost";
import AdminEditPost from "../pages/AdminEditPost";

 const router = createBrowserRouter([

    {
        path: '/',
        element: <MainLayouts />,
        children:[

            {
              path: '/',
              element: <Home />
            },
            {
              path: "news",
              element: <NewsList />
            },
            {
              path: "news/:id",
              element: <NewsDetail />
            },
            {
              path: "login",
              element: <Login />
            },
            {
              path: "register",
              element: <Register />
            },
            {
              path: "admin/create-post",
              element: <AdminCreatePost />
            },
            {
              path: "admin/edit-post/:id",
              element: <AdminEditPost />
            }


        ]
    }

])

export default router
