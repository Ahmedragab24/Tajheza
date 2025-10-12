import { getCsrfToken, refreshCsrfToken } from "@/lib/csrf";
import { UserInfoType } from "@/types/Auth/Auth";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

interface LoginResponse {
  user: UserInfoType;
  token: string;
  message: string;
}

interface RegisterResponse {
  otp: number;
  invitation_status: boolean;
  message: string;
  status_code: number;
}

interface SocialRegisterResponse {
  token: string;
  user: {
    id: number;
    name: string;
    phone: string;
    email: string;
    login_type: string;
    fcm: string;
    email_verified_at: string;
    invitation_code: string;
    updated_at: string;
    created_at: string;
  };
  message: string;
  status_code: number;
}

interface ForgetPasswordResponse {
  status: boolean;
  message: string;
  code: string;
}

interface ResetPasswordResponse {
  data: [];
  message: string;
  status_code: number;
}

export const AuthApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_API_URL,
    prepareHeaders: async (headers) => {
      await refreshCsrfToken();
      const csrfToken = getCsrfToken();
      if (csrfToken) {
        headers.set("X-XSRF-TOKEN", csrfToken);
      }
      headers.set("X-Requested-With", "XMLHttpRequest");
      return headers;
    },
  }),
  endpoints: (builder) => ({
    Register: builder.mutation<RegisterResponse, FormData>({
      query: (body) => ({
        url: `/register`,
        method: "POST",
        body,
      }),
    }),

    SocialRegister: builder.mutation<SocialRegisterResponse, FormData>({
      query: (body) => ({
        url: `/social-login`,
        method: "POST",
        body,
      }),
    }),

    Login: builder.mutation<LoginResponse, FormData>({
      query: (body) => ({
        url: `/login`,
        method: "POST",
        body,
      }),
    }),

    VerifyOtp: builder.mutation<LoginResponse, FormData>({
      query: (body) => ({
        url: `/verify-otp`,
        method: "POST",
        body,
      }),
    }),

    ResendOtp: builder.mutation<LoginResponse, FormData>({
      query: (body) => ({
        url: `/verify-reset-otp`,
        method: "POST",
        body,
      }),
    }),

    ForgotPassword: builder.mutation<ForgetPasswordResponse, FormData>({
      query: (body) => ({
        url: `/send-reset-otp`,
        method: "POST",
        body,
      }),
    }),

    ResetPassword: builder.mutation<
      ResetPasswordResponse,
      { body: FormData; token: string | null }
    >({
      query: (body) => ({
        url: `/reset-password`,
        method: "POST",
        body,
      }),
    }),

    Logout: builder.mutation<LoginResponse, string | null>({
      query: (token) => ({
        url: `/logout`,
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
    }),

    DeleteAccount: builder.mutation<
      LoginResponse,
      { token: string | null; body: FormData }
    >({
      query: ({ token, body }) => ({
        url: `/delete-account`,
        method: "DELETE",
        body,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
    }),
  }),
});

export const {
  useRegisterMutation,
  useLoginMutation,
  useVerifyOtpMutation,
  useLogoutMutation,
  useResetPasswordMutation,
  useResendOtpMutation,
  useForgotPasswordMutation,
  useSocialRegisterMutation,
  useDeleteAccountMutation,
} = AuthApi;
