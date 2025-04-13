"use client"
import axios from 'axios'
import { Building2, DollarSign, GraduationCap, Plus } from 'lucide-react'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'

export default function Hero() {
        const[showStudents,setShowStudents]=useState("")

        const fetchAllStudent = async () => {
            try {
                const token = localStorage.getItem("adminToken"); // or sessionStorage, based on your app
        
                const response = await axios.get("http://localhost:4000/api/students", {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
        
                console.log("all student", response);
                setShowStudents(response.data.students);
            } catch (error) {
                console.log("Something went wrong", error);
            }
        };
        // Fetch all students when the component mounts        
     useEffect(()=>{
        fetchAllStudent();
     },[]);

    return (
        <div className='max-w-7xl mx-auto px-4 py-8'>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <Link href={"/admin/studentData"}>

                <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">

                    <div className="flex items-center">
                        <div className="p-3 bg-blue-50 rounded-lg">
                            <GraduationCap className="h-8 w-8 text-blue-600" />
                        </div>
                        <div className="ml-4">
                            <p className="text-sm font-medium text-gray-600">Total Students</p>
                            <p className="text-2xl font-semibold text-gray-900">{showStudents.length}</p>
                        </div>
                    </div>
                </div></Link>


                <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
                    <div className="flex items-center">
                        <div className="p-3 bg-green-50 rounded-lg">
                            <Building2 className="h-8 w-8 text-green-600" />
                        </div>
                        <div className="ml-4">
                            <p className="text-sm font-medium text-gray-600">Available Rooms</p>
                            <p className="text-2xl font-semibold text-gray-900">
                                {/* {rooms.filter((room) => room.available).length} */}
                            </p>
                        </div>
                    </div>
                </div>
                <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
                    <div className="flex items-center">
                        <div className="p-3 bg-purple-50 rounded-lg">
                            <DollarSign className="h-8 w-8 text-purple-600" />
                        </div>
                        <div className="ml-4">
                            <p className="text-sm font-medium text-gray-600">Fee Structures</p>
                            <p className="text-2xl font-semibold text-gray-900">
                                {/* {feeStructures.length} */}length
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
