import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { AlertCircle, CheckCircle2, Loader2, Lock, Mail } from "lucide-react";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/useAuth";

const AuthForm = () => {
  const navigate = useNavigate();
  const { signUpWithEmail, signInWithEmail, loading } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSignUp, setIsSignUp] = useState(false);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setSuccessMessage("");

    try {
      if (isSignUp) {
        await signUpWithEmail(email, password);
        setSuccessMessage("Account created successfully! Redirecting...");
        setTimeout(() => {
          navigate("/");
        }, 1500);
      } else {
        await signInWithEmail(email, password);
        setSuccessMessage("Login successfully! Redirecting...");
        setTimeout(() => {
          navigate("/");
        }, 1500);
      }
    } catch (error) {
      console.log("Error", error);
      setError("Incorrect email or password.");
    }
  };

  const toggleForm = () => {
    setIsSignUp(!isSignUp);
    setEmail("");
    setPassword("");
    setError("");
    setSuccessMessage("");
  };

  return (
    <div className="flex min-h-[80vh] items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        <Card className="glass border-border/50">
          <CardHeader className="space-y-2 pb-2 text-center">
            <CardTitle className="text-2xl font-bold">
              {isSignUp ? "Create an account" : "Welcome back"}
            </CardTitle>
            <CardDescription>
              {isSignUp
                ? "Start your journey with unlimited entertainment"
                : "Sign in to continue watching your favorites"}
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-4">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-sm font-medium">
                  Email
                </Label>
                <div className="relative">
                  <Mail className="text-muted-foreground absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2" />
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@example.com"
                    required
                    autoComplete="email"
                    className="bg-secondary/50 focus-visible:ring-primary h-11 border-0 pl-10 focus-visible:ring-2"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="text-sm font-medium">
                  Password
                </Label>
                <div className="relative">
                  <Lock className="text-muted-foreground absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2" />
                  <Input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
                    required
                    autoComplete={
                      isSignUp ? "new-password" : "current-password"
                    }
                    className="bg-secondary/50 focus-visible:ring-primary h-11 border-0 pl-10 focus-visible:ring-2"
                  />
                </div>
              </div>

              <Button
                type="submit"
                className="gradient-bg h-11 w-full rounded-xl font-semibold transition-opacity hover:opacity-90"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Processing...
                  </>
                ) : isSignUp ? (
                  "Create Account"
                ) : (
                  "Sign In"
                )}
              </Button>
            </form>

            <div className="text-muted-foreground mt-6 text-center text-sm">
              {isSignUp ? (
                <>
                  Already have an account?{" "}
                  <button
                    onClick={toggleForm}
                    className="text-primary font-semibold hover:underline"
                  >
                    Sign In
                  </button>
                </>
              ) : (
                <>
                  Don't have an account?{" "}
                  <button
                    onClick={toggleForm}
                    className="text-primary font-semibold hover:underline"
                  >
                    Sign Up
                  </button>
                </>
              )}
            </div>

            {successMessage && (
              <div
                className={cn(
                  "mt-4 flex items-center gap-2 rounded-xl p-4",
                  "border border-green-500/20 bg-green-500/10 text-green-500"
                )}
              >
                <CheckCircle2 className="h-5 w-5" />
                <span className="text-sm font-medium">{successMessage}</span>
              </div>
            )}

            {error && (
              <div
                className={cn(
                  "mt-4 flex items-center gap-2 rounded-xl p-4",
                  "bg-destructive/10 text-destructive border-destructive/20 border"
                )}
              >
                <AlertCircle className="h-5 w-5" />
                <span className="text-sm font-medium">{error}</span>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AuthForm;
