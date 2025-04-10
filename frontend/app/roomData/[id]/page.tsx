
import Roomdetails from '@/components/roomdetails';
import React from 'react';

export default function RoomDetailsPage({ params }: { params: { id: string } }) {
  return (
    <div>
      <Roomdetails id={params.id} />
    </div>
  );
}
