// import { ConnectWallet } from "./ConnectWallet";

export function Navbar() {
  return (
    <div className="hidden md:flex gap-2 justify-evenly text-white items-center w-[500px] h-14 bg-black rounded-full shadow-md group">
      <a
        href="#"
        className="hover:border-b group-hover:opacity-50 hover:!opacity-100 transition-opacity"
      >
        Home
      </a>
      <a
        href="#"
        className="hover:border-b group-hover:opacity-50 hover:!opacity-100 transition-opacity"
      >
        XRPL Docs
      </a>
      <a
        href="#"
        className="hover:border-b group-hover:opacity-50 hover:!opacity-100 transition-opacity"
      >
        FAQ
      </a>
      <a
        href="#"
        className="hover:border-b group-hover:opacity-50 hover:!opacity-100 transition-opacity"
      >
        Contact
      </a>
    </div>
  );
}
