// import { createBrowserRouter } from "react-router-dom";
// import Root from "./route";
// import ErrorPage from "./ErrorPage";

// export const router = createBrowserRouter([
//   {
//     path: "/",
//     element: <Root />,
//     errorElement: <ErrorPage />,
//     children: [
//       // {
//       //   index: true,
//       //   element: <Root />,
//       // },
//       {
//         path: "/add-listing",
//         element: <div>Add Listing</div>,
//       },
//       {
//         path: "/auth/login",
//         element: <div>Login</div>,
//       },
//     ],
//   },
// ]);

// // Layouts
// import AnonymousLayout from "../layouts/AnonymousLayout";
// import MainLayout from "../layouts/MainLayout";

// Pages
import AnonymousLayout from './AnonymousLayout';
import MainLayout from './MainLayout';
import { renderRoutes } from './GenerateRoute';
import Dashboard from '../pages/dashboard';
import UserList from '../pages/user/list';
import Login from '../pages/auth/Login';
import Register from '../pages/auth/Register';
import ConfirmedUser from '../pages/auth/ConfirmedUser';
import Blogs from '../pages/blogs/list';
import AddNewBlog from '../pages/blogs/form/AddNewBlog';

const appRoutes = [
  {
    layout: AnonymousLayout,
    routes: [
      {
        name: 'login',
        title: 'Login page',
        component: Login,
        path: '/login',
        isPublic: true,
      },
      {
        name: 'register',
        title: 'Register',
        component: Register,
        path: '/register',
        isPublic: true,
      },
      {
        name: 'register',
        title: 'Register',
        component: ConfirmedUser,
        path: '/confirm-user/:token',
        isPublic: true,
      },
    ],
  },
  {
    layout: MainLayout,
    routes: [
      {
        name: 'home',
        title: 'Home page',
        component: Dashboard,
        path: '/',
      },
      {
        name: 'blogs',
        title: 'Blogs',
        routes: [
          {
            name: 'list-blogs',
            title: 'List of Blogs',
            component: Blogs,
            path: '/blogs',
          },
          {
            name: 'list-blogs',
            title: 'List of Blogs',
            component: AddNewBlog,
            path: '/blogs/new',
          },
        ],
      },
      {
        name: 'users',
        title: 'Users',
        routes: [
          {
            name: 'list-users',
            title: 'List of users',
            component: UserList,
            path: '/users',
          },
        ],
      },
    ],
  },
];
export const Routes = renderRoutes(appRoutes);
