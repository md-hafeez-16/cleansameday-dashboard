import React, { useEffect, useState } from "react";
import samedaybg from "../../../assets/Images/samedaybg.jpg";
import axios from "axios";
import { BASE_URL } from "../../../constants";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { BsEye, BsEyeSlash } from "react-icons/bs";
const ForgotPassword = () => {
  const [step, setStep] = useState(1);
  const [emailOrPhone, setEmailOrPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [userId, setUserId] = useState("");
  const [otpIsValid, setOtpIsValid] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [timer, setTimer] = useState(10);

  const navigate = useNavigate();

  useEffect(() => {
    if (step === 2 && timer > 0) {
      const interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [step, timer]);
  const handleRequestOtp = async () => {
    try {
      const response = await axios.post(
        `${BASE_URL}/user/sendOtp/${emailOrPhone}`
      );
      if (response.data.success) {
        setUserId(response.data.userDoc._id);

        toast.success("OTP Sent Successfully!");
        setStep(2);
        setTimer(10);
      }
    } catch (error) {
      toast.error("Error sending OTP. Please try again.");
    }
  };

  const handleOtpChange = (e, index) => {
    const value = e.target.value;
    if (value.length > 1 || isNaN(value)) return;

    const otpArray = otp.split("");
    otpArray[index] = value;

    setOtp(otpArray.join(""));

    if (value && index < 3) {
      document.querySelectorAll("input")[index + 1].focus();
    }
  };

  const handleKeyPress = (e, index) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      document.querySelectorAll("input")[index - 1].focus();
    }
  };

  const handleVerifyOtp = async () => {
    try {
      const response = await axios.post(`${BASE_URL}/user/verifyOtp`, {
        otp,
        userId,
      });
      if (response.data.success) {
        setOtpIsValid(true); // Turn boxes green
        toast.success("OTP Verified Successfully!");
        // alert("OTP verified successfully. Please reset your password.");
        setStep(3);
      } else {
        setOtpIsValid(false);
        toast.error("Invalid OTP. Please try again.");
      }
    } catch (error) {
      setOtpIsValid(false);
      toast.error("Error verifying OTP. Please try again.");
    }
  };

  const handleResendOtp = async () => {
    if (!emailOrPhone) {
      toast.error("Please enter your email or phone number first.");
      return;
    }
    await handleRequestOtp();
  };

  const handleResetPassword = async () => {
    if (newPassword !== confirmPassword) {
      toast.error("Passwords do not match!");
      return;
    }

    try {
      const response = await axios.post(`${BASE_URL}/user/forgrtPassword`, {
        userId,
        password: newPassword,
      });
      if (response.data.success) {
        toast.success("Password Reset Successfully!");
        alert("Password reset successfully.");
        navigate("/");
      } else {
        toast.error("Failed to reset password. Please try again.");
      }
    } catch (error) {
      toast.error("Error resetting password. Please try again.");
    }
  };
  return (
    <div className="min-h-screen min-w-full">
      <div
        className="fixed inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url(${samedaybg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="flex items-center justify-center min-h-screen">
          <div className="bg-white  p-8 rounded-lg shadow-md w-96 mx-auto">
            {step === 1 && (
              <>
                <h2 className="text-xl text-primary font-semibold mb-4 text-center">
                  Forgot Password
                </h2>
                <p className="mb-4 text-center">Enter your email:</p>
                <input
                  type="text"
                  name="emailOrPhone"
                  placeholder="Enter email"
                  value={emailOrPhone}
                  onChange={(e) => setEmailOrPhone(e.target.value)}
                  className="w-full rounded-lg p-3 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary"
                />
                <button
                  className="bg-primary text-white py-2 px-4 rounded-lg mt-4 w-full"
                  onClick={handleRequestOtp}
                >
                  Next
                </button>
              </>
            )}
            {step === 2 && (
              <>
                <h2 className="text-xl font-semibold mb-4 text-primary text-center">
                  Forgot Password
                </h2>
                <p className="mb-4 text-center">
                  Enter OTP that we have sent to your mail ID:
                </p>
                <div className="flex justify-center gap-4">
                  {[...Array(4)].map((_, index) => (
                    <input
                      key={index}
                      type="text"
                      maxLength="1"
                      className={`w-14 h-12 text-center border rounded-md focus:outline-none focus:ring-2 ${
                        otp[index] && otpIsValid
                          ? "border-green-500"
                          : "focus:ring-primary"
                      }`}
                      value={otp[index] || ""}
                      onChange={(e) => handleOtpChange(e, index)}
                      onKeyDown={(e) => handleKeyPress(e, index)}
                    />
                  ))}
                </div>
                <div className="flex justify-between items-center mt-4">
                  <p className="text-sm text-gray-500">Didn't receive OTP?</p>
                  <span
                    className={`text-sm font-semibold cursor-pointer ${
                      timer > 0
                        ? "text-primary cursor-not-allowed"
                        : "text-primary"
                    }`}
                    onClick={timer > 0 ? null : handleResendOtp}
                  >
                    {timer > 0 ? `Time left: ${timer}s` : "Resend OTP"}
                  </span>
                </div>
                <button
                  className="bg-primary rounded-lg text-white py-2 px-4 mt-6 w-full"
                  onClick={handleVerifyOtp}
                >
                  Next
                </button>
              </>
            )}
            {step === 3 && (
              <>
                <h2 className="text-xl text-center text-primary font-semibold mb-4">
                  Reset Password
                </h2>
                <div className="relative mb-4">
                  <label className="block text-sm font-medium mb-1">
                    New Password
                  </label>
                  <input
                    type={showPassword ? "text" : "password"}
                    name="newPassword"
                    placeholder="New Password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    className="w-full rounded-lg p-3 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                  <span
                    className="absolute right-3 top-8 cursor-pointer mt-2"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <BsEyeSlash className="h-5 w-5" />
                    ) : (
                      <BsEye className="h-5 w-5" />
                    )}
                  </span>
                </div>
                <div className="relative mb-4">
                  <label className="block text-sm font-medium mb-1">
                    Confirm Password
                  </label>
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    name="confirmPassword"
                    placeholder="Confirm Password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="w-full rounded-lg p-3 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                  <span
                    className="absolute right-3 top-8 cursor-pointer mt-2"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    {showConfirmPassword ? (
                      <BsEyeSlash className="h-5 w-5" />
                    ) : (
                      <BsEye className="h-5 w-5" />
                    )}
                  </span>
                </div>
                <button
                  className="bg-primary text-white py-2 px-4 rounded-lg mt-4 w-full"
                  onClick={handleResetPassword}
                >
                  Confirm
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
