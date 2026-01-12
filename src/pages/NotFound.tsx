import { Button } from "@/components/ui/button";
import { Film, Home, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="container mx-auto max-w-7xl flex items-center justify-center min-h-[70vh] px-4">
      <div className="text-center">
        <div className="relative inline-block mb-6">
          <h1 className="text-9xl font-bold gradient-text">404</h1>
          <Sparkles className="absolute -top-4 -right-4 h-8 w-8 text-accent animate-pulse" />
        </div>
        <h2 className="text-3xl font-bold text-foreground mb-4">
          Page Not Found
        </h2>
        <p className="text-muted-foreground mb-8 max-w-md mx-auto text-lg">
          Oops! The page you're looking for seems to have vanished into the
          void.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button
            asChild
            className="rounded-full gradient-bg hover:opacity-90 h-12 px-8"
          >
            <Link to="/">
              <Home className="h-5 w-5 mr-2" />
              Go Home
            </Link>
          </Button>
          <Button
            variant="outline"
            asChild
            className="rounded-full h-12 px-8 border-primary/50 hover:bg-primary/10"
          >
            <Link to="/movies">
              <Film className="h-5 w-5 mr-2" />
              Browse Movies
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
