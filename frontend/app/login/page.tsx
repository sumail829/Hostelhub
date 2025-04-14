"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { LogIn } from "lucide-react";
import Link from "next/link";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const [success, setSuccess] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("FORM SUBMIT TRIGGERED ✅");
    setSuccess("");
    // TODO: Implement login logic
    try {
      const response = await axios.post("http://localhost:4000/api/auth/login", {
        email,
        password
      })
      console.log("loginin successful", response);
      console.log("Full login response:", response.data);

      // // Clear old token and student info
      // localStorage.removeItem("authToken");
      // localStorage.removeItem("studentInfo");
      // // Store the JWT token in localStorage
      if (response.data.jwtToken) {
        localStorage.setItem("authToken", response.data.jwtToken);
        console.log("Token saved:", response.data.jwtToken);
        console.log("Token in storage:", localStorage.getItem("authToken"));

        // Store student info if needed
        if (response.data.student) {
          localStorage.setItem("studentInfo", JSON.stringify(response.data.student));
        }
      }

      setSuccess("signin successfull");
      setTimeout(() => {
        router.push("/student");
      }, 1000);

      setEmail("");
      setPassword("");
    } catch (error) {
      console.log("Login failed", error);
      alert("Invalid email or password. Please try again.");
    }

  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-2 text-center">
          <div className="flex justify-center mb-2">
            <LogIn className="h-8 w-8 text-primary" />
          </div>
          <CardTitle className="text-2xl font-bold">Welcome back</CardTitle>
          <CardDescription>
            Enter your email and password to sign in to your account

          </CardDescription>
          {success && <div className="text-green-500 text-sm mb-4">{success}</div>}
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="name@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
          </CardContent>
          <CardFooter className="flex flex-col space-y-4">
            <Button type="submit" className="w-full">
              Sign In
            </Button>
            <p className="text-sm text-center text-muted-foreground">
              Don&apos;t have an account?{" "}
              <Link href="/signup" className="text-primary hover:underline">
                Sign up
              </Link>
            </p>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}