import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import API from "../api.js";

const Login = () => {
  const navigate = useNavigate();
  const [values, setValues] = useState({
    email: "",
    password: "",
  });

  const onChangeHandle = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post("/api/user/login", values, {
        withCredentials: true,
      });

      // Save JWT token
      localStorage.setItem("token", res.data.token);

      toast.success(res.data.message || "Logged in successfully 🎉");
      navigate("/dashboard");
    } catch (error) {
      console.error(error);
      toast.error(
        error.response?.data?.message || error.message || "Login failed!"
      );
    }
  };

  return (
    <div className="flex h-screen justify-center items-center bg-gradient-to-br from-blue-50 to-blue-100">
      <div className="bg-white shadow-lg rounded-xl p-8 w-[90vw] md:w-[50vw] lg:w-[30vw]">
        <h1 className="text-4xl font-bold text-center text-blue-800 mb-2">
          Taskify
        </h1>
        <h3 className="text-center text-gray-600 mb-6">
          Login to your account 🚀
        </h3>

        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={values.email}
              onChange={onChangeHandle}
              className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
              placeholder="Enter your email"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              name="password"
              value={values.password}
              onChange={onChangeHandle}
              className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
              placeholder="Enter your password"
              required
            />
          </div>

          <button
            type="submit"
            className="mt-4 bg-blue-800 text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-900 transition-all duration-200"
          >
            Login
          </button>

          <p className="text-center text-gray-600 text-sm mt-3">
            Don't have an account?{" "}
            <Link
              to="/register"
              className="text-blue-800 font-medium hover:underline"
            >
              Register
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
