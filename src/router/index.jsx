import { createBrowserRouter} from "react-router-dom";
import MainLayouts from "../layouts/MainLayouts.jsx";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Edit from "../pages/Edit";
import Create from "../pages/Create";
import PostDetail from "../pages/PostDetail";
import PostByAuthor from "../pages/PostByAuthor";
import Register from "../pages/Register";


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
              path: "login",
              element: <Login />
            },
            {
              path: "register",
              element: <Register />
            },

           {
            path: "posts/:id",
            element: <PostDetail />
           },
           {  
            path: "author/:id",
            element: <PostByAuthor />
           },
           {
            path: "create",
            element: <Create />
           },
           {
            path: "edit/:id",
            element: <Edit />

           }


        ]
    }

])

export default router
