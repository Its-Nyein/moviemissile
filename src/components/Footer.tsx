import { Heart } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-border bg-card/50 mt-auto border-t">
      <div className="container mx-auto max-w-7xl px-4 py-6">
        <div className="text-muted-foreground flex flex-col items-center justify-between gap-4 text-sm md:flex-row">
          <p className="flex items-center gap-1">
            Made with{" "}
            <Heart className="h-3.5 w-3.5 fill-red-500 text-red-500" /> using
            React
          </p>

          <p>
            Data provided by{" "}
            <a
              href="https://www.themoviedb.org/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary font-medium hover:underline"
            >
              TMDB
            </a>
          </p>

          <p>&copy; {currentYear} Moviemissile</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
