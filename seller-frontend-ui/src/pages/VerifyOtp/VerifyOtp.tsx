"use client";

import { Button } from "@/components/ui/button";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";

import { useOtpCountdown } from "@/hooks/useOtpCountdown";
import {
  useSignupMutation,
  useVerifySellerMutation,
} from "@/redux/features/auth/authApi";

import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { toast } from "sonner";

export default function VerifyOTP() {
  const [otpValue, setOtpValue] = useState("");
  const navigate = useNavigate();

  const { isActive, timeLeft, start } = useOtpCountdown();
  const storedSignupData = JSON.parse(
    sessionStorage.getItem("signupData") as string
  );

  const [
    verifySeller,
    { data: sellerData, isError, isSuccess: isVerifySuccess, isLoading, error },
  ] = useVerifySellerMutation();

  const [
    signup,
    {
      data: sellerRegisterData,
      isSuccess: isRegisterSuccess,
      isError: isRegisterError,
    },
  ] = useSignupMutation();

  const handleVerifyOtp = () => {
    verifySeller({ ...storedSignupData, otp: otpValue });
  };

  useEffect(() => {
    if (!isLoading && isVerifySuccess) {
      sessionStorage.removeItem("signupData");
    }

    if (!isLoading && isVerifySuccess && sellerData?.success) {
      toast.success(sellerData?.message);
      navigate("/login");
    }

    if (!isLoading && isError && !sellerData?.success) {
      toast.error(
        error && "data" in error && (error.data as { message: string })?.message
      );
    }
  }, [
    isError,
    isLoading,
    isVerifySuccess,
    navigate,
    sellerData?.message,
    sellerData?.success,
    error,
  ]);

  const handleResendOtp = () => {
    signup({ name: storedSignupData.name, email: storedSignupData.email });
  };

  useEffect(() => {
    if (isRegisterSuccess) {
      start();
    }
    if (isRegisterError) {
      toast.error(sellerRegisterData?.message);
    }
  }, [isRegisterSuccess, start, isRegisterError, sellerRegisterData?.message]);

  useEffect(() => {
    start();
  }, [start]);

  return (
    <section className="max-w-7xl mx-auto min-h-[87vh] flex items-center justify-center p-3">
      <div className="p-6 border shadow-sm rounded-lg">
        <div className="mb-10 space-y-2">
          <h1 className="text-2xl font-semibold">Enter Your OTP</h1>
          <p className="text-gray-500">
            Enter the 6 digit code that you received on your email.
          </p>
        </div>
        <div className="mb-6 flex flex-col items-center">
          <InputOTP
            value={otpValue}
            onChange={(value) => setOtpValue(value)}
            maxLength={6}
          >
            <InputOTPGroup className="md:gap-4 gap-2 *:data-[slot=input-otp-slot]:rounded-md *:data-[slot=input-otp-slot]:border">
              <InputOTPSlot className="md:size-13 size-11" index={0} />
              <InputOTPSlot className="md:size-13 size-11" index={1} />
              <InputOTPSlot className="md:size-13 size-11" index={2} />
              <InputOTPSlot className="md:size-13 size-11" index={3} />
              <InputOTPSlot className="md:size-13 size-11" index={4} />
              <InputOTPSlot className="md:size-13 size-11" index={5} />
            </InputOTPGroup>
          </InputOTP>
        </div>
        <div>
          <Button
            onClick={() => handleVerifyOtp()}
            className="w-full cursor-pointer"
          >
            {isLoading ? "Verifying..." : "Verify OTP"}
          </Button>
        </div>
        <div className="mt-4 text-center space-y-1">
          <p className="text-gray-500">Didn&apos;t get the OTP? </p>

          <button
            onClick={() => {
              handleResendOtp();
              start();
            }}
            disabled={isActive}
            className={`text-primary ${
              !isActive && "cursor-pointer"
            } font-semibold text-sm`}
          >
            {isActive ? "Resend OTP in " + timeLeft + "'S" : "RESEND OTP"}
          </button>
          <p className="text-gray-500 text-sm">
            A new OTP has been sent to your email.
          </p>
        </div>
      </div>
    </section>
  );
}
