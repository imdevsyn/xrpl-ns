"use client";
import { ChevronLeft, ChevronRight, Calendar, Clock3 } from "lucide-react";
import BlurFade from "@/components/ui/blur-fade";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { useRef } from "react";
import Image from "next/image";

export function Blog() {
  const prevRef = useRef<HTMLButtonElement>(null);
  const nextRef = useRef<HTMLButtonElement>(null);
  const posts = [
    {
      title: "XRPL Names is live",
      description:
        "Embark on an exciting new chapter with XRPL Names powered by the innovative XRPL EVM Sidechain.",
      date: "21 Dec 2024",
      readTime: 3,
      image: {
        src: "logo.png",
        width: 120,
        height: 120,
        alt: "XRPL Names Logo",
      },
      link: "https://x.com/xrplnames",
    },
    {
      title: "Need test tokens?",
      description:
        "Easily obtain test tokens provided by Chains Tools to explore the features of XRPL Names. Start testing and share your experience.",
      date: "21 Dec 2024",
      readTime: 1,
      image: {
        src: "chain-tools-logo.png",
        width: 75,
        height: 75,
        alt: "Chains Tools Logo",
      },
      link: "https://chains.tools/faucet/xrplevm",
    },
  ];

  return (
    <div className="mt-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl lg:text-5xl tracking-tighter">Blog</h2>
        <div className="hidden md:flex gap-3">
          <button
            onClick={() => prevRef.current?.click()}
            className="flex justify-center items-center w-[50px] h-[50px] rounded-full border border-black hover:bg-gray-100 transition"
          >
            <ChevronLeft />
          </button>
          <button
            onClick={() => nextRef.current?.click()}
            className="flex justify-center items-center w-[50px] h-[50px] rounded-full border border-black hover:bg-gray-100 transition"
          >
            <ChevronRight />
          </button>
        </div>
      </div>

      <Carousel className="w-full">
        <CarouselPrevious ref={prevRef} className="hidden" />
        <CarouselNext ref={nextRef} className="hidden" />

        <CarouselContent className="-ml-1">
          {posts.reverse().map((post) => (
            <CarouselItem key={post.title} className="pl-1 pr-4 basis-auto">
              <a href={post.link} target="_blank">
                <div className="flex flex-col justify-between w-[290px] sm:w-[375px] h-[405px] sm:h-[460px] px-2 pt-2 pb-6 rounded-3xl bg-gray-200 hover:bg-gray-300">
                  <div className="flex items-center justify-center w-full h-44 bg-white rounded-2xl">
                    <Image
                      src={`/${post.image.src}`}
                      width={post.image.width}
                      height={post.image.height}
                      alt={post.image.alt}
                    />
                  </div>
                  <div className="flex flex-col h-full justify-between px-4">
                    <div>
                      <BlurFade delay={0.3} inView>
                        <h3 className="pt-5 pb-2 text-xl font-bold">
                          {post.title}
                        </h3>
                        <p>{post.description}</p>{" "}
                      </BlurFade>
                    </div>
                    <div className="flex justify-between items-center">
                      <div className="flex gap-2">
                        <Calendar className="w-4" />
                        <span>{post.date}</span>
                      </div>
                      <div className="flex gap-2">
                        <Clock3 className="w-4" /> {post.readTime} min
                      </div>
                    </div>
                  </div>
                </div>
              </a>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </div>
  );
}
