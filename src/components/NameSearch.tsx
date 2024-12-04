"use client";
import React, { useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Circle } from "lucide-react";
import { RainbowButton } from "@/components/ui/rainbow-button";

export const NameSearch = () => {
  const [years, setYears] = useState(1); // Valor inicial de 1 ano

  const increaseYears = () => setYears((prev) => prev + 1); // Aumenta o valor
  const decreaseYears = () => {
    if (years > 1) {
      setYears((prev) => prev - 1); // Diminui o valor, mas não vai abaixo de 1
    }
  };

  return (
    <div className="flex flex-col items-center justify-center p-4">
      <div className="grid w-full max-w-md gap-1.5">
        <Label
          htmlFor="picture"
          className="flex tracking-tighter gap-2 items-center text-xl"
        >
          <Circle className="w-4 animate-pulse fill-black" />
          XRPL Names
        </Label>
        <Input
          id="picture"
          type="text"
          placeholder="Search for your .xrpl name"
          className="h-20 p-6 bg-white text-gray-500 rounded-3xl tracking-tighter lg:text-2xl shadow-lg"
        />
        <div className="flex flex-col mt-6 py-4 w-full h-full rounded-3xl border bg-white">
          <div>
            <h2 className="px-4 text-gray-500">AVAILABLE</h2>
            <Separator className="my-4" />
          </div>
          <div className="flex flex-col gap-2 px-4">
            <div className="flex justify-between">
              <span>Name</span>
              <span>crazyfrog.xrpl</span>
            </div>
            <div className="flex justify-between items-center space-x-4">
              <span>Time</span>

              <div className="flex gap-1 justify-between items-center">
                <button
                  onClick={decreaseYears}
                  className="w-6 rounded-full bg-gray-300 hover:bg-gray-400 text-black focus:outline-none"
                >
                  -
                </button>
                <span className="w-[70px] text-center">
                  {years} {years === 1 ? "year" : "years"}
                </span>
                <button
                  onClick={increaseYears}
                  className="w-6 rounded-full bg-gray-300 hover:bg-gray-400 text-black focus:outline-none"
                >
                  +
                </button>
              </div>
            </div>
            <div className="flex justify-between">
              <span>Price</span>
              <p className="flex gap-2 items-center">
                <span className="text-gray-500 text-sm">$6.40</span>
                2.51 XRP
              </p>{" "}
            </div>

            <div className="flex justify-end pt-6">
              <RainbowButton className="w-full">Register name</RainbowButton>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
