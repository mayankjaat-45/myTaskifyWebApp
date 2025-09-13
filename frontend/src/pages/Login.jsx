import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import API from "../api";

const Login = () => {
  const navigate = useNavigate();
  const [values, setValues] = useState({
    email: "",
    password: "",
  });

  const HandleInput = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post("/api/user/login", values, {
        withCredentials: true,
      });
      toast.success(res.data.message || "Login successfully 🎉");
      setValues({ email: "", password: "" });
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));
      navigate("/dashboard");
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || "Something went wrong!");
    }
  };

  return (
    <div className="flex h-screen justify-center items-center bg-gradient-to-r from-blue-600 to-indigo-700">
      <div className="w-[90%] md:w-[60%] lg:w-[28%] bg-white rounded-2xl shadow-xl p-8">
        {/* Logo */}
        <h1 className="text-4xl font-bold text-center text-blue-700 mb-2">
          Taskify
        </h1>
        <h3 className="text-center font-medium text-gray-600 mb-6">
          Login to continue managing your tasks 🚀
        </h3>

        {/* Form */}
        <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Email
            </label>
            <input
              type="email"
              name="email"
              value={values.email}
              onChange={HandleInput}
              className="border rounded-lg px-4 py-2 w-full outline-none focus:ring-2 focus:ring-blue-600 transition-all duration-300"
              placeholder="Enter your email"
              required
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Password
            </label>
            <input
              type="password"
              name="password"
              value={values.password}
              onChange={HandleInput}
              className="border rounded-lg px-4 py-2 w-full outline-none focus:ring-2 focus:ring-blue-600 transition-all duration-300"
              placeholder="Enter your password"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-700 hover:bg-blue-800 text-white font-semibold py-2 rounded-lg shadow-md transition-all duration-300"
          >
            Login
          </button>
        </form>

        {/* Footer */}
        <div className="text-center mt-6 text-gray-700">
          <p>
            Don't have an account?{" "}
            <Link
              to="/register"
              className="text-blue-700 font-semibold hover:underline"
            >
              Register
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
