import { Button } from "@/components/ui/button";
import { Film, Home, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="container mx-auto flex min-h-[70vh] max-w-7xl items-center justify-center px-4">
      <div className="text-center">
        <div className="relative mb-6 inline-block">
          <h1 className="gradient-text text-9xl font-bold">404</h1>
          <Sparkles className="text-accent absolute -top-4 -right-4 h-8 w-8 animate-pulse" />
        </div>
        <h2 className="text-foreground mb-4 text-3xl font-bold">
          Page Not Found
        </h2>
        <p className="text-muted-foreground mx-auto mb-8 max-w-md text-lg">
          Oops! The page you're looking for seems to have vanished into the
          void.
        </p>
        <div className="flex flex-col justify-center gap-4 sm:flex-row">
          <Button
            asChild
            className="gradient-bg h-12 rounded-full px-8 hover:opacity-90"
          >
            <Link to="/">
              <Home className="mr-2 h-5 w-5" />
              Go Home
            </Link>
          </Button>
          <Button
            variant="outline"
            asChild
            className="border-primary/50 hover:bg-primary/10 h-12 rounded-full px-8"
          >
            <Link to="/movies">
              <Film className="mr-2 h-5 w-5" />
              Browse Movies
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
