import { Link } from "react-router-dom";
import { Phone, Mail, MapPin, Facebook, Twitter, Youtube } from "lucide-react";
import { Button } from "@/components/ui/button";
import Logo from "@/components/ui/Logo";

const Footer = () => {
  return (
    <footer className="bg-white text-foreground">
      {/* Main Footer */}
      <div className="bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Brand */}
            <div>
              <div className="flex items-center gap-3 mb-5">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-saffron p-2">
                  <Logo className="h-12 w-12" />
                </div>
                <div>
                  <h3 className="text-xl font-black">JanSeva</h3>
                  <p className="text-xs text-primary-foreground/75 font-semibold">Grievance Portal</p>
                </div>
              </div>
              <p className="text-sm md:text-base text-primary-foreground/85 mb-5 leading-relaxed">
                An initiative to provide transparent, accountable, and time-bound 
                grievance redressal for all citizens.
              </p>
              <div className="flex gap-4">
                <a href="#" className="hover:text-saffron transition-all duration-300 hover:scale-125 hover:rotate-12">
                  <Facebook className="h-5 w-5" />
                </a>
                <a href="#" className="hover:text-saffron transition-all duration-300 hover:scale-125 hover:rotate-12">
                  <Twitter className="h-5 w-5" />
                </a>
                <a href="#" className="hover:text-saffron transition-all duration-300 hover:scale-125 hover:rotate-12">
                  <Youtube className="h-5 w-5" />
                </a>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="font-bold text-lg mb-5">Quick Links</h4>
              <ul className="space-y-3 text-sm md:text-base text-primary-foreground/85">
                <li><Link to="/register-complaint" className="hover:text-saffron transition-all duration-300 hover:translate-x-2 inline-block">Register Complaint</Link></li>
                <li><Link to="/track-complaint" className="hover:text-saffron transition-all duration-300 hover:translate-x-2 inline-block">Track Complaint</Link></li>
                <li><Link to="/complaint-history" className="hover:text-saffron transition-all duration-300 hover:translate-x-2 inline-block">Complaint History</Link></li>
                <li><a href="#" className="hover:text-saffron transition-all duration-300 hover:translate-x-2 inline-block">FAQs</a></li>
                <li><a href="#" className="hover:text-saffron transition-all duration-300 hover:translate-x-2 inline-block">Citizen Charter</a></li>
              </ul>
            </div>

            {/* Departments */}
            <div>
              <h4 className="font-bold text-lg mb-5">Departments</h4>
              <ul className="space-y-3 text-sm md:text-base text-primary-foreground/85">
                <li><a href="#" className="hover:text-saffron transition-all duration-300 hover:translate-x-2 inline-block">Municipal Corporation</a></li>
                <li><a href="#" className="hover:text-saffron transition-all duration-300 hover:translate-x-2 inline-block">Water Department</a></li>
                <li><a href="#" className="hover:text-saffron transition-all duration-300 hover:translate-x-2 inline-block">Electricity Board</a></li>
                <li><a href="#" className="hover:text-saffron transition-all duration-300 hover:translate-x-2 inline-block">Public Works</a></li>
                <li><a href="#" className="hover:text-saffron transition-all duration-300 hover:translate-x-2 inline-block">Revenue Department</a></li>
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h4 className="font-bold text-lg mb-5">Contact Us</h4>
              <ul className="space-y-4 text-sm md:text-base text-primary-foreground/85">
                <li className="flex items-start gap-3">
                  <Phone className="h-5 w-5 text-saffron shrink-0" />
                  <div>
                    <p className="font-medium">1800-XXX-XXXX</p>
                    <p className="text-xs">Toll Free (24x7)</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <Mail className="h-5 w-5 text-saffron shrink-0" />
                  <div>
                    <p>support@janseva.gov.in</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <MapPin className="h-5 w-5 text-saffron shrink-0" />
                  <div>
                    <p>JanSeva Bhawan,</p>
                    <p>New Delhi - 110001</p>
                  </div>
                </li>
              </ul>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="mt-12 pt-8 border-t border-primary-foreground/20">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-xs md:text-sm text-primary-foreground/70 font-medium">
              <p>© 2025 JanSeva - Government of India. All rights reserved.</p>
              <div className="flex gap-6">
                <a href="#" className="hover:text-saffron transition-all duration-300 hover:scale-110 font-medium">Privacy Policy</a>
                <a href="#" className="hover:text-saffron transition-all duration-300 hover:scale-110 font-medium">Terms of Use</a>
                <a href="#" className="hover:text-saffron transition-all duration-300 hover:scale-110 font-medium">Accessibility</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
