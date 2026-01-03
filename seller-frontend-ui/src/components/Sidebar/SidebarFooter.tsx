import { BadgeCheck, ChevronsUpDown, LogOut } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { useAppSelector } from "@/redux/hook";
import { Separator } from "../ui/separator";
import { Link } from "react-router";

export default function SidebarFooter() {
  const { seller } = useAppSelector((state) => state.auth);

  return (
    <section>
      <Separator className="mb-3" />
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button className="flex w-full items-center gap-2 p-2 rounded-lg hover:bg-accent cursor-pointer">
            <Avatar className="h-11 w-11 rounded-lg">
              <AvatarImage src={seller?.avatar} alt={seller?.name} />
              <AvatarFallback className="rounded-lg uppercase">
                {seller?.name.slice(0, 1)}
              </AvatarFallback>
            </Avatar>
            <div className="grid flex-1 text-left text-sm leading-tight">
              <span className="truncate font-medium">{seller?.name}</span>
              <span className="truncate text-xs">{seller?.email}</span>
            </div>
            <ChevronsUpDown className="ml-auto size-4" />
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
          side={"bottom"}
          align="end"
          sideOffset={4}
        >
          <DropdownMenuLabel className="p-0 font-normal">
            <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
              <Avatar className="h-8 w-8 rounded-lg">
                <AvatarImage src={seller?.avatar} alt={seller?.name} />
                <AvatarFallback className="rounded-lg uppercase">
                  {seller?.name.slice(0, 1)}
                </AvatarFallback>
              </Avatar>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-medium">{seller?.name}</span>
                <span className="truncate text-xs">{seller?.email}</span>
              </div>
            </div>
          </DropdownMenuLabel>

          <DropdownMenuSeparator />

          <Link to="/dashboard/profile">
            <DropdownMenuItem className="py-2">
              <BadgeCheck />
              Profile
            </DropdownMenuItem>
          </Link>
          <DropdownMenuItem className="py-2">
            <LogOut />
            Log out
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </section>
  );
}
