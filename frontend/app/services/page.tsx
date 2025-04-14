"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BadgeCheck, Wifi, Zap, Droplet, Monitor, UtensilsCrossed, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import Navbar from "@/components/Navbar";

export default function ServicesPage() {
  const [selectedDay, setSelectedDay] = useState("Sunday");
  const [expandedFacility, setExpandedFacility] = useState<string | null>(null);

  const facilities = [
    {
      title: "High-Speed WiFi",
      description: "24/7 uninterrupted internet access with dedicated bandwidth for each room",
      icon: <Wifi className="h-6 w-6 text-blue-500" />,
      details: ["Up to 100Mbps speed", "Individual network access", "24/7 tech support"]
    },
    {
      title: "Electricity Backup",
      description: "24/7 power supply with generator backup",
      icon: <Zap className="h-6 w-6 text-yellow-500" />,
      details: ["Instant power backup", "Surge protection", "Green energy integration"]
    },
    {
      title: "Water Supply",
      description: "Continuous hot and cold water supply",
      icon: <Droplet className="h-6 w-6 text-cyan-500" />,
      details: ["Purified drinking water", "Solar water heating", "Water conservation system"]
    },
    {
      title: "IT Infrastructure",
      description: "Modern computer lab and study facilities",
      icon: <Monitor className="h-6 w-6 text-purple-500" />,
      details: ["Computer lab access", "Printing services", "Study room booking"]
    }
  ];

  const meals = {
    veg: {
      Sunday: { breakfast: "Idli Sambar", lunch: "Veg Biryani", dinner: "Roti Dal" },
      Monday: { breakfast: "Poha", lunch: "Rice Dal", dinner: "Paneer Curry" },
      Tuesday: { breakfast: "Upma", lunch: "Pulao", dinner: "Chana Masala" },
      Wednesday: { breakfast: "Dosa", lunch: "Rajma Rice", dinner: "Mix Veg" },
      Thursday: { breakfast: "Sandwich", lunch: "Dal Rice", dinner: "Palak Paneer" },
      Friday: { breakfast: "Uttapam", lunch: "Veg Pulao", dinner: "Dal Fry" },
      Saturday: { breakfast: "Puri Bhaji", lunch: "Sambar Rice", dinner: "Veg Curry" }
    },
    nonVeg: {
      Sunday: { breakfast: "Eggs Toast", lunch: "Chicken Biryani", dinner: "Butter Chicken" },
      Monday: { breakfast: "Omelette", lunch: "Fish Curry", dinner: "Chicken Curry" },
      Tuesday: { breakfast: "Scrambled Eggs", lunch: "Mutton Curry", dinner: "Egg Curry" },
      Wednesday: { breakfast: "Boiled Eggs", lunch: "Chicken Rice", dinner: "Fish Fry" },
      Thursday: { breakfast: "Egg Bhurji", lunch: "Chicken Curry", dinner: "Mutton Curry" },
      Friday: { breakfast: "Omelette", lunch: "Fish Curry", dinner: "Chicken Masala" },
      Saturday: { breakfast: "Eggs Benedict", lunch: "Biryani", dinner: "Butter Chicken" }
    }
  };

  return (

    <div>
      <main className="container mx-auto py-8 px-4">

        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold tracking-tight mb-2 bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-blue-600">
            Our Services
          </h1>
          <p className="text-muted-foreground">Quality facilities for your comfort</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          {facilities.map((facility) => (
            <Card
              key={facility.title}
              className={cn(
                "transition-all duration-300 cursor-pointer",
                expandedFacility === facility.title ? "ring-2 ring-primary" : ""
              )}
              onClick={() => setExpandedFacility(
                expandedFacility === facility.title ? null : facility.title
              )}
            >
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-full bg-white shadow-sm">
                      {facility.icon}
                    </div>
                    <CardTitle className="text-lg">{facility.title}</CardTitle>
                  </div>
                  <ChevronDown
                    className={cn(
                      "h-5 w-5 transition-transform duration-200",
                      expandedFacility === facility.title ? "rotate-180" : ""
                    )}
                  />
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">{facility.description}</p>
                <div className={cn(
                  "grid gap-2 mt-2 overflow-hidden transition-all duration-200",
                  expandedFacility === facility.title ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                )}>
                  <div className="min-h-0">
                    <ul className="text-sm space-y-1 pt-2">
                      {facility.details.map((detail, idx) => (
                        <li key={idx} className="flex items-center gap-2">
                          <BadgeCheck className="h-4 w-4 text-primary" />
                          <span>{detail}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <Card className="mb-4">
          <CardHeader className="pb-2">
            <div className="flex items-center gap-3">
              <UtensilsCrossed className="h-6 w-6 text-orange-500" />
              <div>
                <CardTitle className="text-lg">Dining Services</CardTitle>
                <CardDescription>Daily menu options</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="veg" className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-4">
                <TabsTrigger value="veg">Vegetarian</TabsTrigger>
                <TabsTrigger value="nonVeg">Non-Vegetarian</TabsTrigger>
              </TabsList>
              <div className="flex gap-2 mb-4 overflow-x-auto pb-2">
                {Object.keys(meals.veg).map((day) => (
                  <button
                    key={day}
                    onClick={() => setSelectedDay(day)}
                    className={cn(
                      "px-3 py-1 rounded-full text-sm whitespace-nowrap transition-colors",
                      selectedDay === day
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted hover:bg-muted/80"
                    )}
                  >
                    {day}
                  </button>
                ))}
              </div>
              <TabsContent value="veg" className="mt-0">
                <Card>
                  <CardContent className="pt-4">
                    <div className="grid gap-2">
                      {Object.entries(meals.veg[selectedDay as keyof typeof meals.veg]).map(([meal, items]) => (
                        <div key={meal} className="flex items-center gap-2">
                          <span className="font-medium capitalize">{meal}:</span>
                          <span className="text-muted-foreground">{items}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              <TabsContent value="nonVeg" className="mt-0">
                <Card>
                  <CardContent className="pt-4">
                    <div className="grid gap-2">
                      {Object.entries(meals.nonVeg[selectedDay as keyof typeof meals.nonVeg]).map(([meal, items]) => (
                        <div key={meal} className="flex items-center gap-2">
                          <span className="font-medium capitalize">{meal}:</span>
                          <span className="text-muted-foreground">{items}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}