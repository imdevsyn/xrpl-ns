"use client";
import { cn } from "@/lib/utils";
import { DotPattern } from "@/components/ui/dot-pattern";
import { Footer, Header, NameSearch } from "@/components";

export default function Page() {
  return (
    <div className="flex flex-col min-h-screen px-6 mx-auto max-w-[1400px]">
      <Header />

      <main className="relative pb-14 flex flex-col justify-center items-center gap-2 flex-1">
        <div className="flex justify-center pt-36 w-full max-w-xl h-[600px]">
          <DotPattern
            cr={3}
            className={cn(
              "absolute inset-0 [mask-image:radial-gradient(300px_circle_at_center,white,transparent)] animate-pulse z-0"
            )}
          />
          <div className="w-full z-10">
            <NameSearch />
          </div>
        </div>
      </main>

      <footer className="mt-auto">
        <Footer />
      </footer>
    </div>
  );
}
