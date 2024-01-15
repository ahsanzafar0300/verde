import image from "../assets/sign-up.png";
import { useState, useEffect } from "react";
import { FacebookButton, GoogleButton, InputField } from "../components";
import { Link, useNavigate } from "react-router-dom";
import { useMutation } from "react-query";
import { Toaster } from "react-hot-toast";
import { facebookSignIn, googleSignIn } from "../firebase/utils";
import { publicRequest } from "../api/requestMethods";
import {
  PasswordCheckType,
  isValidPassword,
  notifyFailure,
  notifySuccess,
} from "../utils/Utils";

const inputs = [
  {
    label: "First Name",
    type: "text",
    placeholder: "Enter Your First Name",
    name: "first_name",
  },
  {
    label: "Last Name",
    type: "text",
    placeholder: "Enter Your Last Name",
    name: "last_name",
  },
  {
    label: "Email",
    type: "email",
    placeholder: "Enter Your Email",
    name: "email",
  },
  {
    label: "Phone Number",
    type: "number",
    placeholder: "Enter Your Phone Number",
    name: "phone_number",
  },
  {
    label: "Gender",
    type: "radio",
    name: "gender",
    options: [
      { label: "Male", value: "male" },
      { label: "Female", value: "female" },
    ],
  },
  {
    label: "Password",
    type: "password",
    placeholder: "************",
    name: "password",
  },
];

export default function PatientSignUp() {
  const [inputValues, setInputValues] = useState<any>({});
  const navigate = useNavigate();
  const FILMS_QUERY = `
  mutation($data: PatientInput!) {
    createPatient(data: $data) {
      email
    }
  }
`;

  const getPatients = async (data: any) => {
    return publicRequest
      .post("/graphql", {
        query: FILMS_QUERY,
        variables: { data },
      })
      .then((response) => response.data.data);
  };

  const { data, isSuccess, mutate } = useMutation(getPatients);

  const handleChange = (e: any) => {
    setInputValues((prev: any) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    if (Object.keys(inputValues).length === 6) {
      const passwordCheck: PasswordCheckType = isValidPassword(
        inputValues?.password
      );
      if (passwordCheck?.status) {
        mutate(inputValues);
      } else {
        notifyFailure(passwordCheck?.msg);
      }
    } else {
      notifyFailure("Please fill all fields!");
    }
  };

  useEffect(() => {
    if (data) {
      if (isSuccess) {
        notifySuccess("Sign Up Success.");
        setTimeout(() => {
          navigate("/patient/sign-in");
        }, 1000);
      } else {
        notifyFailure("Sign Up Failure.");
      }
    }
  }, [data]);

  const handleGoogleSignIn = async () => {
    try {
      await googleSignIn();
    } catch (err) {
      console.log(err);
    }
  };

  const handleFacebookSignIn = async () => {
    try {
      await facebookSignIn();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <main className="grid grid-cols-12 items-center gap-6">
      <section className="col-start-2 col-span-5">
        <div className=" justify-self-center">
          <form onSubmit={handleSubmit}>
            <h3 className="text-4xl text-primary font-bold my-3">
              Create Account
            </h3>
            <div className="grid grid-cols-12 gap-x-4 gap-y-0">
              {inputs?.map((input) => (
                <div className="col-span-6">
                  {input.type === "radio" ? (
                    <div className="my-3.5">
                      <label className="text-xs text-primary duration-300 bg-white px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1">
                        {input.label}
                      </label>
                      <div className="flex justify-evenly mt-2">
                        {input?.options?.map((option) => (
                          <div className="flex items-center me-4">
                            <input
                              type="radio"
                              value={option.value}
                              name={input.name}
                              onChange={handleChange}
                              className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                            />
                            <label className="ms-2 text-sm font-medium text-primary">
                              {option.label}
                            </label>
                          </div>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <InputField
                      label={input.label}
                      name={input.name}
                      type={input.type}
                      placeholder={input.placeholder}
                      onChange={handleChange}
                    />
                  )}
                </div>
              ))}
            </div>
            <div className="mb-5">
              <small className="text-primary">
                <span className="font-bold">Note:</span>&nbsp;Password must be
                8-12 characters, with at least 1 uppercase letter, 1 lowercase
                letter, 1 numeric character, and 1 special character. Avoid
                using palindromes.
              </small>
            </div>
            <div className="flex items-start justify-start my-2">
              <div className="flex items-center ms-4">
                <input
                  type="checkbox"
                  value=""
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                />
                <label className="ms-1 text-sm font-medium text-primary">
                  Keep me logged in
                </label>
              </div>
            </div>
            <button className="form-btn my-3">Sign Up</button>
          </form>
          <div className="flex items-center justify-between w-full my-2">
            <div className="w-[45%] h-[1px] bg-[#E0E0E0]"></div>
            <small>Or</small>
            <div className="w-[45%] h-[1px] bg-[#E0E0E0]"></div>
          </div>
          <div className="flex gap-4">
            <GoogleButton onClick={handleGoogleSignIn} />
            <FacebookButton onClick={handleFacebookSignIn} />
          </div>
          <small className="block my-1 text-primary text-center">
            Already have an account?{" "}
            <Link to="/patient/sign-in" className="font-bold">
              Log in
            </Link>
          </small>
        </div>
      </section>
      <section className="col-span-5">
        <img src={image} alt="Doctors Image" className="h-full" />
      </section>
      <Toaster />
    </main>
  );
}
