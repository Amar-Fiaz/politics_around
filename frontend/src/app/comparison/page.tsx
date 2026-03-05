"use client";
import { useState, useEffect } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import axios from "axios";

export default function Comparison() {
  const [candidates, setCandidates] = useState<any[]>([]);
  const [selected, setSelected] = useState<number[]>([1]); // Default select ID 1

  useEffect(() => {
    const fetch = async () => {
      const res = await axios.get("http://localhost:5000/api/candidates");
      setCandidates(res.data);
    };
    fetch();
  }, []);

  const toggleCandidate = (id: number) => {
    if (selected.includes(id)) {
      setSelected(selected.filter(i => i !== id));
    } else if (selected.length < 3) {
      setSelected([...selected, id]);
    }
  };

  const selectedData = candidates.filter(c => selected.includes(c.id));

  return (
    <div className="container mx-auto px-4 py-12 space-y-12">
      <div className="text-center space-y-2">
        <h1 className="text-4xl font-bold">Candidate Comparison</h1>
        <p className="text-muted-foreground text-lg">Select up to 3 candidates to compare their performance and influence.</p>
      </div>

      {/* Selection Area */}
      <div className="flex flex-wrap gap-4 justify-center">
        {candidates.map((c) => (
          <Button 
            key={c.id} 
            variant={selected.includes(c.id) ? "default" : "outline"}
            onClick={() => toggleCandidate(c.id)}
            className="rounded-full"
          >
            {c.name}
          </Button>
        ))}
      </div>

      {/* Comparison Table */}
      <Card className="overflow-hidden border-2 border-primary/10">
        <Table>
          <TableHeader className="bg-muted/50">
            <TableRow>
              <TableHead className="w-[200px]">Metric</TableHead>
              {selectedData.map(c => (
                <TableHead key={c.id} className="text-center">
                  <div className="flex flex-col items-center gap-2 py-4">
                    <Avatar className="h-16 w-16">
                      <AvatarImage src={c.profilePicture} />
                      <AvatarFallback>{c.name[0]}</AvatarFallback>
                    </Avatar>
                    <span className="font-bold">{c.name}</span>
                    <Badge variant="secondary">{c.party.abbreviation}</Badge>
                  </div>
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            <ComparisonRow label="Constituency" data={selectedData} field="constituency" subfield="name" />
            <ComparisonRow label="Career Start" data={selectedData} field="careerStartYear" />
            <ComparisonRow label="Projects" data={selectedData} lengthField="projects" />
            <ComparisonRow label="Promises" data={selectedData} lengthField="promises" />
            <ComparisonRow 
              label="Influence Score" 
              data={selectedData} 
              render={(c: any) => (
                <div className="flex items-center gap-2 px-4">
                  <Progress value={85} className="h-2 flex-1" />
                  <span className="text-xs font-bold">85%</span>
                </div>
              )} 
            />
          </TableBody>
        </Table>
      </Card>
    </div>
  );
}

function ComparisonRow({ label, data, field, subfield, lengthField, render }: any) {
  return (
    <TableRow>
      <TableCell className="font-semibold text-muted-foreground bg-muted/20">{label}</TableCell>
      {data.map((c: any) => (
        <TableCell key={c.id} className="text-center">
          {render ? render(c) : lengthField ? c[lengthField].length : subfield ? c[field][subfield] : c[field]}
        </TableCell>
      ))}
    </TableRow>
  );
}

import { Button } from "@/components/ui/button";
