import { cn } from "@/lib/utils";

interface AnimatedHamburgerProps {
  isOpen: boolean;
  onClick?: () => void;
  className?: string;
}

export const AnimatedHamburger = ({
  isOpen,
  onClick,
  className,
}: AnimatedHamburgerProps) => {
  return (
    <button
      onClick={onClick}
      className={cn(
        "hover:bg-accent focus-visible:ring-ring relative flex h-9 w-9 items-center justify-center rounded-md transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2",
        className
      )}
      aria-label={isOpen ? "Close menu" : "Open menu"}
      aria-expanded={isOpen}
    >
      <div className="relative flex h-4 w-5 flex-col justify-between">
        <span
          className={cn(
            "bg-foreground absolute left-0 h-0.5 w-5 origin-center rounded-full transition-all duration-300 ease-out",
            isOpen
              ? "top-1/2 -translate-y-1/2 rotate-45"
              : "top-0 translate-y-0 rotate-0"
          )}
        />
        <span
          className={cn(
            "bg-foreground absolute top-1/2 left-0 h-0.5 -translate-y-1/2 rounded-full transition-all duration-300 ease-out",
            isOpen ? "w-0 opacity-0" : "w-5 opacity-100"
          )}
        />
        <span
          className={cn(
            "bg-foreground absolute left-0 h-0.5 w-5 origin-center rounded-full transition-all duration-300 ease-out",
            isOpen
              ? "bottom-1/2 translate-y-1/2 -rotate-45"
              : "bottom-0 translate-y-0 rotate-0"
          )}
        />
      </div>
    </button>
  );
};
