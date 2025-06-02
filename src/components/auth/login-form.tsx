
"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { Apple, Mail } from "lucide-react";

import { Button } from "@/components/ui/button";
import { AuthCard } from "./auth-card";
import { useToast } from "@/hooks/use-toast";
import { GoogleLogo } from "@/components/icons/google-logo";
import { TelegramLogo } from "@/components/icons/telegram-logo";

export function LoginForm() {
  const router = useRouter();
  const { toast } = useToast();

  const handleSocialLogin = (provider: string) => {
    toast({
      title: `Login with ${provider} (Demo)`,
      description: `Attempting to log in with ${provider}... Redirecting.`,
    });
    // Simulate API call & redirect
    setTimeout(() => router.push("/dashboard"), 1000);
  };

  const handleEmailLogin = () => {
    toast({
      title: "Login with Email (Demo)",
      description: "Email login form would appear here. Redirecting.",
    });
     // Simulate API call & redirect
    setTimeout(() => router.push("/dashboard"), 1000);
  };

  return (
    <AuthCard
      title="Sign in to Allo"
      description={
        <>
          Not registered yet?{" "}
          <Link href="/register" className="font-medium text-primary hover:underline">
            Sign Up
          </Link>
        </>
      }
    >
      <div className="space-y-4">
        <Button variant="outline" className="w-full justify-start py-3 text-md" onClick={() => handleSocialLogin("Apple")}>
          <Apple className="mr-3 h-5 w-5" />
          Log in with Apple
        </Button>
        <Button variant="outline" className="w-full justify-start py-3 text-md" onClick={() => handleSocialLogin("Telegram")}>
          <TelegramLogo className="mr-3 h-5 w-5" />
          Log in with Telegram
        </Button>
        <Button variant="outline" className="w-full justify-start py-3 text-md" onClick={() => handleSocialLogin("Google")}>
          <GoogleLogo className="mr-3 h-5 w-5" />
          Log in with Google
        </Button>

        <div className="relative my-6">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-background px-2 text-muted-foreground">
              Or continue with
            </span>
          </div>
        </div>

        <Button variant="outline" className="w-full justify-start py-3 text-md" onClick={handleEmailLogin}>
          <Mail className="mr-3 h-5 w-5" />
          Log in with Email
        </Button>

        <div className="text-center mt-4">
          <Link href="#" className="text-sm text-primary hover:underline">
            Forgot password?
          </Link>
        </div>
      </div>
    </AuthCard>
  );
}
