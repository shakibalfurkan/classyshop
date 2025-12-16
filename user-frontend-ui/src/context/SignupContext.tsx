"use client";

import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

type TSignupData = {
  name: string;
  email: string;
  password: string;
};

type TSignupContext = {
  signupData: TSignupData | null;
  setSignupData: React.Dispatch<React.SetStateAction<TSignupData | null>>;
};

const SignupContext = createContext<TSignupContext | null>({
  signupData: null,
  setSignupData: () => {},
});

export function SignupProvider({ children }: { children: ReactNode }) {
  const [signupData, setSignupData] = useState<TSignupData | null>(() => {
    if (typeof window !== "undefined") {
      const storedData = sessionStorage.getItem("signupData");
      return storedData ? JSON.parse(storedData) : null;
    }
    return null;
  });

  useEffect(() => {
    if (signupData) {
      sessionStorage.setItem("signupData", JSON.stringify(signupData));
    } else {
      sessionStorage.removeItem("signupData");
    }
  }, [signupData]);

  return (
    <SignupContext.Provider value={{ signupData, setSignupData }}>
      {children}
    </SignupContext.Provider>
  );
}

export const useSignupContext = () => {
  const context = useContext(SignupContext);
  if (context === null) {
    throw new Error("useSignupContext must be used within a SignupProvider");
  }
  return context;
};

export default SignupProvider;
