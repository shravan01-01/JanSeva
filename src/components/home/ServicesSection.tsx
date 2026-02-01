import { 
  Building2, 
  Droplets, 
  Zap, 
  TrafficCone, 
  Trash2, 
  Trees, 
  Shield,
  Landmark
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const services = [
  {
    icon: Building2,
    title: "Municipal Services",
    description: "Property tax, building permits, licenses",
    color: "bg-blue-500",
  },
  {
    icon: Droplets,
    title: "Water Supply",
    description: "Water connections, billing, leakage",
    color: "bg-cyan-500",
  },
  {
    icon: Zap,
    title: "Electricity",
    description: "Power outages, new connections, billing",
    color: "bg-yellow-500",
  },
  {
    icon: TrafficCone,
    title: "Roads & Traffic",
    description: "Potholes, traffic signals, road damage",
    color: "bg-orange-500",
  },
  {
    icon: Trash2,
    title: "Sanitation",
    description: "Garbage collection, drainage, sewage",
    color: "bg-green-500",
  },
  {
    icon: Trees,
    title: "Environment",
    description: "Pollution, illegal dumping, tree cutting",
    color: "bg-emerald-500",
  },
  {
    icon: Shield,
    title: "Public Safety",
    description: "Street lights, safety concerns, hazards",
    color: "bg-red-500",
  },
  {
    icon: Landmark,
    title: "Revenue",
    description: "Land records, certificates, documents",
    color: "bg-purple-500",
  },
];

const ServicesSection = () => {
  return (
    <section className="py-12 md:py-16 bg-gradient-to-b from-background to-muted/30">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16 animate-fade-in-up">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-5 leading-tight">
            Services We Cover
          </h2>
          <p className="text-muted-foreground max-w-3xl mx-auto text-lg md:text-xl leading-relaxed font-normal">
            Register complaints across various government departments. 
            Your grievance will be automatically routed to the right authority.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <Card 
                key={service.title} 
                className={`group cursor-pointer border-primary/20 hover:border-saffron/70 hover:shadow-2xl transition-all duration-500 bg-white/50 backdrop-blur-sm hover:bg-white animate-on-scroll`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <CardContent className="p-8 text-center">
                  <div className={`mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full ${service.color} text-white shadow-lg group-hover:scale-125 group-hover:-translate-y-2 group-hover:rotate-6 transition-all duration-500`}>
                    <Icon className="h-10 w-10 transition-transform duration-500 group-hover:scale-110" />
                  </div>
                  <h3 className="font-bold text-foreground mb-3 text-xl leading-snug transition-colors duration-300 group-hover:text-primary">
                    {service.title}
                  </h3>
                  <p className="text-sm md:text-base text-muted-foreground leading-relaxed font-normal">
                    {service.description}
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
