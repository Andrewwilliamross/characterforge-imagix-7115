import { useState } from "react";
import { Card, CardContent, CardHeader } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "./ui/avatar";
import { Textarea } from "./ui/textarea";
import { Input } from "./ui/input";
import { Checkbox } from "./ui/checkbox";
import { Calendar, DollarSign, Target, Users, MessageCircle, Lightbulb, Plus, Upload, ChevronDown, ChevronUp, Edit } from "lucide-react";

interface TeamMember {
  id: string;
  name: string;
  title: string;
  avatar?: string;
  isAssigned: boolean;
}

interface Client {
  id: string;
  name: string;
  logo?: string;
  brandColor?: string;
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
}

interface ClientCardProps {
  client: Client;
  teamMembers: TeamMember[];
  onExpand?: (clientId: string) => void;
  onInterestSubmit?: (clientId: string, memberId: string) => void;
  expanded?: boolean;
  onUpdateClient?: (clientId: string, updates: Partial<Client>) => void;
}

export const ClientCard = ({ client, teamMembers, onExpand, onInterestSubmit, expanded = false, onUpdateClient }: ClientCardProps) => {
  const [newComment, setNewComment] = useState("");
  const [newIdea, setNewIdea] = useState("");
  const [newActionItem, setNewActionItem] = useState("");
  const [expandedActionItems, setExpandedActionItems] = useState<Set<string>>(new Set());
  const [editingFields, setEditingFields] = useState<Set<string>>(new Set());
  const [editValues, setEditValues] = useState<any>({});

  const assignedMembers = teamMembers.filter(member => member.isAssigned);
  const brandColor = client.brandColor || "#5B4AFF";

  const toggleActionItem = (itemId: string) => {
    const newExpanded = new Set(expandedActionItems);
    if (newExpanded.has(itemId)) {
      newExpanded.delete(itemId);
    } else {
      newExpanded.add(itemId);
    }
    setExpandedActionItems(newExpanded);
  };

  const startEditing = (field: string, currentValue: any) => {
    setEditingFields(prev => new Set([...prev, field]));
    setEditValues(prev => ({ ...prev, [field]: currentValue }));
  };

  const saveEdit = (field: string) => {
    if (onUpdateClient) {
      onUpdateClient(client.id, { [field]: editValues[field] });
    }
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
    if (newComment.trim() && onUpdateClient) {
      const newCommentObj = {
        id: Date.now().toString(),
        author: "Current User",
        content: newComment,
        timestamp: "Just now",
        avatar: ""
      };
      onUpdateClient(client.id, {
        comments: [...client.comments, newCommentObj]
      });
      setNewComment("");
    }
  };

  const addIdea = () => {
    if (newIdea.trim() && onUpdateClient) {
      const newIdeaObj = {
        id: Date.now().toString(),
        author: "Current User",
        content: newIdea,
        timestamp: "Just now",
        votes: 0,
        avatar: ""
      };
      onUpdateClient(client.id, {
        bigIdeas: [...client.bigIdeas, newIdeaObj]
      });
      setNewIdea("");
    }
  };

  const addActionItem = () => {
    if (newActionItem.trim() && onUpdateClient) {
      const newActionItemObj = {
        id: Date.now().toString(),
        task: newActionItem,
        assignee: "Unassigned",
        completed: false,
        dueDate: new Date().toLocaleDateString(),
        description: ""
      };
      onUpdateClient(client.id, {
        actionItems: [...client.actionItems, newActionItemObj]
      });
      setNewActionItem("");
    }
  };

  if (!expanded) {
    return (
      <Card 
        className="client-card p-6 cursor-pointer bg-card border-2 transition-all duration-300 hover:scale-105"
        style={{ 
          borderColor: brandColor,
          boxShadow: `0 4px 20px ${brandColor}20`
        }}
        onClick={() => onExpand?.(client.id)}
      >
        <div className="text-center space-y-4">
          <h3 className="text-xl font-semibold text-foreground">{client.name}</h3>
          
          <div className="flex justify-center">
            <div 
              className="w-16 h-16 rounded-lg flex items-center justify-center text-white font-bold text-2xl"
              style={{ backgroundColor: brandColor }}
            >
              {client.logo ? (
                <img src={client.logo} alt={client.name} className="w-full h-full object-contain rounded-lg" />
              ) : (
                client.name.charAt(0)
              )}
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

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <Card className="expanded-card w-full max-w-7xl max-h-[95vh] overflow-hidden bg-card">
        <div className="grid grid-cols-4 h-full">
          {/* Main Content - 3 columns */}
          <div className="col-span-3 p-8 overflow-auto">
            {/* Header */}
            <div className="flex justify-between items-start mb-8">
              <div className="flex items-center gap-4">
                <div 
                  className="w-16 h-16 rounded-lg flex items-center justify-center text-white font-bold text-2xl"
                  style={{ backgroundColor: brandColor }}
                >
                  {client.logo ? (
                    <img src={client.logo} alt={client.name} className="w-full h-full object-contain rounded-lg" />
                  ) : (
                    client.name.charAt(0)
                  )}
                </div>
                <div>
                  <h1 className="text-3xl font-bold text-foreground mb-2">{client.name}</h1>
                  <p className="text-muted-foreground">Client Lead: {client.clientLead}</p>
                </div>
              </div>
              <Button variant="outline" onClick={() => onExpand?.("")}>
                Close
              </Button>
            </div>

            {/* Company Profile & Project Scope */}
            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <Card className="bg-muted/30">
                <CardHeader className="flex flex-row items-center justify-between">
                  <h3 className="text-lg font-semibold">Company Profile</h3>
                  <Button 
                    size="sm" 
                    variant="ghost"
                    onClick={() => startEditing('companyProfile', client.companyProfile)}
                  >
                    <Edit className="w-4 h-4" />
                  </Button>
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
                  <Button 
                    size="sm" 
                    variant="ghost"
                    onClick={() => startEditing('projectScope', client.projectScope)}
                  >
                    <Edit className="w-4 h-4" />
                  </Button>
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
                    <Card key={index} className="p-4 hover:shadow-md transition-shadow cursor-pointer bg-background">
                      <h4 className="font-medium">{contact.name}</h4>
                      <p className="text-sm font-medium mb-2" style={{ color: brandColor }}>{contact.title}</p>
                      <p className="text-sm text-muted-foreground">{contact.bio}</p>
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
                    <Card key={item.id} className="p-4 hover:shadow-md transition-shadow bg-background">
                      <div className="flex items-start gap-3">
                        <Checkbox checked={item.completed} />
                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <p className={item.completed ? "line-through text-muted-foreground" : "font-medium"}>{item.task}</p>
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={() => toggleActionItem(item.id)}
                            >
                              {expandedActionItems.has(item.id) ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                            </Button>
                          </div>
                          <div className="flex justify-between text-sm text-muted-foreground mt-1">
                            <span>Assigned to: {item.assignee}</span>
                            <span>Due: {item.dueDate}</span>
                          </div>
                          {expandedActionItems.has(item.id) && (
                            <div className="mt-3 pt-3 border-t space-y-3">
                              <Textarea placeholder="Action item description..." defaultValue={item.description} />
                              <Button size="sm" variant="outline">
                                <Upload className="w-4 h-4 mr-2" />
                                Upload Document
                              </Button>
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
                    className="flex-1"
                  />
                  <Button size="sm" onClick={addActionItem}>
                    <Plus className="w-4 h-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Discussion Sections */}
            <div className="space-y-8">
              {/* General Comments */}
              <Card className="bg-muted/30">
                <CardHeader>
                  <h3 className="text-lg font-semibold flex items-center gap-2">
                    <MessageCircle className="w-5 h-5" />
                    General Comments
                  </h3>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4 mb-4 max-h-60 overflow-y-auto">
                    {client.comments.map((comment) => (
                      <div key={comment.id} className="flex gap-3 p-3 bg-background rounded-lg">
                        <Avatar className="w-8 h-8">
                          <AvatarImage src={comment.avatar} />
                          <AvatarFallback>{comment.author.split(' ').map(n => n[0]).join('')}</AvatarFallback>
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
                  
                  <div className="space-y-2">
                    <Textarea
                      placeholder="Add a comment..."
                      value={newComment}
                      onChange={(e) => setNewComment(e.target.value)}
                    />
                    <Button size="sm" onClick={addComment} className="w-full">Post Comment</Button>
                  </div>
                </CardContent>
              </Card>

              {/* Big Ideas */}
              <Card className="bg-muted/30">
                <CardHeader>
                  <h3 className="text-lg font-semibold flex items-center gap-2">
                    <Lightbulb className="w-5 h-5" />
                    Big Ideas + Upsell Opportunities
                  </h3>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4 mb-4 max-h-60 overflow-y-auto">
                    {client.bigIdeas.map((idea) => (
                      <Card key={idea.id} className="p-3 bg-background">
                        <div className="flex gap-3">
                          <Avatar className="w-8 h-8">
                            <AvatarImage src={idea.avatar} />
                            <AvatarFallback>{idea.author.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                          </Avatar>
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <span className="font-medium text-sm">{idea.author}</span>
                              <span className="text-xs text-muted-foreground">{idea.timestamp}</span>
                              <Badge variant="secondary" className="text-xs">
                                {idea.votes} votes
                              </Badge>
                            </div>
                            <p className="text-sm">{idea.content}</p>
                          </div>
                        </div>
                      </Card>
                    ))}
                  </div>
                  
                  <div className="space-y-2">
                    <Textarea
                      placeholder="Share a big idea..."
                      value={newIdea}
                      onChange={(e) => setNewIdea(e.target.value)}
                    />
                    <div className="flex gap-2">
                      <Button size="sm" className="flex-1" onClick={addIdea}>Post Idea</Button>
                      <Button size="sm" variant="outline">
                        <Lightbulb className="w-4 h-4" />
                        AI Ideas
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Team Members Sidebar - 1 column */}
          <div className="col-span-1 border-l bg-muted/20 p-6 overflow-auto">
            <div className="sticky top-0">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold flex items-center gap-2">
                  <Users className="w-5 h-5" />
                  Team Members
                </h2>
                <Button size="sm" style={{ backgroundColor: brandColor, color: 'white' }}>
                  Submit Interest
                </Button>
              </div>
              
              <div className="space-y-4">
                {assignedMembers.map((member) => (
                  <Card key={member.id} className="p-4 text-center hover:shadow-md transition-shadow">
                    <Avatar className="w-16 h-16 mx-auto mb-3">
                      <AvatarImage src={member.avatar} />
                      <AvatarFallback>{member.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                    </Avatar>
                    <p className="font-medium text-sm">{member.name}</p>
                    <p className="text-xs text-muted-foreground">{member.title}</p>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};