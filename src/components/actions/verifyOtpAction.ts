"use server";

import { cookies } from "next/headers";
import { NAME_TOKEN_KEY } from "@/lib/auth/auth-client";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export async function verifyOtpAction(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  prevState: any,
  formData: FormData
): Promise<{ success: boolean; message: string; token?: string }> {
  const phone = formData.get("phone") as string;
  const otp = formData.get("otp") as string;

  if (!phone || !otp) {
    if (!otp || otp.length < 6) {
      return { success: false, message: "Please enter a valid 6-digit code." };
    }
    return { success: false, message: "Phone or OTP is missing." };
  }

  const dataOtp = new FormData();
  dataOtp.append("phone", phone);
  dataOtp.append("otp", otp);

  try {
    const res = await fetch(`${API_BASE_URL}/verify-otp`, {
      method: "POST",
      body: dataOtp,
      cache: "no-store",
    });

    const data = await res.json();

    if (!res.ok) {
      return {
        success: false,
        message: data?.message || "OTP verification failed.",
      };
    }

    const token = data?.token;

    if (token) {
      const cookieStore = await cookies();
      cookieStore.set(NAME_TOKEN_KEY, token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        path: "/",
        maxAge: 60 * 60 * 24 * 4, // 4 أيام
      });
    }

    return { success: true, message: "OTP verified successfully.", token };
  } catch (error) {
    console.error("OTP verification error:", error);
    return { success: false, message: "An unexpected error occurred." };
  }
}
