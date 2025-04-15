"use client";

import axios from "axios";
import { Plus, Trash } from "lucide-react";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import Image from "next/image";

interface Room {
    _id: string;
    roomNumber: string;
    capacity: number;
    occupied: number;
    roomimage: string;
    students?: string[]; // Optional if needed
}

export default function RoomAdd() {
    const [rooms, setRooms] = useState<Room[]>([]);
    const [showAddRoom, setShowAddRoom] = useState(false);
    const [newRoom, setNewRoom] = useState({ roomNumber: "", capacity: 2, roomimage: null as File | null });

    const fetchRooms = async () => {
        try {
            const res = await axios.get("http://localhost:4000/api/rooms");
            setRooms(res.data.roominfo);
        } catch (error) {
            console.error("Error fetching rooms:", error);
        }
    };

    useEffect(() => {
        fetchRooms();
    }, []);

    const handleAddRooms = async () => {
        try {
            const formData = new FormData();
            formData.append("roomNumber", newRoom.roomNumber);
            formData.append("capacity", newRoom.capacity.toString());
            formData.append("occupied", "0"); // or "0"
            formData.append("roomimage", newRoom.roomimage as File); // Use the selected file from state

            const res = await axios.post("https://hostelhub-kgof.onrender.com/api/rooms", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });

            console.log(res.data.message);
            setShowAddRoom(false);
            setNewRoom({ roomNumber: "", capacity: 2, roomimage: null });
            fetchRooms(); // refresh
        } catch (error) {
            console.log(
                "Room creation failed:",
                (axios.isAxiosError(error) && error.response?.data?.message) || String(error)
            );
        }
    };
    const deleteRoom = async (id: string) => {
        try {
            const response = await axios.delete(`https://hostelhub-kgof.onrender.com/api/rooms/${id}`);
            console.log(response.data.message);
            fetchRooms(); // refresh
        } catch (error) {
            console.error("Error deleting room:", error);
        }
    }

    return (
        <div>
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 mb-8">
                <div className="p-6 border-b border-gray-100">
                    <div className="flex justify-between items-center">
                        <h2 className="text-xl font-semibold text-gray-900">Rooms</h2>
                        <button
                            onClick={() => setShowAddRoom(true)}
                            className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                        >
                            <Plus className="h-5 w-5 mr-2" />
                            Add Room
                        </button>
                    </div>
                </div>

                {/* Add Room Modal */}
                {showAddRoom && (
                    <div className="p-6 border-t border-gray-100">
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700">
                                Room Number
                            </label>
                            <input
                                type="text"
                                value={newRoom.roomNumber}
                                onChange={(e) =>
                                    setNewRoom({ ...newRoom, roomNumber: e.target.value })
                                }
                                className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700">
                                Capacity
                            </label>
                            <input
                                type="number"
                                value={newRoom.capacity}
                                onChange={(e) =>
                                    setNewRoom({ ...newRoom, capacity: parseInt(e.target.value) })
                                }
                                className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700">
                                Room Image
                            </label>
                            <input
                                type="file"
                                onChange={(e) =>
                                    setNewRoom({ ...newRoom, roomimage: e.target.files ? e.target.files[0] : null })
                                }
                                className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                            />
                        </div>
                        <button
                            onClick={handleAddRooms}
                            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
                        >
                            Save Room
                        </button>
                    </div>
                )}

                {/* Room List */}
                <div className="p-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {rooms.map((room) => {
                            console.log("Room Image:", room.roomimage);
                            const isAvailable = room.occupied < room.capacity;
                            return (
                                
                                    <div key={room._id} className="p-4 border border-gray-100 rounded-lg" >
                                        <div className='flex justify-between items-center'>

                                        <div className="font-medium text-gray-900">
                                            Room: {room.roomNumber}
                                        </div>
                                        <div onClick={() => deleteRoom(room._id)} className="cursor-pointer">
                                            <Trash > trash</Trash>
                                        </div>
                                        </div>
                                        <Link  href={`/roomData/${room._id}`}>
                                        <p className="text-sm text-gray-600">
                                            Capacity: {room.capacity}
                                        </p>
                                        <div className="p-4 border border-gray-100 rounded-lg">
                                            <Image
                                                src={room.roomimage || "/next.svg"}
                                                alt="Room Image"
                                                width={300}
                                                height={200}
                                                className="rounded-lg"
                                                style={{ objectFit: "cover" }}>

                                            </Image>
                                        </div>
                                        </Link>
                                        <span
                                            className={`inline-block px-2 py-1 text-xs rounded-full mt-2 ${isAvailable
                                                ? "bg-green-100 text-green-800"
                                                : "bg-red-100 text-red-800"
                                                }`}
                                        >
                                            {isAvailable ? "Available" : "Occupied"}
                                        </span>
                                    </div>
                               
                            );
                        })}
                    </div>
                </div>
            </div>
        </div>

    );
}
