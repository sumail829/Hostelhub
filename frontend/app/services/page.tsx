import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { BadgeCheck, Gem, Shield, Zap } from "lucide-react"

export default function ServicesPage() {
  const services = [
    {
      title: "Premium Support",
      description: "24/7 dedicated customer support with priority response times",
      icon: <Shield className="h-6 w-6 text-primary" />,
    },
    {
      title: "Advanced Features",
      description: "Access to exclusive advanced features and capabilities",
      icon: <Gem className="h-6 w-6 text-primary" />,
    },
    {
      title: "Fast Performance",
      description: "Optimized infrastructure for lightning-fast performance",
      icon: <Zap className="h-6 w-6 text-primary" />,
    },
    {
      title: "Quality Guarantee",
      description: "100% satisfaction guarantee on all our services",
      icon: <BadgeCheck className="h-6 w-6 text-primary" />,
    }
  ]

  return (
    <main className="container mx-auto py-12 px-4">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold tracking-tight mb-4">Our Services</h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Discover our comprehensive range of professional services designed to meet your needs
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {services.map((service, index) => (
          <Card key={index} className="transition-all hover:shadow-lg">
            <CardHeader>
              <div className="flex items-center gap-4">
                {service.icon}
                <CardTitle>{service.title}</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-base">
                {service.description}
              </CardDescription>
            </CardContent>
          </Card>
        ))}
      </div>
    </main>
  )
}