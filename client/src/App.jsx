import { BrowserRouter, Route, Routes } from "react-router-dom";
import React from "react";
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

export default function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route element={<PrivateRoute />}>
          <Route path="/profile" element={<Profile />} />
        </Route>
        <Route element={<LoggedRoute />}>
          <Route path="/sign-in" element={<SignIn />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/confirm-email/:token" element={<Confirmation />} />
          <Route
            path="/reset-password"
            element={<ResetPasswordRequest />}
          />
          <Route
            path="/reset-password/:token"
            element={<ResetPassword />}
          />
          <Route path="/reset-password-send" element={""} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
