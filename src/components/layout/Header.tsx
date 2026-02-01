import { useNavigate } from "react-router-dom";
import { Bell, Search, User, Menu, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Logo from "@/components/ui/Logo";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";

interface HeaderProps {
  onMenuClick?: () => void;
  showSearch?: boolean;
}

const Header = ({ onMenuClick, showSearch = true }: HeaderProps) => {
  const navigate = useNavigate();

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-card/95 backdrop-blur-md shadow-sm transition-all duration-300 animate-slide-down">
      <div className="flex h-16 items-center justify-between px-4 md:px-6">
        {/* Left Section */}
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={onMenuClick}
            className="lg:hidden transition-all duration-300 hover:scale-110 active:scale-95"
          >
            <Menu className="h-5 w-5 transition-transform duration-300" />
          </Button>
          
          <div 
            className="flex items-center gap-3 cursor-pointer transition-all duration-300 hover:scale-105 active:scale-95" 
            onClick={() => navigate("/")}
          >
            <div className="flex items-center gap-2">
              <Logo className="h-10" />
            </div>
            <div className="hidden md:block">
              <h1 className="text-lg font-bold text-foreground transition-colors duration-300">JanSeva</h1>
              <p className="text-xs text-muted-foreground">Citizen Grievance Portal</p>
            </div>
          </div>
        </div>

        {/* Search Bar */}
        {showSearch && (
          <div className="hidden md:flex max-w-md flex-1 mx-8">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search complaints, services..."
                className="pl-10 bg-secondary/50 border-border transition-all duration-300 focus:bg-white focus:shadow-md focus:scale-[1.02]"
              />
            </div>
          </div>
        )}

        {/* Right Section */}
        <div className="flex items-center gap-2">
          {/* Language Selector */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="hidden sm:flex transition-all duration-300 hover:scale-110 hover:rotate-12 active:scale-95">
                <Globe className="h-5 w-5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Select Language</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>English</DropdownMenuItem>
              <DropdownMenuItem>हिंदी</DropdownMenuItem>
              <DropdownMenuItem>தமிழ்</DropdownMenuItem>
              <DropdownMenuItem>తెలుగు</DropdownMenuItem>
              <DropdownMenuItem>मराठी</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Notifications */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="relative transition-all duration-300 hover:scale-110 active:scale-95">
                <Bell className="h-5 w-5 transition-transform duration-300 hover:animate-pulse" />
                <Badge className="absolute -right-1 -top-1 h-5 w-5 rounded-full p-0 flex items-center justify-center bg-saffron text-xs animate-pulse-glow">
                  3
                </Badge>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-80">
              <DropdownMenuLabel>Notifications</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="flex flex-col items-start gap-1 py-3">
                <span className="font-medium">Complaint #12345 Updated</span>
                <span className="text-xs text-muted-foreground">Your complaint has been assigned to an officer</span>
              </DropdownMenuItem>
              <DropdownMenuItem className="flex flex-col items-start gap-1 py-3">
                <span className="font-medium">SLA Warning</span>
                <span className="text-xs text-muted-foreground">Complaint #12340 approaching deadline</span>
              </DropdownMenuItem>
              <DropdownMenuItem className="flex flex-col items-start gap-1 py-3">
                <span className="font-medium">Complaint Resolved</span>
                <span className="text-xs text-muted-foreground">Complaint #12330 has been resolved</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Profile Menu */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="rounded-full transition-all duration-300 hover:scale-110 active:scale-95">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary transition-all duration-300 hover:shadow-lg">
                  <User className="h-4 w-4 text-primary-foreground" />
                </div>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => navigate("/profile")}>
                Profile Settings
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => navigate("/complaint-history")}>
                My Complaints
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => navigate("/")}>
                Help & Support
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem 
                className="text-destructive"
                onClick={() => navigate("/login")}
              >
                Sign Out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
};

export default Header;
