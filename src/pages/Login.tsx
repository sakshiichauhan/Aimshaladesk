import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import asset from "@/assets/asset.jpg";
import { toast } from "sonner";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch } from "../store";
import { loginUser } from "../store/slices/authSlice";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

export default function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const authState = useSelector((state: any) => state.auth);

  useEffect(() => {
    if (authState.token) {
      navigate("/desk/platform/activities");
    }
    if (authState.error) {
      toast.error(authState.error);
    }
  }, [authState.token, authState.error, navigate]);

  const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    dispatch(loginUser({ email, password }));
  };

  // Development mode bypass function
  const handleDevBypass = () => {
    if (import.meta.env.DEV) {
      // Create a mock auth state that mimics a successful login
      const mockAuthState = {
        user: {
          id: "dev-user",
          email: "dev@example.com",
          role: "admin",
        },
        token: "dev-token",
        loading: false,
        error: null,
        expiresAt: Date.now() + 60 * 60 * 1000, // 1 hour from now
      };

      // Save to localStorage to persist the dev session
      localStorage.setItem("authState", JSON.stringify(mockAuthState));

      // Reload the page to apply the auth state
      window.location.reload();
    }
  };

  return (
    <div className="h-screen flex justify-center items-center">
      <LoginForm onSubmit={handleLogin} loading={authState.loading} />
      {/* Development mode bypass button */}
      {import.meta.env.DEV && (
        <Button
          type="button"
          variant="brand"
          className="absolute bottom-4 right-4 opacity-50 hover:opacity-100"
          onClick={handleDevBypass}
        >
          Dev Mode Login
        </Button>
      )}
    </div>
  );
}

function LoginForm({
  className,
  onSubmit,
  loading,
  ...props
}: React.ComponentProps<"form"> & {
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  loading?: boolean;
}) {
  return (
    <form
      className={cn("flex flex-col gap-6", className)}
      onSubmit={onSubmit}
      {...props}
    >
      <Card className="overflow-hidden p-0 max-w-5xl">
        <CardContent className="grid p-0 md:grid-cols-2">
          <div className="p-6 md:p-8">
            <div className="flex flex-col gap-6">
              <div className="flex flex-col items-center text-center">
                <h1 className="text-2xl font-semibold">Welcome back</h1>
                <p className="text-muted-foreground text-balance">
                  Login to your Admin Account
                </p>
              </div>
              <div className="grid gap-3">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="Enter your Email Address"
                  required
                />
              </div>
              <div className="grid gap-3">
                <div className="flex items-center">
                  <Label htmlFor="password">Password</Label>
                </div>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  placeholder="Enter your password"
                  required
                />
              </div>
              <Button type="submit" className="w-full mt-8" disabled={loading}>
                {loading ? "Logging in..." : "Login"}
              </Button>
            </div>
          </div>
          <div className="bg-muted relative hidden md:block">
            <img
              src={asset}
              alt="Image"
              className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
            />
          </div>
        </CardContent>
      </Card>
    </form>
  );
}