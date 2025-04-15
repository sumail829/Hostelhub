import Roomdetails from '@/components/roomdetails';

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function RoomDetailsPage({ params }: PageProps) {
  const { id } = await params;

  return (
    <div>
      <Roomdetails id={id} />
    </div>
  );
}
