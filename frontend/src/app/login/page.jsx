"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Eye, EyeOff, ArrowRight } from "lucide-react";
import axios from "axios";
import { useRouter } from "next/navigation";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/user/login`,
        {
          email,
          password,
        }
      );

      // Store token and user data
      if (rememberMe) {
        localStorage.setItem("authToken", response.data.token);
        localStorage.setItem("userData", JSON.stringify(response.data.user));
      } else {
        sessionStorage.setItem("authToken", response.data.token);
        sessionStorage.setItem("userData", JSON.stringify(response.data.user));
      }

      // Set authorization header for future requests
      axios.defaults.headers.common["Authorization"] = `Bearer ${response.data.token}`;

      // Redirect based on user role
      const role = response.data.user.role;
      if (role === "presentor") {
        router.push("/presentorview");
      } else if (role === "user") {
        router.push("/room");
      } else {
        router.push("/");
      }

    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
      console.error("Login error:", err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="text-center">
          <h2 className="text-indigo-600 text-3xl font-bold">QuickCast</h2>
          <p className="mt-2 text-gray-600 text-sm">
            Your real-time presentation platform
          </p>
        </div>

        <div className="mt-8 bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <h2 className="mb-8 text-center text-2xl font-bold text-gray-900">
            Log in to your account
          </h2>

          {error && (
            <div className="mb-4 bg-red-100 text-red-800 px-4 py-3 rounded">
              {error}
            </div>
          )}

          <form className="space-y-6" onSubmit={handleLogin}>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Email address
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <div className="mt-1 relative">
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="block w-full px-3 py-2 border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                />
                <button
                  type="button"
                  className="absolute right-3 top-2 text-gray-500"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <label className="flex items-center text-sm text-gray-700">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="h-4 w-4 text-indigo-600 border-gray-300 rounded"
                />
                <span className="ml-2">Remember me</span>
              </label>

              <Link
                href="/forgot-password"
                className="text-sm text-indigo-600 hover:text-indigo-500"
              >
                Forgot your password?
              </Link>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className={`w-full flex justify-center items-center py-2 px-4 rounded-md text-white bg-indigo-600 hover:bg-indigo-700 ${
                isLoading ? "opacity-70 cursor-not-allowed" : ""
              }`}
            >
              {isLoading ? (
                <span className="animate-pulse">Logging in...</span>
              ) : (
                <>
                  Log in <ArrowRight size={16} className="ml-2" />
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
