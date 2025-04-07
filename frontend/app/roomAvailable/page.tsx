import React from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function RoomAvailable() {
  return (
    <div><main className="container mx-auto py-8 px-4">
    <Card className="max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle className="text-3xl">Available Rooms</CardTitle>
        <CardDescription>Browse our selection of available rooms</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {/* Room cards will be populated here */}
          <p className="text-muted-foreground col-span-full text-center py-8">
            No rooms 
          </p>
        </div>
      </CardContent>
    </Card>
  </main></div>
  )
}
