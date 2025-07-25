import { useState, useMemo } from "react";
import { DashboardHeader } from "../components/DashboardHeader";
import { DashboardTabs } from "../components/DashboardTabs";
import { SearchAndFilter } from "../components/SearchAndFilter";
import { ClientCard } from "../components/ClientCard";

// Mock data for demo
const mockTeamMembers = [
  { id: "1", name: "Sarah Johnson", title: "Account Director", avatar: "", isAssigned: true },
  { id: "2", name: "Mike Chen", title: "Creative Director", avatar: "", isAssigned: true },
  { id: "3", name: "Alex Rodriguez", title: "Strategist", avatar: "", isAssigned: true },
  { id: "4", name: "Jessica Kim", title: "Designer", avatar: "", isAssigned: false },
  { id: "5", name: "David Park", title: "Data Analyst", avatar: "", isAssigned: false },
];

const mockCurrentClients = [
  {
    id: "1",
    name: "Giphy",
    logo: "",
    brandColor: "#FF6B6B",
    clientLead: "Sarah Johnson",
    teamSize: 4,
    pitchDate: "March 15, 2024",
    dateEngaged: "February 1, 2024",
    budget: "$250,000",
    goals: [
      "Increase Social Media Engagement 25%",
      "10M Impressions Across Paid Socials",
      "Launch 3 Viral Campaign Series"
    ],
    companyProfile: "Giphy is the world's largest library of animated GIFs, serving billions of users worldwide with searchable, shareable content.",
    projectScope: "Complete social media strategy overhaul including influencer partnerships, content creation, and paid advertising campaigns across TikTok, Instagram, and Twitter.",
    keyContacts: [
      {
        name: "Jennifer Martinez",
        title: "VP of Marketing",
        bio: "10+ years experience in digital marketing at tech companies. Previously led growth at Snapchat."
      },
      {
        name: "Tom Wilson",
        title: "Brand Manager",
        bio: "Creative professional focused on brand storytelling and community engagement. Former Disney marketing executive."
      }
    ],
    actionItems: [
      {
        id: "1",
        task: "Complete competitive analysis report",
        assignee: "Mike Chen",
        completed: false,
        dueDate: "March 10, 2024"
      },
      {
        id: "2",
        task: "Finalize influencer shortlist",
        assignee: "Alex Rodriguez",
        completed: true,
        dueDate: "March 5, 2024"
      }
    ],
    comments: [
      {
        id: "1",
        author: "Sarah Johnson",
        content: "Great progress on the influencer research. The TikTok creators we identified have strong engagement rates.",
        timestamp: "2 hours ago",
        avatar: ""
      },
      {
        id: "2",
        author: "Mike Chen",
        content: "Client loved the creative concepts. Moving forward with the animated series approach.",
        timestamp: "1 day ago",
        avatar: ""
      }
    ],
    bigIdeas: [
      {
        id: "1",
        author: "Alex Rodriguez",
        content: "What if we create a custom GIF maker tool for users? Could be a major upsell opportunity for Q2.",
        timestamp: "3 hours ago",
        votes: 5,
        avatar: ""
      }
    ]
  },
  {
    id: "2",
    name: "Netflix",
    logo: "",
    brandColor: "#E50914",
    clientLead: "Mike Chen",
    teamSize: 6,
    pitchDate: "March 22, 2024",
    dateEngaged: "February 10, 2024",
    budget: "$500,000",
    goals: [
      "Drive 15% increase in subscription conversions",
      "Expand international market penetration",
      "Launch targeted campaigns for 3 new shows"
    ],
    companyProfile: "Global streaming entertainment service with over 230 million paid memberships in more than 190 countries.",
    projectScope: "Multi-market campaign strategy for Q2 content launches, including data-driven audience segmentation and personalized creative development.",
    keyContacts: [
      {
        name: "Maria Gonzalez",
        title: "Global Marketing Director",
        bio: "15 years in entertainment marketing. Led successful campaigns for major film studios before joining Netflix."
      }
    ],
    actionItems: [
      {
        id: "3",
        task: "Market research for European expansion",
        assignee: "David Park",
        completed: false,
        dueDate: "March 18, 2024"
      }
    ],
    comments: [
      {
        id: "3",
        author: "Mike Chen",
        content: "The data insights team is impressed with our audience segmentation approach.",
        timestamp: "4 hours ago",
        avatar: ""
      }
    ],
    bigIdeas: [
      {
        id: "2",
        author: "Jessica Kim",
        content: "Interactive trailer experiences using AR technology - could revolutionize how people discover content.",
        timestamp: "1 day ago",
        votes: 8,
        avatar: ""
      }
    ]
  }
];

