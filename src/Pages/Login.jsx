import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";

export default function Login() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [showPassword, setShowPassword] = useState(false);

  const onSubmit = (data) => {
    console.log("Login data:", data);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-gray-50 to-gray-100 p-6">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">
        <h2 className="text-2xl font-bold text-gray-800 text-center">Sign in to your account</h2>
        <p className="text-sm text-gray-500 text-center mb-6">
          Don't have an account?{" "}
          <Link to="/register" className="text-indigo-600 hover:underline">
            Create one
          </Link>
        </p>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              {...register("email", { required: "Email required", pattern: { value: /^\S+@\S+$/i, message: "Invalid email" } })}
              className={`mt-1 w-full rounded-md border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-300 ${errors.email ? "border-red-300" : "border-gray-200"}`}
              placeholder="you@example.com"
            />
            {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Password</label>
            <div className="mt-1 relative">
              <input
                type={showPassword ? "text" : "password"}
                {...register("password", { required: "Password required" })}
                className={`w-full rounded-md border px-3 py-2 pr-12 focus:outline-none focus:ring-2 focus:ring-indigo-300 ${errors.password ? "border-red-300" : "border-gray-200"}`}
                placeholder="********"
              />
              <button
                type="button"
                onClick={() => setShowPassword((s) => !s)}
                className="absolute right-2 top-1/2 -translate-y-1/2 text-sm text-gray-500 hover:text-gray-700"
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>
            {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>}
          </div>

          <div className="flex items-center justify-between text-sm">
            <label className="flex items-center gap-2">
              <input type="checkbox" {...register("remember")} className="h-4 w-4 rounded border-gray-300" />
              <span className="text-gray-600">Remember me</span>
            </label>
            <a href="#" className="text-indigo-600 hover:underline">Forgot?</a>
          </div>

          <button
            type="submit"
            className="w-full mt-2 inline-flex items-center justify-center gap-2 rounded-lg bg-indigo-600 px-4 py-2 text-white font-medium hover:bg-indigo-700 transition"
          >
            Sign in
          </button>
        </form>
      </div>
    </div>
  );
}
