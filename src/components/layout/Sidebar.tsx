import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import Logo from "@/components/ui/Logo";
import {
  Home,
  FileText,
  Search,
  History,
  BarChart3,
  Users,
  Settings,
  Shield,
  Clock,
  MapPin,
  FileCheck,
  AlertTriangle,
  Building2,
  UserCog,
  Activity,
} from "lucide-react";

interface SidebarProps {
  userRole: "citizen" | "officer" | "admin";
  isOpen?: boolean;
  onClose?: () => void;
}

const citizenLinks = [
  { href: "/", label: "Home", icon: Home },
  { href: "/register-complaint", label: "Register Complaint", icon: FileText },
  { href: "/track-complaint", label: "Track Complaint", icon: Search },
  { href: "/complaint-history", label: "Complaint History", icon: History },
  { href: "/profile", label: "Profile Settings", icon: Settings },
];

const officerLinks = [
  { href: "/officer", label: "Dashboard", icon: Home },
  { href: "/officer/complaints", label: "Manage Complaints", icon: FileCheck },
  { href: "/officer/map-view", label: "Map View", icon: MapPin },
  { href: "/officer/calendar", label: "Task Calendar", icon: Clock },
  { href: "/officer/reports", label: "My Reports", icon: BarChart3 },
];

const adminLinks = [
  { href: "/admin", label: "Dashboard", icon: Home },
  { href: "/admin/analytics", label: "Analytics", icon: BarChart3 },
  { href: "/admin/departments", label: "Departments", icon: Building2 },
  { href: "/admin/sla", label: "SLA Management", icon: AlertTriangle },
  { href: "/admin/users", label: "User Management", icon: UserCog },
  { href: "/admin/logs", label: "System Logs", icon: Activity },
];

const Sidebar = ({ userRole, isOpen, onClose }: SidebarProps) => {
  const location = useLocation();
  
  const links = userRole === "admin" 
    ? adminLinks 
    : userRole === "officer" 
    ? officerLinks 
    : citizenLinks;

  const roleLabels = {
    citizen: "Citizen Portal",
    officer: "Officer Portal",
    admin: "Admin Portal",
  };

  const roleIcons = {
    citizen: Users,
    officer: Shield,
    admin: Settings,
  };

  const RoleIcon = roleIcons[userRole];

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 z-40 bg-black/50 lg:hidden" 
          onClick={onClose}
        />
      )}
      
      {/* Sidebar */}
      <aside
        className={cn(
          "fixed left-0 top-0 z-50 h-full w-64 bg-sidebar text-sidebar-foreground transition-transform duration-300 lg:translate-x-0 lg:static lg:z-auto",
          isOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="flex h-full flex-col">
          {/* Logo Section */}
          <div className="flex h-16 items-center gap-3 border-b border-sidebar-border px-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-saffron p-1">
              <Logo className="h-8 w-8" />
            </div>
            <div>
              <h1 className="text-lg font-bold">JanSeva</h1>
              <p className="text-xs text-sidebar-foreground/70">Grievance Portal</p>
            </div>
          </div>

          {/* Role Badge */}
          <div className="mx-4 mt-4 flex items-center gap-2 rounded-lg bg-sidebar-accent p-3">
            <RoleIcon className="h-5 w-5 text-saffron" />
            <span className="text-sm font-medium">{roleLabels[userRole]}</span>
          </div>

          {/* Navigation */}
          <nav className="flex-1 space-y-1 p-4">
            {links.map((link) => {
              const Icon = link.icon;
              const isActive = location.pathname === link.href;
              
              return (
                <Link
                  key={link.href}
                  to={link.href}
                  onClick={onClose}
                  className={cn(
                    "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                    isActive
                      ? "bg-saffron text-saffron-foreground"
                      : "text-sidebar-foreground/80 hover:bg-sidebar-accent hover:text-sidebar-foreground"
                  )}
                >
                  <Icon className="h-5 w-5" />
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* Footer */}
          <div className="border-t border-sidebar-border p-4">
            <div className="rounded-lg bg-sidebar-accent p-3">
              <p className="text-xs text-sidebar-foreground/70">Need Help?</p>
              <p className="text-sm font-medium">1800-XXX-XXXX</p>
              <p className="text-xs text-sidebar-foreground/70 mt-1">24x7 Helpline</p>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
