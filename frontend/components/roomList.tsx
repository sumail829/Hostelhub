"use client"

import axios from 'axios';
import Link from 'next/link';
import React, { useEffect, useState } from 'react'

interface Room {
  _id: string;
  roomNumber: string;
  capacity: number;
  occupied: number;
}

export default function RoomList() {
  const [rooms, setRooms] = useState<Room[]>([]);

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
                <h3 className="font-medium text-gray-900">
                  Room: {room.roomNumber}
                </h3>
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
