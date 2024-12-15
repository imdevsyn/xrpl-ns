"use client";
import { useEffect, useState } from "react";
import { Button } from "./ui/button";
import ShineBorder from "@/components/ui/shine-border";

export const Modal = ({ isOpen, onClose, txHash, name }) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => setVisible(true), 50);
      setVisible(false);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div
      className={`fixed inset-0 bg-black bg-opacity-5 flex justify-center items-center z-50 transition-opacity duration-1000 ${
        visible ? "opacity-100" : "opacity-0"
      }`}
    >
      <div
        className={`flex flex-col justify-between bg-black rounded-3xl overflow-hidden shadow-lg max-w-lg w-[85%] h-96 p-6 transition-transform duration-1000 ${
          visible ? "scale-100" : "scale-95"
        }`}
      >
        <div>
          <h2 className="text-2xl sm:text-3xl text-white">
            Congratulations! 🎉
          </h2>
          <p className="mt-4 text-sm text-slate-200">
            Welcome to the community of pioneers shaping the future of XRPL EVM.
            Share your achievement and inspire others to join the journey! Keep
            shining, and see you on-chain!
          </p>
        </div>

        <div className="flex justify-center items-center">
          <ShineBorder
            className="relative bg-black w-fit pt-4 rounded-3xl overflow-hidden min-w-[80%]"
            color={["#A07CFE", "#FE8FB5", "#FFBE7B"]}
            borderRadius={24}
            borderWidth={2}
          >
            <span className="text-white">{name}.xrpl</span>
          </ShineBorder>
        </div>
        <div className="flex gap-3 justify-end">
          <a href={`https://explorer.xrplevm.org/tx/${txHash}`} target="_blank">
            <Button
              variant="outline"
              className="px-4 py-2 text- w-fit text-white bg-transparent hover:text-gray-50 hover:bg-transparent shadow-none rounded-lg"
            >
              View on Explorer
            </Button>
          </a>
          <Button
            className="px-4 py-2 bg-white text-black rounded-lg hover:bg-gray-50 focus:outline-none"
            onClick={onClose}
          >
            Close
          </Button>
        </div>
      </div>
    </div>
  );
};
