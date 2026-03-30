import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import AuthCallback from "../auth/AuthCallback";

import Dashboard from "../pages/Dashboard";
import Transactions from "../pages/Transactions";
import Language from "../pages/Language";
import QRDetails from "../pages/QRDetails";
import Support from "../pages/Support";

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/dashboard" replace />} />
        <Route path="/redirected" element={<AuthCallback />} />

        <Route
          path="/dashboard"
          element={
            <MainLayout>
              <Dashboard />
            </MainLayout>
          }
        />

        <Route
          path="/transactions"
          element={
            <MainLayout>
              <Transactions />
            </MainLayout>
          }
        />

        <Route
          path="/language"
          element={
            <MainLayout>
              <Language />
            </MainLayout>
          }
        />

        <Route
          path="/qr-details"
          element={
            <MainLayout>
              <QRDetails />
            </MainLayout>
          }
        />

        <Route
          path="/support"
          element={
            <MainLayout>
              <Support />
            </MainLayout>
          }
        />

        <Route path="*" element={<Navigate to="/dashboard" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;