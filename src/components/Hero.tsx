import { cn } from "@/lib/utils";
import AnimatedGridPattern from "@/components/ui/animated-grid-pattern";
import { RainbowButton } from "@/components/ui/rainbow-button";

export function Hero() {
  return (
    <div className="relative flex flex-col justify-center items-center w-full h-full overflow-hidden rounded-lg bg-background">
      <AnimatedGridPattern
        numSquares={30}
        maxOpacity={0.3}
        duration={3}
        repeatDelay={1}
        className={cn(
          "[mask-image:radial-gradient(500px_circle_at_center,white,transparent)]",
          "inset-x-0 inset-y-[-30%] h-[200%] skew-y-12"
        )}
      />
      <div className="flex flex-col max-w-[1024px] justify-center items-center">
        <h1
          className="w-full tracking-tighter px-4 text-left md:text-center text-4xl md:text-5xl 
        lg:text-7xl  font-bold text-black"
        >
          Empowering Digital Idenity For The XRP Ledger Ecosystem
        </h1>
        <p className="px-4 lg:px-32 mt-2 lg:mt-7 text-left md:text-center">
          Secure, Unique, and Seamless{" "}
          <span className="font-bold">Name System</span> — Redefining Identity
          on the XRPL with Advanced Decentralization, Lightning-Fast
          Transactions, and Full Control Over Your Digital Presence.
        </p>
      </div>
      <div className="w-full mt-4 px-4 text-left md:text-center">
        <RainbowButton>Get Your XRPL Name</RainbowButton>
      </div>
    </div>
  );
}
