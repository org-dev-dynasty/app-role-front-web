import { BrowserRouter, Route, Routes } from "react-router-dom";
import { LandingPage } from "./pages/landingPage";
import RestrictedArea from "./pages/restrictedArea";

export function AppRouter() {
    return (
        <BrowserRouter>
            <Routes>
                <Route Component={LandingPage} path="/home" element={<LandingPage />} />
                <Route Component={RestrictedArea} path="/restrictedArea" element={<RestrictedArea />} />
            </Routes>
        </BrowserRouter>
    )
}