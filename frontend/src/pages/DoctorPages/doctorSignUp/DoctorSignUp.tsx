import image from "../../../assets/form-img.png";
import { useState, useEffect } from "react";
import {
  InputField,
  Modal,
  PhoneInputComp,
  RadioInput,
} from "../../../components";
import { Link, useNavigate } from "react-router-dom";
import { useMutation, useQuery } from "react-query";
import { Toaster } from "react-hot-toast";
import { publicRequest } from "../../../api/requestMethods";
import {
  isPhoneValid,
  notifyFailure,
  notifySuccess,
} from "../../../utils/Utils";
import { useDispatch } from "react-redux";
import { loadingEnd, loadingStart } from "../../../redux/slices/loadingSlice";
import {
  DOCTOR_SEND_OTP_QUERY,
  DOCTOR_VERIFY_OTP_QUERY,
  EXISTING_DOCTOR_QUERY,
  NEW_DOCTOR_QUERY,
} from "./queries";
import OTPInput from "react-otp-input";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const inputs = [
  {
    label: "First Name",
    type: "text",
    placeholder: "Enter Your First Name",
    name: "first_name",
    error: false,
  },
  {
    label: "Last Name",
    type: "text",
    placeholder: "Enter Your Last Name",
    name: "last_name",
    error: false,
  },
  {
    label: "Email",
    type: "email",
    placeholder: "Enter Your Email",
    name: "email",
    error: false,
  },
  {
    label: "Phone Number",
    type: "number",
    placeholder: "Enter Your Phone Number",
    name: "phone_number",
    error: false,
  },
  {
    label: "Gender",
    type: "radio",
    name: "gender",
    options: [
      { label: "Male", value: "male" },
      { label: "Female", value: "female" },
    ],
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

const UserSchema = z
  .object({
    first_name: z.string().min(1, { message: "First Name is required" }),
    last_name: z.string().min(1, { message: "Last Name is required" }),
    email: z.string().min(1, { message: "Email is required" }).email(),
    phone_number: z.string().min(1, { message: "Phone Number is required" }),
    gender: z
      .string({
        invalid_type_error: "Gender is required",
      })
      .min(1, { message: "Gender is required" }),
    password: z
      .string()
      .min(1, { message: "Password is required" })
      .min(9, { message: "Password is too short" })
      .regex(/[A-Z]/, { message: "Please include an uppercase letter" })
      .regex(/[a-z]/, { message: "Please include a lowercase letter" })
      .regex(/\d/, {
        message: "Please include atleast one number",
      })
      .regex(/[^a-zA-Z0-9]/, {
        message: "Please include atleast one special character",
      }),
  })
  .refine((data) => isPhoneValid(data.phone_number), {
    message: "Invalid Phone Number",
    path: ["phone_number"],
  });

export default function DoctorSignUp() {
  const {
    register,
    handleSubmit,
    getValues,
    setError,
    reset,
    formState: { errors },
  } = useForm({ resolver: zodResolver(UserSchema) });
  const [showOTPModal, setShowOTPModal] = useState(false);
  const [otp, setOtp] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const createDoctor = async (data: any) => {
    return publicRequest
      .post("/graphql", {
        query: NEW_DOCTOR_QUERY,
        variables: { data },
      })
      .then((response) => response.data.data.createDoctor);
  };

  const checkDoctorEmail = async () => {
    return publicRequest
      .post("/graphql", {
        query: EXISTING_DOCTOR_QUERY,
        variables: { email: getValues("email") },
      })
      .then((response) => response.data.data.findDoctorByEmail);
  };

  const sendDoctorOTP = async () => {
    return publicRequest
      .post("/graphql", {
        query: DOCTOR_SEND_OTP_QUERY,
        variables: { email: getValues("email") },
      })
      .then((response) => response.data.data.doctorOTP);
  };

  const doctorOTPData = useQuery({
    queryFn: sendDoctorOTP,
    enabled: false,
  });

  const verifyDoctorOTP = async () => {
    return publicRequest
      .post("/graphql", {
        query: DOCTOR_VERIFY_OTP_QUERY,
        variables: { code: otp, hashCode: doctorOTPData.data.code },
      })
      .then((response) => response.data.data.verifyDoctorOTP);
  };

  const { mutate, data } = useMutation(createDoctor);

  const doctorEmail = useQuery({
    queryFn: checkDoctorEmail,
    enabled: false,
  });

  const verifyOTPData = useQuery({
    queryFn: verifyDoctorOTP,
    enabled: false,
  });

  const handleLogin = () => {
    dispatch(loadingStart());
    mutate(getValues());
  };

  const onSubmit = async () => {
    dispatch(loadingStart());
    const email = await doctorEmail.refetch();
    if (email?.data?.id) {
      setError(
        "email",
        { message: "Email Already Exists!" },
        { shouldFocus: true }
      );
    } else {
      const otp = await doctorOTPData.refetch();
      if (otp?.data?.code) {
        notifySuccess("OTP is sent to your email. Please Verify!");
        setShowOTPModal(true);
      }
    }
    dispatch(loadingEnd());
  };

  useEffect(() => {
    if (data) {
      reset();
      if (data?.email) {
        notifySuccess("Sign Up Success.");
        setTimeout(() => {
          navigate("/doctor/sign-in");
        }, 1000);
      } else {
        notifyFailure(data?.error || "Sign Up Failure.");
      }
      dispatch(loadingEnd());
    }
  }, [data]);

  const handleOTPSubmit = async (e: any) => {
    e.preventDefault();
    if (otp?.length === 6) {
      dispatch(loadingStart());
      const verify = await verifyOTPData.refetch();
      dispatch(loadingEnd());
      if (verify?.data) {
        notifySuccess("OTP Verified!");
        setOtp("");
        setShowOTPModal(false);
        handleLogin();
      } else {
        notifyFailure("OTP could not be verified!");
      }
    } else {
      notifyFailure("Please enter the full OTP!");
    }
  };

  return (
    <main className="grid grid-cols-12 items-center my-12">
      <section className="col-start-3 col-span-4">
        <img src={image} alt="Doctors Image" className="w-full" />
      </section>
      <section className="col-span-6">
        <div className="mx-8 w-4/5 justify-self-center border border-primary rounded-lg">
          <h3 className="text-2xl text-primary font-bold my-3 border-b border-primary pt-2 pb-4 px-5">
            Not a Doctor?
          </h3>
          <form onSubmit={handleSubmit(onSubmit)} className="pt-2 pb-6 px-5">
            <div className="grid grid-cols-12 gap-x-4 gap-y-0">
              {inputs?.map((input) => (
                <div className="col-span-6">
                  {input.type === "radio" ? (
                    <RadioInput
                      label={input?.label}
                      name={input?.name}
                      options={input?.options}
                      properties={{ ...register(input?.name) }}
                      error={errors[input?.name]}
                    />
                  ) : input.type === "number" ? (
                    <PhoneInputComp
                      properties={{ ...register(input?.name) }}
                      error={errors[input?.name]}
                    />
                  ) : (
                    <InputField
                      label={input.label}
                      name={input.name}
                      type={input.type}
                      placeholder={input.placeholder}
                      properties={{ ...register(input?.name) }}
                      error={errors[input?.name]}
                    />
                  )}
                </div>
              ))}
            </div>
            <div className="mb-5">
              <small className="text-primary">
                <span className="font-bold">Note:</span>&nbsp;Password must be
                greater than 8 characters, with at least 1 uppercase letter, 1
                lowercase letter, 1 numeric character, and 1 special character.
                Avoid using palindromes.
              </small>
            </div>
            <div className="flex items-start justify-start my-2">
              <div className="flex items-center ms-4">
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
            </div>
            <button className="form-btn my-3">Sign Up</button>
            <small className="block my-1 text-primary text-center">
              Already have an account?{" "}
              <Link to="/doctor/sign-in" className="font-bold">
                Log In
              </Link>
            </small>
          </form>
        </div>
      </section>
      <Toaster />
      <Modal
        title="Verify OTP"
        showModal={showOTPModal}
        setModal={setShowOTPModal}
      >
        <form className="space-y-4" onSubmit={handleOTPSubmit}>
          <p className="text-base font-medium text-primary">
            Enter OTP Received
          </p>
          <OTPInput
            value={otp}
            onChange={setOtp}
            numInputs={6}
            renderSeparator={<span>-</span>}
            containerStyle={{ gap: "10px" }}
            inputStyle={{
              flex: 1,
              border: "1px solid #ddd",
              padding: "10px 0",
              borderRadius: "7px",
            }}
            renderInput={(props) => <input {...props} />}
          />
          <button type="submit" className="form-btn mt-2">
            Verify OTP
          </button>
        </form>
      </Modal>
    </main>
  );
}
