import { Input } from "@/components/ui/input";
import { Search, Bell, Maximize, Command } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ModeToggle } from "@/components/mode-toggle";
import AimshalaLogo from "@/assets/logos/aimshala-light.png";
import AimshalaLogoDark from "@/assets/logos/aimshala_dark.png";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { useTheme } from "@/components/theme-provider";
import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "@/store/slices/authSlice";
import { useNavigate } from "react-router-dom";

interface NavbarProps {}

export default function Navbar({}: NavbarProps) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { theme } = useTheme();
  const dark = theme === "dark";
  const { user } = useSelector((state: any) => state.auth);
  const searchInputRef = useRef<HTMLInputElement>(null);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  const toggleFullScreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch((err) => {
        console.error(`Error enabling fullscreen: ${err.message}`);
      });
    } else {
      document.exitFullscreen();
    }
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        searchInputRef.current?.focus();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <header
      className={`flex h-15 items-center justify-between border-b bg-[var(--background)] px-[20px]  w-full overflow-hidden top-0 left-0 ${
        dark ? "dark" : ""
      }`}
    >
      <div className="flex items-left gap-2 lg:gap-2 md:gap-4">
        <div className="flex items-center gap-10">
          <div>
            {dark ? (
              <img
                src={AimshalaLogoDark}
                alt="aimshalaLogo"
                className="h-[34px] w-auto"
              />
            ) : (
              <img
                src={AimshalaLogo}
                alt="aimshalaLogo"
                className="h-[34px] w-auto"
              />
            )}
          </div>
          <div className="relative hidden md:block">
            <Search className="absolute left-2.5 top-1/2 transform -translate-y-1/2 h-4 w-4 text-[var(--text)] z-10" />
            <div className="relative">
              <Input
                ref={searchInputRef}
                type="search"
                placeholder="Search..."
                className="w-[260px] pl-8 pr-20 md:w-[270px] bg-[var(--faded)] dark:bg-[var(--faded)] rounded-[4px] h-[38px] border-0"
              />
              <div className="absolute right-4 top-1/2 transform -translate-y-1/2 flex items-center gap-1">
                <Command className="h-3 w-3 text-[var(--text)]" />
                <span className="text-xs text-[var(--text)]">|</span>
                <span className="text-xs text-[var(--text)]">K</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex items-center lg:gap-3 gap-6">
        <button onClick={toggleFullScreen}>
          <Maximize className="h-5 w-5 border-0 text-[var(--text)]" />
        </button>
        <Search className="h-5 w-5 border-0 text-[var(--text)] block md:hidden" />
        <ModeToggle />
        <div className="relative">
          <div className="w-4 h-4 py-0.5 rounded-full bg-[var(--red)] text-white text-[8px] text-center absolute -top-2 -right-1">
            3
          </div>
          <Bell className=" text-[var(--text)] h-5 w-5" />
        </div>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="faded"
              className="flex items-center h-full md:pt-4  md:pb-4  md:px-5 p-0 rounded-0"
            >
              <Avatar className="md:h-10 md:w-10">
                <AvatarImage
                  src={`https://a.aimshala.com/${user?.image}` || "https://github.com/shadcn.png"}
                  // src={"https://github.com/shadcn.png"}

                  alt={user?.name || "name"}
                />
              </Avatar>
              <div>
                <span className="hidden md:block text-[var(--text-head)]">
                  {user?.name || "User"}
                  {/* {"user"} */}
                </span>
                <span className="text-xs font-light">
                  @{user?.username || "username"}
                  {/* {"username"} */}
                </span>
              </div>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="p-2" align="end">
            <DropdownMenuItem>Profile</DropdownMenuItem>
            <DropdownMenuItem>Settings</DropdownMenuItem>
            <DropdownMenuItem onClick={handleLogout}>Logout</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
