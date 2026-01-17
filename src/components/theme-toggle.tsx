import { useTheme } from "@/components/use-theme";
import { cn } from "@/lib/utils";
import { Moon, Sun } from "lucide-react";

export function ThemeToggle({ className }: { className?: string }) {
  const { theme, setTheme } = useTheme();
  const isDark = theme === "dark";

  return (
    <button
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className={cn(
        "relative inline-flex h-9 w-9 items-center justify-center overflow-hidden rounded-lg",
        "text-muted-foreground hover:text-foreground",
        "hover:bg-muted transition-colors duration-200",
        className
      )}
      aria-label="Toggle theme"
    >
      <Sun
        className={cn(
          "absolute h-5 w-5 transition-all duration-500",
          isDark
            ? "scale-100 rotate-0 opacity-100"
            : "scale-0 rotate-90 opacity-0"
        )}
      />
      <Moon
        className={cn(
          "absolute h-5 w-5 transition-all duration-500",
          isDark
            ? "scale-0 -rotate-90 opacity-0"
            : "scale-100 rotate-0 opacity-100"
        )}
      />
    </button>
  );
}
