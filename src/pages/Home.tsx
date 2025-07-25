import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const Home = () => {
  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground mb-2">Welcome to MediaLink Dashboard</h1>
        <p className="text-muted-foreground">Your centralized hub for client engagements and collaboration.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader>
            <CardTitle>Active Deals</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold text-primary">12</p>
            <p className="text-sm text-muted-foreground">Current client engagements</p>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader>
            <CardTitle>Team Members</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold text-primary">24</p>
            <p className="text-sm text-muted-foreground">Active contributors</p>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader>
            <CardTitle>Revenue Pipeline</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold text-primary">$2.4M</p>
            <p className="text-sm text-muted-foreground">Projected revenue</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Home;