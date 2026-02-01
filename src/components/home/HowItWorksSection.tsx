import { FileText, Send, UserCheck, CheckCircle } from "lucide-react";

const steps = [
  {
    icon: FileText,
    step: "01",
    title: "Register Complaint",
    description: "Fill out the complaint form with details about your issue, add photos if needed",
  },
  {
    icon: Send,
    step: "02",
    title: "Auto-Routing",
    description: "Your complaint is automatically routed to the relevant department officer",
  },
  {
    icon: UserCheck,
    step: "03",
    title: "Officer Action",
    description: "Assigned officer reviews and takes action within the SLA timeline",
  },
  {
    icon: CheckCircle,
    step: "04",
    title: "Resolution",
    description: "Get notified when resolved. Rate the service and provide feedback",
  },
];

const HowItWorksSection = () => {
  return (
    <section className="py-12 md:py-16 bg-gradient-to-b from-muted/30 to-background">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16 animate-fade-in-up">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-5 leading-tight">
            How It Works
          </h2>
          <p className="text-muted-foreground max-w-3xl mx-auto text-lg md:text-xl leading-relaxed font-normal">
            Simple 4-step process from complaint registration to resolution
          </p>
        </div>

        {/* Steps */}
        <div className="relative max-w-5xl mx-auto">
          {/* Connection Line */}
          <div className="hidden md:block absolute top-24 left-[12%] right-[12%] h-0.5 bg-gradient-to-r from-saffron via-primary to-success" />

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-6">
            {steps.map((item, index) => {
              const Icon = item.icon;
              return (
                <div 
                  key={item.step} 
                  className={`relative text-center group animate-on-scroll`}
                  style={{ animationDelay: `${index * 0.2}s` }}
                >
                  {/* Step Number */}
                  <div className="relative z-10 mx-auto mb-8">
                    <div className="flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-primary to-primary/80 text-primary-foreground shadow-lg mx-auto group-hover:shadow-2xl group-hover:scale-110 group-hover:rotate-6 transition-all duration-500">
                      <Icon className="h-9 w-9 transition-transform duration-500 group-hover:scale-110" />
                    </div>
                    <span className="absolute -bottom-3 -right-3 flex h-10 w-10 items-center justify-center rounded-full bg-saffron text-sm font-bold text-saffron-foreground shadow-md transition-all duration-300 group-hover:scale-110 group-hover:rotate-12">
                      {item.step}
                    </span>
                  </div>

                  {/* Content */}
                  <h3 className="text-lg md:text-xl font-bold text-foreground mb-3 group-hover:text-primary transition-all duration-300 group-hover:scale-105">
                    {item.title}
                  </h3>
                  <p className="text-sm md:text-base text-muted-foreground leading-relaxed font-normal">
                    {item.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
