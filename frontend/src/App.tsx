import React, { Suspense, lazy } from "react";
import { Routes, Route } from "react-router-dom";
import RequireAuth from "./utils/auth/RequireAuth";
import LoadingIndicator from "./components/Loaders/Circular";
import reloadOnFail from "./utils/reloadOnFail";

const SignInPage = lazy(() => reloadOnFail(() => import("./pages/Signin")));
const ForgotPasswordPage = lazy(() =>
  reloadOnFail(() => import("./pages/ForgotPassword"))
);
const ResetPasswordPage = lazy(() =>
  reloadOnFail(() => import("./pages/ResetPassword"))
);
const Dashboard = lazy(() =>
  reloadOnFail(() => import("./components/Dashboard"))
);
const Employees = lazy(() =>
  reloadOnFail(() => import("./components/Employees"))
);
const Clients = lazy(() => reloadOnFail(() => import("./components/Clients")));
const Jobs = lazy(() => reloadOnFail(() => import("./components/Jobs")));
const Accounts = lazy(() =>
  reloadOnFail(() => import("./components/Accounts"))
);

export default function App() {
  return (
    <React.StrictMode>
      <Suspense fallback={<LoadingIndicator />}>
        <Routes>
          <Route path="/" element={<SignInPage />} />
          <Route path="/forgot-password" element={<ForgotPasswordPage />} />
          <Route path="/reset-password" element={<ResetPasswordPage />} />
        </Routes>
      </Suspense>
      <Routes>
        <Route
          path="/dashboard"
          element={
            <RequireAuth>
              <Dashboard />
            </RequireAuth>
          }
        />
        <Route
          path="/employees"
          element={
            <RequireAuth>
              <Employees />
            </RequireAuth>
          }
        />
        <Route
          path="/clients"
          element={
            <RequireAuth>
              <Clients />
            </RequireAuth>
          }
        />
        <Route
          path="/jobs"
          element={
            <RequireAuth>
              <Jobs />
            </RequireAuth>
          }
        />
        <Route
          path="/accounts"
          element={
            <RequireAuth>
              <Accounts />
            </RequireAuth>
          }
        />
      </Routes>
    </React.StrictMode>
  );
}
