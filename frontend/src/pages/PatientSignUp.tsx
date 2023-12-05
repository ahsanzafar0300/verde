import image from "../assets/sign-up.png";
import { useState, useEffect } from "react";
import { FacebookButton, GoogleButton, InputField } from "../components";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useMutation } from "react-query";
import toast, { Toaster } from "react-hot-toast";
import { facebookSignIn, googleSignIn } from "../firebase/utils";

const notifySuccess = () => toast.success("Sign Up Success.");
const notifyFailure = () => toast.error("Sign Up Failure.");

const inputs = [
  {
    label: "First Name",
    type: "text",
    //   placeholder: "Enter your email",
    name: "first_name",
  },
  {
    label: "Last Name",
    type: "text",
    //   placeholder: "Enter your email",
    name: "last_name",
  },
  {
    label: "Email",
    type: "email",
    //   placeholder: "Enter your email",
    name: "email",
  },
  {
    label: "Phone Number",
    type: "number",
    //   placeholder: "Enter your email",
    name: "phone_number",
  },
  {
    label: "Gender",
    type: "radio",
    //   placeholder: "Enter your email",
    name: "gender",
    options: [
      { label: "Male", value: "male" },
      { label: "Female", value: "female" },
    ],
  },
  {
    label: "Password",
    type: "password",
    //   placeholder: "************",
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
      patient_id
      first_name
    }
  }
`;

  const getPatients = async (data: any) => {
    return axios({
      url: "/graphql",
      method: "POST",
      data: {
        query: FILMS_QUERY,
        variables: { data },
      },
    }).then((response) => response.data.data);
  };
  // const { data } = useQuery("patients", getPatients);

  const { data, isSuccess, mutate } = useMutation(getPatients);

  const handleChange = (e: any) => {
    setInputValues((prev: any) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    mutate(inputValues);
  };

  useEffect(() => {
    if (data) {
      if (isSuccess) {
        notifySuccess();
        setTimeout(() => {
          navigate("/patient/sign-in");
        }, 1000);
      } else {
        notifyFailure();
      }
    }
  }, [data]);

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
                              // name="inline-radio-group"
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
                    <InputField input={input} onChange={handleChange} />
                  )}
                </div>
              ))}
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
