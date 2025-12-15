import { Button } from "@/components/ui/button";
import googleLogo from "@/assets/icons/google-logo.svg";
import Image from "next/image";
const GoogleLogin = () => {
  return (
    <Button variant="outline" className="cursor-pointer">
      <Image src={googleLogo} alt="Google Logo" width={20} height={20} />
      <p>Sign In with Google</p>
    </Button>
  );
};

export default GoogleLogin;
