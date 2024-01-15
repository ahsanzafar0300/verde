import image from "../assets/form-img.png";
import { useState } from "react";
import { InputField } from "../components";
import { Link, useNavigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { publicRequest } from "../api/requestMethods";
import type { RootState } from "../redux/store";
import { useSelector, useDispatch } from "react-redux";
import { setUser } from "../redux/slices/userSlice";
import { USER_ROLES } from "../api/roles";
import { notifyFailure, notifySuccess } from "../utils/Utils";
import { users } from "./forgotPassword/queriesAndUtils";

const inputs = [
  {
    label: "Email",
    type: "email",
    placeholder: "Enter your email",
    name: "email",
  },
  {
    label: "Password",
    type: "password",
    placeholder: "************",
    name: "password",
  },
];

const ADMIN_QUERY = `
query AdminToken($email: String!, $password: String!) {
  getAdminToken(email: $email, password: $password){
    token,
    email
  }
}
`;

const initialValue = {
  email: "",
  password: "",
};

export default function AdminSignIn() {
  const [inputValues, setInputValues] = useState<Inputs>(initialValue);
  // const [token, setToken] = useState();
  const navigate = useNavigate();
  const user = useSelector((state: RootState) => state.user.currentUser);
  const dispatch = useDispatch();

  const getAdminToken = async () => {
    const response = await publicRequest.post("/graphql", {
      query: ADMIN_QUERY,
      variables: inputValues,
    });
    return response.data.data.getAdminToken;
  };

  const handleChange = (e: any) => {
    setInputValues((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (
      inputValues?.email?.length === 0 &&
      inputValues?.password?.length === 0
    ) {
      notifyFailure("Please enter your email and password!");
    } else if (inputValues?.email?.length === 0) {
      notifyFailure("Please enter your email!");
    } else if (inputValues?.password?.length === 0) {
      notifyFailure("Please enter your password!");
    } else {
      const tokenRes = await getAdminToken();
      if (tokenRes?.token) {
        const userData = { ...tokenRes, role: USER_ROLES.admin };
        dispatch(setUser(userData));
        notifySuccess("Login Success! Redirecting...");
        setInputValues(initialValue);
        setTimeout(() => {
          navigate("/admin-dashboard");
        }, 1000);
      } else {
        notifyFailure("Login Failed!");
      }
    }
  };

  console.log(user);

  return (
    <main className="grid grid-cols-12 items-center my-12">
      <section className="col-start-3 col-span-4">
        <img src={image} alt="Doctors Image" className="w-full" />
      </section>
      <section className="col-span-5">
        <div className="mx-8 w-4/5 justify-self-center border border-primary rounded-lg">
          <h3 className="text-2xl text-primary font-bold my-3 border-b border-primary pt-2 pb-4 px-5">
            Admin
          </h3>
          <form onSubmit={handleSubmit} className="pt-2 pb-6 px-5">
            {inputs?.map((input) => (
              <InputField
                label={input.label}
                name={input.name}
                type={input.type}
                placeholder={input.placeholder}
                onChange={handleChange}
              />
            ))}
            <div className="flex items-start justify-around my-2">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  value=""
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                />
                <label className="ms-1 text-sm font-medium text-primary">
                  Keep me logged in
                </label>
              </div>
              <Link
                to="/forgot-password/1"
                state={{ for: users.admin }}
                className="text-sm text-primary underline"
              >
                Forgot Password?
              </Link>
            </div>
            <button className="form-btn my-3">Log In</button>
            <small className="block my-1 text-primary text-center">
              Do not have an account?{" "}
              <Link to="/admin/sign-up" className="font-bold">
                Sign Up
              </Link>
            </small>
          </form>
        </div>
      </section>
      <Toaster />
    </main>
  );
}

interface Inputs {
  email: String;
  password: String;
}
