import { useState } from "react";
import { Card, CardContent, CardHeader } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "./ui/avatar";
import { Textarea } from "./ui/textarea";
import { Input } from "./ui/input";
import { Checkbox } from "./ui/checkbox";
import { Calendar, DollarSign, Target, Users, MessageCircle, Lightbulb, Plus, Upload, ChevronDown, ChevronUp, Edit, X, FileText, Table, Presentation, ExternalLink } from "lucide-react";

interface TeamMember {
  id: string;
  name: string;
  title: string;
  avatar?: string;
  isAssigned: boolean;
}

interface NetflixClient {
  id: string;
  name: string;
  logo: string;
  brandColor: string;
  clientLead: string;
  teamSize: number;
  pitchDate: string;
  dateEngaged: string;
  budget: string;
  goals: string[];
  companyProfile: string;
  projectScope: string;
  keyContacts: Array<{
    name: string;
    title: string;
    bio: string;
  }>;
  actionItems: Array<{
    id: string;
    task: string;
    assignee: string;
    completed: boolean;
    dueDate: string;
    description?: string;
  }>;
  comments: Array<{
    id: string;
    author: string;
    content: string;
    timestamp: string;
    avatar?: string;
  }>;
  bigIdeas: Array<{
    id: string;
    author: string;
    content: string;
    timestamp: string;
    votes: number;
    avatar?: string;
  }>;
  documents?: Array<{
    id: string;
    name: string;
    type: string;
    uploadDate: string;
  }>;
  boxUrl?: string;
}

// Netflix client data
const netflixClient: NetflixClient = {
  id: "netflix-001",
  name: "Netflix",
  logo: "/lovable-uploads/720cbbc8-68f0-4fa8-9a58-ece8617aeaa0.png",
  brandColor: "#E50914",
  clientLead: "Sarah Johnson",
  teamSize: 8,
  pitchDate: "March 15, 2024",
  dateEngaged: "February 1, 2024",
  budget: "$2.5M",
  goals: [
    "Increase subscriber engagement by 35%",
    "Launch new interactive content features",
    "Expand international market presence",
    "Develop next-gen streaming technology"
  ],
  companyProfile: "Netflix is the world's leading streaming entertainment service with over 230 million paid memberships in more than 190 countries enjoying TV series, documentaries and feature films across a wide variety of genres and languages. The company is focused on enhancing user experience through innovative technology and original content production.",
  projectScope: "Development of an AI-powered content recommendation system and interactive viewing experience platform. This includes creating personalized content pathways, interactive storytelling features, and advanced analytics for content performance optimization.",
  keyContacts: [
    {
      name: "Reed Hastings",
      title: "Co-CEO & Chairman",
      bio: "Co-founder and executive chairman of Netflix. Previously founded Pure Software, which was acquired by Rational Software. Holds a master's degree in computer science from Stanford University."
    },
    {
      name: "Ted Sarandos",
      title: "Co-CEO & Chief Content Officer",
      bio: "Responsible for Netflix's global content strategy and operations. Has been instrumental in Netflix's transformation from DVD-by-mail to streaming giant and original content powerhouse."
    },
    {
      name: "Greg Peters",
      title: "Chief Operating Officer",
      bio: "Oversees Netflix's product development, technology, and operations. Previously led Netflix's expansion into international markets and development of the streaming platform."
    }
  ],
  actionItems: [
    {
      id: "action-001",
      task: "Complete technical architecture review",
      assignee: "Mike Chen",
      completed: false,
      dueDate: "March 8, 2024",
      description: "Conduct comprehensive review of current streaming infrastructure and identify optimization opportunities for the new AI recommendation system integration."
    },
    {
      id: "action-002",
      task: "Finalize content analytics framework",
      assignee: "Jessica Wu",
      completed: true,
      dueDate: "February 28, 2024",
      description: "Develop metrics and KPIs for measuring content engagement and recommendation system effectiveness."
    },
    {
      id: "action-003",
      task: "User experience prototype development",
      assignee: "Alex Rodriguez",
      completed: false,
      dueDate: "March 12, 2024",
      description: "Create interactive prototypes for the new personalized viewing experience interface."
    }
  ],
  comments: [
    {
      id: "comment-001",
      author: "Sarah Johnson",
      content: "The client is very excited about the AI recommendation features. They want to see preliminary results by next week.",
      timestamp: "2 hours ago",
      avatar: ""
    },
    {
      id: "comment-002",
      author: "Mike Chen",
      content: "Technical integration is proceeding smoothly. We'll need to coordinate with their platform team for API access.",
      timestamp: "1 day ago",
      avatar: ""
    },
    {
      id: "comment-003",
      author: "Jessica Wu",
      content: "Analytics dashboard mockups are ready for review. Scheduling presentation with Ted Sarandos for Friday.",
      timestamp: "2 days ago",
      avatar: ""
    }
  ],
  bigIdeas: [
    {
      id: "idea-001",
      author: "Alex Rodriguez",
      content: "Virtual reality viewing rooms for immersive content experiences - could revolutionize how people watch Netflix together remotely.",
      timestamp: "3 days ago",
      votes: 12,
      avatar: ""
    },
    {
      id: "idea-002",
      author: "Sarah Johnson",
      content: "AI-generated personalized movie trailers based on viewer preferences and watching history.",
      timestamp: "1 week ago",
      votes: 8,
      avatar: ""
    },
    {
      id: "idea-003",
      author: "Mike Chen",
      content: "Blockchain-based content licensing system for seamless international distribution.",
      timestamp: "1 week ago",
      votes: 15,
      avatar: ""
    }
  ],
  documents: [
    {
      id: "doc-001",
      name: "Netflix_Technical_Requirements.pdf",
      type: "pdf",
      uploadDate: "February 15, 2024"
    },
    {
      id: "doc-002",
      name: "Content_Analytics_Framework.xlsx",
      type: "excel",
      uploadDate: "February 20, 2024"
    },
    {
      id: "doc-003",
      name: "UI_UX_Presentation.pptx",
      type: "powerpoint",
      uploadDate: "February 25, 2024"
    }
  ],
  boxUrl: "https://app.box.com/folder/netflix-project-2024"
};

