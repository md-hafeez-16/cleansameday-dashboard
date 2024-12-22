import React, { useEffect, useState } from "react";
import { BASE_URL } from "../../../constants";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";
import loginbg from "../../../assets/images/loginbg.jpg";
import { Eye, EyeClosed } from "lucide-react";
import dummylogo from "../../../assets/Images/dummylogo.png";

const Login = () => {
  const navigate = useNavigate();
  const [passwordShown, setPasswordShown] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});
  // const { login } = useAuth();

  const [userId, setUserId] = useState("");
  const [custId, setCustId] = useState("");

  const [logo, setLogo] = useState("");

  const togglePasswordVisibility = () => setPasswordShown((cur) => !cur);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const fetchLogo = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/logo/getLogo`);
      console.log("logo", res.data);
      setLogo(res.data.images[0].image);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchLogo();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    toast.dismiss();

    const reqbody = {
      email: formData.email,
      password: formData.password,
    };

    try {
      setLoading(true);
      const res = await axios.post(`${BASE_URL}/user/login`, reqbody);
      console.log(res.data);

      if (res.data.user.role === "ADMIN") {
        toast.success(`${res?.data?.msg}`);

        const userId = res.data.user.id;

        localStorage.setItem("userId", userId);

        localStorage.setItem("user", JSON.stringify(res.data.user));

        // login(res.data);
        // await handleLoginSyncCart();
        navigate("/dashboard");
      } else {
        toast.error("You are not a Admin");
      }
    } catch (error) {
      console.error(error);

      toast.error(`${error?.response?.data?.msg}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen min-w-full ">
      <div
        className="fixed inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url(${loginbg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="flex h-full items-center justify-center relative z-10">
          <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-lg mx-4">
            <div className="text-center mb-6">
              <div className="flex justify-between">
                <div className="text-left">
                  <h1 className="text-xl font-bold text-primary text-left">
                    Login
                  </h1>
                  {/* <p className="text-gray-600 text-sm">Welcome to ETB</p> */}
                </div>
                <div>
                  {/* <p className="font-bold text-xl text-primary ">
                   
                  </p> */}
                  <img src={logo || dummylogo} alt="" className="h-14 w-14 object-cover rounded-full" />
                </div>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Email Input */}
              <div>
                <label htmlFor="email">Email</label>
                <input
                  id="email"
                  type="email"
                  required
                  name="email"
                  placeholder="Type your e-mail"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full mt-1 p-2 border border-gray-400 rounded-md "
                  aria-invalid={!!errors.email}
                />
                {errors.email && (
                  <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                )}
              </div>

              {/* Password Input */}
              <div>
                <label htmlFor="password">Password</label>
                <div className="relative">
                  <input
                    id="password"
                    required
                    type={passwordShown ? "text" : "password"}
                    name="password"
                    placeholder="Password"
                    value={formData.password}
                    onChange={handleChange}
                    className="w-full mt-1 p-2 border border-gray-400 rounded-md"
                    aria-invalid={!!errors.password}
                  />
                  <button
                    type="button"
                    onClick={togglePasswordVisibility}
                    className="absolute inset-y-0 right-3 flex items-center"
                  >
                    {passwordShown ? (
                      <Eye className="h-5 w-5 text-gray-500" />
                    ) : (
                      <EyeClosed className="h-5 w-5 text-gray-500" />
                    )}
                  </button>
                </div>
                {errors.password && (
                  <p className="text-red-500 text-sm mt-1">{errors.password}</p>
                )}
              </div>

              {/* Forgot Password */}
              {/* <div className="text-right">
                <p
                  onClick={() => navigate("/forgot-password")}
                  className="text-sm text-primary hover:underline cursor-pointer"
                >
                  Forgot password?
                </p>
              </div> */}

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full bg-primary text-white  py-2 rounded-lg font-medium"
                disabled={loading}
              >
                {loading ? "Logging in..." : "Login"}
              </button>
            </form>

            {/* Footer Links */}
            {/* <div className="mt-6 text-center text-sm">
              <p>
                Don't have an account?{" "}
                <span
                  onClick={() => navigate("/signup")}
                  className="text-primary font-medium hover:underline cursor-pointer"
                >
                  Sign up
                </span>
              </p>
            </div> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
