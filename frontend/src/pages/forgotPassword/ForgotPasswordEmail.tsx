import { Link, useLocation, useNavigate } from "react-router-dom";
import { InputField } from "../../components";
import { useEffect, useState } from "react";
import {
  forgotPassword,
  getAdminByEmail,
  getDoctorByEmail,
  getPatientByEmail,
  users,
} from "./queriesAndUtils";
import { notifyFailure, notifySuccess } from "../../utils/Utils";
import { Toaster } from "react-hot-toast";

const ForgotPasswordEmail = () => {
  const [email, setEmail] = useState("");
  const { state } = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (!state?.for) {
      navigate(-1);
    }
  }, [state?.for]);

  const handleChange = (e: any) => {
    setEmail(e.target.value);
  };

  const sendEmail = async (email: string, id: number) => {
    const res = await forgotPassword(email, id, state?.for);
    if (res?.id) {
      notifySuccess("Verification Code is sent to your email. Redirecting...");
      setTimeout(() => {
        navigate("/forgot-password/2", { state: { for: state?.for, id } });
      }, 1000);
    } else {
      console.log(res);
    }
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (email?.length > 0) {
      if (state?.for === users.patient) {
        const res = await getPatientByEmail(email);
        if (res?.id) {
          sendEmail(email, parseInt(res.id));
        } else {
          notifyFailure("This email does not exist!");
        }
      } else if (state?.for === users.doctor) {
        const res = await getDoctorByEmail(email);
        if (res?.id) {
          sendEmail(email, parseInt(res.id));
        } else {
          notifyFailure("This email does not exist!");
        }
      } else if (state?.for === users.admin) {
        const res = await getAdminByEmail(email);
        if (res?.id) {
          sendEmail(email, parseInt(res.id));
        } else {
          notifyFailure("This email does not exist!");
        }
      }
    } else {
      notifyFailure("Please Enter an email address!");
    }
  };
  return (
    <main>
      <div className="mx-auto mt-12 w-2/5 justify-self-center border border-primary rounded-lg">
        <div className="text-primary border-b border-primary pt-2 pb-4 px-5">
          <h3 className="text-2xl font-bold my-3">Forgot Password</h3>
          <small>
            Please enter the email address you would like your password
            information sent to{" "}
          </small>
        </div>
        <form onSubmit={handleSubmit} className="pt-2 pb-6 px-5">
          <InputField
            label="Email Address"
            name="email"
            type="email"
            value={email}
            onChange={handleChange}
          />
          <button className="form-btn my-3">Send Email</button>
          <Link to="/">
            <button className="form-btn my-3">Back to Login</button>
          </Link>
        </form>
      </div>
      <Toaster />
    </main>
  );
};

export default ForgotPasswordEmail;