// Team members for Netflix project
const netflixTeamMembers: TeamMember[] = [
  {
    id: "tm-001",
    name: "Sarah Johnson",
    title: "Project Lead",
    avatar: "",
    isAssigned: true
  },
  {
    id: "tm-002",
    name: "Mike Chen",
    title: "Technical Architect",
    avatar: "",
    isAssigned: true
  },
  {
    id: "tm-003",
    name: "Jessica Wu",
    title: "Data Analyst",
    avatar: "",
    isAssigned: true
  },
  {
    id: "tm-004",
    name: "Alex Rodriguez",
    title: "UX Designer",
    avatar: "",
    isAssigned: true
  },
  {
    id: "tm-005",
    name: "David Kim",
    title: "Frontend Developer",
    avatar: "",
    isAssigned: true
  },
  {
    id: "tm-006",
    name: "Lisa Thompson",
    title: "Backend Developer",
    avatar: "",
    isAssigned: false
  },
  {
    id: "tm-007",
    name: "Robert Brown",
    title: "QA Engineer",
    avatar: "",
    isAssigned: false
  }
];

interface NetflixCardProps {
  expanded?: boolean;
  onExpand?: (clientId: string) => void;
  onUpdateClient?: (clientId: string, updates: Partial<NetflixClient>) => void;
}

