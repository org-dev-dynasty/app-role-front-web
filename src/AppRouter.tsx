import { BrowserRouter, Route, Routes } from "react-router-dom";
import { LandingPage } from "./pages/landingPage";
import Roles from "./pages/restrictedArea/Roles";
import Institutes from "./pages/restrictedArea/Institutions";

export function AppRouter() {
    return (
        <BrowserRouter>
            <Routes>
                <Route Component={LandingPage} path="/" element={<LandingPage />} />
                <Route Component={Institutes} path="/Institutes" element={<Institutes />} />
                <Route Component={Roles} path="/roles" element={<Roles />} />
            </Routes>
        </BrowserRouter>
    )
}