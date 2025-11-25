import { Search, Menu, Bell, User, Moon, Sun, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { useTheme } from "next-themes";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export const Navigation = () => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const navigate = useNavigate();
  const { user, signOut } = useAuth();

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleSignOut = async () => {
    await signOut();
    navigate('/auth');
  };

  return (
    <nav className="sticky top-0 z-50 border-b border-border bg-card/80 backdrop-blur-lg">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center gap-8">
            <h1 className="font-display text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent">
              NewsFlow
            </h1>
            
            <div className="hidden md:flex items-center gap-6">
              <a href="#" className="text-sm font-medium transition-colors hover:text-accent">
                Home
              </a>
              <a href="#" className="text-sm font-medium transition-colors hover:text-accent">
                For You
              </a>
              <a href="#" className="text-sm font-medium transition-colors hover:text-accent">
                Following
              </a>
              <a href="#" className="text-sm font-medium transition-colors hover:text-accent">
                Trending
              </a>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <div className={`hidden md:flex items-center gap-2 transition-all ${isSearchOpen ? 'w-64' : 'w-10'}`}>
              {isSearchOpen ? (
                <Input
                  type="search"
                  placeholder="Search news..."
                  className="w-full"
                  autoFocus
                  onBlur={() => setIsSearchOpen(false)}
                />
              ) : (
                <Button 
                  variant="ghost" 
                  size="icon"
                  onClick={() => setIsSearchOpen(true)}
                >
                  <Search className="h-5 w-5" />
                </Button>
              )}
            </div>

            <Button variant="ghost" size="icon" className="hidden md:flex">
              <Bell className="h-5 w-5" />
            </Button>

            {mounted && (
              <div className="flex items-center gap-2">
                <Sun className="h-4 w-4" />
                <Switch
                  checked={theme === "dark"}
                  onCheckedChange={(checked) => setTheme(checked ? "dark" : "light")}
                />
                <Moon className="h-4 w-4" />
              </div>
            )}

            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <User className="h-5 w-5" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleSignOut}>
                    <LogOut className="mr-2 h-4 w-4" />
                    Sign Out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Button variant="ghost" size="icon" onClick={() => navigate('/auth')}>
                <User className="h-5 w-5" />
              </Button>
            )}

            <Button variant="ghost" size="icon" className="md:hidden">
              <Menu className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
};
