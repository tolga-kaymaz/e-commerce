import { useForm } from "react-hook-form"
import { useDispatch, useSelector } from "react-redux"
import { useHistory } from "react-router-dom"
import { toast } from "react-toastify"
import { loginUser } from "../store/reducers/clientReducer"
import { useEffect } from "react"

function LoginPage() {
  const dispatch = useDispatch()
  const history = useHistory()

  const user = useSelector((state) => state.client.user)

  useEffect(() => {
  if (user?.email) {
    if (user.role_id === 3) {
      history.push("/xk92admin")
    } else {
      history.push("/")
    }
  }
}, [user])

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm()

  const onSubmit = async (data) => {
  try {
    await dispatch(loginUser(
      { email: data.email, password: data.password },
      data.rememberMe
    ))
   
     
    
  } catch (err) {
    toast.error(err.response?.data?.message || "Login failed. Please try again.")
  }
}

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-16">
      <div className="w-full max-w-md bg-white shadow-md rounded-lg p-8">
        <h1 className="text-2xl font-bold text-[#252B42] text-center mb-8">Login</h1>

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
          {/* Email */}
          <div className="flex flex-col gap-1">
            <label className="text-sm font-semibold text-[#252B42]">Email</label>
            <input
              type="email"
              placeholder="Your email"
              className="border border-gray-300 rounded px-4 py-2 text-sm focus:outline-none focus:border-[#23A6F0]"
              {...register("email", {
                required: "Email is required",
                pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: "Invalid email address" },
              })}
            />
            {errors.email && <p className="text-red-500 text-xs">{errors.email.message}</p>}
          </div>

          {/* Password */}
          <div className="flex flex-col gap-1">
            <label className="text-sm font-semibold text-[#252B42]">Password</label>
            <input
              type="password"
              placeholder="Password"
              className="border border-gray-300 rounded px-4 py-2 text-sm focus:outline-none focus:border-[#23A6F0]"
              {...register("password", {
                required: "Password is required",
              })}
            />
            {errors.password && <p className="text-red-500 text-xs">{errors.password.message}</p>}
          </div>

          {/* Remember Me */}
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="rememberMe"
              className="w-4 h-4 accent-[#23A6F0]"
              {...register("rememberMe")}
            />
            <label htmlFor="rememberMe" className="text-sm text-gray-600">Remember Me</label>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="bg-[#23A6F0] text-white py-3 rounded font-semibold text-sm mt-2 hover:bg-blue-600 transition-colors disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {isSubmitting ? (
              <>
                <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                </svg>
                Logging in...
              </>
            ) : (
              "Login"
            )}
          </button>

          {/* Signup Link */}
          <p className="text-center text-sm text-gray-500">
            Don't have an account?{" "}
            <a href="/signup" className="text-[#23A6F0] font-semibold hover:underline">Sign Up</a>
          </p>
        </form>
      </div>
    </div>
  )
}

export default LoginPage