const mockArchivedClients = [
  {
    id: "3",
    name: "Spotify",
    logo: "",
    brandColor: "#1DB954",
    clientLead: "Alex Rodriguez",
    teamSize: 5,
    pitchDate: "January 15, 2024",
    dateEngaged: "December 1, 2023",
    budget: "$300,000",
    goals: ["Increase podcast engagement 30%"],
    companyProfile: "Leading music streaming platform with podcast expansion focus.",
    projectScope: "Podcast discovery and engagement campaign across major markets.",
    keyContacts: [],
    actionItems: [],
    comments: [],
    bigIdeas: []
  }
];

const mockProspectiveClients = [
  {
    id: "4",
    name: "Adobe",
    logo: "",
    brandColor: "#FF0000",
    clientLead: "TBD",
    teamSize: 0,
    pitchDate: "April 5, 2024",
    dateEngaged: "",
    budget: "TBD",
    goals: ["Creative Cloud marketing refresh"],
    companyProfile: "Leading creative software company targeting creators and professionals.",
    projectScope: "Brand positioning and digital strategy for Creative Cloud suite.",
    keyContacts: [],
    actionItems: [],
    comments: [],
    bigIdeas: []
  }
];

const Index = () => {
  const [activeTab, setActiveTab] = useState("current");
  const [expandedClient, setExpandedClient] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [filters, setFilters] = useState({
    industry: "",
    budgetRange: "",
    dateRange: "",
    teamMember: ""
  });
  const [clients, setClients] = useState({
    current: mockCurrentClients,
    archived: mockArchivedClients,
    prospective: mockProspectiveClients
  });

  const filteredClients = useMemo(() => {
    const clientList = clients[activeTab as keyof typeof clients];
    return clientList.filter(client => {
      const matchesSearch = !searchQuery || 
        client.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        client.clientLead.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesFilters = Object.entries(filters).every(([key, value]) => {
        if (!value) return true;
        // Add filter logic based on your needs
        return true;
      });

      return matchesSearch && matchesFilters;
    });
  }, [activeTab, searchQuery, filters, clients]);

  const handleFilterChange = (key: string, value: string) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const handleClearFilters = () => {
    setFilters({
      industry: "",
      budgetRange: "",
      dateRange: "",
      teamMember: ""
    });
  };

  const handleCreateNewDeal = () => {
    console.log("Create new deal clicked");
  };

  const handleExpand = (clientId: string) => {
    setExpandedClient(clientId);
  };

  const handleUpdateClient = (clientId: string, updates: any) => {
    setClients(prev => {
      const newClients = { ...prev };
      Object.keys(newClients).forEach(tab => {
        const tabClients = newClients[tab as keyof typeof newClients];
        const clientIndex = tabClients.findIndex(c => c.id === clientId);
        if (clientIndex !== -1) {
          tabClients[clientIndex] = { ...tabClients[clientIndex], ...updates };
        }
      });
      return newClients;
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader onCreateNewDeal={handleCreateNewDeal} />
      
      <div className="border-b border-border">
        <DashboardTabs
          activeTab={activeTab}
          onTabChange={setActiveTab}
          counts={{
            current: clients.current.length,
            archived: clients.archived.length,
            prospective: clients.prospective.length
          }}
        />
      </div>

      <div className="p-8">
        <div className="mb-8">
          <SearchAndFilter
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            filters={filters}
            onFilterChange={handleFilterChange}
            onClearFilters={handleClearFilters}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredClients.map((client) => (
            <ClientCard
              key={client.id}
              client={client}
              teamMembers={mockTeamMembers}
              onExpand={handleExpand}
              expanded={false}
              onUpdateClient={handleUpdateClient}
            />
          ))}
        </div>

        {filteredClients.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No clients found matching your criteria.</p>
          </div>
        )}
      </div>

      {expandedClient && (
        <ClientCard
          client={filteredClients.find(c => c.id === expandedClient)!}
          teamMembers={mockTeamMembers}
          onExpand={handleExpand}
          expanded={true}
          onUpdateClient={handleUpdateClient}
        />
      )}
    </div>
  );
};

export default Index;