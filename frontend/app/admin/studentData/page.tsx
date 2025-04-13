"use client"
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Interface } from 'readline';

interface IStudent{
    _id:string;
    fullName:string;
    roomNumber:string;
    totalFees:number;
    paid:number;
    remaining:number

}


export default function StudentsData() {
    const [students, setStudents] = useState<IStudent[]>([]);

    useEffect(() => {
        const fetchStudents = async () => {
            const token = localStorage.getItem('adminToken');

            // // If no token or it's invalid
            // if (!token || token === "undefined") {
            //     console.log("No valid token found. Please log in again.");
            //     return; // Exit the function early
            // }

            // // Decode JWT to check expiration time
            // const currentTime = Math.floor(Date.now() / 1000); // Current time in seconds
            // const decodedToken = JSON.parse(atob(token.split('.')[1])); // Decode JWT to get the exp

            // if (decodedToken.exp < currentTime) {
            //     console.log("Token has expired. Please log in again.");
            //     localStorage.removeItem('token'); // Remove expired token
            //     return; // Exit the function early
            // } else {
            //     console.log("Token is valid.");
            // }

            // If token is valid, proceed with the API call
            try {
                const response = await axios.get('http://localhost:4000/api/students', {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                setStudents(response.data.students);
            } catch (error) {
                console.log("Error fetching students:", error);
            }
        };

        fetchStudents();
    }, []);

    return (
        <div className="max-w-6xl mx-auto p-6">
            <h1 className="text-3xl font-bold mb-6">All Students</h1>
            <div className="bg-white rounded-xl shadow p-6">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="border-b">
                            <th className="py-2">ID</th>
                            <th className="py-2">Name</th>
                            <th className="py-2">Room</th>
                            <th className="py-2">Total Fee</th>
                            <th className="py-2">Paid</th>
                            <th className="py-2">Remaining</th>
                        </tr>
                    </thead>
                    <tbody>
                        {students.map((student, index) => (
                            <tr key={index} className="border-b hover:bg-gray-50">
                                <td className="py-2">{student._id}</td>
                                <td className="py-2">{student.fullName}</td> {/* Accessing fullName */}
                                <td className="py-2">{student.roomNumber}</td> {/* You can adjust this if you add roomNumber to the student */}
                                <td className="py-2">Rs. {student.totalFees}</td> {/* Accessing totalFees */}
                                <td className="py-2">Rs. {student.paid}</td> {/* Accessing paid */}
                                <td className="py-2">Rs. {student.remaining}</td> {/* Accessing remaining */}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
