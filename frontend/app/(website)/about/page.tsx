"use client";

import { Building2 } from "lucide-react";
import { Card } from "@/components/ui/card";

export default function AboutPage() {
  return (
    <main className="container mx-auto px-4 py-16">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center gap-3 mb-8">
          <Building2 className="h-8 w-8 text-primary" />
          <h1 className="text-4xl font-bold tracking-tight">About Us</h1>
        </div>
        
        <Card className="p-6 mb-8">
          <h2 className="text-2xl font-semibold mb-4">Our Story</h2>
          <p className="text-muted-foreground leading-relaxed mb-4">
            Founded with a vision to create meaningful connections and unforgettable experiences, 
            we have been providing comfortable and affordable accommodation for travelers from around 
            the world. Our commitment to excellence and community building has made us a trusted 
            name in the hospitality industry.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            We believe in creating more than just a place to stay - we are building a home away 
            from home where travelers can connect, share stories, and create lasting memories 
            together.
          </p>
        </Card>

        <Card className="p-6">
          <h2 className="text-2xl font-semibold mb-4">Our Values</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-medium mb-2">Community First</h3>
              <p className="text-muted-foreground">
                We foster an environment where guests can connect and build lasting friendships.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-medium mb-2">Sustainability</h3>
              <p className="text-muted-foreground">
                We are committed to reducing our environmental impact through eco-friendly practices.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-medium mb-2">Safety & Comfort</h3>
              <p className="text-muted-foreground">
                Your security and comfort are our top priorities during your stay with us.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-medium mb-2">Cultural Exchange</h3>
              <p className="text-muted-foreground">
                We celebrate diversity and promote cultural understanding among our guests.
              </p>
            </div>
          </div>
        </Card>
      </div>
    </main>
  );
}