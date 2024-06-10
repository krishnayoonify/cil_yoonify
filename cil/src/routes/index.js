import { useRoutes, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
// routes
import { lazy } from "react";

// project imports
import MainLayout from "layout/MainLayout";
import Loadable from "ui-component/Loadable";

// dashboard routing
const Home = Loadable(lazy(() => import("views/Home")));
const Login = Loadable(lazy(() => import("views/auth/Login")));
const CreateUser = Loadable(lazy(() => import("views/user/CreateUser")));
const Profile = Loadable(lazy(() => import("views/user/Profile")));
const UploadCreds = Loadable(
  lazy(() => import("views/upload-creds/UploadCreds"))
);
const ViewStudentCreds = Loadable(
  lazy(() => import("views/upload-creds/ViewStudentCreds"))
);

const ViewCreds = Loadable(lazy(() => import("views/upload-creds/ViewCreds")));
const UploadStudentCreds = Loadable(
  lazy(() => import("views/upload-creds/UploadStudentCreds"))
);
const UploadStudentCredsNew = Loadable(
  lazy(() => import("views/upload-creds/UploadStudentCredsNew"))
);
const OntheHorizon = Loadable(
  lazy(() => import("views/OntheHorizon"))
);
const Details = Loadable(
  lazy(() => import("views/details/details"))
);
const TendersList = Loadable(
  lazy(() => import("views/TendersList"))
);
// ==============================|| ROUTING RENDER ||============================== //
function AuthenticatedStudentCredRoute() {
  const { user_id } = useParams();
  const user = useSelector((state) => state.user);
  const isLoggedIn = user.loggedin;

  return isLoggedIn ? (
    <UploadStudentCredsNew user_id={user_id} />
  ) : (
    <Navigate to="/login" />
  );
}

export default function ThemeRoutes() {
  const user = useSelector((state) => state.user);
  return useRoutes([
    {
      path: "/",
      element: <MainLayout />,
      children: [
        {
          path: "/",
          element:
          <Home />
            // user.loggedin && user.future_employer_email ? (
            //   <ViewStudentCreds />
            // ) : user.loggedin ? (
            //   <Home />
            // ) : (
            //   <Navigate to="/login" />
            // ),
        },
        {
          path: "/login",
          element: user.loggedin ? <Navigate to="/" /> : <Login />,
        },
        {
          path: "/tenders",
          element: <TendersList to="/" />,
        },
        {
          path: "/tender",
          element: <Details />,
        },
        {
          path: "/OntheHorizon",
          element: user.loggedin ? <OntheHorizon /> : <Navigate to="/login" />,
        },
        {
          path: "/profile",
          element: user.loggedin ? <Profile /> : <Navigate to="/login" />,
        },
        {
          path: "/users",
          element: user.loggedin ? <CreateUser /> : <Navigate to="/login" />,
        },

        {
          path: "/credentials",
          element: user.loggedin ? <UploadCreds /> : <Navigate to="/login" />,
        },
        {
          path: "/student-credentials",
          element: user.loggedin ? (
            <UploadStudentCreds />
          ) : (
            <Navigate to="/login" />
          ),
        },
        {
          path: "/student-credentials/:user_id",
          element: user.loggedin ? (
            <AuthenticatedStudentCredRoute />
          ) : (
            <Navigate to="/login" />
          ),
        },
        // {
        //   path: "/view-creds",
        //   element: user.loggedin ? <ViewCreds /> : <Navigate to="/login" />,
        // },
        {
          path: "/users",
          element: user.loggedin ? <CreateUser /> : <Navigate to="/login" />,
        },
        {
          path: "/student_credit/:token",
          element: <ViewStudentCreds />,
        },
        {
          path: "student_creds",
          element: <ViewStudentCreds />,
        },
        // {
        //   path: "dashboard",
        //   children: [
        //     {
        //       path: "default",
        //       element: <Home />,
        //     },
        //   ],
        // },
      ],
    },
  ]);
}
