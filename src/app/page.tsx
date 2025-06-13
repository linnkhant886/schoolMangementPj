import ModeToggle from "@/app/(dashboard)/components/toggle";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div>
      <h1 className="text-3xl  font-bold underline">Hello world!</h1>
      <div>
        <Button>Click me</Button>
      </div>

      <ModeToggle />
    </div>
  );
}
