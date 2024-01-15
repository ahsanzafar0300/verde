import { useLocation, useNavigate } from "react-router-dom";
import { InputField } from "../../components";
import { useEffect, useState } from "react";
import { updatePassword, users } from "./queriesAndUtils";
import {
  isValidPassword,
  notifyFailure,
  notifySuccess,
} from "../../utils/Utils";
import { Toaster } from "react-hot-toast";

const ForgotPasswordReset = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const { state } = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (!state?.for) {
      navigate(-1);
    }
  }, [state?.for]);

  const handleNavigate = () => {
    if (state?.for === users.patient) {
      navigate("/patient/sign-in");
    } else if (state?.for === users.doctor) {
      navigate("/doctor/sign-in");
    } else if (state?.for === users.admin) {
      navigate("/admin/sign-in");
    }
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (password?.length > 0 && confirmPassword?.length > 0) {
      if (password === confirmPassword) {
        if (isValidPassword(password)?.status) {
          const res = await updatePassword(
            state?.id.toString(),
            state?.for,
            password
          );
          if (res?.id) {
            notifySuccess("Password Changed Successfully!");
            setTimeout(() => handleNavigate(), 1000);
          } else {
            notifyFailure("Password Change Unsuccessful!");
          }
        } else {
          notifyFailure(isValidPassword(password)?.msg);
        }
      } else {
        notifyFailure("Password and confirm password fields do not match!");
      }
    } else {
      notifyFailure("Please fill all fields!");
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
            label="New Password"
            name="password"
            type="password"
            value={password}
            onChange={(e: any) => setPassword(e.target.value)}
          />
          <InputField
            label="Confirm Password"
            name="confirmPassword"
            type="password"
            value={confirmPassword}
            onChange={(e: any) => setConfirmPassword(e.target.value)}
          />
          <div className="mb-5">
            <small className="text-primary">
              <span className="font-bold">Note:</span>&nbsp;Password must be
              8-12 characters, with at least 1 uppercase letter, 1 lowercase
              letter, 1 numeric character, and 1 special character. Avoid using
              palindromes.
            </small>
          </div>
          <button className="form-btn my-3">Reset Password</button>
        </form>
      </div>
      <Toaster />
    </main>
  );
};

export default ForgotPasswordReset;
