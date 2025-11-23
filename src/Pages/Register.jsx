import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import {useAuth} from '../Contexts/AuthContext'

export default function Register() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [showPassword, setShowPassword] = useState(false);

  const {user, setUser, newUserRegister} = useAuth();

  const onSubmit = (data) => {
    newUserRegister(data)
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-b from-gray-50 to-gray-100 p-6">
      <div className="w-full max-w-4xl bg-white rounded-2xl shadow-lg overflow-hidden grid md:grid-cols-2">
        {/* Left hero / illustration */}
        <div className="hidden md:flex flex-col items-center justify-center bg-linear-to-tr from-blue-600 to-indigo-600 p-10 text-white gap-6">
          <div className="w-32 h-32 rounded-full bg-white/10 flex items-center justify-center text-3xl font-extrabold">
            BM
          </div>
          <h3 className="text-3xl font-bold">Welcome to BharatMart</h3>
          <p className="text-sm max-w-xs text-blue-100">
            Create your account and get started building your e-commerce frontend
            with React. Clean UI, responsive layout and client-side validation.
          </p>
          <div className="mt-4 text-xs bg-white/10 px-3 py-1 rounded-full">
            Designed with Tailwind CSS
          </div>
        </div>

        {/* Right: form */}
        <div className="p-8 md:p-10">
          <h2 className="text-2xl font-bold text-gray-800 text-center">Create account</h2>
          <p className="text-sm text-gray-500 text-center mb-6">
            Already have an account?{" "}
            <Link to="/login" className="text-indigo-600 hover:underline">
              Sign in
            </Link>
          </p>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Username</label>
              <input
                {...register("username", { required: "Username is required", minLength: { value: 3, message: "Min 3 characters" } })}
                className={`mt-1 w-full rounded-md border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-300 ${errors.username ? "border-red-300" : "border-gray-200"}`}
                placeholder="your_username"
              />
              {errors.username && <p className="text-red-500 text-xs mt-1">{errors.username.message}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Full name</label>
              <input
                {...register("name", { required: "Name is required" })}
                className={`mt-1 w-full rounded-md border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-300 ${errors.name ? "border-red-300" : "border-gray-200"}`}
                placeholder="John Doe"
              />
              {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Email</label>
              <input
                type="email"
                {...register("email", {
                  required: "Email is required",
                  pattern: { value: /^\S+@\S+$/i, message: "Invalid email address" },
                })}
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
                  {...register("password", { required: "Password is required", minLength: { value: 6, message: "Min 6 characters" } })}
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

            <button
              type="submit"
              className="w-full mt-2 inline-flex items-center justify-center gap-2 rounded-lg bg-indigo-600 px-4 py-2 text-white font-medium hover:bg-indigo-700 transition"
            >
              Create account
            </button>

            <div className="pt-3 text-center text-xs text-gray-400">
              By creating an account you agree to our <span className="text-indigo-600">terms</span>.
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}