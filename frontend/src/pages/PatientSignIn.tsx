import image from "../assets/sign-in.png";
import { useState, useEffect } from "react";
import { FacebookButton, GoogleButton, InputField } from "../components";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { googleSignIn, facebookSignIn } from "../firebase/utils.js";
import { getRedirectResult } from "firebase/auth";
import { auth } from "../firebase/config.js";

const notifySuccess = () => toast.success("Login Success.");
const notifyFailure = () => toast.error("Login Failed.");

const inputs = [
  {
    label: "Email",
    type: "email",
    //   placeholder: "Enter your email",
    name: "email",
  },
  {
    label: "Password",
    type: "password",
    //   placeholder: "************",
    name: "password",
  },
];

const PATIENT_QUERY = `
query PatientToken($email: String!, $password: String!) {
  getPatientToken(email: $email, password: $password)
}
`;

const initialValue = {
  email: "",
  password: "",
};

export default function PatientSignIn() {
  const [inputValues, setInputValues] = useState<Inputs>(initialValue);
  const [token, setToken] = useState<string>();
  const navigate = useNavigate();

  const getPatientToken = async () => {
    const response = await axios.post("/graphql", {
      query: PATIENT_QUERY,
      variables: inputValues,
    });
    return response.data.data;
  };

  const handleChange = (e: any) => {
    setInputValues((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const tokenRes = await getPatientToken();
    setToken(tokenRes.getPatientToken);
  };

  useEffect(() => {
    if (token) {
      notifySuccess();
      setInputValues(initialValue);
      setTimeout(() => {
        navigate("/");
      }, 1000);
    } else if (token === null) {
      notifyFailure();
    }
  }, [token]);

  const handleGoogleSignIn = async () => {
    try {
      // setOpen(true);
      await googleSignIn();
    } catch (err) {
      console.log(err);
    }
  };

  const handleFacebookSignIn = async () => {
    try {
      // setOpen(true);
      await facebookSignIn();
    } catch (err) {
      console.log(err);
    }
  };

  getRedirectResult(auth)
    .then((result: any) => {
      const userData = result?.user;
      return userData;
    })
    .then((userData) => {
      if (userData) {
        console.log(userData);
      }
    });

  return (
    <main className="grid grid-cols-12 items-center">
      <section className="col-start-3 col-span-4">
        <div className="w-11/12 justify-self-center">
          <form onSubmit={handleSubmit}>
            <h3 className="text-4xl text-primary font-bold my-3">Log In</h3>
            {inputs?.map((input) => (
              <InputField input={input} onChange={handleChange} />
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
              <Link to="#" className="text-sm text-primary underline">
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
          <GoogleButton onClick={handleGoogleSignIn} />
          <FacebookButton onClick={handleFacebookSignIn} />
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
  email: String;
  password: String;
}
