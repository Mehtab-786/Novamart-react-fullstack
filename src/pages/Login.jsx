import { useState } from 'react'
import { Eye, EyeOff, Mail, Lock } from 'lucide-react'

function Login() {
  const [showPassword, setShowPassword] = useState(false)

  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-lg p-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-800 mb-1">Login</h1>
          <p className="text-slate-500 text-sm">Please login to continue.</p>
        </div>

        {/* Form */}
        <div className="space-y-4">
          {/* Email Field */}
          <div className="relative">
            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
              <Mail size={20} />
            </div>
            <input
              type="email"
              placeholder="Email"
              className="w-full pl-12 pr-4 py-3.5 bg-slate-50 border-0 rounded-xl text-slate-700 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-300"
            />
          </div>

          {/* Password Field */}
          <div className="relative">
            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
              <Lock size={20} />
            </div>
            <input
              type={showPassword ? "text" : "password"}
              placeholder="••••••••••••"
              className="w-full pl-12 pr-12 py-3.5 bg-slate-50 border-0 rounded-xl text-slate-700 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-300"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition"
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>


          {/* Login Button */}
          <button
            type="submit"
            className="w-full bg-slate-800 text-white py-3.5 rounded-xl font-semibold hover:bg-slate-700 transition duration-200 mt-2"
          >
            Login
          </button>
        </div>

        {/* Sign Up Link */}
        <div className="mt-6 text-center">
          <p className="text-slate-500 text-sm">
            Don't have an account?{' '}
            <button className="text-slate-800 font-semibold hover:text-slate-600 transition">
              Sign Up
            </button>
          </p>
        </div>
      </div>
    </div>
  )
}

export default Login