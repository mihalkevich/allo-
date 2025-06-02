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

const registerFormSchema = z.object({
  phoneNumber: z.string().regex(/^\+[1-9]\d{1,14}$/, "Please enter a valid phone number with country code (e.g., +1234567890)."),
  // password: z.string().min(6, "Password must be at least 6 characters."), // Assuming OTP or passwordless for phone
  // confirmPassword: z.string(),
});
// .refine((data) => data.password === data.confirmPassword, { // If using password
//   message: "Passwords don't match",
//   path: ["confirmPassword"],
// });

type RegisterFormValues = z.infer<typeof registerFormSchema>;

export function RegisterForm() {
  const router = useRouter();
  const { toast } = useToast();
  const form = useForm<RegisterFormValues>({
    resolver: zodResolver(registerFormSchema),
    defaultValues: {
      phoneNumber: "",
      // password: "",
      // confirmPassword: "",
    },
  });

  async function onSubmit(values: RegisterFormValues) {
    // Placeholder for Firebase registration
    console.log("Registration attempt with:", values);
    toast({
      title: "Registration Submitted (Demo)",
      description: `Phone: ${values.phoneNumber}. Redirecting to dashboard...`,
    });
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    router.push("/dashboard");
  }

  return (
    <AuthCard
      title="Create an Allo Account"
      description="Register with your phone number to get started."
      footerContent={
        <p>
          Already have an account?{" "}
          <Link href="/login" className="font-medium text-primary hover:underline">
            Login here
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
                  <Input type="password" placeholder="Create a password or enter OTP" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Confirm Password or OTP</FormLabel>
                <FormControl>
                  <Input type="password" placeholder="Confirm password or OTP" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          /> */}
          <Button type="submit" className="w-full">
            Register / Send OTP
          </Button>
        </form>
      </Form>
    </AuthCard>
  );
}
