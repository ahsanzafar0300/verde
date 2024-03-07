import { useLocation, useNavigate } from "react-router-dom";
import { InputField } from "../../../components";
import { useEffect, useState } from "react";
import { verifyCode } from "./queriesAndUtils";
import { notifyFailure, notifySuccess } from "../../../utils/Utils";
import { Toaster } from "react-hot-toast";
import { loadingEnd, loadingStart } from "../../../redux/slices/loadingSlice";
import { useDispatch } from "react-redux";

const ForgotPasswordCode = () => {
  const [code, setCode] = useState("");
  const { state } = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (!state?.for) {
      navigate(-1);
    }
  }, [state?.for]);

  const handleChange = (e: any) => {
    setCode(e.target.value);
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    dispatch(loadingStart());
    const res = await verifyCode(code, state?.id, state?.for);
    dispatch(loadingEnd());
    if (res) {
      notifySuccess("Code Verified!");
      setTimeout(() => {
        navigate("/forgot-password/3", {
          state: { ...state },
        });
      }, 1000);
    } else {
      notifyFailure("Wrong Verification Code!");
    }
  };
  return (
    <main>
      <div className="mx-auto mt-12 w-2/5 justify-self-center border border-primary rounded-lg">
        <div className="text-primary border-b border-primary pt-2 pb-4 px-5">
          <h3 className="text-2xl font-bold my-3">Forgot Password</h3>
          <small>Please enter the code sent to your email address</small>
        </div>
        <form onSubmit={handleSubmit} className="pt-2 pb-6 px-5">
          <InputField
            label="Verification Code"
            name="code"
            type="text"
            value={code}
            onChange={handleChange}
          />
          <button className="form-btn my-3">Verify Code</button>
        </form>
      </div>
      <Toaster />
    </main>
  );
};

export default ForgotPasswordCode;
