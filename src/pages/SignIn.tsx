
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Google, Phone } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

const SignIn = () => {
  const navigate = useNavigate();
  const { signInWithProvider } = useAuth();
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [whatsappDialogOpen, setWhatsappDialogOpen] = useState(false);

  const handleGoogleSignIn = async () => {
    try {
      setIsLoading(true);
      setError("");
      await signInWithProvider("google");
      navigate("/dashboard");
    } catch (error: any) {
      setError(error.message || "Failed to sign in with Google.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleWhatsappDialogOpen = () => {
    setWhatsappDialogOpen(true);
  };

  const fillDemoCredentials = (type: 'user' | 'admin') => {
    console.log(`Demo ${type} credentials would normally be filled here`);
    // This functionality is now obsolete with Google-only auth
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
                className="font-medium text-[#006a5a] hover:text-[#80ffeb]"
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
          
          <div className="mt-8 space-y-6">
            <div className="space-y-4">
              <Button
                type="button"
                variant="outline"
                className="w-full flex justify-center items-center gap-2 py-6"
                onClick={handleGoogleSignIn}
                disabled={isLoading}
              >
                <Google className="h-5 w-5" />
                <span>{isLoading ? "Signing in..." : "Sign in with Google"}</span>
              </Button>
              
              <Button
                type="button"
                variant="outline"
                className="w-full flex justify-center items-center gap-2 py-6 opacity-70"
                onClick={handleWhatsappDialogOpen}
              >
                <Phone className="h-5 w-5" />
                <span>Sign in with WhatsApp</span>
                <span className="ml-2 text-xs bg-gray-200 text-gray-700 px-2 py-1 rounded-full">Coming Soon</span>
              </Button>
            </div>
            
            <div className="bg-gray-50 p-4 rounded-md border border-gray-200 text-left">
              <h3 className="text-sm font-medium text-gray-700 mb-2">Note:</h3>
              <div className="mt-2 text-xs text-gray-500">
                <p>We've switched to Google authentication for enhanced security and convenience.</p>
                <p>WhatsApp login will be available soon!</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <Dialog open={whatsappDialogOpen} onOpenChange={setWhatsappDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>WhatsApp Login Coming Soon</DialogTitle>
            <DialogDescription>
              We're working on implementing WhatsApp login functionality. This feature will be available in the near future. Please use Google login for now.
            </DialogDescription>
          </DialogHeader>
          <div className="flex justify-end">
            <Button 
              onClick={() => setWhatsappDialogOpen(false)}
              className="bg-[#006a5a] hover:bg-[#80ffeb] hover:text-[#006a5a]"
            >
              Close
            </Button>
          </div>
        </DialogContent>
      </Dialog>
      
      <Footer />
    </div>
  );
};

export default SignIn;
