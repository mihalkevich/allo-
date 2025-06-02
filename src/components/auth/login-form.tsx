"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { AuthCard } from "./auth-card";
import { useToast } from "@/hooks/use-toast";

const loginFormSchema = z.object({
  phoneNumber: z.string().regex(/^\+[1-9]\d{1,14}$/, "Please enter a valid phone number with country code (e.g., +1234567890)."),
  // password: z.string().min(6, "Password must be at least 6 characters."), // Assuming OTP or passwordless for phone
});

type LoginFormValues = z.infer<typeof loginFormSchema>;

export function LoginForm() {
  const router = useRouter();
  const { toast } = useToast();
  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      phoneNumber: "",
      // password: "",
    },
  });

  async function onSubmit(values: LoginFormValues) {
    // Placeholder for Firebase login
    console.log("Login attempt with:", values);
    toast({
      title: "Login Submitted (Demo)",
      description: `Phone: ${values.phoneNumber}. Redirecting to dashboard...`,
    });
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    router.push("/dashboard");
  }

  return (
    <AuthCard
      title="Login to Allo"
      description="Enter your phone number to access your account."
      footerContent={
        <p>
          Don&apos;t have an account?{" "}
          <Link href="/register" className="font-medium text-primary hover:underline">
            Register here
          </Link>
        </p>
      }
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="phoneNumber"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Phone Number</FormLabel>
                <FormControl>
                  <Input placeholder="+1234567890" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {/* <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password or OTP</FormLabel>
                <FormControl>
                  <Input type="password" placeholder="******" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          /> */}
          <Button type="submit" className="w-full">
            Login / Send OTP
          </Button>
        </form>
      </Form>
    </AuthCard>
  );
}
