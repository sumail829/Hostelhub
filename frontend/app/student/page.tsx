"use client";

import {
  Calendar,
  CreditCard,
  FileText,
  House,
  Info,
  Link,
  Wifi,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import axios from "axios";
import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";

interface Student {
  fullName: string;
  roomNumber: string;
  enrollmentDate: string;
  totalFees: number;
  paid: number;
  remaining: number;
  addmissionDate: string;
}

export default function StudentInfo() {
  const [student, setStudent] = useState<Student | null>(null);

  useEffect(() => {
    const fetchSingleStudent = async () => {
      try {
        console.log("Fetching student data...");
        const token = localStorage.getItem("authToken");
        
        if (!token) {
          console.log("No token found in localStorage");
          return;
        }
  
        const decoded = jwtDecode(token);
        const studentId = decoded.id || decoded._id;
  
        console.log("Making API request...");
        const response = await axios.get(
          `http://localhost:4000/api/students/${studentId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const studentData = response.data.student;
        setStudent(studentData);
      } catch (error) {
        console.error("Error details:",error);
      }
    };
  
    fetchSingleStudent();
  }, []);

  if (!student) {
    return <div className="p-10 text-xl">Loading your dashboard...</div>;
  }

  const remaining = student.totalFees - student.paid;
  const progress = Math.round((student.paid / student.totalFees) * 100);

  return (
    <div className="min-h-screen bg-background">
      {/* Navbar */}
      <nav className="border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex items-center">
              <House className="h-8 w-8 text-primary" />
              <span className="ml-2 text-xl font-bold">HostelHub</span>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-foreground">
            Welcome back, {student.fullName.split(" ")[0]}! 👋
          </h1>
          <p className="text-muted-foreground mt-2">
            Room: #{student.roomNumber} | Enrollment Date:{" "}
            {new Date(student.enrollmentDate).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </p>
        </div>

        {/* Fee Summary */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mb-8">
          <Card>
            <CardHeader>
              <CardTitle>Fee Summary</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span>Monthly Fee</span>
                  <span className="font-semibold">Rs. {student.totalFees}</span>
                </div>
                <div className="flex justify-between">
                  <span>Paid This Month</span>
                  <span className="font-semibold text-green-600">
                    Rs. {student.paid}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Remaining</span>
                  <span className="font-semibold text-red-600">
                    Rs. {remaining}
                  </span>
                </div>
                <Progress value={progress} className="mt-2" />
                <Button className="w-full mt-4">Pay Remaining</Button>
              </div>
            </CardContent>
          </Card>

          {/* Room Details */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <House className="h-5 w-5" />
                Room Details
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span>Room Number</span>
                  <span className="font-semibold">#{student.roomNumber}</span>
                </div>
                <div className="flex justify-between">
                  {/* <span>Roommates</span>
                  <span className="font-semibold">
                    {student.roommates.length}/3
                  </span> */}
                </div>
                {/* <div className="mt-4">
                  <p className="text-sm text-muted-foreground mb-2">Roommates:</p>
                  <div className="space-y-2">
                    {student.roommates.map((name, idx) => (
                      <div className="flex items-center gap-2" key={idx}>
                        <Users className="h-4 w-4" />
                        <span>{name}</span>
                      </div>
                    ))}
                  </div>
                </div> */}
              </div>
            </CardContent>
          </Card>

          {/* Important Dates */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5" />
                Important Dates
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <CreditCard className="h-4 w-4 text-red-500" />
                  <span>Fee due: April 15</span>
                </div>
                <div className="flex items-center gap-2">
                  <House className="h-4 w-4 text-blue-500" />
                  <span>Room cleaning: Every Saturday</span>
                </div>
                <div className="flex items-center gap-2">
                  <Info className="h-4 w-4 text-green-500" />
                  <span>Workshop: Intro to AI on April 22</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Resources */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Link className="h-5 w-5" />
              Resources & Links
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <Button variant="outline" className="flex items-center gap-2">
                <FileText className="h-4 w-4" />
                Hostel Rules PDF
              </Button>
              <Button variant="outline" className="flex items-center gap-2">
                <Info className="h-4 w-4" />
                Emergency Contacts
              </Button>
              <Button variant="outline" className="flex items-center gap-2">
                <Wifi className="h-4 w-4" />
                Wi-Fi Info
              </Button>
              <Button variant="outline" className="flex items-center gap-2">
                <FileText className="h-4 w-4" />
                Suggestion Box
              </Button>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
