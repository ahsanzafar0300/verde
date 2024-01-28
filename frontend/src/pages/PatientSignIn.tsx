import image from "../assets/sign-in.png";
import { useEffect, useState } from "react";
import { FacebookButton, GoogleButton, InputField } from "../components";
import { Link, useNavigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { googleSignIn, facebookSignIn } from "../firebase/utils.js";
import { publicRequest } from "../api/requestMethods.js";
import { useDispatch } from "react-redux";
import { setUser } from "../redux/slices/userSlice.js";
import { USER_ROLES } from "../api/roles.js";
import { notifyFailure, notifySuccess } from "../utils/Utils.js";
import { users } from "./forgotPassword/queriesAndUtils.js";
import { loadingEnd, loadingStart } from "../redux/slices/loadingSlice.js";

const inputsArr = [
  {
    label: "Email",
    type: "email",
    placeholder: "Enter your email",
    name: "email",
    error: false,
  },
  {
    label: "Password",
    type: "password",
    placeholder: "************",
    name: "password",
    error: false,
  },
];

const PATIENT_QUERY = `
query PatientToken($email: String!, $password: String!) {
  getPatientToken(email: $email, password: $password){
    token,
    email,
    error
  }
}
`;

const initialValue = {
  email: "",
  password: "",
};

export default function PatientSignIn() {
  const [inputs, setInputs] = useState(inputsArr);
  const [inputValues, setInputValues] = useState<Inputs>(initialValue);
  const [socialLogin, setSocialLogin] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const getPatientToken = async () => {
    const response = await publicRequest.post("/graphql", {
      query: PATIENT_QUERY,
      variables: inputValues,
    });
    return response.data.data.getPatientToken;
  };

  const setFieldError = (fieldName?: string) => {
    let updatedInputs;
    if (fieldName) {
      updatedInputs = inputs.map((input) => ({
        ...input,
        error: input.name === fieldName,
      }));
    } else {
      updatedInputs = inputs.map((input) => ({
        ...input,
        error: inputValues[input.name] === "",
      }));
    }
    setInputs(updatedInputs);
  };

  const handleChange = (e: any) => {
    setInputValues((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleLogin = async () => {
    dispatch(loadingStart());
    const tokenRes = await getPatientToken();
    dispatch(loadingEnd());
    if (tokenRes?.token) {
      const userData = { ...tokenRes, role: USER_ROLES.patient };
      dispatch(setUser(userData));
      notifySuccess("Login Success! Redirecting...");
      setInputValues(initialValue);
      setTimeout(() => {
        navigate("/patient-dashboard");
      }, 1000);
    } else {
      notifyFailure(`${tokenRes?.error}`);
    }
    setSocialLogin(false);
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
      handleLogin();
    }
    setFieldError();
  };

  const handleUser = (userData: any) => {
    if (userData?.accessToken) {
      const user = { email: userData?.email, password: userData?.uid };
      setInputValues(user);
      setSocialLogin(true);
    } else {
      notifyFailure("Login Failed!");
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      const userData = await googleSignIn();
      handleUser(userData);
    } catch (err) {
      notifyFailure("Google Sign in Error!");
    }
  };

  const handleFacebookSignIn = async () => {
    try {
      const userData = await facebookSignIn();
      handleUser(userData);
    } catch (err) {
      notifyFailure("Facebook Sign in Error!");
    }
  };

  useEffect(() => {
    if (socialLogin) {
      handleLogin();
    }
  }, [socialLogin]);

  return (
    <main className="grid grid-cols-12 items-center">
      <section className="col-start-3 col-span-4">
        <div className="w-11/12 justify-self-center">
          <form onSubmit={handleSubmit}>
            <h3 className="text-4xl text-primary font-bold my-3">Log In</h3>
            {inputs?.map((input) => (
              <InputField
                label={input.label}
                name={input.name}
                type={input.type}
                placeholder={input.placeholder}
                onChange={handleChange}
                error={input.error}
              />
            ))}
            <div className="flex items-start justify-around my-2">
              <div className="flex items-center">
                <input
                  id="loggedIn"
                  type="checkbox"
                  value=""
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                />
                <label
                  htmlFor="loggedIn"
                  className="ms-1 text-sm font-medium text-primary"
                >
                  Keep me logged in
                </label>
              </div>
              <Link
                to="/forgot-password/1"
                state={{ for: users.patient }}
                className="text-sm text-primary underline"
              >
                Forgot Password?
              </Link>
            </div>
            <button className="form-btn my-3">Log In</button>
          </form>
          <div className="flex items-center justify-between w-full my-2">
            <div className="w-[45%] h-[1px] bg-[#E0E0E0]"></div>
            <small>Or</small>
            <div className="w-[45%] h-[1px] bg-[#E0E0E0]"></div>
          </div>
          <GoogleButton
            label="Sign in with Google"
            onClick={handleGoogleSignIn}
          />
          <FacebookButton
            label="Sign in with Facebook"
            onClick={handleFacebookSignIn}
          />
          <small className="block my-1 text-primary text-center">
            Do not have an account?{" "}
            <Link to="/patient/sign-up" className="font-bold">
              Sign Up
            </Link>
          </small>
        </div>
      </section>
      <section className="col-span-4">
        <img src={image} alt="Doctors Image" className="w-full" />
      </section>
      <Toaster />
    </main>
  );
}

interface Inputs {
  [key: string]: string | string[] | boolean;
  email: string;
  password: string;
}
