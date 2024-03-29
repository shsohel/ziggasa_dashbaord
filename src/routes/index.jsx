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
import AnonymousLayout from "./AnonymousLayout";
import MainLayout from "./MainLayout";
import { renderRoutes } from "./GenerateRoute";
import Dashboard from "../pages/dashboard";
import UserList from "../pages/user/list";
import UserAddForm from "../pages/user/form/UserAddForm";
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import ConfirmedUser from "../pages/auth/ConfirmedUser";
import Blogs from "../pages/blogs/list";
import AddNewBlog from "../pages/blogs/form/AddNewBlog";
import Categories from "../pages/category/list";
import Tags from "../pages/tag/list";
import Keywords from "../pages/keyword/list";
import Jobs from "../pages/job/list";
import AddNewJob from "../pages/job/form/AddNewJob";
import EditJobForm from "../pages/job/form/EditJobForm";
import Companies from "../pages/company/list";
import EditBlogForm from "../pages/blogs/form/EditBlogForm";
import TestTable from "../pages/test/DynamicTable";
import Skills from "../pages/skill/list";

const appRoutes = [
  {
    layout: AnonymousLayout,
    routes: [
      {
        name: "login",
        title: "Login page",
        component: Login,
        path: "/login",
        isPublic: true,
      },

      {
        name: "register",
        title: "Register",
        component: Register,
        path: "/register",
        isPublic: true,
      },
      {
        name: "register",
        title: "Register",
        component: ConfirmedUser,
        path: "/confirm-user/:token",
        isPublic: true,
      },
    ],
  },
  {
    layout: MainLayout,
    routes: [
      {
        name: "home",
        title: "Home page",
        component: Dashboard,
        path: "/",
      },
      {
        name: "test",
        title: "Test",
        component: TestTable,
        path: "/test",
        isPublic: true,
      },
      {
        name: "category",
        title: "Category",
        routes: [
          {
            name: "list-categories",
            title: "List of Categories",
            component: Categories,
            path: "/categories",
          },
        ],
      },
      {
        name: "tag",
        title: "Tag",
        routes: [
          {
            name: "list-tag",
            title: "List of Tags",
            component: Tags,
            path: "/tags",
          },
        ],
      },
      {
        name: "keyword",
        title: "Keywords",
        routes: [
          {
            name: "list-keyword",
            title: "List of Keywords",
            component: Keywords,
            path: "/keywords",
          },
        ],
      },
      {
        name: "skill",
        title: "Skills",
        routes: [
          {
            name: "list-skill",
            title: "List of Skills",
            component: Skills,
            path: "/skills",
          },
        ],
      },
      {
        name: "blogs",
        title: "Blogs",
        routes: [
          {
            name: "list-blogs",
            title: "List of Blogs",
            component: Blogs,
            path: "/blogs",
          },
          {
            name: "list-blogs",
            title: "List of Blogs",
            component: AddNewBlog,
            path: "/blogs/new",
          },
          {
            name: "blog-edit",
            title: "Edit Blog",
            component: EditBlogForm,
            path: "/blogs/edit",
          },
        ],
      },
      {
        name: "jobs",
        title: "Jobs",
        routes: [
          {
            name: "list-jobs",
            title: "List of Jobs",
            component: Jobs,
            path: "/jobs",
          },
          {
            name: "list-blogs",
            title: "List of Jobs",
            component: AddNewJob,
            path: "/jobs/new",
          },
          {
            name: "edit-jobs",
            title: "Edit Jobs",
            component: EditJobForm,
            path: "/jobs/edit",
          },
        ],
      },
      {
        name: "users",
        title: "Users",
        routes: [
          {
            name: "list-users",
            title: "List of users",
            component: UserList,
            path: "/users",
          },
          {
            name: "add-users",
            title: "Add user",
            component: UserAddForm,
            path: "/add-user",
          },
        ],
      },
      {
        name: "company",
        title: "Organization",
        routes: [
          {
            name: "list-company",
            title: "List of Company",
            component: Companies,
            path: "/company",
          },
        ],
      },
    ],
  },
];
export const Routes = renderRoutes(appRoutes);
