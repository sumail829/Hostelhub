import RoomList from "@/components/roomList"
import axios from "axios";


export default async function RoomsPage() {
  const res = await axios.get("https://hostelhub-kgof.onrender.com/api/rooms");
  const roomInfos =(res.data.roominfo);
      // setRooms(res.data.roominfo);

  return (
    <main className="container mx-auto py-8 px-4">

      <RoomList roomInfos={roomInfos}></RoomList>
    </main>
  )
}