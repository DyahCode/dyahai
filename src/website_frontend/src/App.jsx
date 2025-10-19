import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { PopupProvider } from "./provider/PopupProvider";
import { AuthProvider } from "./provider/authProvider";
import RequireAuth from "./provider/requireAuth";
import ScrollToHash from "./components/common/ScrollHash";
import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";
import TermsSerivePage from "./pages/TermsServicePage";
import GeneratePage from "./pages/GeneratePage";
import ProfilePage from "./pages/ProfilePage";
import PricingPage from "./pages/PricingPage";
import CreditPaymentPage from "./pages/CreditPaymentPage";
import NotFoundPage from "./pages/404Page";
import NftCollection from "./pages/NftCollectionPage";
import BlockExplorerPage from "../src/pages/BlockExplorerPage";
import BlockExplore from "./components/layout/sectionBlockExplorer/BlockExplore";
import BlockDetail from "./components/layout/sectionBlockExplorer/BlockDetail";

function App() {
  return (
    <PopupProvider>
      <AuthProvider>
        <Router>
          <ScrollToHash />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/about" element={<AboutPage />} />
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
            <Route path="/block-explorer" element={<BlockExplorerPage />}>
              <Route index element={<BlockExplore />} />
              <Route path=":hash" element={<BlockDetail />} />
            </Route>
            <Route path="/nft-collection" element={<NftCollection />} />
          </Routes>
        </Router>
      </AuthProvider>
    </PopupProvider>
  );
}
export default App;
