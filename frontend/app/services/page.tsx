"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BadgeCheck, UtensilsCrossed, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import axios from "axios";

interface Facility {
  title: string;
  description: string;
  icon: React.ReactNode;
  details: string[];
}

interface MealType {
  breakfast: string;
  lunch: string;
  dinner: string;
}

interface Meal {
  veg: { [key: string]: MealType };
  nonVeg: { [key: string]: MealType };
}

export default function ServicesPage() {
  const [selectedDay, setSelectedDay] = useState("Sunday");
  const [expandedFacility, setExpandedFacility] = useState<string | null>(null);

  const [facilities, setFacilities] = useState<Facility[]>([]);
  const [meals, setMeals] = useState<Meal>({ veg: {}, nonVeg: {} });

  useEffect(() => {
    const fetchFacilities = async () => {
      try {
        const response = await axios.get("http://localhost:4000/api/facilities");
        console.log(response)
        setFacilities(response.data.facilities);
        
      } catch (error) {
        console.log("Error fetching facilities:", error);
      }
    };

    const fetchMeals = async () => {
      try {
        const response = await axios.get("http://localhost:4000/api/meals");
        const data = response.data.meals; // this is the array
        const transformedMeals: Meal = {
          veg: {},
          nonVeg: {},
        };
    
        data.forEach((meal: any) => {
          const dayKey = meal.day.charAt(0).toUpperCase() + meal.day.slice(1).toLowerCase(); // Capitalize
    
          const entry = {
            breakfast: meal.breakfast,
            lunch: meal.lunch,
            dinner: meal.dinner,
          };
    
          if (meal.type === "veg") {
            transformedMeals.veg[dayKey] = entry;
          } else if (meal.type === "nonVeg") {
            transformedMeals.nonVeg[dayKey] = entry;
          }
        });
    
        setMeals(transformedMeals);
    
        // Optional: auto-set first day
        if (Object.keys(transformedMeals.veg).length > 0) {
          setSelectedDay(Object.keys(transformedMeals.veg)[0]);
        }
    
        console.log("Transformed meals:", transformedMeals);
      } catch (error) {
        console.log("Error fetching meals:", error);
      }
    };
    

    fetchFacilities();
    fetchMeals();
  }, []);

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
              onClick={() =>
                setExpandedFacility(expandedFacility === facility.title ? null : facility.title)
              }
            >
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-full bg-white shadow-sm">{facility.icon}</div>
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
                {expandedFacility === facility.title && (
                  <ul className="text-sm space-y-1 pt-2">
                    {facility.details.map((detail, idx) => (
                      <li key={idx} className="flex items-center gap-2">
                        <BadgeCheck className="h-4 w-4 text-primary" />
                        <span>{detail}</span>
                      </li>
                    ))}
                  </ul>
                )}
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

              {/* Day buttons */}
              <div className="flex gap-2 mb-4 overflow-x-auto pb-2">
                {meals.veg && Object.keys(meals.veg).length > 0 ? (
                  Object.keys(meals.veg).map((day) => (
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
                  ))
                ) : (
                  <p className="text-sm text-muted-foreground">Loading days...</p>
                )}
              </div>

              {/* Veg Meals */}
              <TabsContent value="veg" className="mt-0">
                <Card>
                  <CardContent className="pt-4">
                    {meals.veg?.[selectedDay] ? (
                      <div className="grid gap-2">
                        <div className="flex items-center gap-2">
                          <span className="font-medium">Breakfast:</span>
                          <span className="text-muted-foreground">{meals.veg[selectedDay]?.breakfast}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="font-medium">Lunch:</span>
                          <span className="text-muted-foreground">{meals.veg[selectedDay]?.lunch}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="font-medium">Dinner:</span>
                          <span className="text-muted-foreground">{meals.veg[selectedDay]?.dinner}</span>
                        </div>
                      </div>
                    ) : (
                      <p className="text-sm text-muted-foreground">No meals found for {selectedDay}</p>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Non-Veg Meals */}
              <TabsContent value="nonVeg" className="mt-0">
                <Card>
                  <CardContent className="pt-4">
                    {meals.nonVeg?.[selectedDay] ? (
                      <div className="grid gap-2">
                        <div className="flex items-center gap-2">
                          <span className="font-medium">Breakfast:</span>
                          <span className="text-muted-foreground">{meals.nonVeg[selectedDay]?.breakfast}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="font-medium">Lunch:</span>
                          <span className="text-muted-foreground">{meals.nonVeg[selectedDay]?.lunch}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="font-medium">Dinner:</span>
                          <span className="text-muted-foreground">{meals.nonVeg[selectedDay]?.dinner}</span>
                        </div>
                      </div>
                    ) : (
                      <p className="text-sm text-muted-foreground">No meals found for {selectedDay}</p>
                    )}
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
