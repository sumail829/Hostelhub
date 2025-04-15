
import Roomdetails from '@/components/roomdetails';
import React from 'react';

export default async function RoomDetailsPage({ params }: { params: { id: string } }) {
  return (
    <div>
      <Roomdetails id={params.id} />
    </div>
  );
}
