import { Spinner } from "@/components/ui/spinner";
import { useGetMeQuery } from "@/redux/features/auth/authApi";
import { setSeller } from "@/redux/features/auth/authSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { useEffect } from "react";

export default function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const { seller, isSellerLoading } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();

  console.log(seller);

  const {
    data: sellerData,
    isLoading: sellerLoading,
    isSuccess: isSellerSuccess,
  } = useGetMeQuery(null);

  useEffect(() => {
    if (sellerData && isSellerSuccess && !sellerLoading) {
      dispatch(setSeller(sellerData.data ?? null));
    }
  }, [
    dispatch,
    isSellerLoading,
    isSellerSuccess,
    seller,
    sellerData,
    sellerLoading,
  ]);

  if (isSellerLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="flex flex-col items-center">
          <Spinner className="size-10" />
          <p className="font-medium">Loading...</p>
        </div>
      </div>
    );
  }

  return <section>{children}</section>;
}
