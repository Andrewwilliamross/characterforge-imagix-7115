import { NavLink, useLocation } from "react-router-dom";
import { Home, Users, Search, Briefcase, Bot } from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
  useSidebar,
} from "@/components/ui/sidebar";

const items = [
  { title: "Home", url: "/", icon: Home },
  { title: "Deal Room", url: "/deal-room", icon: Users },
  { title: "Research", url: "/research", icon: Search },
  { title: "Workspace", url: "/workspace", icon: Briefcase },
  { title: "AI Consultant", url: "/ai-consultant", icon: Bot },
];

export function AppSidebar() {
  const { state } = useSidebar();
  const collapsed = state === "collapsed";
  const location = useLocation();
  const currentPath = location.pathname;

  const isActive = (path: string) => currentPath === path;
  const getNavCls = ({ isActive }: { isActive: boolean }) =>
    isActive ? "bg-sidebar-accent text-sidebar-accent-foreground font-medium" : "hover:bg-sidebar-accent/50";

  return (
    <Sidebar
      className={collapsed ? "w-14" : "w-60"}
      collapsible="icon"
    >
      <SidebarContent className="bg-sidebar-background">
        <div className="p-4 border-b border-sidebar-border flex items-center justify-between">
          <h2 className={`font-bold text-sidebar-foreground ${collapsed ? "text-xs text-center" : "text-xl"}`}>
            {collapsed ? "ML" : "MediaLink"}
          </h2>
          <SidebarTrigger className="h-6 w-6" />
        </div>

        <SidebarGroup className="p-4">
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink to={item.url} end className={getNavCls}>
                      <item.icon className="h-5 w-5" />
                      {!collapsed && <span className="ml-3">{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}