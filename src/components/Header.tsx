import { ConnectButton } from "@rainbow-me/rainbowkit";
import { MenuBar, Navbar } from "@/components";
import Link from "next/link";
import Image from "next/image";

export function Header({
  showNavbar,
  showManageNames,
}: {
  showNavbar: boolean;
  showManageNames: boolean;
}) {
  return (
    <header className="flex py-7 justify-between items-center">
      <div className="h-14 w-40 flex items-center">
        <Link href="/">
          <Image
            src="/logo.png"
            width={200}
            height={200}
            alt="XRPL Names Logo"
          />
        </Link>
      </div>
      {showNavbar && <Navbar />}
      <div className="flex ml-auto lg:ml-0 items-center">
        {showManageNames && (
          <Link href="/names" className="hidden sm:block pr-2">
            My Names
          </Link>
        )}

        <div className="mr-3 lg:mr-0 lg:ml-0 lg:flex lg:justify-end items-center gap-4 w-fit lg:w-[158px]">
          <ConnectButton
            label="CONNECT"
            accountStatus={{
              smallScreen: "avatar",
              largeScreen: "full"
            }}
            showBalance={false}
          />
        </div>
      </div>
      <div className="flex lg:hidden">
        <MenuBar />
      </div>
    </header>
  );
}
