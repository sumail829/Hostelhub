"use client"

import axios from 'axios';
import Link from 'next/link';
import Image from 'next/image';
import React, { useEffect, useState } from 'react'
import { Trash } from 'lucide-react';

interface Room {
  _id: string;
  roomNumber: string;
  capacity: number;
  occupied: number;
  roomimage:string;
}

export default function RoomList() {
  const [rooms, setRooms] = useState<Room[]>([]);
  const [deleteRoomId, setDeleteRoomId] = useState<string | null>(null);

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

  const availableRooms = rooms.filter(room => room.occupied < room.capacity);

  return (
    <div className="p-6">
      {availableRooms.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {availableRooms.map((room) => (
            <Link key={room._id} href={`/roomData/${room._id}`}>
              <div className="p-4 border border-gray-100 rounded-lg">
               
                <div className="font-medium text-gray-900">
                  Room: {room.roomNumber}
                </div>
                <div>
                  <Image
                    src={room.roomimage || "/next.svg"} // Fallback image if roomimage is not available
                    alt={`Room ${room.roomNumber}`}
                    width={300}
                    height={200}
                    className="rounded-lg mt-2"
                  />
                </div>
                <p className="text-sm text-gray-600">
                  Capacity: {room.capacity}
                </p>
                <span className="inline-block px-2 py-1 text-xs rounded-full mt-2 bg-green-100 text-green-800">
                  Available
                </span>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <p className="text-muted-foreground text-center py-8 text-lg">
          No rooms available at the moment.
        </p>
      )}
    </div>
  );
}
