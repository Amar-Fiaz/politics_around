import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { TrendingUp, Users, Vote, Newspaper } from "lucide-react";

export default function Home() {
  return (
    <div className="flex flex-col gap-12 pb-20">
      {/* Hero Section */}
      <section className="relative h-[600px] flex items-center justify-center bg-primary/10 overflow-hidden">
        <div className="container mx-auto px-4 z-10 text-center flex flex-col items-center gap-6">
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight">
            Know Your <span className="text-primary">Leaders</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl">
            Politics Around is a data-driven platform for political transparency, intelligence, and public engagement. Stay informed with real-time stats and AI-powered predictions.
          </p>
          <div className="flex gap-4">
            <Button size="lg" asChild>
              <Link href="/candidates">Explore Candidates</Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="/surveys">Take a Survey</Link>
            </Button>
          </div>
        </div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-3xl -z-10" />
      </section>

      {/* Featured Dashboard Stats */}
      <section className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatsCard title="Total Voters" value="12M+" icon={<Users className="text-primary" />} />
          <StatsCard title="Active Surveys" value="156" icon={<Vote className="text-primary" />} />
          <StatsCard title="News Today" value="84" icon={<Newspaper className="text-primary" />} />
          <StatsCard title="Candidate Activity" value="+24%" icon={<TrendingUp className="text-primary" />} />
        </div>
      </section>

      {/* Featured Sections */}
      <section className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        <div>
          <h2 className="text-3xl font-bold mb-4">AI-Powered Election Predictions</h2>
          <p className="text-muted-foreground mb-6">
            Our machine learning models analyze public sentiment, survey results, past performance, and historical data to predict election outcomes with high precision.
          </p>
          <Button variant="secondary" asChild>
            <Link href="/predictions">View AI Insights</Link>
          </Button>
        </div>
        <div className="bg-muted rounded-2xl h-64 flex items-center justify-center border-2 border-dashed border-muted-foreground/20">
          {/* Placeholder for Prediction Chart */}
          <span className="text-muted-foreground">Interactive Prediction Chart (Visual Placeholder)</span>
        </div>
      </section>
    </div>
  );
}

function StatsCard({ title, value, icon }: { title: string; value: string; icon: React.ReactNode }) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        {icon}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
      </CardContent>
    </Card>
  );
}
