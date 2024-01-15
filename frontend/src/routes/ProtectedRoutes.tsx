import { useSelector } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom";
import { RootState } from "../redux/store";

export default function ProtectedRoutes() {
  const user = useSelector((state: RootState) => state.user.currentUser);
  const navigate = useNavigate();
  if (!user?.token) {
    navigate(-1);
  }
  return (
    <>
      <Outlet />
    </>
  );
}
