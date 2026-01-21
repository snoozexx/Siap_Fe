"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { useForm } from "react-hook-form";
import { useLogin } from "@/application/hooks/auth/useLogin";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Mail, Lock, Eye, EyeOff, AlertCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Spinner } from "@/components/ui/spinner";

interface LoginFormValues {
  email: string;
  password: string;
}

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();
  const { login, isPending } = useLogin();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>();

  const onSubmit = async (data: LoginFormValues) => {
    try {
      const response = await login({ 
        email: data.email, 
        password: data.password 
      });

      toast.success("Login Berhasil", {
        description: <span className="text-black">{response?.message || "verify Login"}</span>,
        icon: <Image src="/images/logo.png" alt="logo" width={24} height={12} className="object-contain" />,
        className: "p-4",
      });

      router.push(`/auth/verify-in?email=${encodeURIComponent(data.email)}`);
      
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {

      const errorMessage =
        err.response?.status === 401
          ? "Email atau password salah."
          : err.response?.data?.message || err.message || "Terjadi kesalahan pada server.";

      toast.error("Gagal Login", {
        description: errorMessage,
        className: "p-4 bg-red-50 text-red-900 border-red-200",
        duration: 4000,
      });
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-[#F8F9FA] p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-[450px]"
      >
        <Card className="border-none shadow-none bg-transparent">
          <CardHeader className="flex flex-col items-start p-4 space-y-2">
            <div className="relative w-48 h-16 mb-4">
              <Image
                src="/images/logo.png"
                alt="SIAP Logo"
                fill
                className="object-contain object-left"
                priority
              />
            </div>

            <h1 className="text-3xl font-bold text-[#1A1A1A] leading-tight">
              Sign in <br /> your account
            </h1>
            <p className="text-muted-foreground text-[15px] leading-relaxed">
              SIAP mobile app services to users scheduling appointments, or accessing records.
            </p>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6" noValidate>
              
              <div className="space-y-2">
                <Label htmlFor="email" className="text-[15px] font-semibold text-[#1A1A1A]">
                  Email
                </Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <Input
                    {...register("email", { 
                      required: "Email wajib diisi",
                      pattern: {
                        value: /\S+@\S+\.\S+/,
                        message: "Format email tidak valid"
                      }
                    })}
                    id="email"
                    type="email"
                    placeholder="example@gmail.com"
                    className={`pl-10 h-12 bg-white border-gray-200 rounded-xl focus-visible:ring-[#003366] ${errors.email ? 'border-red-500' : ''}`}
                  />
                </div>
                <AnimatePresence>
                  {errors.email && (
                    <motion.span 
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="text-xs text-red-500 flex items-center gap-1"
                    >
                      <AlertCircle className="w-3 h-3" /> {errors.email.message}
                    </motion.span>
                  )}
                </AnimatePresence>
              </div>

              {/* Input Password */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password" className="text-[15px] font-semibold text-[#1A1A1A]">
                    Password
                  </Label>
                </div>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <Input
                    {...register("password", { required: "Password wajib diisi" })}
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Password"
                    className={`pl-10 pr-10 h-12 bg-white border-gray-200 rounded-xl focus-visible:ring-[#003366] ${errors.password ? 'border-red-500' : ''}`}
                  />
                  <button
                    type="button" 
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 focus:outline-none"
                  >
                    {showPassword ? <Eye className="h-5 w-5" /> : <EyeOff className="h-5 w-5" />}
                  </button>
                </div>
                {errors.password && (
                  <span className="text-xs text-red-500 flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" /> {errors.password.message}
                  </span>
                )}
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Checkbox id="remember" className="rounded-[4px] border-gray-300" />
                  <label htmlFor="remember" className="text-sm font-medium text-gray-500 cursor-pointer select-none">
                    Remember me
                  </label>
                </div>
                <Link
                  href="/forgot-password"
                  className="text-sm font-medium text-gray-400 hover:text-[#003366] transition-colors underline underline-offset-4"
                >
                  Forgot Password?
                </Link>
              </div>

              <motion.div whileTap={{ scale: 0.98 }}>
                <Button
                  type="submit"
                  disabled={isPending}
                  className="w-full h-14 bg-[#1B2B36] hover:bg-[#121d24] text-white font-semibold text-lg rounded-xl shadow-lg transition-all flex items-center justify-center gap-2"
                >
                  {isPending ? (
                    <>
                      <Spinner className="w-5 h-5" />
                      <span>Memproses...</span>
                    </>
                  ) : (
                    "Kirim Kode OTP"
                  )}
                </Button>
              </motion.div>
            </form>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}