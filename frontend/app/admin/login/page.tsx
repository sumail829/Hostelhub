"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { LogIn } from "lucide-react";
import Link from "next/link";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSuccess("");
    setLoading(true);

    try {
      const response = await axios.post("http://localhost:4000/api/admin/loginAdmin", {
        email,
        password,
      });

      const admin = response.data.admin;
      const token = response.data.token;

      if (admin.role === "admin") {
        // ✅ Store token in localStorage
        localStorage.setItem("adminToken", token);

        setSuccess("Login successful");
        setEmail("");
        setPassword("");

        // ⏳ Simulate delay before redirect
        setTimeout(() => {
          router.push("/admin/adminDashboard");
        }, 1000);
      } else {
        alert("You are not authorized to access the admin panel.");
      }
    } catch (error) {
      console.log("Admin login failed", error);
      alert("Invalid email or password for admin.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-2 text-center">
          <div className="flex justify-center mb-2">
            <LogIn className="h-8 w-8 text-primary" />
          </div>
          <CardTitle className="text-2xl font-bold">Admin Login</CardTitle>
          <CardDescription>Sign in with your admin credentials</CardDescription>
          {success && <div className="text-green-500 text-sm mb-4">{success}</div>}
        </CardHeader>

        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="admin@example.com"
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
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "Signing in..." : "Sign In as Admin"}
            </Button>
            <p className="text-sm text-center text-muted-foreground">
              Want to login as Student?{" "}
              <Link href="/login" className="text-primary hover:underline">
                Go to Student Login
              </Link>
            </p>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
