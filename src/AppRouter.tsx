import { BrowserRouter, Route, Routes } from "react-router-dom";
import { LandingPage } from "./pages/landingPage";
import Role from "./pages/restrictedArea/Event";
import Institute from "./pages/restrictedArea/Institute";
import Institutions from "./pages/restrictedArea/Institutions";
import { InstituteContextProvider } from "./context/institute_context";
import Login from "./pages/restrictedArea/Login";

export function AppRouter() {
    return (
        <InstituteContextProvider>
            <BrowserRouter>
                <Routes>
                    <Route Component={LandingPage} path="/" element={<LandingPage />} />
                    <Route Component={Login} path="/login" element={<Login />} />
                    <Route Component={Institutions} path="/Institutes" element={<Institutions />} />
                    <Route Component={Institute} path="/Institute" element={<Institute />} />
                    <Route Component={Role} path="/roles" element={<Role />} />
                </Routes>
            </BrowserRouter>
        </InstituteContextProvider>
    )
}