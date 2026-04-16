"use client";
import React from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const loginSchema = z.object({
  email: z.string().email("Invalid email format"),
  password: z.string().min(1, "Password is required"),
});

type FormData = z.infer<typeof loginSchema>;

export default function Login() {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: FormData) => {
    try {
      const storedUsers = JSON.parse(localStorage.getItem("users") || "[]");

      if (storedUsers.length === 0) {
        toast.error("No registered user found");
        return;
      }

      const user = storedUsers.find(
        (u: any) =>
          u.email === data.email &&
          u.password === data.password
      );

      if (!user) {
        toast.error("Invalid email or password");
        return;
      }

      localStorage.setItem("currentUser", JSON.stringify(user));

      toast.success("Login successful");

      router.push("/userdashboard");

    } catch (error) {
      console.error(error);
      toast.error("Login failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-blue-500 to-blue-200">

      <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-lg">

        <h2 className="text-2xl font-bold text-center mb-6">
          Login
        </h2>
        <p className='text-center text-gray-600 mb-4'>
                    Login to your account to access the dashboard and manage your courses!
        </p>

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">

          <div>
            <label className="block text-sm font-bold text-gray-700 mb-1">Email:</label>
            <input
              type="email"
              placeholder="Email"
              {...register("email")}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.email && (
              <p className="error">{errors.email.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-bold text-gray-700 mb-1 ">Password:</label>
            <input
              type="password"
              placeholder="Password"
              autoComplete="newpassword"
              {...register("password")}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.password && (
              <p className="error">{errors.password.message}</p>
            )}
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition disabled:bg-gray-400"
          >
            {isSubmitting ? "Logging in..." : "Login"}
          </button>

          <p className="text-sm text-center text-gray-600">
            Don't have an account?{" "}
            <Link
              href="/auth/register"
              className="text-blue-600 hover:underline font-medium"
            >
              Register
            </Link>
          </p>

        </form>

      </div>
    </div>
  );
}