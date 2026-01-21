"use client";

import React, { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
    InputOTP,
    InputOTPGroup,
    InputOTPSlot,
} from "@/components/ui/input-otp";
import { useVerifyIn } from "@/application/hooks/auth/useVerifyIn";
import { Spinner } from "@/components/ui/spinner";

export default function VerifyOTPPage() {
    const router = useRouter();
    const [otp, setOtp] = useState("");
    const [timeLeft, setTimeLeft] = useState(30);
    const [isResending, setIsResending] = useState(false);
    const searchParams = useSearchParams();
    const email = searchParams.get("email") || "ex***@gmail.com";
    const maskedEmail = maskEmail(email);
    const { verify, isPending } = useVerifyIn();

    useEffect(() => {
        if (timeLeft <= 0) return;
        const timer = setInterval(() => {
            setTimeLeft((prev) => prev - 1);
        }, 1000);
        return () => clearInterval(timer);
    }, [timeLeft]);

    function maskEmail(email: string) {
        const [name, domain] = email.split("@");
        if (!name || !domain) return email;
        const firstChar = name[0];
        return `${firstChar}***@${domain}`;
    }

    const handleResend = () => {
        setIsResending(true);
        setTimeout(() => {
            setTimeLeft(30);
            setIsResending(false);
        }, 1000);
    };

    const handleVerify = async () => {
        try {
            const data = await verify({ email, otp });
            if (data) {
                router.push("/");
            }
        } catch (err) {
           
        }
    }

    return (
        <div className="min-h-screen w-full bg-[#F8F9FA] flex flex-col items-center">
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="w-full max-w-[450px] min-h-screen flex flex-col p-6 md:p-8"
            >

                <header className="flex-none space-y-6 pt-4">
                    <button
                        onClick={() => router.back()}
                        className="w-10 h-10 flex items-center justify-center rounded-full bg-white border border-gray-100 shadow-sm hover:bg-gray-50 transition-all"
                    >
                        <ChevronLeft className="h-5 w-5 text-gray-600" />
                    </button>

                    <div className="space-y-2">
                        <h1 className="text-2xl font-bold text-[#1A1A1A]">
                            Masukkan kode OTP
                        </h1>
                        <p className="text-[14px] text-muted-foreground leading-relaxed">
                            Please enter the verification code we sent <br />
                            to your email <span className="text-blue-500 font-medium">{maskedEmail}</span>
                        </p>
                    </div>
                </header>

                <main className="flex-1 flex flex-col justify-center space-y-10 py-10">
                    <div className="flex justify-center">
                        <InputOTP
                            maxLength={5}
                            value={otp}
                            onChange={(val) => setOtp(val)}
                        >
                            <InputOTPGroup className="gap-3">
                                {[0, 1, 2, 3, 4].map((index) => (
                                    <InputOTPSlot
                                        key={index}
                                        index={index}
                                        className="w-12 h-14 md:w-14 md:h-16 text-lg font-bold border-gray-200 rounded-xl bg-white focus:ring-2 focus:ring-[#1B2B36] transition-all"
                                    />
                                ))}
                            </InputOTPGroup>
                        </InputOTP>
                    </div>

                    <div className="text-center space-y-2">
                        <div className="text-sm text-gray-400">
                            Not yet get?{" "}
                            <button
                                onClick={handleResend}
                                disabled={timeLeft > 0 || isResending}
                                className={`font-semibold transition-colors ${timeLeft > 0 ? "text-gray-300 cursor-not-allowed" : "text-blue-600 hover:text-blue-800"
                                    }`}
                            >
                                Resend OTP
                            </button>
                        </div>

                        <AnimatePresence mode="wait">
                            {timeLeft > 0 && (
                                <motion.p
                                    key="timer"
                                    initial={{ opacity: 0, y: -5 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: 5 }}
                                    className="text-sm text-blue-500 font-medium"
                                >
                                    00:{timeLeft < 10 ? `0${timeLeft}` : timeLeft} <span className="text-gray-400 font-normal">sce left</span>
                                </motion.p>
                            )}
                        </AnimatePresence>
                    </div>
                </main>

                <footer className="flex-none pb-6 md:pb-10">
                    <motion.div whileTap={{ scale: 0.98 }}>
                        <Button
                            disabled={otp.length < 5 || isPending}
                            onClick={handleVerify}
                            className="w-full h-14 bg-[#1B2B36] hover:bg-[#121d24] text-white font-semibold text-lg rounded-xl shadow-lg disabled:opacity-50 disabled:bg-gray-400 transition-all"
                        >
                            {isPending ? <Spinner /> : "Login"}
                        </Button>
                    </motion.div>
                </footer>

            </motion.div>
        </div>
    );
}