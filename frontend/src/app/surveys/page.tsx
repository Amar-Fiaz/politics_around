"use client";
import { useState, useEffect } from "react";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Vote, Loader2 } from "lucide-react";
import axios from "axios";
import { io } from "socket.io-client";

const socket = io("http://localhost:5000");

export default function Surveys() {
  const [surveys, setSurveys] = useState<any[]>([]);
  const [voted, setVoted] = useState<number[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSurveys();
    socket.on("surveyUpdate", () => fetchSurveys());
    return () => { socket.off("surveyUpdate"); };
  }, []);

  const fetchSurveys = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/surveys");
      setSurveys(res.data);
      setLoading(false);
    } catch (err) {
      console.error("Error fetching surveys", err);
    }
  };

  const handleVote = async (surveyId: number, rating: number) => {
    const user = JSON.parse(localStorage.getItem("user") || "{}");
    if (!user.id) return alert("Please login to vote!");

    try {
      await axios.post(`http://localhost:5000/api/surveys/${surveyId}/vote`, {
        userId: user.id,
        rating,
        comment: "Voted via platform",
      });
      setVoted([...voted, surveyId]);
    } catch (err) {
      alert("Error submitting vote");
    }
  };

  if (loading) return <div className="flex justify-center py-20"><Loader2 className="animate-spin h-10 w-10" /></div>;

  return (
    <div className="container mx-auto px-4 py-12 space-y-8">
      <h1 className="text-4xl font-bold">Live Public Surveys</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {surveys.map((s) => (
          <Card key={s.id}>
            <CardHeader className="bg-primary/5">
              <div className="flex justify-between items-start">
                <CardTitle className="text-xl">{s.question}</CardTitle>
                <Badge variant="outline">{s.city?.name || "Nationwide"}</Badge>
              </div>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="grid grid-cols-1 gap-4">
                {[1, 2, 3, 4, 5].map((val) => (
                  <Button 
                    key={val} 
                    variant={voted.includes(s.id) ? "ghost" : "outline"}
                    disabled={voted.includes(s.id)}
                    onClick={() => handleVote(s.id, val)}
                    className="justify-between"
                  >
                    <span>Option {val}</span>
                    <Vote className="h-4 w-4" />
                  </Button>
                ))}
              </div>
              <p className="text-xs text-muted-foreground mt-4 text-center">
                Total Responses: {s.responses?.length || 0}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
