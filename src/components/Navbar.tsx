import { ThemeToggle } from "@/components/theme-toggle";
import { AnimatedHamburger } from "@/components/ui/animated-hamburger";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import { Bookmark, Film, Home, LogOut, Search, Tv } from "lucide-react";
import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import profilePoster from "../assets/fallback-img.png";
import { useAuth } from "../context/useAuth";

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, logout } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/login");
    } catch (error) {
      console.log("Logout Error", error);
    }
  };

  const profilePath = user?.photoURL === null ? profilePoster : user?.photoURL;
  const closeMobileMenu = () => setMobileMenuOpen(false);

  const navLinks = [
    { href: "/", label: "Home", icon: Home },
    { href: "/movies", label: "Movies", icon: Film },
    { href: "/shows", label: "TV Shows", icon: Tv },
  ];

  const isActiveLink = (href: string) => {
    if (href === "/") return location.pathname === "/";
    return location.pathname.startsWith(href);
  };

  return (
    <nav className="bg-background/95 supports-backdrop-filter:bg-background/60 border-border sticky top-0 z-50 border-b backdrop-blur">
      <div className="container mx-auto flex h-14 max-w-7xl items-center justify-between px-4">
        <div className="flex items-center gap-8">
          <Link to="/" className="text-foreground text-lg font-bold">
            Moviemissile
          </Link>

          <div className="hidden items-center gap-6 md:flex">
            {navLinks
              .filter((link) => link.href !== "/")
              .map((link) => (
                <Link
                  key={link.href}
                  to={link.href}
                  className={cn(
                    "text-sm font-medium transition-colors",
                    isActiveLink(link.href)
                      ? "text-foreground"
                      : "text-muted-foreground hover:text-foreground"
                  )}
                >
                  {link.label}
                </Link>
              ))}
          </div>
        </div>

        <div className="hidden items-center gap-2 md:flex">
          <Button variant="ghost" size="icon" asChild className="h-9 w-9">
            <Link to="/search">
              <Search className="h-4 w-4" />
            </Link>
          </Button>

          <ThemeToggle />

          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="relative h-8 w-8 rounded-full"
                >
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={profilePath ?? undefined} alt="User" />
                    <AvatarFallback className="bg-muted text-muted-foreground text-sm">
                      {user.email?.charAt(0).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <div className="flex items-center gap-2 p-2">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={profilePath ?? undefined} />
                    <AvatarFallback className="bg-muted text-sm">
                      {user.email?.charAt(0).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium">{user.email}</p>
                  </div>
                </div>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link to="/watchlist" className="cursor-pointer">
                    <Bookmark className="mr-2 h-4 w-4" />
                    Watchlist
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onClick={handleLogout}
                  className="text-destructive focus:text-destructive cursor-pointer"
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  Log out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Button asChild size="sm">
              <Link to="/login">Sign in</Link>
            </Button>
          )}
        </div>

        <div className="flex items-center gap-1 md:hidden">
          <Button variant="ghost" size="icon" asChild className="h-9 w-9">
            <Link to="/search">
              <Search className="h-4 w-4" />
            </Link>
          </Button>
          <ThemeToggle />
          <AnimatedHamburger
            isOpen={mobileMenuOpen}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          />
          <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
            <SheetContent side="bottom" className="px-4 pt-4 pb-8">
              <div className="mb-4 flex justify-center">
                <div className="bg-muted-foreground/30 h-1.5 w-12 rounded-full" />
              </div>

              <SheetHeader className="sr-only">
                <SheetTitle>Navigation Menu</SheetTitle>
              </SheetHeader>

              <div className="mb-6 grid grid-cols-3 gap-3">
                {navLinks.map((link, index) => {
                  const Icon = link.icon;
                  return (
                    <Link
                      key={link.href}
                      to={link.href}
                      onClick={closeMobileMenu}
                      className={cn(
                        "animate-menu-item flex flex-col items-center justify-center gap-2 rounded-xl p-4 transition-all",
                        isActiveLink(link.href)
                          ? "bg-primary text-primary-foreground"
                          : "bg-muted/50 text-muted-foreground hover:bg-muted hover:text-foreground"
                      )}
                      style={{ animationDelay: `${index * 50}ms` }}
                    >
                      <Icon className="h-6 w-6" />
                      <span className="text-xs font-medium">{link.label}</span>
                    </Link>
                  );
                })}
              </div>

              {user ? (
                <div
                  className="animate-menu-item"
                  style={{ animationDelay: "150ms" }}
                >
                  <div className="bg-muted/50 mb-3 flex items-center gap-3 rounded-xl p-3">
                    <Avatar className="h-10 w-10">
                      <AvatarImage src={profilePath ?? undefined} />
                      <AvatarFallback className="bg-muted text-sm">
                        {user.email?.charAt(0).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-medium">
                        {user.email}
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <Link
                      to="/watchlist"
                      onClick={closeMobileMenu}
                      className="bg-muted/50 text-foreground hover:bg-muted animate-menu-item flex items-center justify-center gap-2 rounded-xl p-3 transition-colors"
                      style={{ animationDelay: "200ms" }}
                    >
                      <Bookmark className="h-4 w-4" />
                      <span className="text-sm font-medium">Watchlist</span>
                    </Link>
                    <button
                      onClick={() => {
                        handleLogout();
                        closeMobileMenu();
                      }}
                      className="bg-destructive/10 text-destructive hover:bg-destructive/20 animate-menu-item flex items-center justify-center gap-2 rounded-xl p-3 transition-colors"
                      style={{ animationDelay: "250ms" }}
                    >
                      <LogOut className="h-4 w-4" />
                      <span className="text-sm font-medium">Log out</span>
                    </button>
                  </div>
                </div>
              ) : (
                <Button
                  className="animate-menu-item w-full"
                  style={{ animationDelay: "150ms" }}
                  onClick={() => {
                    navigate("/login");
                    closeMobileMenu();
                  }}
                >
                  Sign in
                </Button>
              )}
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
