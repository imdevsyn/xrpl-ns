"use client";
import { Footer, Header } from "@/components";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { generateAvatarURL } from "@cfx-kit/wallet-avatar";
import { ABI, CONTRACT_ADDRESS } from "@/lib/constants";
import { readContract } from "@wagmi/core";
import { useAccount } from "wagmi";
import { config } from "@/lib/wagmi";
import { useState, useEffect } from "react";
import Image from "next/image";

export default function Page() {
  const { address } = useAccount();
  const [addressNames, setAddressNames] = useState<string[]>([]);

  useEffect(() => {
    if (!address) return;

    const getNamesFromAddress = async () => {
      try {
        const names = (await readContract(config, {
          abi: ABI,
          address: CONTRACT_ADDRESS,
          functionName: "namesFromAddress",
          args: [address],
        })) as Array<string>;
        setAddressNames(names);
      } catch (error) {
        console.error(
          `Error while getting names from address: ${(error as Error).message}`
        );
      }
    };

    const intervalId = setInterval(() => {
      getNamesFromAddress();
    }, 5000);

    getNamesFromAddress();

    return () => clearInterval(intervalId)
  }, [address]);

  return (
    <div className="flex flex-col h-full min-h-screen px-6 mx-auto max-w-[1400px]">
      <Header showNavbar={false} showManageNames={false} />
      <main>
        <div className="flex flex-col justify-between md:flex-row py-6 px-6 border text-white rounded-3xl bg-slate-900">
          {address ? (
            <>
              <div className="flex flex-col md:flex-row w-full gap-6">
                <div className="flex justify-between">
                  <Avatar className="w-20 h-20">
                    <AvatarImage
                      src={generateAvatarURL(`${address}`)}
                    ></AvatarImage>
                    <AvatarFallback>Wallet</AvatarFallback>
                  </Avatar>

                  <div className="flex md:hidden justify-center items-center text-base w-10 h-10 rounded-full bg-slate-800">
                    {address ? addressNames?.length : "0"}
                  </div>
                </div>
                <div className="flex flex-col ">
                  <h2 className="w-[200px] sm:w-full text-xl text-slate-200 truncate">
                    {address || "Connect your wallet"}
                  </h2>
                  <span className="text-slate-500">
                    {addressNames?.length && address
                      ? `${addressNames[0]}.xrpl`
                      : "No name registered"}
                  </span>
                </div>
              </div>
              <div className="hidden md:flex justify-center items-center text-base w-10 h-10 rounded-full bg-slate-800">
                {address ? addressNames?.length : "0"}
              </div>
            </>
          ) : (
            <h2 className="mx-auto">Connect your Wallet</h2>
          )}
        </div>
        <Separator className="my-8" />
        {address && addressNames.length > 0 ? (
          <div className="gap-3 mt-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {addressNames.map((name) => (
              <Card key={name}>
                <CardHeader>
                  <CardTitle>#{addressNames?.indexOf(name)}</CardTitle>
                </CardHeader>
                <CardContent>{name}.xrpl</CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="flex flex-col mt-20 justify-center items-center">
            <Image
              src="/nothing-here.svg"
              width={300}
              height={300}
              alt="Nothing here icon"
            />
            <span className="text-xl text-slate-500">Nothing to see here!</span>
          </div>
        )}
      </main>
      <footer className="mt-60">
        <Footer />
      </footer>
    </div>
  );
}
