import { useState } from "react";
import { usePostAuthLoginVerify } from "@/infrastructure/kubb"; 
import { toast } from "sonner";

interface VerifyInParams {
  email: string;
  otp: string;
}

interface VerifyInResponse {
  token: string;
  user: {
    id: number;
    email: string;
    firstName: string;
    lastName: string | null;
    country: string | null;
    dob: string | null;
  };
}

export function useVerifyIn() {
  const [isPending, setIsPending] = useState(false);
  const { mutateAsync: postVerify } = usePostAuthLoginVerify();

  const verify = async ({ email, otp }: VerifyInParams): Promise<VerifyInResponse | undefined> => {
    if (!email || !otp) {
      toast("Email dan OTP harus diisi.", { className: "bg-red-500 text-white p-4 w-80" });
      return;
    }

    setIsPending(true);
    try {
      const response = await postVerify({ data: { email, otp } });

      if (response?.token) {
        localStorage.setItem("token", response.token);
      }

      toast("OTP berhasil diverifikasi", {
        description: <span className="text-black">Selamat datang, {response.user.firstName}!</span>,
        className: "p-6 text-lg w-80",
      });

      return response;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      const message =
        err.response?.status === 400
          ? "OTP salah atau sudah kadaluarsa."
          : err.response?.data?.message || err.message || "Verifikasi gagal.";

      toast(message, {
        className: "p-6 text-lg w-80 bg-red-500 text-white",
      });

      throw err;
    } finally {
      setIsPending(false);
    }
  };

  return {
    verify,
    isPending,
  };
}
