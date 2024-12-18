import { ConnectButton } from "@rainbow-me/rainbowkit";
import { MenuBar, Navbar } from "@/components";
import Link from "next/link";

export function Header({ showNavbar }: { showNavbar: boolean }) {
  return (
    <header className="flex py-7 justify-between items-center">
      <div className="h-14 w-40 flex items-center">Logo</div>
      {showNavbar && <Navbar />}
      <div className="ml-auto mr-3 lg:mr-0 lg:ml-0 lg:flex lg:justify-end items-center gap-4 w-fit lg:w-[158px]">
        {/* <Button className="w-full h-14 rounded-full" variant="outline">
          CONNECT
        </Button> */}
        {!showNavbar && (
          <Link href="/manage" className="font-semibold">
            
          </Link>
        )}
        <ConnectButton label="CONNECT" showBalance={false} />
      </div>
      <div className="flex lg:hidden">
        <MenuBar />
      </div>
    </header>
  );
}
