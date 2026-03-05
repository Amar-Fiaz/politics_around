import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Newspaper, Calendar, ExternalLink } from "lucide-react";

const newsItems = [
  {
    id: 1,
    title: "Election 2024: Key Constituencies to Watch",
    summary: "AI Insight: Data suggests a shift in voter sentiment in Punjab urban areas. Real-time surveys show PTI leading in youth demographics while PML-N maintains stronghold in rural circles.",
    source: "Politics Around Analytics",
    published: "2 hours ago",
    category: "Analysis",
  },
  {
    id: 2,
    title: "Supreme Court Ruling on Voter Registration",
    summary: "Summary: The court has directed the Election Commission to simplify the process for overseas Pakistanis to register and vote electronically.",
    source: "Dawn News (AI Summary)",
    published: "5 hours ago",
    category: "Politics",
  },
];

export default function News() {
  return (
    <div className="container mx-auto px-4 py-12 space-y-8">
      <div className="flex flex-col gap-2">
        <h1 className="text-4xl font-bold flex items-center gap-4">
          <Newspaper className="h-10 w-10 text-primary" />
          Political News & Insights
        </h1>
        <p className="text-muted-foreground">Stay updated with the latest political movements and AI-generated summaries.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {newsItems.map((n) => (
          <Card key={n.id} className="hover:border-primary/50 transition-colors">
            <CardHeader>
              <div className="flex justify-between items-start gap-4">
                <Badge>{n.category}</Badge>
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <Calendar className="h-3 w-3" />
                  {n.published}
                </div>
              </div>
              <CardTitle className="text-2xl mt-4 leading-tight">{n.title}</CardTitle>
              <CardDescription className="flex items-center gap-2 mt-2">
                <span>Source: {n.source}</span>
                <ExternalLink className="h-3 w-3" />
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="bg-primary/5 p-4 rounded-lg border-l-4 border-primary italic text-sm">
                {n.summary}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
