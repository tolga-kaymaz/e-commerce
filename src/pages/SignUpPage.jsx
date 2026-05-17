import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { useHistory } from "react-router-dom"
import { Eye, EyeOff } from "lucide-react"
import { useDispatch, useSelector } from "react-redux"
import { fetchRoles } from "../store/reducers/clientReducer"
import axiosInstance from "../api/axios"

function SignUpPage() {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)
  const history = useHistory()

  const dispatch = useDispatch()
  const roles = useSelector((state) => state.client.roles)

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({ defaultValues: { role_id: "" } })

  const selectedRole = watch("role_id")
  const password = watch("password")

  useEffect(() => {
    dispatch(fetchRoles())
  }, [])

  const storeRole = roles.find((r) => r.name?.toLowerCase() === "store" || r.name?.toLowerCase() === "mağaza")
  const isStore = selectedRole === String(storeRole?.id)

  const onSubmit = async (data) => {
    setIsLoading(true)
    setError("")

    const payload = isStore
      ? {
          name: data.name,
          email: data.email,
          password: data.password,
          role_id: Number(data.role_id),
          store: {
            name: data.store_name,
            phone: data.store_phone,
            tax_no: data.store_tax_no,
            bank_account: data.store_bank_account,
          },
        }
      : {
          name: data.name,
          email: data.email,
          password: data.password,
          role_id: Number(data.role_id),
        }

    try {
      await axiosInstance.post("/signup", payload)
      alert("You need to click link in email to activate your account!")
      history.goBack()
    } catch (err) {
      setError(err.response?.data?.message || "An error occurred. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-16">
      <div className="w-full max-w-md bg-white shadow-md rounded-lg p-8">
        <h1 className="text-2xl font-bold text-[#252B42] text-center mb-8">Create Account</h1>

        {error && (
          <div className="bg-red-50 border border-red-300 text-red-600 text-sm px-4 py-3 rounded mb-6">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
          {/* Name */}
          <div className="flex flex-col gap-1">
            <label className="text-sm font-semibold text-[#252B42]">Name</label>
            <input
              type="text"
              placeholder="Your name"
              className="border border-gray-300 rounded px-4 py-2 text-sm focus:outline-none focus:border-[#23A6F0]"
              {...register("name", {
                required: "Name is required",
                minLength: { value: 3, message: "Name must be at least 3 characters" },
              })}
            />
            {errors.name && <p className="text-red-500 text-xs">{errors.name.message}</p>}
          </div>

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
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                className="w-full border border-gray-300 rounded px-4 py-2 text-sm focus:outline-none focus:border-[#23A6F0] pr-10"
                {...register("password", {
                  required: "Password is required",
                  minLength: { value: 8, message: "Password must be at least 8 characters" },
                  pattern: {
                    value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&.,_\-])[A-Za-z\d@$!%*?&.,_\-]{8,}$/,
                    message: "Must include uppercase, lowercase, number and special character",
                  },
                })}
              />
              <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
            {errors.password && <p className="text-red-500 text-xs">{errors.password.message}</p>}
          </div>

          {/* Confirm Password */}
          <div className="flex flex-col gap-1">
            <label className="text-sm font-semibold text-[#252B42]">Confirm Password</label>
            <div className="relative">
              <input
                type={showConfirm ? "text" : "password"}
                placeholder="Confirm password"
                className="w-full border border-gray-300 rounded px-4 py-2 text-sm focus:outline-none focus:border-[#23A6F0] pr-10"
                {...register("confirm_password", {
                  required: "Please confirm your password",
                  validate: (value) => value === password || "Passwords do not match",
                })}
              />
              <button type="button" onClick={() => setShowConfirm(!showConfirm)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
                {showConfirm ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
            {errors.confirm_password && <p className="text-red-500 text-xs">{errors.confirm_password.message}</p>}
          </div>

          {/* Role */}
          <div className="flex flex-col gap-1">
            <label className="text-sm font-semibold text-[#252B42]">Role</label>
            <select
              className="border border-gray-300 rounded px-4 py-2 text-sm focus:outline-none focus:border-[#23A6F0]"
              {...register("role_id", { required: "Please select a role" })}
            >
              {roles.map((role) => (
                <option key={role.id} value={String(role.id)}>
                  {role.name}
                </option>
              ))}
            </select>
            {errors.role_id && <p className="text-red-500 text-xs">{errors.role_id.message}</p>}
          </div>

          {/* Store Fields */}
          {isStore && (
            <div className="flex flex-col gap-5 border-t pt-5 mt-2">
              <p className="text-sm font-bold text-[#252B42]">Store Information</p>

              <div className="flex flex-col gap-1">
                <label className="text-sm font-semibold text-[#252B42]">Store Name</label>
                <input
                  type="text"
                  placeholder="Store name"
                  className="border border-gray-300 rounded px-4 py-2 text-sm focus:outline-none focus:border-[#23A6F0]"
                  {...register("store_name", {
                    required: "Store name is required",
                    minLength: { value: 3, message: "Store name must be at least 3 characters" },
                  })}
                />
                {errors.store_name && <p className="text-red-500 text-xs">{errors.store_name.message}</p>}
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-sm font-semibold text-[#252B42]">Store Phone</label>
                <input
                  type="text"
                  placeholder="+90 5XX XXX XX XX"
                  className="border border-gray-300 rounded px-4 py-2 text-sm focus:outline-none focus:border-[#23A6F0]"
                  {...register("store_phone", {
                    required: "Phone is required",
                    pattern: {
                      value: /^(\+90|0)?[5][0-9]{9}$/,
                      message: "Invalid Türkiye phone number",
                    },
                  })}
                />
                {errors.store_phone && <p className="text-red-500 text-xs">{errors.store_phone.message}</p>}
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-sm font-semibold text-[#252B42]">Tax ID</label>
                <input
                  type="text"
                  placeholder="TXXXXVXXXXXX"
                  className="border border-gray-300 rounded px-4 py-2 text-sm focus:outline-none focus:border-[#23A6F0]"
                  {...register("store_tax_no", {
                    required: "Tax ID is required",
                    pattern: {
                      value: /^T\d{4}V\d{6}$/,
                      message: "Tax ID must match pattern TXXXXVXXXXXX",
                    },
                  })}
                />
                {errors.store_tax_no && <p className="text-red-500 text-xs">{errors.store_tax_no.message}</p>}
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-sm font-semibold text-[#252B42]">Bank Account (IBAN)</label>
                <input
                  type="text"
                  placeholder="TR00 0000 0000 0000 0000 0000 00"
                  className="border border-gray-300 rounded px-4 py-2 text-sm focus:outline-none focus:border-[#23A6F0]"
                  {...register("store_bank_account", {
                    required: "IBAN is required",
                    pattern: {
                      value: /^TR\d{2}\s?\d{4}\s?\d{4}\s?\d{4}\s?\d{4}\s?\d{4}\s?\d{2}$/,
                      message: "Invalid IBAN address",
                    },
                  })}
                />
                {errors.store_bank_account && <p className="text-red-500 text-xs">{errors.store_bank_account.message}</p>}
              </div>
            </div>
          )}

          {/* Submit */}
          <button
            type="submit"
            disabled={isLoading}
            className="bg-[#23A6F0] text-white py-3 rounded font-semibold text-sm mt-2 hover:bg-blue-600 transition-colors disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {isLoading ? (
              <>
                <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                </svg>
                Signing up...
              </>
            ) : (
              "Sign Up"
            )}
          </button>
        </form>
      </div>
    </div>
  )
}

export default SignUpPage