import { getLocalUser, getUserFromDB } from "@/services/AuthService";
import {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";

export type TUser = {
  _id: string;
  name: string;
  email: string;
  password?: string;
  following: string[];
  avatar?: string | null;
  createdAt: Date;
  updatedAt: Date;
  role: string;
};

export type TUserProviderValues = {
  user: TUser | null;
  setUser: (user: TUser | null) => void;
  isUserLoading: boolean;
  setIsUserLoading: Dispatch<SetStateAction<boolean>>;
};

const UserContext = createContext<TUserProviderValues | null>(null);

const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<TUser | null>(null);
  const [isUserLoading, setIsUserLoading] = useState(true);

  const handleUser = async () => {
    const localUser = await getLocalUser();
    if (localUser?.id && localUser?.email && localUser?.role) {
      const user = await getUserFromDB();
      user ? setUser({ ...user.data, role: localUser.role }) : setUser(null);
    }
    console.log("userFromDB", user);
    setIsUserLoading(false);
  };

  useEffect(() => {
    handleUser();
  }, [isUserLoading]);

  return (
    <UserContext.Provider
      value={{ user, setUser, isUserLoading, setIsUserLoading }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);

  if (context === undefined || context === null) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};

export default UserProvider;
