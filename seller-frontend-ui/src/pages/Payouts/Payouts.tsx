import { Button } from "@/components/ui/button";
import { FaStripeS } from "react-icons/fa";

export default function Payouts() {
  return (
    <section className="min-h-[80vh] flex items-center justify-center">
      <section className="max-w-sm mx-auto text-center p-8 border border-gray-200 rounded-lg shadow-lg">
        <div>
          <h1 className="text-3xl font-semibold mb-3">Withdraw Methods</h1>
          <p className="mb-6">
            This is the Payouts page where sellers can manage their withdraw
            methods.
          </p>
        </div>
        <Button
          variant={"secondary"}
          className="text-white cursor-pointer w-full"
        >
          Connect To Stripe <FaStripeS className="" />
        </Button>
      </section>
    </section>
  );
}