export const NetflixCardExample = ({ expanded = false, onExpand, onUpdateClient }: NetflixCardProps) => {
  const [newComment, setNewComment] = useState("");
  const [newIdea, setNewIdea] = useState("");
  const [newActionItem, setNewActionItem] = useState("");
  const [newTeamMember, setNewTeamMember] = useState("");
  const [newBoxUrl, setNewBoxUrl] = useState(netflixClient.boxUrl || "");
  const [expandedActionItems, setExpandedActionItems] = useState<Set<string>>(new Set());
  const [expandedContacts, setExpandedContacts] = useState<Set<string>>(new Set());
  const [editingFields, setEditingFields] = useState<Set<string>>(new Set());
  const [editValues, setEditValues] = useState<any>({});
  const [globalEditMode, setGlobalEditMode] = useState(false);
  const [client, setClient] = useState(netflixClient);

  const assignedMembers = netflixTeamMembers.filter(member => member.isAssigned);
  const unassignedMembers = netflixTeamMembers.filter(member => !member.isAssigned);
  const brandColor = client.brandColor;

  const toggleActionItem = (itemId: string) => {
    const newExpanded = new Set(expandedActionItems);
    if (newExpanded.has(itemId)) {
      newExpanded.delete(itemId);
    } else {
      newExpanded.add(itemId);
    }
    setExpandedActionItems(newExpanded);
  };

  const toggleContact = (contactName: string) => {
    const newExpanded = new Set(expandedContacts);
    if (newExpanded.has(contactName)) {
      newExpanded.delete(contactName);
    } else {
      newExpanded.add(contactName);
    }
    setExpandedContacts(newExpanded);
  };

  const startEditing = (field: string, currentValue: any) => {
    setEditingFields(prev => new Set([...prev, field]));
    setEditValues(prev => ({ ...prev, [field]: currentValue }));
  };

  const saveEdit = (field: string) => {
    setClient(prev => ({ ...prev, [field]: editValues[field] }));
    setEditingFields(prev => {
      const newSet = new Set(prev);
      newSet.delete(field);
      return newSet;
    });
  };

  const cancelEdit = (field: string) => {
    setEditingFields(prev => {
      const newSet = new Set(prev);
      newSet.delete(field);
      return newSet;
    });
    setEditValues(prev => {
      const newValues = { ...prev };
      delete newValues[field];
      return newValues;
    });
  };

  const addComment = () => {
    if (newComment.trim()) {
      const newCommentObj = {
        id: Date.now().toString(),
        author: "Current User",
        content: newComment,
        timestamp: "Just now",
        avatar: ""
      };
      setClient(prev => ({
        ...prev,
        comments: [...prev.comments, newCommentObj]
      }));
      setNewComment("");
    }
  };

  const addIdea = () => {
    if (newIdea.trim()) {
      const newIdeaObj = {
        id: Date.now().toString(),
        author: "Current User",
        content: newIdea,
        timestamp: "Just now",
        votes: 0,
        avatar: ""
      };
      setClient(prev => ({
        ...prev,
        bigIdeas: [...prev.bigIdeas, newIdeaObj]
      }));
      setNewIdea("");
    }
  };

  const addActionItem = () => {
    if (newActionItem.trim()) {
      const newActionItemObj = {
        id: Date.now().toString(),
        task: newActionItem,
        assignee: "Unassigned",
        completed: false,
        dueDate: new Date().toLocaleDateString(),
        description: ""
      };
      setClient(prev => ({
        ...prev,
        actionItems: [...prev.actionItems, newActionItemObj]
      }));
      setNewActionItem("");
    }
  };

  const uploadDocument = () => {
    const mockDoc = {
      id: Date.now().toString(),
      name: "Sample Document.pdf",
      type: "pdf",
      uploadDate: new Date().toLocaleDateString()
    };
    
    setClient(prev => ({
      ...prev,
      documents: [...(prev.documents || []), mockDoc]
    }));
  };

  const getDocumentIcon = (type: string) => {
    if (type.includes('excel') || type.includes('csv') || type.includes('xlsx')) {
      return <Table className="w-4 h-4 text-green-600" />;
    }
    if (type.includes('powerpoint') || type.includes('ppt') || type.includes('presentation')) {
      return <Presentation className="w-4 h-4 text-orange-600" />;
    }
    return <FileText className="w-4 h-4 text-blue-600" />;
  };

  const getDocumentColor = (type: string) => {
    if (type.includes('excel') || type.includes('csv') || type.includes('xlsx')) {
      return 'bg-green-100 border-green-300 text-green-800';
    }
    if (type.includes('powerpoint') || type.includes('ppt') || type.includes('presentation')) {
      return 'bg-orange-100 border-orange-300 text-orange-800';
    }
    return 'bg-blue-100 border-blue-300 text-blue-800';
  };

  if (!expanded) {
    // Netflix Preview Card
    return (
      <Card 
        className="client-card p-6 cursor-pointer bg-card border-2 transition-all duration-300 hover:scale-105 hover:shadow-lg"
        style={{ 
          borderColor: brandColor,
          boxShadow: `0 4px 20px ${brandColor}20`
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.boxShadow = `0 8px 30px ${brandColor}40`;
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.boxShadow = `0 4px 20px ${brandColor}20`;
        }}
        onClick={() => onExpand?.(client.id)}
      >
        <div className="text-center space-y-4">
          <h3 className="text-xl font-semibold text-foreground">{client.name}</h3>
          
          <div className="flex justify-center">
            <div 
              className="w-16 h-16 rounded-lg flex items-center justify-center text-white font-bold text-2xl p-2"
              style={{ backgroundColor: brandColor }}
            >
              <img src={client.logo} alt={client.name} className="w-full h-full object-contain rounded-lg" />
            </div>
          </div>
          
          <div className="space-y-2 text-sm text-muted-foreground">
            <p><span className="font-medium">Client Lead:</span> {client.clientLead}</p>
            <p><span className="font-medium">Team Size:</span> {client.teamSize}</p>
            <p><span className="font-medium">Pitch Date:</span> {client.pitchDate}</p>
          </div>
        </div>
      </Card>
    );
  }

  // Netflix Expanded Card
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <Card className="expanded-card w-full max-w-7xl max-h-[95vh] overflow-hidden bg-card">
        <div className="grid grid-cols-4 h-full">
          {/* Main Content - 3 columns */}
          <div className="col-span-3 overflow-auto">
            <div className="p-8">
              {/* Header */}
              <div className="flex justify-between items-start mb-8">
                <div className="flex items-center gap-4">
                  <div 
                    className="w-16 h-16 rounded-lg flex items-center justify-center text-white font-bold text-2xl"
                    style={{ backgroundColor: brandColor }}
                  >
                    <img src={client.logo} alt={client.name} className="w-full h-full object-contain rounded-lg" />
                  </div>
                  <div>
                    <h1 className="text-3xl font-bold text-foreground mb-2">{client.name}</h1>
                    <p className="text-muted-foreground">Client Lead: {client.clientLead}</p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => setGlobalEditMode(!globalEditMode)}
                  >
                    <Edit className="w-4 h-4" />
                  </Button>
                  <Button variant="outline" onClick={() => onExpand?.("")}>
                    <X className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              {/* Company Profile & Project Scope */}
              <div className="grid md:grid-cols-2 gap-6 mb-8">
                <Card className="bg-muted/30">
                  <CardHeader className="flex flex-row items-center justify-between">
                    <h3 className="text-lg font-semibold">Company Profile</h3>
                    {globalEditMode && (
                      <Button 
                        size="sm" 
                        variant="ghost"
                        onClick={() => startEditing('companyProfile', client.companyProfile)}
                      >
                        <Edit className="w-4 h-4" />
                      </Button>
                    )}
                  </CardHeader>
                  <CardContent>
                    {editingFields.has('companyProfile') ? (
                      <div className="space-y-2">
                        <Textarea 
                          value={editValues.companyProfile || ""}
                          onChange={(e) => setEditValues(prev => ({ ...prev, companyProfile: e.target.value }))}
                        />
                        <div className="flex gap-2">
                          <Button size="sm" onClick={() => saveEdit('companyProfile')}>Save</Button>
                          <Button size="sm" variant="outline" onClick={() => cancelEdit('companyProfile')}>Cancel</Button>
                        </div>
                      </div>
                    ) : (
                      <p className="text-muted-foreground">{client.companyProfile}</p>
                    )}
                  </CardContent>
                </Card>

                <Card className="bg-muted/30">
                  <CardHeader className="flex flex-row items-center justify-between">
                    <h3 className="text-lg font-semibold">Project Scope</h3>
                    {globalEditMode && (
                      <Button 
                        size="sm" 
                        variant="ghost"
                        onClick={() => startEditing('projectScope', client.projectScope)}
                      >
                        <Edit className="w-4 h-4" />
                      </Button>
                    )}
                  </CardHeader>
                  <CardContent>
                    {editingFields.has('projectScope') ? (
                      <div className="space-y-2">
                        <Textarea 
                          value={editValues.projectScope || ""}
                          onChange={(e) => setEditValues(prev => ({ ...prev, projectScope: e.target.value }))}
                        />
                        <div className="flex gap-2">
                          <Button size="sm" onClick={() => saveEdit('projectScope')}>Save</Button>
                          <Button size="sm" variant="outline" onClick={() => cancelEdit('projectScope')}>Cancel</Button>
                        </div>
                      </div>
                    ) : (
                      <p className="text-muted-foreground">{client.projectScope}</p>
                    )}
                  </CardContent>
                </Card>
              </div>

              {/* Key Client Contacts */}
              <Card className="mb-8 bg-muted/30">
                <CardHeader>
                  <h3 className="text-lg font-semibold">Key Client Contacts</h3>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-4">
                    {client.keyContacts.map((contact, index) => (
                      <Card 
                        key={index} 
                        className="p-4 hover:shadow-md transition-all duration-200 cursor-pointer bg-background hover:scale-105"
                        onClick={() => toggleContact(contact.name)}
                      >
                        <h4 className="font-medium">{contact.name}</h4>
                        <p className="text-sm font-medium mb-2" style={{ color: brandColor }}>{contact.title}</p>
                        {expandedContacts.has(contact.name) && (
                          <div className="mt-3 pt-3 border-t">
                            <p className="text-sm text-muted-foreground">{contact.bio}</p>
                          </div>
                        )}
                      </Card>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Project Timeline & Details */}
              <div className="grid md:grid-cols-2 gap-6 mb-8">
                <Card className="bg-muted/30">
                  <CardHeader>
                    <h3 className="text-lg font-semibold flex items-center gap-2">
                      <Calendar className="w-5 h-5" />
                      Project Timeline
                    </h3>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground">Date Engaged:</span>
                      <span className="font-medium">{client.dateEngaged}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground">Pitch Date:</span>
                      <span className="font-medium">{client.pitchDate}</span>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-muted/30">
                  <CardHeader>
                    <h3 className="text-lg font-semibold flex items-center gap-2">
                      <DollarSign className="w-5 h-5" />
                      Project Details
                    </h3>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <span className="text-muted-foreground">Budget:</span>
                      <p className="font-medium text-lg">{client.budget}</p>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Goals:</span>
                      <div className="space-y-2 mt-2">
                        {client.goals.map((goal, index) => (
                          <div key={index} className="flex items-start gap-2">
                            <Target className="w-4 h-4 mt-0.5" style={{ color: brandColor }} />
                            <span className="text-sm">{goal}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Action Items */}
              <Card className="mb-8 bg-muted/30">
                <CardHeader>
                  <h3 className="text-lg font-semibold">Action Items</h3>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3 mb-4">
                    {client.actionItems.map((item) => (
                      <Card 
                        key={item.id} 
                        className="p-4 hover:shadow-md transition-all duration-200 bg-background hover:scale-105 cursor-pointer"
                        onClick={() => toggleActionItem(item.id)}
                      >
                        <div className="flex items-start gap-3">
                          <Checkbox 
                            checked={item.completed}
                            className="mt-1"
                          />
                          <div className="flex-1">
                            <div className="flex items-center justify-between mb-2">
                              <h4 className={`font-medium ${item.completed ? 'line-through text-muted-foreground' : ''}`}>
                                {item.task}
                              </h4>
                              <div className="flex items-center gap-2">
                                <Badge variant="outline">{item.assignee}</Badge>
                                <span className="text-sm text-muted-foreground">{item.dueDate}</span>
                                {expandedActionItems.has(item.id) ? 
                                  <ChevronUp className="w-4 h-4" /> : 
                                  <ChevronDown className="w-4 h-4" />
                                }
                              </div>
                            </div>
                            {expandedActionItems.has(item.id) && (
                              <div className="mt-3 space-y-3 pt-3 border-t">
                                <p className="text-sm text-muted-foreground">{item.description}</p>
                                <div className="flex gap-2">
                                  <Button size="sm" variant="outline">
                                    <Upload className="w-4 h-4 mr-2" />
                                    Upload Document
                                  </Button>
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                      </Card>
                    ))}
                  </div>
                  <div className="flex gap-2">
                    <Input
                      placeholder="Add new action item..."
                      value={newActionItem}
                      onChange={(e) => setNewActionItem(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && addActionItem()}
                    />
                    <Button onClick={addActionItem}>
                      <Plus className="w-4 h-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Comments Section */}
              <Card className="mb-6 bg-muted/30">
                <CardHeader>
                  <h3 className="text-lg font-semibold flex items-center gap-2">
                    <MessageCircle className="w-5 h-5" />
                    General Comments
                  </h3>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4 mb-4">
                    {client.comments.map((comment) => (
                      <div key={comment.id} className="flex gap-3 p-3 rounded-lg bg-background">
                        <Avatar className="w-8 h-8">
                          <AvatarImage src={comment.avatar} />
                          <AvatarFallback>{comment.author.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="font-medium text-sm">{comment.author}</span>
                            <span className="text-xs text-muted-foreground">{comment.timestamp}</span>
                          </div>
                          <p className="text-sm">{comment.content}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="flex gap-2">
                    <Textarea
                      placeholder="Add a comment..."
                      value={newComment}
                      onChange={(e) => setNewComment(e.target.value)}
                      className="min-h-[60px]"
                    />
                    <Button onClick={addComment} className="self-end">
                      <MessageCircle className="w-4 h-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Big Ideas Section */}
              <Card className="bg-muted/30">
                <CardHeader>
                  <h3 className="text-lg font-semibold flex items-center gap-2">
                    <Lightbulb className="w-5 h-5" />
                    Big Ideas + Upsell Opportunities
                  </h3>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4 mb-4">
                    {client.bigIdeas.map((idea) => (
                      <div key={idea.id} className="flex gap-3 p-3 rounded-lg bg-background">
                        <Avatar className="w-8 h-8">
                          <AvatarImage src={idea.avatar} />
                          <AvatarFallback>{idea.author.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="font-medium text-sm">{idea.author}</span>
                            <span className="text-xs text-muted-foreground">{idea.timestamp}</span>
                            <Badge variant="secondary" className="text-xs">
                              👍 {idea.votes}
                            </Badge>
                          </div>
                          <p className="text-sm">{idea.content}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="flex gap-2">
                    <Textarea
                      placeholder="Share a big idea..."
                      value={newIdea}
                      onChange={(e) => setNewIdea(e.target.value)}
                      className="min-h-[60px]"
                    />
                    <Button onClick={addIdea} className="self-end">
                      <Lightbulb className="w-4 h-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Right Sidebar - Team Members & Documents */}
          <div className="col-span-1 bg-muted/20 p-6 overflow-auto">
            {/* Team Members */}
            <Card className="mb-6 bg-background">
              <CardHeader>
                <h3 className="text-lg font-semibold flex items-center gap-2">
                  <Users className="w-5 h-5" />
                  Team Members
                </h3>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {assignedMembers.map((member) => (
                    <div key={member.id} className="flex items-center gap-3">
                      <Avatar className="w-10 h-10">
                        <AvatarImage src={member.avatar} />
                        <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <p className="font-medium text-sm">{member.name}</p>
                        <p className="text-xs text-muted-foreground">{member.title}</p>
                      </div>
                    </div>
                  ))}
                  <Button 
                    variant="outline" 
                    className="w-full mt-4"
                    style={{ borderColor: brandColor, color: brandColor }}
                  >
                    Submit Interest
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Documents */}
            <Card className="bg-background">
              <CardHeader className="flex flex-row items-center justify-between">
                <h3 className="text-lg font-semibold">Documents</h3>
                <Button
                  variant="outline"
                  size="sm"
                  className="border-blue-300 text-blue-600 hover:bg-blue-50 hover:shadow-md transition-all duration-200"
                  onClick={() => window.open(client.boxUrl, '_blank')}
                >
                  <img src="/lovable-uploads/bcd77544-5a69-49b3-ae32-9ea78bd94494.png" alt="Box" className="w-4 h-4 mr-2" />
                  Box Folder
                  <ExternalLink className="w-3 h-3 ml-1" />
                </Button>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 mb-4">
                  {client.documents?.map((doc) => (
                    <div 
                      key={doc.id}
                      className={`p-3 rounded-lg border ${getDocumentColor(doc.type)} flex items-center gap-3`}
                    >
                      <div className="w-8 h-8 bg-white rounded flex items-center justify-center">
                        {getDocumentIcon(doc.type)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-medium truncate">{doc.name}</p>
                        <p className="text-xs opacity-70">{doc.uploadDate}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full"
                  onClick={uploadDocument}
                >
                  <Upload className="w-4 h-4 mr-2" />
                  Upload Document
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </Card>
    </div>
  );
};