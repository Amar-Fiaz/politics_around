"use client";
import { useState, useEffect } from "react";
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Brain, TrendingUp, UserCheck, Award, MessageSquare } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import axios from "axios";

export default function Predictions() {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState({
    votes: 50000,
    surveys: 4.2,
    sentiment: 0.75,
    experience: 10,
    promises_fulfilled: 6,
  });
  const [result, setResult] = useState<number | null>(null);

  const calculatePrediction = async () => {
    setLoading(true);
    try {
      const res = await axios.post("http://localhost:8000/predict-election", data);
      setResult(res.data.win_probability * 100);
    } catch (err) {
      alert("AI Service is not reachable. Ensure Python service is running on port 8000.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-12 space-y-12">
      <div className="text-center max-w-2xl mx-auto space-y-4">
        <h1 className="text-4xl font-bold flex items-center justify-center gap-4">
          <Brain className="h-10 w-10 text-primary" />
          AI Election Prediction
        </h1>
        <p className="text-muted-foreground">
          Adjust the variables below to see how our Machine Learning model predicts the win probability for a candidate based on current data.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Input Parameters */}
        <Card>
          <CardHeader>
            <CardTitle>Analysis Parameters</CardTitle>
            <CardDescription>Fine-tune candidate performance data</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <ParameterInput 
              label="Expected Votes" 
              icon={<TrendingUp className="h-4 w-4" />} 
              value={data.votes} 
              onChange={(v: string) => setData({...data, votes: parseInt(v)})} 
              min={0} max={100000}
            />
            <ParameterInput 
              label="Public Survey Rating (1-5)" 
              icon={<UserCheck className="h-4 w-4" />} 
              value={data.surveys} 
              onChange={(v: string) => setData({...data, surveys: parseFloat(v)})} 
              min={0} max={5} step={0.1}
            />
            <ParameterInput 
              label="Sentiment Score (0-1)" 
              icon={<MessageSquare className="h-4 w-4" />} 
              value={data.sentiment} 
              onChange={(v: string) => setData({...data, sentiment: parseFloat(v)})} 
              min={0} max={1} step={0.01}
            />
            <ParameterInput 
              label="Experience (Years)" 
              icon={<Award className="h-4 w-4" />} 
              value={data.experience} 
              onChange={(v: string) => setData({...data, experience: parseInt(v)})} 
              min={0} max={50}
            />
            <ParameterInput 
              label="Promises Fulfilled" 
              icon={<Award className="h-4 w-4" />} 
              value={data.promises_fulfilled} 
              onChange={(v: string) => setData({...data, promises_fulfilled: parseInt(v)})} 
              min={0} max={20}
            />
            <Button onClick={calculatePrediction} className="w-full" disabled={loading}>
              {loading ? "AI is analyzing..." : "Generate AI Prediction"}
            </Button>
          </CardContent>
        </Card>

        {/* Prediction Results */}
        <Card className="flex flex-col items-center justify-center text-center bg-primary/5 border-primary/20 min-h-[400px]">
          {result !== null ? (
            <div className="p-8 space-y-6 w-full">
              <h3 className="text-2xl font-bold">Predicted Win Probability</h3>
              <div className="relative h-48 w-48 mx-auto flex items-center justify-center">
                <svg className="h-full w-full rotate-[-90deg]">
                  <circle cx="96" cy="96" r="80" stroke="currentColor" strokeWidth="12" fill="transparent" className="text-muted" />
                  <circle cx="96" cy="96" r="80" stroke="currentColor" strokeWidth="12" fill="transparent" className="text-primary transition-all duration-1000" strokeDasharray={502.4} strokeDashoffset={502.4 - (502.4 * result) / 100} />
                </svg>
                <span className="absolute text-4xl font-black">{Math.round(result)}%</span>
              </div>
              <Badge variant="secondary" className="px-6 py-2 text-lg">
                {result > 70 ? "High Confidence Victory" : result > 50 ? "Marginal Victory" : "Uphill Battle"}
              </Badge>
              <p className="text-sm text-muted-foreground">
                *Prediction is based on logistic regression analysis of current data parameters and historical trends.
              </p>
            </div>
          ) : (
            <div className="space-y-4 p-8">
              <div className="h-20 w-20 bg-muted rounded-full mx-auto flex items-center justify-center animate-pulse">
                <Brain className="h-10 w-10 text-muted-foreground" />
              </div>
              <p className="text-muted-foreground">Set parameters and click generate to see AI insights</p>
            </div>
          )}
        </Card>
      </div>
    </div>
  );
}

function ParameterInput({ label, icon, value, onChange, ...props }: any) {
  return (
    <div className="space-y-2">
      <div className="flex justify-between items-center">
        <label className="text-sm font-medium flex items-center gap-2">
          {icon} {label}
        </label>
        <span className="text-xs font-bold text-primary">{value}</span>
      </div>
      <Input type="range" value={value} onChange={(e) => onChange(e.target.value)} className="h-2" {...props} />
    </div>
  );
}
