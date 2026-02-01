import { useEffect } from "react";
import Header from "@/components/layout/Header";
import HeroSection from "@/components/home/HeroSection";
import StatsSection from "@/components/home/StatsSection";
import ServicesSection from "@/components/home/ServicesSection";
import HowItWorksSection from "@/components/home/HowItWorksSection";
import WhatsAppExample from "@/components/home/WhatsAppExample";
import FeedbackFormSection from "@/components/home/FeedbackFormSection";
import GetSupportSection from "@/components/home/GetSupportSection";
import OurPartnersSection from "@/components/home/OurPartnersSection";
import Footer from "@/components/home/Footer";

const Index = () => {
  useEffect(() => {
    // Add scroll-triggered animations
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px',
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    }, observerOptions);

    // Observe all elements with animate-on-scroll class
    const elements = document.querySelectorAll('.animate-on-scroll');
    elements.forEach((el) => observer.observe(el));

    return () => {
      elements.forEach((el) => observer.unobserve(el));
    };
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Header showSearch={false} />
      <main className="flex-1">
        <HeroSection />
        <StatsSection />
        <ServicesSection />
        <HowItWorksSection />
        <WhatsAppExample />
        <FeedbackFormSection />
        <GetSupportSection />
        <OurPartnersSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
