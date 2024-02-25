import image from "../../assets/form-img.png";
import { InputField } from "../../components";
import { Link, useNavigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { publicRequest } from "../../api/requestMethods";
import { useDispatch } from "react-redux";
import { setUser } from "../../redux/slices/userSlice";
import { USER_ROLES } from "../../api/roles";
import { notifyFailure, notifySuccess } from "../../utils/Utils";
import { users } from "../forgotPassword/queriesAndUtils";
import { loadingEnd, loadingStart } from "../../redux/slices/loadingSlice";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

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

const DOCTOR_QUERY = `
query DoctorToken($email: String!, $password: String!) {
  getDoctorToken(email: $email, password: $password){
    token,
    email,
    error
  }
}
`;

const FormSchema = z.object({
  email: z.string().min(1, { message: "Email is required" }).email(),
  password: z.string().min(1, { message: "Password is required" }),
});

export default function DoctorSignIn() {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm({ resolver: zodResolver(FormSchema) });
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const getDoctorToken = async (data: Inputs) => {
    const response = await publicRequest.post("/graphql", {
      query: DOCTOR_QUERY,
      variables: data,
    });
    return response.data.data.getDoctorToken;
  };

  const handleLogin = async (data: Inputs) => {
    dispatch(loadingStart());
    const tokenRes = await getDoctorToken(data);
    dispatch(loadingEnd());
    if (tokenRes?.token) {
      const userData = { ...tokenRes, role: USER_ROLES.doctor };
      dispatch(setUser(userData));
      notifySuccess("Login Success! Redirecting...");
      setTimeout(() => {
        navigate("/doctor-dashboard");
      }, 1000);
    } else {
      notifyFailure(tokenRes?.error || "Login Failed!");
      setError("email", { type: "custom" });
      setError("password", {
        type: "custom",
      });
    }
  };

  const onSubmit = async (data: any) => {
    handleLogin(data);
  };

  return (
    <main className="grid grid-cols-12 items-center my-12">
      <section className="col-start-3 col-span-4">
        <img src={image} alt="Doctors Image" className="w-full" />
      </section>
      <section className="col-span-5">
        <div className="mx-8 w-4/5 justify-self-center border border-primary rounded-lg">
          <h3 className="text-2xl text-primary font-bold my-3 border-b border-primary pt-2 pb-4 px-5">
            Not a Doctor?
          </h3>
          <form onSubmit={handleSubmit(onSubmit)} className="pt-2 pb-6 px-5">
            {inputs?.map((input) => (
              <InputField
                label={input.label}
                name={input.name}
                type={input.type}
                placeholder={input.placeholder}
                properties={{ ...register(input.name) }}
                error={errors[input.name]}
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
                state={{ for: users.doctor }}
                className="text-sm text-primary underline"
              >
                Forgot Password?
              </Link>
            </div>
            <button className="form-btn my-3">Log In</button>
            <small className="block my-1 text-primary text-center">
              Do not have an account?{" "}
              <Link to="/doctor/sign-up" className="font-bold">
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
  email: string;
  password: string;
}
