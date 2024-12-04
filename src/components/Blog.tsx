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

export function Blog() {
  // Refs para acessar as funções dos botões do Carousel
  const prevRef = useRef<HTMLButtonElement>(null);
  const nextRef = useRef<HTMLButtonElement>(null);

  return (
    <div className="mt-6">
      {/* Cabeçalho com título e botões personalizados */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl lg:text-5xl tracking-tighter">Blog</h2>
        <div className="hidden md:flex gap-3">
          <button
            onClick={() => prevRef.current?.click()} // Chama o clique do botão padrão
            className="flex justify-center items-center w-[50px] h-[50px] rounded-full border border-black hover:bg-gray-100 transition"
          >
            <ChevronLeft />
          </button>
          <button
            onClick={() => nextRef.current?.click()} // Chama o clique do botão padrão
            className="flex justify-center items-center w-[50px] h-[50px] rounded-full border border-black hover:bg-gray-100 transition"
          >
            <ChevronRight />
          </button>
        </div>
      </div>

      {/* Carrossel com botões padrões escondidos */}
      <Carousel className="w-full">
        {/* Botões padrão do Carousel ocultados, mas acessíveis via ref */}
        <CarouselPrevious ref={prevRef} className="hidden" />
        <CarouselNext ref={nextRef} className="hidden" />

        {/* Conteúdo do Carousel */}
        <CarouselContent className="-ml-1">
          <CarouselItem className="pl-1 pr-4 basis-auto">
            <div className="flex flex-col justify-between w-[290px] sm:w-[375px] h-[405px] sm:h-[460px] px-2 pt-2 pb-6 rounded-3xl bg-slate-100">
              <div className="w-full h-44 bg-black rounded-3xl"></div>

              <div className="flex flex-col h-full justify-between px-4">
                <div>
                  <BlurFade delay={0.3} inView>
                    <h3 className="text-2xl">XRPL Names is live</h3>
                  </BlurFade>
                </div>
                <div className="flex justify-between items-center">
                  <div className="flex gap-2">
                    <Calendar className="w-4" />
                    <span>02 Dec 2024</span>
                  </div>
                  <div className="flex gap-2">
                    <Clock3 className="w-4" /> 3 min
                  </div>
                </div>
              </div>
            </div>
          </CarouselItem>
          <CarouselItem className="pl-1 pr-4 basis-auto">
            <div className="flex flex-col justify-between w-[290px] sm:w-[375px] h-[405px] sm:h-[460px] px-2 pt-2 pb-6 rounded-3xl bg-gray-50 hover:bg-gray-100">
              <div className="w-full h-44 bg-black rounded-3xl">
                
              </div>

              <div className="flex flex-col h-full justify-between px-4">
                <div>
                  <BlurFade delay={0.3} inView>
                    <h3 className="text-2xl">XRPL Names is live</h3>
                  </BlurFade>{" "}
                </div>
                <div className="flex justify-between items-center">
                  <div className="flex gap-2">
                    <Calendar className="w-4" />
                    <span>02 Dec 2024</span>
                  </div>
                  <div className="flex gap-2">
                    <Clock3 className="w-4" /> 3 min
                  </div>
                </div>
              </div>
            </div>
          </CarouselItem>
        </CarouselContent>
      </Carousel>
    </div>
  );
}
