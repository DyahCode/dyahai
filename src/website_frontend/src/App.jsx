import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ScrollToHash from "./components/common/ScrollHash";
import HomePage from "./pages/HomePage";
import GeneratePage from "./pages/GeneratePage";
import ProfilePage from "./pages/ProfilePage";
import NotFoundPage from "./pages/404Page";
import CreditPaymentPage from "./pages/CreditPaymentPage";
import { AuthProvider } from "./provider/authProvider";
import RequireAuth from "./provider/requireAuth";
import TermsSerivePage from "./pages/TermsServicePage";
import PricingPage from "./pages/PricingPage";
import { PopupProvider } from "./provider/PopupProvider";

function App() {
  return (
    <PopupProvider>
      <AuthProvider>
        <Router>
          <ScrollToHash />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route
              path="/generate"
              element={
                <RequireAuth>
                  <GeneratePage />
                </RequireAuth>
              }
            />
            <Route
              path="/profile"
              element={
                <RequireAuth>
                  <ProfilePage />
                </RequireAuth>
              }
            />
            <Route
              path="/topup"
              element={
                <RequireAuth>
                  <CreditPaymentPage />
                </RequireAuth>
              }
            />
            <Route path="/*" element={<NotFoundPage />} />
            <Route path="/pricing" element={<PricingPage />} />
            <Route path="/terms" element={<TermsSerivePage />} />
          </Routes>
        </Router>
      </AuthProvider>
    </PopupProvider>
  );
}
export default App;
