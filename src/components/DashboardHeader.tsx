import { Button } from "./ui/button";
import { Plus } from "lucide-react";

interface DashboardHeaderProps {
  onCreateNewDeal: () => void;
}

export const DashboardHeader = ({ onCreateNewDeal }: DashboardHeaderProps) => {
  return (
    <div className="bg-sidebar border-b border-sidebar-border px-8 py-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-sidebar-foreground">MediaLink Dashboard</h1>
          <p className="text-sidebar-foreground/70 mt-1">
            Centralized hub for all client engagements and collaborations
          </p>
        </div>
        
        <Button onClick={onCreateNewDeal} className="bg-primary text-primary-foreground hover:bg-primary/90">
          <Plus className="w-4 h-4 mr-2" />
          Create New Deal
        </Button>
      </div>
    </div>
  );
};