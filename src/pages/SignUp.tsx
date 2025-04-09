
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

const SignUp = () => {
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
    } catch (error: any) {
      setError(error.message || "Failed to sign in with Google.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleWhatsappDialogOpen = () => {
    setWhatsappDialogOpen(true);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-grow flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-md space-y-8">
          <div className="text-center">
            <h2 className="mt-6 text-3xl font-bold tracking-tight text-gray-900">
              Create your account
            </h2>
            <p className="mt-2 text-sm text-gray-600">
              Already have an account?{" "}
              <Link
                to="/signin"
                className="font-medium text-[#006a5a] hover:text-[#80ffeb]"
              >
                Sign in
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
                <span>Sign up with Google</span>
              </Button>
              
              <Button
                type="button"
                variant="outline"
                className="w-full flex justify-center items-center gap-2 py-6 opacity-70"
                onClick={handleWhatsappDialogOpen}
              >
                <Phone className="h-5 w-5" />
                <span>Sign up with WhatsApp</span>
                <span className="ml-2 text-xs bg-gray-200 text-gray-700 px-2 py-1 rounded-full">Coming Soon</span>
              </Button>
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

export default SignUp;
