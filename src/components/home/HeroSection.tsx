import { FileText, Search, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import heroBanner from "@/assets/hero-banner.jpg";

const HeroSection = () => {
  const navigate = useNavigate();
  return (
    <section className="relative overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${heroBanner})` }}
      >
        <div className="absolute inset-0 bg-primary/80" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 py-16 md:py-24 lg:py-32">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          {/* Left Content */}
          <div className="lg:col-span-2">
            <div className="max-w-3xl">
              {/* Badge */}
              <div className="mb-6 inline-flex items-center rounded-full bg-saffron/20 px-4 py-1.5 text-sm font-medium text-saffron-foreground backdrop-blur-sm animate-fade-in">
                <span className="mr-2 h-2 w-2 rounded-full bg-saffron animate-pulse-slow" />
                Government of India Initiative
              </div>

              {/* Heading */}
              <h1 className="mb-6 text-4xl font-bold tracking-tight text-primary-foreground md:text-5xl lg:text-6xl animate-fade-in-up">
                JanSeva
                <span className="block text-saffron mt-2 animate-fade-in-delay">Citizen Grievance Portal</span>
              </h1>

              {/* Description */}
              <p className="mb-8 text-lg text-primary-foreground/80 md:text-xl max-w-2xl animate-fade-in-delay-2">
                Your voice matters. Register and track your complaints with complete transparency. 
                Quick resolution guaranteed with our efficient grievance routing system.
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 animate-fade-in-delay-3">
                <Button 
                  onClick={() => navigate("/login")}
                  size="lg" 
                  className="w-full sm:w-auto bg-saffron hover:bg-saffron/90 text-navy-900 font-bold shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105 active:scale-95 group"
                >
                  <FileText className="mr-2 h-5 w-5 transition-transform duration-300 group-hover:rotate-12" />
                  Register Complaint
                  <ArrowRight className="ml-2 h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
                </Button>
                <Button 
                  onClick={() => navigate("/login")}
                  size="lg" 
                  variant="outline" 
                  className="w-full sm:w-auto border-white/80 text-black hover:bg-white/20 hover:border-white font-semibold transition-all duration-300 transform hover:scale-105 active:scale-95 group"
                >
                  <Search className="mr-2 h-5 w-5 transition-transform duration-300 group-hover:rotate-12" />
                  Check Status
                </Button>
              </div>

              {/* Quick Stats */}
              <div className="mt-12 grid grid-cols-3 gap-4 md:gap-8 max-w-lg">
                <div className="text-center transition-all duration-300 hover:scale-110 animate-fade-in-delay-3">
                  <p className="text-3xl md:text-4xl font-bold text-saffron transition-all duration-300 hover:text-saffron-light">50K+</p>
                  <p className="text-xs md:text-sm text-primary-foreground/70">Complaints Resolved</p>
                </div>
                <div className="text-center border-x border-primary-foreground/20 px-4 transition-all duration-300 hover:scale-110 animate-fade-in-delay-3">
                  <p className="text-3xl md:text-4xl font-bold text-saffron transition-all duration-300 hover:text-saffron-light">95%</p>
                  <p className="text-xs md:text-sm text-primary-foreground/70">Resolution Rate</p>
                </div>
                <div className="text-center transition-all duration-300 hover:scale-110 animate-fade-in-delay-3">
                  <p className="text-3xl md:text-4xl font-bold text-saffron transition-all duration-300 hover:text-saffron-light">48hr</p>
                  <p className="text-xs md:text-sm text-primary-foreground/70">Avg. Response</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side Info Box */}
          <div className="lg:col-span-1">
            <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-8 shadow-2xl hover:shadow-3xl transition-all duration-500 transform hover:-translate-y-2 hover:scale-[1.02] sticky top-8 animate-scale-in">
              <h3 className="text-xl font-bold text-white mb-6">Why JanSeva?</h3>
              
              <div className="space-y-4">
                {/* Transparent */}
                <div className="flex items-start gap-4 transition-all duration-300 hover:translate-x-2 group">
                  <div className="bg-saffron/20 rounded-full p-3 flex-shrink-0 transition-all duration-300 group-hover:bg-saffron/30 group-hover:scale-110">
                    <svg className="h-6 w-6 text-saffron transition-transform duration-300 group-hover:rotate-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-semibold text-white">100% Transparent</h4>
                    <p className="text-sm text-white/70">Real-time complaint tracking</p>
                  </div>
                </div>

                {/* Fast */}
                <div className="flex items-start gap-4 transition-all duration-300 hover:translate-x-2 group">
                  <div className="bg-saffron/20 rounded-full p-3 flex-shrink-0 transition-all duration-300 group-hover:bg-saffron/30 group-hover:scale-110">
                    <svg className="h-6 w-6 text-saffron transition-transform duration-300 group-hover:rotate-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-semibold text-white">Lightning Fast</h4>
                    <p className="text-sm text-white/70">Response within 48 hours</p>
                  </div>
                </div>

                {/* Secure */}
                <div className="flex items-start gap-4 transition-all duration-300 hover:translate-x-2 group">
                  <div className="bg-saffron/20 rounded-full p-3 flex-shrink-0 transition-all duration-300 group-hover:bg-saffron/30 group-hover:scale-110">
                    <svg className="h-6 w-6 text-saffron transition-transform duration-300 group-hover:rotate-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m7 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-semibold text-white">Secure & Private</h4>
                    <p className="text-sm text-white/70">Your data is protected</p>
                  </div>
                </div>

                {/* Services */}
                <div className="flex items-start gap-4 transition-all duration-300 hover:translate-x-2 group">
                  <div className="bg-saffron/20 rounded-full p-3 flex-shrink-0 transition-all duration-300 group-hover:bg-saffron/30 group-hover:scale-110">
                    <svg className="h-6 w-6 text-saffron transition-transform duration-300 group-hover:rotate-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.172l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-semibold text-white">All Services</h4>
                    <p className="text-sm text-white/70">8+ government departments</p>
                  </div>
                </div>
              </div>

              {/* WhatsApp Support */}
              <div className="mt-6">
                <div
                  role="button"
                  onClick={() => window.open('https://wa.me/', '_blank')}
                  className="bg-green-600/20 border border-green-600/30 rounded-xl p-3 flex items-center gap-3 transition-all duration-300 hover:scale-105 cursor-pointer"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-400 flex-shrink-0" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M20.52 3.48A11.81 11.81 0 0012 .75 11.83 11.83 0 001.5 12.72c0 2.08.55 4.11 1.6 5.9L.75 23.25l4.78-1.56a11.85 11.85 0 005.97 1.56h.01c6.51 0 11.95-5.37 11.95-12 0-1.86-.46-3.6-1.95-4.74zM12 20.25a9.2 9.2 0 01-4.7-1.28l-.34-.2-2.84.92.91-2.77-.22-.29A8.44 8.44 0 013.75 12.72c0-4.6 3.76-8.34 8.36-8.34a8.36 8.36 0 018.35 8.34c0 4.6-3.74 8.34-8.36 8.34z"/>
                    <path d="M17.1 14.11c-.3-.15-1.77-.87-2.05-.97-.28-.1-.48-.15-.68.16-.2.31-.75.97-.92 1.17-.17.2-.34.22-.63.07-.3-.15-1.25-.46-2.38-1.44-.88-.74-1.47-1.65-1.64-1.95-.17-.31-.02-.48.13-.63.13-.14.3-.36.45-.54.15-.18.2-.3.28-.5.08-.2.04-.37-.02-.52-.06-.16-.68-1.63-.93-2.23-.24-.58-.49-.5-.68-.51l-.58-.01c-.2 0-.52.07-.79.37-.27.3-1.03 1.01-1.03 2.46 0 1.45 1.05 2.86 1.2 3.06.15.2 2.08 3.36 5.04 4.72 2.97 1.36 3.21 1.13 3.79 1.06.58-.07 1.77-.72 2.02-1.42.25-.7.25-1.3.18-1.42-.06-.12-.26-.18-.56-.33z"/>
                  </svg>

                  <div className="flex-1">
                    <h4 className="font-semibold text-white">WhatsApp Support</h4>
                    <p className="text-sm text-white/70">Register complaints via WhatsApp — quick and easy.</p>
                  </div>

                  <div>
                    <button className="inline-flex items-center gap-2 text-sm font-semibold bg-green-500 hover:bg-green-400 text-white px-3 py-1 rounded-md">
                      Start Chat
                      <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M12 5l7 7-7 7"/>
                      </svg>
                    </button>
                  </div>
                </div>
              </div>

              {/* Trust Metric */}
              <div className="mt-8 pt-6 border-t border-white/10">
                <p className="text-xs text-white/60 text-center">
                  Trusted by <span className="font-bold text-white">1,25,847+</span> citizens
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Wave Decoration */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 100" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path 
            d="M0 50L48 45.7C96 41.3 192 32.7 288 35.3C384 38 480 52 576 58.3C672 64.7 768 63.3 864 55.7C960 48 1056 34 1152 31.3C1248 28.7 1344 37.3 1392 41.7L1440 46V100H1392C1344 100 1248 100 1152 100C1056 100 960 100 864 100C768 100 672 100 576 100C480 100 384 100 288 100C192 100 96 100 48 100H0V50Z" 
            fill="hsl(var(--background))"
          />
        </svg>
      </div>
    </section>
  );
};

export default HeroSection;

