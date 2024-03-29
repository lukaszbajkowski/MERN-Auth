import { useSelector } from "react-redux";
import { Outlet, Navigate } from "react-router-dom";

export default function NoGoogleAccountRoute() {
  const { currentUser } = useSelector((state) => state.user);
  return !currentUser.googleAccount ? <Outlet /> : <Navigate to={`/sign-in`} />;
}
