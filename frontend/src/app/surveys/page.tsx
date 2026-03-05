"use client";
import { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Vote } from "lucide-react";

export default function Surveys() {
  const [voted, setVoted] = useState<number[]>([]);

  const surveys = [
    {
      id: 1,
      question: "Should the upcoming elections be held in February 2024?",
      city: "Islamabad",
      votes: 1240,
      responses: [
        { label: "Yes", percentage: 65 },
        { label: "No", percentage: 25 },
        { label: "Undecided", percentage: 10 },
      ],
    },
    {
      id: 2,
      question: "Which party has the best economic plan?",
      city: "Nationwide",
      votes: 5400,
      responses: [
        { label: "PTI", percentage: 45 },
        { label: "PML-N", percentage: 30 },
        { label: "PPP", percentage: 15 },
        { label: "Others", percentage: 10 },
      ],
    },
  ];

  const handleVote = (id: number) => {
    setVoted([...voted, id]);
  };

  return (
    <div className="container mx-auto px-4 py-12 space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-4xl font-bold">Public Surveys</h1>
        <Button>Suggest a Survey</Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {surveys.map((s) => (
          <Card key={s.id} className="overflow-hidden">
            <CardHeader className="bg-primary/5">
              <div className="flex justify-between items-start">
                <CardTitle className="text-xl">{s.question}</CardTitle>
                <Badge variant="outline">{s.city}</Badge>
              </div>
            </CardHeader>
            <CardContent className="pt-6 space-y-4">
              {voted.includes(s.id) ? (
                <div className="space-y-4">
                  {s.responses.map((r, i) => (
                    <div key={i} className="space-y-1">
                      <div className="flex justify-between text-sm">
                        <span>{r.label}</span>
                        <span className="font-bold">{r.percentage}%</span>
                      </div>
                      <div className="h-2 bg-muted rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-primary transition-all duration-500" 
                          style={{ width: `${r.percentage}%` }}
                        />
                      </div>
                    </div>
                  ))}
                  <p className="text-xs text-muted-foreground text-center pt-2">
                    Total Votes: {s.votes + 1}
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-2 gap-4">
                  {s.responses.map((r, i) => (
                    <Button 
                      key={i} 
                      variant="outline" 
                      className="justify-start gap-2"
                      onClick={() => handleVote(s.id)}
                    >
                      <Vote className="h-4 w-4" />
                      {r.label}
                    </Button>
                  ))}
                </div>
              )}
            </CardContent>
            <CardFooter className="bg-muted/30 border-t py-3">
              <div className="flex items-center gap-2 w-full">
                <Input placeholder="Add a comment..." className="bg-background" />
                <Button size="sm">Post</Button>
              </div>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
