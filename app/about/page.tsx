import { Button } from "@/components/ui/button";
import { ChevronUpIcon } from "lucide-react";

export default function AboutPage() {
  return (
    <main className="wrapper py-12">
      <h2 className="text-2xl font-bold mb-4">About</h2>
      <p>!Lorem ipsum dolor sit amet, consectetur adipiscing elit!</p>

      <Button variant={"black"}>
        <ChevronUpIcon className="size-4" /> Upvote
      </Button>
      <br />
      <Button variant={"white"}>
        <ChevronUpIcon className="size-4" /> Upvote
      </Button>
    </main>
  );
}
