import { FileCheck, Clock, Users, TrendingUp } from "lucide-react";

const stats = [
  {
    icon: FileCheck,
    value: "1,25,847",
    label: "Total Complaints",
    change: "+12% this month",
    color: "text-primary",
    bgColor: "bg-primary/10",
  },
  {
    icon: Clock,
    value: "98.5%",
    label: "Resolved on Time",
    change: "Above target",
    color: "text-success",
    bgColor: "bg-success/10",
  },
  {
    icon: Users,
    value: "45,320",
    label: "Citizens Served",
    change: "+8% this month",
    color: "text-saffron",
    bgColor: "bg-saffron/10",
  },
  {
    icon: TrendingUp,
    value: "4.8/5",
    label: "Satisfaction Rate",
    change: "Based on feedback",
    color: "text-purple-600",
    bgColor: "bg-purple-100",
  },
];

const StatsSection = () => {
  return (
    <section className="py-8 md:py-10 bg-gradient-to-r from-muted/50 to-muted/30">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div
                key={stat.label}
                className={`stat-card flex flex-col items-center text-center p-7 md:p-9 rounded-2xl bg-white/50 backdrop-blur-sm hover:bg-white/80 hover:shadow-lg transition-all duration-500 border border-transparent hover:border-primary/20 animate-on-scroll hover:scale-105 hover:-translate-y-2`}
                style={{ animationDelay: `${index * 0.15}s` }}
              >
                <div className={`mb-5 flex h-16 w-16 items-center justify-center rounded-xl ${stat.bgColor} group-hover:scale-110 transition-all duration-500 hover:rotate-12`}>
                  <Icon className={`h-8 w-8 ${stat.color} transition-transform duration-500 group-hover:scale-125`} />
                </div>
                <p className="text-3xl md:text-4xl font-bold text-foreground mb-3 transition-all duration-300 hover:scale-110">
                  {stat.value}
                </p>
                <p className="text-sm md:text-base font-bold text-foreground mb-2 tracking-wide">
                  {stat.label}
                </p>
                <p className="text-xs text-muted-foreground font-semibold">
                  {stat.change}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
