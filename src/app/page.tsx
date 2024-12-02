import { Hero, MenuBar, Navbar, ScrollingList } from "@/components";
import { Button } from "@/components/ui/button";
import { AtSign, BadgeCheck, Search, ChevronRight } from "lucide-react";
import Image from "next/image";
import NumberTicker from "@/components/ui/number-ticker";

import Meteors from "@/components/ui/meteors";

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
      <main className="flex flex-col gap-2">
        <section className=" h-[500px] justify-center items-center">
          <Hero />
        </section>
        <section>
          <ScrollingList />
        </section>
        <section className="flex flex-col items-center lg:flex-row gap-12">
          <Image
            className="p-2 drop-shadow-xl"
            src="/xrp-2.png"
            alt="XRP Logo"
            width={500}
            height={500}
          />
          <div className="flex flex-col pl-0 md:pl-20 leading-tight gap-4 w-full">
            <h2 className="tracking-tighter text-4xl md:text-5xl lg:text-7xl font-extrabold text-black">
              Built On The XRP Ledger
            </h2>
            <p className="text-lg text-gray-700">
              The XRP Ledger is a fast, energy-efficient, and reliable
              blockchain designed for secure and decentralized financial
              transactions. Our platform leverages its capabilities to deliver
              cutting-edge solutions.
            </p>
            <Image
              src="/built-on-xrpl-badge.png"
              alt="Built On XRPL Badge"
              width={120}
              height={120}
            />
          </div>
        </section>
        <section className="flex flex-col px-4 items-center lg:flex-row gap-12">
          <Image
            className="block mt-4 lg:hidden p-2 drop-shadow-xl"
            src="/xrp-5.png"
            alt="XRP Logo"
            width={500}
            height={500}
          />
          <div className="grid grid-cols-2 justify-items-start md:justify-items-center lg:justify-items-start gap-12 w-full">
            <div>
              <h2 className="mb-2 text-3xl md:text-5xl lg:text-7xl font-extrabold text-black">
                <NumberTicker value={92} className="tracking-tighter" />
                M+
              </h2>
              <p className="text-gray-700">BLOCKS</p>
            </div>
            <div>
              <h2 className="mb-2 text-3xl md:text-5xl lg:text-7xl font-extrabold text-black">
                <NumberTicker value={13} className="tracking-tighter" />
                M+
              </h2>
              <p className="text-gray-700">XRP BURNED</p>
            </div>
            <div>
              <h2 className="mb-2 text-3xl md:text-5xl lg:text-7xl font-extrabold text-black">
                <NumberTicker value={241} className="tracking-tighter" />
                K+
              </h2>
              <p className="text-gray-700">TRANSACTIONS</p>
            </div>
            <div>
              <h2 className="mb-2 text-3xl md:text-5xl lg:text-7xl font-extrabold text-black">
                <NumberTicker value={107} className="tracking-tighter" />
                K+
              </h2>
              <p className="text-gray-700">PAYMENTS</p>
            </div>
          </div>
          <Image
            className="hidden lg:block p-2 drop-shadow-xl"
            src="/xrp-5.png"
            alt="XRP Logo"
            width={500}
            height={500}
          />
        </section>
        <section className="flex flex-col relative overflow-hidden mt-6 justify-around w-full h-[950px] md:h-[500px] px-6 md:px-10 py-8 md:py-4 bg-black rounded-3xl border">
          <div className="flex justify-between items-center text-white">
            <h2 className="text-2xl mb-2 sm:mb-0 md:text-4xl tracking-tighter">
              Getting started <br /> with XRPL Names
            </h2>
            <div className="hidden md:block">
              <a href="">
                <Button
                  variant="outline"
                  className="h-10 bg-transparent text-white transition-all duration-300 ease-in-out transform  hover:scale-105"
                >
                  Get Yours
                  <ChevronRight />
                </Button>
              </a>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex flex-col text-white">
              <div className="flex justify-center items-center w-11 h-11 rounded-xl bg-pink-600">
                <Search />
              </div>
              <h3 className="mt-8 text-2xl tracking-tighter">
                Search for a name
              </h3>
              <p className="text-gray-400 mt-4">
                Select a name to establish your identity on the XRPL and enjoy
                hassle-free interactions without complex addresses.
              </p>
            </div>
            <div className="flex flex-col text-white">
              <div className="flex justify-center items-center w-11 h-11 rounded-xl bg-pink-600">
                <AtSign />
              </div>
              <h3 className="mt-8 text-2xl tracking-tighter">
                Check availability
              </h3>
              <p className="text-gray-400 mt-4">
                Check if the name is available on the XRPL network. Securing a
                unique name is the first step to building your digital presence.
              </p>
            </div>
            <div className="flex flex-col text-white">
              <div className="flex justify-center items-center w-11 h-11 rounded-xl bg-pink-600">
                <BadgeCheck />
              </div>
              <h3 className="mt-8 text-2xl tracking-tighter">Register</h3>
              <p className="text-gray-400 mt-4">
                Register the name and make it officially yours on the XRP
                Ledger. Once confirmed, it will be linked to your wallet.
              </p>
            </div>
          </div>
          <div className="flex mt-10 md:hidden">
            <a href="">
              <Button
                variant="outline"
                className="h-10 bg-transparent text-white transition-all duration-300 ease-in-out transform  hover:scale-105"
              >
                Get Yours
                <ChevronRight />
              </Button>
            </a>
          </div>
          <Meteors number={20} />
        </section>
        <section className="border">
          <h2>FAQs</h2>
        </section>
      </main>
      <footer className="border">Footer</footer>
    </div>
  );
}
