"use client";
import Image from "next/image";
import keyImage from "@/assets/icons/key.png";
import { Button } from "@/components/ui/button";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useRef } from "react";
import { useTokenCheck } from "@/hooks/auth.hook";
export default function TokenCheck() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const calledRef = useRef(false);

  const { mutate: tokenCheck, isPending, isSuccess } = useTokenCheck();

  useEffect(() => {
    if (!token || calledRef.current) return;

    calledRef.current = true;
    tokenCheck(token);
  }, [token, tokenCheck]);

  useEffect(() => {
    if (isSuccess && token) {
      router.push(`/reset-password?token=${token}`);
    }
  }, [isSuccess, token, router]);

  if (isPending) {
    return (
      <section className="flex items-center justify-center min-h-[87vh]">
        <p className="text-lg font-medium">Verifying token...</p>
      </section>
    );
  }

  return (
    <section className="flex flex-col items-center justify-center min-h-[87vh] p-3">
      <div className="border rounded-lg p-8 flex flex-col items-center gap-2">
        <Image src={keyImage} alt="key" width={48} height={48} />
        <h2 className="text-xl font-medium">This token has been expired</h2>
        <Button onClick={() => router.push("/forgot-password")}>
          Try Again
        </Button>
      </div>
    </section>
  );
}
