import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginUser } from "../../services/authService";
import { useAuth } from "../../context/AuthContext";
import toast from "react-hot-toast";



const loginSchema = z.object({
  email: z
    .string()
    .min(1, "Email is required")
    .email("Please enter a valid email"),

  password: z
    .string()
    .min(6, "Password must be at least 6 characters"),
});

function LoginForm() {
  const navigate = useNavigate();
  const { login } = useAuth();   

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data) => {
  try {
    const response = await loginUser(data);

    login(response.token);

    toast.success(response.message);

    navigate("/dashboard");
  } catch (error) {
    toast.error(
      error.response?.data?.message || "Login Failed"
    );
  }
};

  return (
    <div className="w-full max-w-md">

      <h1 className="text-5xl font-bold text-white">
        Welcome Back
      </h1>

      <p className="mt-4 leading-7 text-[#888888]">
        Track your applications, analyze your resume using AI and
        accelerate your career.
      </p>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="mt-12 space-y-6"
      >
        {/* Email */}

        <div>
          <label className="mb-2 block text-sm text-[#E0E0E0]">
            Email
          </label>

          <input
            type="email"
            placeholder="Enter your email"
            {...register("email")}
            className="w-full rounded-xl border border-[#2C2C2C] bg-[#1A1A1A] px-5 py-4 text-white outline-none transition-all focus:border-white"
          />

          {errors.email && (
            <p className="mt-2 text-sm text-red-400">
              {errors.email.message}
            </p>
          )}
        </div>

        {/* Password */}

        <div>
          <label className="mb-2 block text-sm text-[#E0E0E0]">
            Password
          </label>

          <input
            type="password"
            placeholder="Enter your password"
            {...register("password")}
            className="w-full rounded-xl border border-[#2C2C2C] bg-[#1A1A1A] px-5 py-4 text-white outline-none transition-all focus:border-white"
          />

          {errors.password && (
            <p className="mt-2 text-sm text-red-400">
              {errors.password.message}
            </p>
          )}
        </div>

        {/* Remember + Forgot */}

        <div className="flex items-center justify-between">
          <label className="flex items-center gap-2 text-sm text-[#888888]">
            <input type="checkbox" />
            Remember me
          </label>

          <button
            type="button"
            className="text-sm text-[#888888] transition hover:text-white"
          >
            Forgot Password?
          </button>
        </div>

        {/* Submit */}

        <button
          type="submit"
          className="w-full rounded-xl bg-[#E0E0E0] py-4 font-semibold text-[#121212] transition hover:bg-white"
        >
          Sign In
        </button>

        {/* Register */}

        <p className="text-center text-[#888888]">
          Don't have an account?

          <Link
            to="/register"
            className="ml-2 font-medium text-white hover:underline"
          >
            Register
          </Link>
        </p>
      </form>
    </div>
  );
}

export default LoginForm;