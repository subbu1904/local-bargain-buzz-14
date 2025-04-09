
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Facebook, Github, Mail } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const SignIn = () => {
  const navigate = useNavigate();
  const { signIn, signInWithProvider } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);
    
    try {
      await signIn(email, password);
      // Check if the user is admin and redirect accordingly
      if (email === "admin@flipssi.com") {
        navigate("/admin");
      } else {
        navigate("/dashboard");
      }
    } catch (error: any) {
      setError(error.message || "Failed to sign in.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleProviderSignIn = async (provider: 'google' | 'facebook' | 'twitter') => {
    try {
      await signInWithProvider(provider);
    } catch (error) {
      console.error("Social sign-in error:", error);
    }
  };

  const fillDemoCredentials = (type: 'user' | 'admin') => {
    if (type === 'user') {
      setEmail("demo@flipssi.com");
      setPassword("demo123");
    } else {
      setEmail("admin@flipssi.com");
      setPassword("admin123");
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-grow flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-md space-y-8">
          <div className="text-left">
            <h2 className="mt-6 text-3xl font-bold tracking-tight text-gray-900">
              Sign in to your account
            </h2>
            <p className="mt-2 text-sm text-gray-600">
              Or{" "}
              <Link
                to="/signup"
                className="font-medium text-flipssi-purple hover:text-purple-500"
              >
                create a new account
              </Link>
            </p>
          </div>
          
          {error && (
            <Alert variant="destructive">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
          
          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            <div className="space-y-4">
              <div className="text-left">
                <Label htmlFor="email">Email address</Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  placeholder="Enter your email"
                />
              </div>
              
              <div className="text-left">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password">Password</Label>
                  <Link
                    to="/forgot-password"
                    className="text-sm font-medium text-flipssi-purple hover:text-purple-500"
                  >
                    Forgot your password?
                  </Link>
                </div>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  placeholder="Enter your password"
                />
              </div>
            </div>

            <Button
              type="submit"
              className="w-full bg-flipssi-purple hover:bg-purple-700"
              disabled={isLoading}
            >
              {isLoading ? "Signing in..." : "Sign in"}
            </Button>
            
            <div className="bg-gray-50 p-4 rounded-md border border-gray-200 text-left">
              <h3 className="text-sm font-medium text-gray-700 mb-2">Demo Accounts:</h3>
              <div className="grid grid-cols-2 gap-2">
                <Button 
                  type="button" 
                  variant="outline" 
                  size="sm"
                  onClick={() => fillDemoCredentials('user')}
                  className="text-xs"
                >
                  Use Demo User
                </Button>
                <Button 
                  type="button" 
                  variant="outline" 
                  size="sm"
                  onClick={() => fillDemoCredentials('admin')}
                  className="text-xs"
                >
                  Use Demo Admin
                </Button>
              </div>
              <div className="mt-2 text-xs text-gray-500">
                <div><span className="font-semibold">Regular User:</span> demo@flipssi.com / demo123</div>
                <div><span className="font-semibold">Admin:</span> admin@flipssi.com / admin123</div>
              </div>
            </div>
            
            <div className="relative mt-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">Or continue with</span>
              </div>
            </div>
            
            <div className="grid grid-cols-3 gap-3">
              <Button
                type="button"
                variant="outline"
                onClick={() => handleProviderSignIn("google")}
              >
                <Mail className="h-5 w-5" />
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={() => handleProviderSignIn("facebook")}
              >
                <Facebook className="h-5 w-5" />
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={() => handleProviderSignIn("twitter")}
              >
                <Github className="h-5 w-5" />
              </Button>
            </div>
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default SignIn;
