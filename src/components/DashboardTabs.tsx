import { useState } from "react";
import { Badge } from "./ui/badge";

interface DashboardTabsProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  counts: {
    current: number;
    archived: number;
    prospective: number;
  };
}

export const DashboardTabs = ({ activeTab, onTabChange, counts }: DashboardTabsProps) => {
  return (
    <div className="flex border-b border-border">
      <button
        className={`tab-button px-6 py-3 font-medium text-sm flex items-center gap-2 ${
          activeTab === 'current' ? 'active' : 'text-muted-foreground hover:text-foreground'
        }`}
        onClick={() => onTabChange('current')}
      >
        Current Clients
        <Badge variant="secondary" className="text-xs">
          {counts.current}
        </Badge>
      </button>
      
      <button
        className={`tab-button px-6 py-3 font-medium text-sm flex items-center gap-2 ${
          activeTab === 'archived' ? 'active' : 'text-muted-foreground hover:text-foreground'
        }`}
        onClick={() => onTabChange('archived')}
      >
        Archived Clients
        <Badge variant="secondary" className="text-xs">
          {counts.archived}
        </Badge>
      </button>
      
      <button
        className={`tab-button px-6 py-3 font-medium text-sm flex items-center gap-2 ${
          activeTab === 'prospective' ? 'active' : 'text-muted-foreground hover:text-foreground'
        }`}
        onClick={() => onTabChange('prospective')}
      >
        Prospective Pitches
        <Badge variant="secondary" className="text-xs">
          {counts.prospective}
        </Badge>
      </button>
    </div>
  );
};