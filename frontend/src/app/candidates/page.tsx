import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent, CardDescription, CardFooter } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

const dummyCandidates = [
  {
    id: 1,
    name: "Imran Khan",
    party: "PTI",
    constituency: "NA-46 (Islamabad)",
    biography: "Former PM of Pakistan...",
    image: "https://example.com/imran.jpg",
  },
  {
    id: 2,
    name: "Nawaz Sharif",
    party: "PML-N",
    constituency: "NA-130 (Lahore)",
    biography: "3-time Prime Minister...",
    image: "https://example.com/nawaz.jpg",
  },
];

export default function Candidates() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="flex flex-col gap-8">
        <div className="flex justify-between items-center">
          <h1 className="text-4xl font-bold">Candidates</h1>
          <div className="flex gap-4">
            <Badge variant="outline" className="cursor-pointer">All</Badge>
            <Badge variant="outline" className="cursor-pointer">PTI</Badge>
            <Badge variant="outline" className="cursor-pointer">PML-N</Badge>
            <Badge variant="outline" className="cursor-pointer">PPP</Badge>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {dummyCandidates.map((c) => (
            <Card key={c.id} className="hover:shadow-lg transition-shadow">
              <CardHeader className="flex flex-row items-center gap-4">
                <Avatar className="h-16 w-16">
                  <AvatarImage src={c.image} alt={c.name} />
                  <AvatarFallback>{c.name.split(" ").map(n => n[0]).join("")}</AvatarFallback>
                </Avatar>
                <div>
                  <CardTitle>{c.name}</CardTitle>
                  <CardDescription>{c.party} | {c.constituency}</CardDescription>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground line-clamp-2">{c.biography}</p>
              </CardContent>
              <CardFooter>
                <Button className="w-full" asChild>
                  <Link href={`/candidates/${c.id}`}>View Profile</Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
