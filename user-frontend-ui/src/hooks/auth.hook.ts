import { loginUser, registerUser, verifyUser } from "@/services/AuthService";
import { useMutation } from "@tanstack/react-query";
import { FieldValues } from "react-hook-form";
import { toast } from "sonner";

export const useUserRegistration = () => {
  return useMutation<any, Error, FieldValues>({
    mutationKey: ["REGISTER_USER"],
    mutationFn: async (userData) => await registerUser(userData),
    onSuccess: () => {
      toast.success(
        "OTP sent to the email. Please verify to complete registration."
      );
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};

export const useVerifyUser = () => {
  return useMutation<any, Error, FieldValues>({
    mutationKey: ["VERIFY_USER"],
    mutationFn: async (userData) => await verifyUser(userData),
    onSuccess: () => {
      toast.success("User registered successfully.");
    },
    onError: (error) => {
      console.log({ error });
      toast.error(error.message);
    },
  });
};

export const useLoginUser = () => {
  return useMutation<any, Error, FieldValues>({
    mutationKey: ["LOGIN_USER"],
    mutationFn: async (userData) => await loginUser(userData),
    onSuccess: () => {
      toast.success("User logged in successfully.");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};
