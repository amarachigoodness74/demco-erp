import React, { Suspense, lazy } from "react";
import { Routes, Route } from "react-router-dom";
import LoadingIndicator from "./components/Loaders/Circular";
import reloadOnFail from "./utils/reloadOnFail";
import SupplierForm from "./components/Inventory/Suppliers/SupplierForm";
import PurchaseOrderForm from "./components/Inventory/PurchaseOrders/PurchaseOrderForm";
import ProductForm from "./components/Inventory/Products/ProductForm";
// import RequireAuth from "./utils/auth/RequireAuth";

const SignInPage = lazy(() => reloadOnFail(() => import("./pages/Signin")));
const ForgotPasswordPage = lazy(() =>
  reloadOnFail(() => import("./pages/ForgotPassword"))
);
const ResetPasswordPage = lazy(() =>
  reloadOnFail(() => import("./pages/ResetPassword"))
);

const Dashboard = lazy(() => reloadOnFail(() => import("./pages/Dashboard")));
const ProductList = lazy(() =>
  reloadOnFail(() => import("./components/Inventory/Products/ProductList"))
);
const SupplierList = lazy(() =>
  reloadOnFail(() => import("./components/Inventory/Suppliers/SupplierList"))
);
const PurchaseOrderList = lazy(() =>
  reloadOnFail(
    () => import("./components/Inventory/PurchaseOrders/PurchaseOrderList")
  )
);

// import reactLogo from "./assets/react.svg";

const App = () => {
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
            // <RequireAuth>
            <Dashboard />
            // </RequireAuth>
          }
        />
        <Route path="/inventory/products" element={<ProductList />} />
        <Route path="/inventory/products/add" element={<ProductForm />} />
        <Route path="/inventory/suppliers" element={<SupplierList />} />
        <Route path="/inventory/suppliers/add" element={<SupplierForm />} />
        <Route
          path="/inventory/purchase-orders"
          element={<PurchaseOrderList />}
        />
        <Route
          path="/inventory/purchase-orders/add"
          element={<PurchaseOrderForm />}
        />
      </Routes>
    </React.StrictMode>
  );
};

export default App;
