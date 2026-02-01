import { BookOpen, Phone, Users2, Code } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const supportServices = [
  {
    icon: BookOpen,
    title: "Help Center",
    description: "Comprehensive guides and tutorials",
    action: "Browse Articles →",
  },
  {
    icon: Phone,
    title: "Technical Support",
    description: "24/7 assistance for platform issues",
    action: "Contact Support →",
  },
  {
    icon: Users2,
    title: "Training Resources",
    description: "Learning materials for communities",
    action: "Access Training →",
  },
  {
    icon: Code,
    title: "Developer APIs",
    description: "Integration documentation",
    action: "View Docs →",
  },
];

const GetSupportSection = () => {
  return (
    <section className="px-4 md:px-8 py-20 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16 animate-fade-in-up">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Get Support
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            We're here to help you succeed on our platform
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {supportServices.map((service, idx) => {
            const Icon = service.icon;
            return (
              <Card
                key={idx}
                className={`hover:shadow-lg transition-all duration-500 hover:border-primary/50 hover:bg-primary/5 animate-on-scroll hover:scale-105 hover:-translate-y-2`}
                style={{ animationDelay: `${idx * 0.15}s` }}
              >
                <CardContent className="p-8">
                  <div className="space-y-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center transition-all duration-500 group-hover:bg-primary/20 group-hover:scale-110 group-hover:rotate-6">
                      <Icon className="h-6 w-6 text-primary transition-transform duration-500 group-hover:scale-110" />
                    </div>
                    <h3 className="text-lg font-semibold text-foreground transition-colors duration-300 group-hover:text-primary">
                      {service.title}
                    </h3>
                    <p className="text-muted-foreground text-sm">
                      {service.description}
                    </p>
                    <Button
                      variant="ghost"
                      className="text-primary font-semibold p-0 h-auto hover:bg-transparent transition-all duration-300 hover:translate-x-2 group"
                    >
                      {service.action}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default GetSupportSection;

