import { Users2 } from "lucide-react";
import { Button } from "@/components/ui/button";

const partners = [
  {
    name: "NIC",
    fullName: "National Informatics Centre",
    logo: "/logos/nic.png",
  },
  {
    name: "SI",
    fullName: "Skill India",
    logo: "/logos/skill-india.png",
  },
  {
    name: "DI",
    fullName: "Digital India",
    logo: "/logos/digital-india.png",
  },
  {
    name: "CSC",
    fullName: "CSC e-Governance",
    logo: "/logos/csc.png",
  },
  {
    name: "MII",
    fullName: "Make in India",
    logo: "/logos/make-in-india.png",
  },
  {
    name: "myGov",
    fullName: "myGov - मेरी सरकार",
    logo: "/logos/mygov.png",
  },
  {
    name: "GOI",
    fullName: "Government of India",
    logo: "/logos/goi.png",
  },
];

const OurPartnersSection = () => {
  return (
    <section className="px-4 md:px-8 py-20">
      <div className="max-w-7xl mx-auto">
        {/* Our Partners Tag */}
        <div className="flex justify-center mb-8">
          <Button
            variant="outline"
            className="border-emerald-200 text-emerald-700 bg-emerald-50 hover:bg-emerald-100"
          >
            <Users2 className="h-4 w-4 mr-2" />
            Our Partners
          </Button>
        </div>

        {/* Section Header */}
        <div className="text-center mb-16 animate-fade-in-up">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Trusted by Government Initiatives
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Collaborating with leading government platforms to deliver
            comprehensive digital solutions
          </p>
        </div>

        {/* Partners Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-7 gap-6 items-center justify-center">
          {partners.map((partner, idx) => (
            <div
              key={idx}
              className={`flex flex-col items-center justify-center p-8 rounded-xl border border-border hover:border-primary/50 hover:bg-primary/5 transition-all duration-500 hover:shadow-lg animate-on-scroll hover:scale-110 hover:-translate-y-2`}
              style={{ animationDelay: `${idx * 0.1}s` }}
            >
              <div className="flex items-center justify-center mb-4 min-h-[80px] transition-transform duration-500 group-hover:scale-110">
                <img
                  src={partner.logo}
                  alt={partner.fullName}
                  className="h-20 w-auto object-contain max-w-full transition-all duration-500 group-hover:brightness-110"
                  onError={(e) => {
                    // Fallback to SVG if PNG doesn't exist
                    const target = e.target as HTMLImageElement;
                    const svgPath = partner.logo.replace('.png', '.svg');
                    if (!target.src.includes('svg')) {
                      target.src = svgPath;
                    }
                  }}
                />
              </div>
              <p className="text-sm font-semibold text-foreground text-center mb-1">
                {partner.name}
              </p>
              <p className="text-xs text-muted-foreground text-center">
                {partner.fullName}
              </p>
            </div>
          ))}
        </div>

        {/* Bottom Message */}
        <div className="mt-12 p-6 bg-blue-50 border border-blue-200 rounded-lg text-center">
          <p className="text-sm text-blue-900">
            🏛️ Supported by Government of India initiatives and digital
            transformation programs
          </p>
        </div>
      </div>
    </section>
  );
};

export default OurPartnersSection;

