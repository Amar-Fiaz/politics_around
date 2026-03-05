"use client";
import { useParams } from "next/navigation";
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

export default function CandidateProfile() {
  const { id } = useParams();

  // In a real app, fetch candidate by id
  const candidate = {
    name: "Imran Khan",
    party: "PTI",
    constituency: "NA-46",
    biography: "Former Prime Minister of Pakistan and chairman of PTI. Known for his career in cricket and philanthropy before entering politics.",
    careerStartYear: 1996,
    previousPositions: "Prime Minister (2018-2022)",
    image: "https://example.com/imran.jpg",
    influenceScore: 85,
    projects: [
      { title: "Health Card", status: "Completed", completion: 100 },
      { title: "Panahgahs", status: "In Progress", completion: 75 },
    ],
    promises: [
      { promise: "10 Million Jobs", status: "In Progress" },
      { promise: "5 Million Houses", status: "In Progress" },
    ]
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Sidebar Info */}
        <div className="lg:col-span-1 space-y-6">
          <Card>
            <CardContent className="pt-6 text-center space-y-4">
              <Avatar className="h-32 w-32 mx-auto">
                <AvatarImage src={candidate.image} />
                <AvatarFallback>IK</AvatarFallback>
              </Avatar>
              <div>
                <h1 className="text-2xl font-bold">{candidate.name}</h1>
                <p className="text-primary font-medium">{candidate.party}</p>
                <Badge variant="secondary" className="mt-2">{candidate.constituency}</Badge>
              </div>
              <div className="pt-4 border-t">
                <p className="text-sm font-semibold mb-2">Political Influence Score</p>
                <div className="flex items-center gap-4">
                  <Progress value={candidate.influenceScore} className="h-2" />
                  <span className="font-bold">{candidate.influenceScore}%</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader><CardTitle className="text-lg">Career Timeline</CardTitle></CardHeader>
            <CardContent>
              <ul className="space-y-4 text-sm">
                <li className="flex gap-4">
                  <span className="font-bold text-primary">1996</span>
                  <span>Founded PTI</span>
                </li>
                <li className="flex gap-4">
                  <span className="font-bold text-primary">2013</span>
                  <span>Opposition in NA</span>
                </li>
                <li className="flex gap-4">
                  <span className="font-bold text-primary">2018</span>
                  <span>Elected Prime Minister</span>
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <div className="lg:col-span-2">
          <Tabs defaultValue="overview" className="space-y-6">
            <TabsList className="w-full justify-start">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="projects">Projects</TabsTrigger>
              <TabsTrigger value="promises">Promises</TabsTrigger>
              <TabsTrigger value="reviews">Public Reviews</TabsTrigger>
            </TabsList>

            <TabsContent value="overview">
              <Card>
                <CardHeader><CardTitle>Biography</CardTitle></CardHeader>
                <CardContent>
                  <p className="text-muted-foreground leading-relaxed">{candidate.biography}</p>
                  <div className="mt-6 grid grid-cols-2 gap-4">
                    <div className="bg-muted p-4 rounded-lg">
                      <p className="text-xs text-muted-foreground uppercase font-bold">Previous Position</p>
                      <p className="font-medium">{candidate.previousPositions}</p>
                    </div>
                    <div className="bg-muted p-4 rounded-lg">
                      <p className="text-xs text-muted-foreground uppercase font-bold">Career Start</p>
                      <p className="font-medium">{candidate.careerStartYear}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="projects">
              <Card>
                <CardHeader><CardTitle>Development Projects</CardTitle></CardHeader>
                <CardContent className="space-y-6">
                  {candidate.projects.map((p, i) => (
                    <div key={i} className="space-y-2">
                      <div className="flex justify-between items-center">
                        <p className="font-medium">{p.title}</p>
                        <Badge variant={p.status === "Completed" ? "default" : "secondary"}>{p.status}</Badge>
                      </div>
                      <Progress value={p.completion} className="h-2" />
                    </div>
                  ))}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="promises">
              <Card>
                <CardHeader><CardTitle>Promise Tracker</CardTitle></CardHeader>
                <CardContent className="space-y-4">
                  {candidate.promises.map((p, i) => (
                    <div key={i} className="flex justify-between items-center p-3 bg-muted rounded-lg">
                      <span>{p.promise}</span>
                      <Badge variant="outline">{p.status}</Badge>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
