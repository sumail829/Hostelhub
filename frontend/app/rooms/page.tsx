import RoomList from "@/components/roomList"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function RoomsPage() {
  return (
    <main className="container mx-auto py-8 px-4">

      <RoomList></RoomList>
    </main>
  )
}