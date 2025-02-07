import { Routes, Route } from "react-router-dom";
import AuthPage from "../pages/AuthPage";
import MainLayoutFullScreen from "../layouts/MainLayoutFullScreen";
import NotFound from "../components/Systems/Notfound";

const AppRoutes = () => {
    return (
        <Routes>
            {/* Public routes */}
            <Route path="/auth" element={<AuthPage />} />

            {/* Protected routes */}
            <Route element={<MainLayoutFullScreen />}>
                <Route path="/" element={<div>Home Page</div>} />
            </Route>

            {/* Redirect to home if no route matches */}
            <Route path="*" element={<NotFound />} />
        </Routes>
    );
};

export default AppRoutes;
