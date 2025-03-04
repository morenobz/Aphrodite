import React from "react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Home,
  Calendar,
  BarChart2,
  Heart,
  User,
  LogOut,
  Menu,
  Sparkles,
  Clock,
  Shirt,
  CheckCircle2,
} from "lucide-react";

interface SidebarProps {
  collapsed?: boolean;
  onToggle?: () => void;
  userName?: string;
  userAvatar?: string;
}

const Sidebar = ({
  collapsed = false,
  onToggle = () => {},
  userName = "Sarah Johnson",
  userAvatar = "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah",
}: SidebarProps) => {
  const location = useLocation();

  const navItems = [
    { icon: Home, label: "Dashboard", path: "/dashboard" },
    {
      icon: Sparkles,
      label: "AI Recommendations",
      path: "/ai-recommendations",
    },
    { icon: Shirt, label: "Virtual Stylist", path: "/virtual-stylist" },
    { icon: Calendar, label: "Period Tracker", path: "/period-tracker" },
    { icon: Clock, label: "Habit Tracker", path: "/habits" },
    { icon: CheckCircle2, label: "Daily Routine", path: "/daily-routine" },
    { icon: BarChart2, label: "Progress", path: "/progress" },
    { icon: User, label: "Profile", path: "/profile" },
  ];

  return (
    <div
      className={cn(
        "h-full flex flex-col bg-gradient-to-b from-purple-50 to-pink-50 border-r border-pink-100 transition-all duration-300",
        collapsed ? "w-20" : "w-72",
      )}
    >
      {/* Mobile Toggle */}
      <div className="lg:hidden flex justify-end p-4">
        <Button variant="ghost" size="icon" onClick={onToggle}>
          <Menu className="h-5 w-5 text-pink-600" />
        </Button>
      </div>

      {/* Logo and Brand */}
      <div
        className={cn(
          "flex items-center p-6",
          collapsed ? "justify-center" : "justify-start",
        )}
      >
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-full bg-gradient-to-r from-pink-400 to-purple-500 flex items-center justify-center">
            <span className="text-white font-bold text-xl">A</span>
          </div>
          {!collapsed && (
            <span className="text-xl font-semibold bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent">
              Aphrodite
            </span>
          )}
        </div>
      </div>

      {/* Navigation */}
      <div className="flex-1 py-8">
        <nav className="space-y-2 px-3">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            const Icon = item.icon;

            return (
              <TooltipProvider key={item.path} delayDuration={0}>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Link to={item.path}>
                      <Button
                        variant={isActive ? "default" : "ghost"}
                        className={cn(
                          "w-full justify-start",
                          isActive
                            ? "bg-pink-100 text-pink-700 hover:bg-pink-200 hover:text-pink-800"
                            : "hover:bg-pink-50 text-gray-600",
                          collapsed ? "px-3" : "px-4",
                        )}
                      >
                        <Icon
                          className={cn(
                            "h-5 w-5",
                            isActive ? "text-pink-600" : "text-gray-500",
                          )}
                        />
                        {!collapsed && (
                          <span className="ml-3">{item.label}</span>
                        )}
                      </Button>
                    </Link>
                  </TooltipTrigger>
                  {collapsed && (
                    <TooltipContent side="right">{item.label}</TooltipContent>
                  )}
                </Tooltip>
              </TooltipProvider>
            );
          })}
        </nav>
      </div>

      {/* User Profile */}
      <div className="p-4 border-t border-pink-100">
        <div
          className={cn(
            "flex items-center",
            collapsed ? "justify-center" : "justify-between",
          )}
        >
          <div className="flex items-center gap-3">
            <Avatar>
              <AvatarImage src={userAvatar} alt={userName} />
              <AvatarFallback className="bg-pink-200 text-pink-700">
                {userName
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </AvatarFallback>
            </Avatar>

            {!collapsed && (
              <div>
                <p className="text-sm font-medium text-gray-700">{userName}</p>
                <p className="text-xs text-gray-500">View profile</p>
              </div>
            )}
          </div>

          {!collapsed && (
            <Button
              variant="ghost"
              size="icon"
              className="text-gray-500 hover:text-pink-600"
            >
              <LogOut className="h-5 w-5" />
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
