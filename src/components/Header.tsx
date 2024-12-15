import { ConnectButton } from "@rainbow-me/rainbowkit";
import { MenuBar, Navbar } from "@/components";

export function Header() {
  return (
    <header className="flex py-7 justify-between items-center">
      <div className="h-14 w-40 flex items-center">Logo</div>
      <Navbar />
      <div className="hidden md:block w-40">
        {/* <Button className="w-full h-14 rounded-full" variant="outline">
                CONNECT
              </Button> */}
        <ConnectButton label="CONNECT" />
      </div>
      <div className="flex md:hidden">
        <MenuBar />
      </div>
    </header>
  );
}
