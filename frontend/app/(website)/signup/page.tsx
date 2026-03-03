"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { UserPlus } from "lucide-react";
import { useState } from "react";
import axios from "axios"
import { useRouter } from "next/navigation";

export default function SignupPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone: ""
  })

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })

  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    const { fullName, email, password, confirmPassword, phone } = formData;

    if (!fullName || !email || !password || !confirmPassword || !phone) {
      setError("please fill in the table")
    }

    if (password !== confirmPassword) {
      setError("Password didnt match");
    }
    try {
      const response = await axios.post("https://hostelhub-kgof.onrender.com/api/students/signup", {
        fullName,
        email,
        password,
        phone
      });
      console.log(response);

      // ✅ Save new token and student info
      if (response.data.jwtToken) {
        localStorage.setItem("authToken", response.data.jwtToken);
        localStorage.setItem("studentInfo", JSON.stringify(response.data.student));
      }

      setSuccess("signup successfull");
      // Clear form data after successful signup
      setFormData({
        fullName: "",
        email: "",
        password: "",
        confirmPassword: "",
        phone: ""

      })
      setTimeout(() => {
        router.push("/selectRoom");
      }, 1000);

    } catch (error) {
      if (axios.isAxiosError(error)) {
        setError(error.response?.data?.message || "signup failed");
      } else {
        setError("An unexpected error occurred");
      }

    }

  }
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <form onSubmit={handleSubmit}>
          <CardHeader className="space-y-1 flex flex-col items-center text-center">
            <div className="bg-primary/5 p-3 rounded-full">
              <UserPlus className="w-6 h-6 text-primary" />
            </div>
            <CardTitle className="text-2xl">Create an Account</CardTitle>

            {error && <div className="text-red-500 text-sm mb-4">{error}</div>}
            {success && <div className="text-green-500 text-sm mb-4">{success}</div>}
            <CardDescription>
              Enter your email and password to create your account
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">

            <div className="space-y-2">
              <Label htmlFor="fullName">Fullname</Label>
              <Input name="fullName" type="text" placeholder="Enter your fullname" value={formData.fullName} onChange={handleChange} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input name="email" type="email" placeholder="name@example.com" value={formData.email} onChange={handleChange} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input name="password" type="password" placeholder="Enter your password" value={formData.password} onChange={handleChange} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="confirm-password">Confirm Password</Label>
              <Input name="confirmPassword" type="password" placeholder="Confirm your password" value={formData.confirmPassword} onChange={handleChange} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="Phone">Phone</Label>
              <Input name="phone" type="number" placeholder="Enter your number" value={formData.phone} onChange={handleChange} />
            </div>
          </CardContent>
          <CardFooter className="py-2">
            <Button type="submit" className="w-full">Sign Up</Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}