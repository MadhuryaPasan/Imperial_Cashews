import { Button } from "@/components/ui/button";
import { ArrowLeft, Home } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const pageNotFound = () => {
  const Navigate = useNavigate();
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background px-4 text-center">
      <div className="mx-auto max-w-md space-y-6">
        <div className="space-y-2">
          <h1 className="text-8xl font-bold tracking-tighter text-destructive">
            404
          </h1>
          <h2 className="text-3xl font-bold tracking-tight text-destructive">Page not found</h2>
          <p className="text-muted-foreground">
            Sorry, we couldn't find the page you're looking for. It might have
            been moved or deleted.
          </p>
        </div>

        <div className="flex flex-col gap-2 sm:flex-row sm:justify-center">
          <Button variant="outline" size="lg" asChild>
            <Link to="/" className="gap-2" onClick={() => Navigate(-1)}>
              <ArrowLeft className="h-4 w-4" />
              Go back
            </Link>
          </Button>
          <Button size="lg" asChild>
            <Link to="/" className="gap-2">
              <Home className="h-4 w-4" />
              Back to home
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default pageNotFound;
