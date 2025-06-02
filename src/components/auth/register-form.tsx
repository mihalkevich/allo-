
"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { Apple, Mail } from "lucide-react";

import { Button } from "@/components/ui/button";
import { AuthCard } from "./auth-card";
import { useToast } from "@/hooks/use-toast";
import { GoogleLogo } from "@/components/icons/google-logo";
import { TelegramLogo } from "@/components/icons/telegram-logo";

export function RegisterForm() {
  const router = useRouter();
  const { toast } = useToast();

  const handleSocialRegister = (provider: string) => {
    toast({
      title: `Sign up with ${provider} (Demo)`,
      description: `Attempting to sign up with ${provider}... Redirecting.`,
    });
    // Simulate API call & redirect
    setTimeout(() => router.push("/dashboard"), 1000);
  };

  const handleEmailRegister = () => {
    toast({
      title: "Sign up with Email (Demo)",
      description: "Email registration form would appear here. Redirecting.",
    });
    // Simulate API call & redirect
    setTimeout(() => router.push("/dashboard"), 1000);
  };

  return (
    <AuthCard
      title="Create an Allo Account"
      description="Join using your favorite service or create an account with your email."
      footerContent={
        <p>
          Already have an account?{" "}
          <Link href="/login" className="font-medium text-primary hover:underline">
            Log In
          </Link>
        </p>
      }
    >
      <div className="space-y-4">
        <Button variant="outline" className="w-full justify-start py-3 text-md" onClick={() => handleSocialRegister("Apple")}>
          <Apple className="mr-3 h-5 w-5" />
          Sign up with Apple
        </Button>
        <Button variant="outline" className="w-full justify-start py-3 text-md" onClick={() => handleSocialRegister("Telegram")}>
          <TelegramLogo className="mr-3 h-5 w-5" />
          Sign up with Telegram
        </Button>
        <Button variant="outline" className="w-full justify-start py-3 text-md" onClick={() => handleSocialRegister("Google")}>
          <GoogleLogo className="mr-3 h-5 w-5" />
          Sign up with Google
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

        <Button variant="outline" className="w-full justify-start py-3 text-md" onClick={handleEmailRegister}>
          <Mail className="mr-3 h-5 w-5" />
          Sign up with Email
        </Button>
      </div>
    </AuthCard>
  );
}
