import { useState } from "react";
import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "./ui/avatar";
import { Textarea } from "./ui/textarea";
import { Input } from "./ui/input";
import { Checkbox } from "./ui/checkbox";
import { Calendar, DollarSign, Target, Users, MessageCircle, Lightbulb, Plus, Upload } from "lucide-react";

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
}

export const ClientCard = ({ client, teamMembers, onExpand, onInterestSubmit, expanded = false }: ClientCardProps) => {
  const [newComment, setNewComment] = useState("");
  const [newIdea, setNewIdea] = useState("");
  const [newActionItem, setNewActionItem] = useState("");

  const assignedMembers = teamMembers.filter(member => member.isAssigned);
  const unassignedMembers = teamMembers.filter(member => !member.isAssigned);

  if (!expanded) {
    return (
      <Card 
        className="client-card p-6 cursor-pointer bg-card border border-border"
        onClick={() => onExpand?.(client.id)}
      >
        <div className="text-center space-y-4">
          <h3 className="text-xl font-semibold text-foreground">{client.name}</h3>
          
          {client.logo && (
            <div className="flex justify-center">
              <div className="w-16 h-16 bg-muted rounded-lg flex items-center justify-center">
                <span className="text-2xl font-bold text-muted-foreground">
                  {client.name.charAt(0)}
                </span>
              </div>
            </div>
          )}
          
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
      <Card className="expanded-card w-full max-w-6xl max-h-[90vh] overflow-auto bg-card">
        <div className="p-8">
          {/* Header */}
          <div className="flex justify-between items-start mb-8">
            <div>
              <h1 className="text-3xl font-bold text-foreground mb-2">{client.name}</h1>
              <p className="text-muted-foreground">Client Lead: {client.clientLead}</p>
            </div>
            <Button variant="outline" onClick={() => onExpand?.("")}>
              Close
            </Button>
          </div>

          {/* Team Members Section */}
          <section className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-foreground flex items-center gap-2">
                <Users className="w-5 h-5" />
                Team Members
              </h2>
              {unassignedMembers.length > 0 && (
                <Button className="bg-primary text-primary-foreground">
                  Submit Interest
                </Button>
              )}
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
              {assignedMembers.map((member) => (
                <div key={member.id} className="text-center">
                  <Avatar className="team-member-avatar w-16 h-16 mx-auto mb-2">
                    <AvatarImage src={member.avatar} />
                    <AvatarFallback>{member.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                  </Avatar>
                  <p className="font-medium text-sm">{member.name}</p>
                  <p className="text-xs text-muted-foreground">{member.title}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Project Timeline & Details */}
          <div className="grid md:grid-cols-2 gap-8 mb-8">
            <section>
              <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
                <Calendar className="w-5 h-5" />
                Project Timeline
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Date Engaged:</span>
                  <span>{client.dateEngaged}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Pitch Date:</span>
                  <span>{client.pitchDate}</span>
                </div>
              </div>
            </section>

            <section>
              <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
                <DollarSign className="w-5 h-5" />
                Project Details
              </h3>
              <div className="space-y-3">
                <div>
                  <span className="text-muted-foreground">Budget:</span>
                  <p className="font-medium">{client.budget}</p>
                </div>
                <div>
                  <span className="text-muted-foreground">Goals:</span>
                  <div className="space-y-1 mt-1">
                    {client.goals.map((goal, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <Target className="w-4 h-4 text-primary" />
                        <span className="text-sm">{goal}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </section>
          </div>

          {/* Company Profile & Project Scope */}
          <div className="grid md:grid-cols-2 gap-8 mb-8">
            <section>
              <h3 className="text-lg font-semibold text-foreground mb-4">Company Profile</h3>
              <p className="text-muted-foreground">{client.companyProfile}</p>
            </section>

            <section>
              <h3 className="text-lg font-semibold text-foreground mb-4">Project Scope</h3>
              <p className="text-muted-foreground">{client.projectScope}</p>
            </section>
          </div>

          {/* Key Client Contacts */}
          <section className="mb-8">
            <h3 className="text-lg font-semibold text-foreground mb-4">Key Client Contacts</h3>
            <div className="grid md:grid-cols-2 gap-6">
              {client.keyContacts.map((contact, index) => (
                <div key={index} className="border border-border rounded-lg p-4">
                  <h4 className="font-medium">{contact.name}</h4>
                  <p className="text-sm text-primary mb-2">{contact.title}</p>
                  <p className="text-sm text-muted-foreground">{contact.bio}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Action Items */}
          <section className="mb-8">
            <h3 className="text-lg font-semibold text-foreground mb-4">Action Items</h3>
            <div className="space-y-3 mb-4">
              {client.actionItems.map((item) => (
                <div key={item.id} className="flex items-start gap-3 p-3 border border-border rounded-lg">
                  <Checkbox checked={item.completed} />
                  <div className="flex-1">
                    <p className={item.completed ? "line-through text-muted-foreground" : ""}>{item.task}</p>
                    <div className="flex justify-between text-sm text-muted-foreground mt-1">
                      <span>Assigned to: {item.assignee}</span>
                      <span>Due: {item.dueDate}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="flex gap-2">
              <Input
                placeholder="Add new action item..."
                value={newActionItem}
                onChange={(e) => setNewActionItem(e.target.value)}
                className="flex-1"
              />
              <Button size="sm">
                <Plus className="w-4 h-4" />
              </Button>
              <Button size="sm" variant="outline">
                <Upload className="w-4 h-4" />
              </Button>
            </div>
          </section>

          {/* Discussion Sections */}
          <div className="grid md:grid-cols-2 gap-8">
            {/* General Comments */}
            <section>
              <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
                <MessageCircle className="w-5 h-5" />
                General Comments
              </h3>
              
              <div className="space-y-4 mb-4 max-h-60 overflow-y-auto">
                {client.comments.map((comment) => (
                  <div key={comment.id} className="flex gap-3">
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
              
              <Textarea
                placeholder="Add a comment..."
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                className="mb-2"
              />
              <Button size="sm" className="w-full">Post Comment</Button>
            </section>

            {/* Big Ideas */}
            <section>
              <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
                <Lightbulb className="w-5 h-5" />
                Big Ideas + Upsell Opportunities
              </h3>
              
              <div className="space-y-4 mb-4 max-h-60 overflow-y-auto">
                {client.bigIdeas.map((idea) => (
                  <div key={idea.id} className="flex gap-3 p-3 border border-border rounded-lg">
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
                ))}
              </div>
              
              <Textarea
                placeholder="Share a big idea..."
                value={newIdea}
                onChange={(e) => setNewIdea(e.target.value)}
                className="mb-2"
              />
              <div className="flex gap-2">
                <Button size="sm" className="flex-1">Post Idea</Button>
                <Button size="sm" variant="outline">
                  <Lightbulb className="w-4 h-4" />
                  AI Ideas
                </Button>
              </div>
            </section>
          </div>
        </div>
      </Card>
    </div>
  );
};