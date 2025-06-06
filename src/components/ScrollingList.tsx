import { cn } from "@/lib/utils";
import Marquee from "@/components/ui/marquee";

const reviews = [
  {
    name: "XRPL Foundation",
    username: "@xrpl.xrpl",
    body: "Innovation at its finest. This sets a new standard for blockchain projects.",
    img: "/xrpl-black.png",
  },
  {
    name: "Elon Musk",
    username: "@elonmusk.xrpl",
    body: "This is out of this world. Truly a game-changer in the blockchain space.",
    img: "/elonmusk.jpg",
  },
  {
    name: "Vega Crypto",
    username: "@vegacrypto.xrpl",
    body: "The XRPL ecosystem is light-years ahead. A new paradigm shift is here.",
    img: "/vega-crypto.png",
  },
  {
    name: "Ripple Labs",
    username: "@ripple.xrpl",
    body: "This is what the future looks like. A masterpiece of decentralized innovation.",
    img: "/ripple-logo.png",
  },
  {
    name: "Michael Saylor",
    username: "@saylor.xrpl",
    body: "XRP Ledger has the potential to redefine digital finance. I'm all in.",
    img: "/michael-saylor.jpg",
  },
  {
    name: "Chris Larsen",
    username: "@crislarsen.xrpl",
    body: "Pioneering a new era of blockchain. That's XRP Ledger.",
    img: "/chris-larsen.png",
  },
];

const firstRow = reviews.slice(0, reviews.length / 2);
const secondRow = reviews.slice(reviews.length / 2);

const ReviewCard = ({
  img,
  name,
  username,
  body,
}: {
  img: string;
  name: string;
  username: string;
  body: string;
}) => {
  return (
    <figure
      className={cn(
        "relative w-64 cursor-pointer overflow-hidden rounded-xl border p-4",
        "border-gray-950/[.1] bg-gray-950/[.01] hover:bg-gray-950/[.05]",
        "dark:border-gray-50/[.1] dark:bg-gray-50/[.10] dark:hover:bg-gray-50/[.15]"
      )}
    >
      <div className="flex flex-row items-center gap-2">
        <img className="rounded-full" width="32" height="32" alt="" src={img} />
        <div className="flex flex-col">
          <figcaption className="text-sm font-medium dark:text-white">
            {name}
          </figcaption>
          <p className="text-xs font-medium dark:text-white/40">{username}</p>
        </div>
      </div>
      <blockquote className="mt-2 text-sm">{body}</blockquote>
    </figure>
  );
};

export function ScrollingList() {
  return (
    <div className="relative flex h-[380px] w-full flex-col items-center justify-center overflow-hidden rounded-lg bg-background">
      <Marquee pauseOnHover className="[--duration:20s]">
        {firstRow.map((review) => (
          <ReviewCard key={review.username} {...review} />
        ))}
      </Marquee>
      <Marquee reverse pauseOnHover className="[--duration:20s]">
        {secondRow.map((review) => (
          <ReviewCard key={review.username} {...review} />
        ))}
      </Marquee>
      <div className="pointer-events-none absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-white dark:from-background"></div>
      <div className="pointer-events-none absolute inset-y-0 right-0 w-1/3 bg-gradient-to-l from-white dark:from-background"></div>
    </div>
  );
}
