import { Heart } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-border bg-card/50 mt-auto">
      <div className="container mx-auto max-w-7xl px-4 py-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
          <p className="flex items-center gap-1">
            Made with{" "}
            <Heart className="h-3.5 w-3.5 text-red-500 fill-red-500" /> using
            React
          </p>

          <p>
            Data provided by{" "}
            <a
              href="https://www.themoviedb.org/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline font-medium"
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
