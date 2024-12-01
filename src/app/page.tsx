import { Hero, MenuBar, Navbar, ScrollingList } from "@/components";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import NumberTicker from "@/components/ui/number-ticker";

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
        <section className="flex justify-around items-center w-full border">
          <div className="h-28 border">A</div>
          <div>B</div>
          <div>C</div>
        </section>
        <section className="border">
          <h2>FAQs</h2>
        </section>
      </main>
      <footer className="border">Footer</footer>
    </div>
  );
}
