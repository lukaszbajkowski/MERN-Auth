import {BrowserRouter, Route, Routes} from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Profile from "./pages/Profile";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Header from "./components/Header";
import PrivateRoute from "./components/PrivateRoute";
import LoggedRoute from "./components/LoggedRoute";
import Confirmation from "./pages/ConfirmEmail";
import ResetPasswordRequest from "./pages/ResetPasswordRequest";
import ResetPassword from "./pages/ResetPassword";
import ResetPasswordError from "./pages/ResetPasswordError.jsx";
import Personalization from "./pages/Personalization.jsx";
import Share from "./pages/Share.jsx";
import NoGooogleAccountRoute from "./components/NoGooogleAccountRoute.jsx";

export default function App () {
    const routes = [
        {path: "/profile", element: <Profile/>},
        {path: "/account-settings", element: <Profile/>},
        {path: "/security-settings", element: <Profile/>},
        {path: "/personalization", element: <Personalization/>},
        {path: "/share", element: <Share/>},
    ];

    const noGoogleAccountsRoutes = [
        {path: "/change/login", element: <Profile/>},
        {path: "/change/email", element: <Profile/>},
        {path: "/change/password", element: <Profile/>},
    ]

    return (
        <BrowserRouter>
            <Header/>
            <Routes>
                <Route path="/" element={<Home/>}/>
                <Route path="/about" element={<About/>}/>
                <Route element={<PrivateRoute/>}>
                    {routes.map((route, index) => (
                        <Route key={index} path={route.path} element={route.element}/>
                    ))}
                    <Route element={<NoGooogleAccountRoute/>}>
                        {noGoogleAccountsRoutes.map((noGoogleAccountsRoutes, index) => (
                            <Route key={index} path={noGoogleAccountsRoutes.path}
                                   element={noGoogleAccountsRoutes.element}/>
                        ))}
                    </Route>
                </Route>
                <Route element={<LoggedRoute/>}>
                    <Route path="/sign-in" element={<SignIn/>}/>
                    <Route path="/sign-up" element={<SignUp/>}/>
                    <Route path="/confirm-email/:token" element={<Confirmation/>}/>
                    <Route
                        path="/reset-password"
                        element={<ResetPasswordRequest/>}
                    />
                    <Route
                        path="/reset-password/:token"
                        element={<ResetPassword/>}
                    />
                    <Route path="/reset-password-error" element={<ResetPasswordError/>}/>
                </Route>
            </Routes>
        </BrowserRouter>
    );
}
