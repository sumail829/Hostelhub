"use client"
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Image from 'next/image';

interface Room {
  roomNumber: string;
  capacity: number;
  occupied: number;
  roomimage: string;
  students?: string[]; // Optional if needed
}

export default function Roomdetails({ id }: { id: string }) {
  const [room, setRoom] = useState<Room | null>(null);

  const fetchRoomDetails = async () => {
    try {
      const response = await axios.get(`http://localhost:4000/api/rooms/${id}`);
      setRoom(response.data.roominfo); // Adjust key based on your backend response
    } catch (error) {
      console.log("Something went wrong", error);
    }
  };

  useEffect(() => {
    fetchRoomDetails();
  }, [id]);

  if (!room) return <div className="p-6">Loading room details...</div>;

  return (
    <div className="min-w-screen mx-auto px-8 py-4">
      <div className="text-lg font-semibold">Room no: {room.roomNumber}</div>
      <div className="text-gray-600">Room image:
        <Image
          src={room.roomimage || "/next.svg"} // Fallback image if roomimage is not available
          alt={`Room ${room.roomNumber}`}
          width={300}
          height={200}
          className="rounded-lg mt-2"
        />
      </div>
      <div className="text-gray-600">Capacity: {room.capacity}</div>
      <div className="text-gray-600">Occupied: {room.occupied}</div>
      {/* Add more fields as needed */}
    </div>
  );
}
