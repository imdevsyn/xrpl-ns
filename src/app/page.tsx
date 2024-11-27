import { Hero, MenuBar, Navbar } from "@/components";
import { Button } from "@/components/ui/button";
// import { Menu } from "lucide-react";

export default function Home() {
  return (
    <div className="px-6 mx-auto max-w-[1400px] h-full">
      <header className="flex py-7 justify-between items-center">
        <div className="h-14 w-40 flex items-center">Logo</div>
        <Navbar />
        <div className="hidden md:block w-40">
          <Button className="w-full h-14 rounded-full" variant="outline">
            CONNECT
          </Button>
        </div>
        <div className="flex md:hidden">
          <MenuBar />
        </div>
      </header>
      <main className="flex flex-col gap-4">
        <section className=" h-[500px] justify-center items-center">
          <Hero />
        </section>
      </main>
      <footer></footer>
    </div>
  );
}
