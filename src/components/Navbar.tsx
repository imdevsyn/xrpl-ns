import Link from "next/link";

export function Navbar() {
  return (
    <div className="hidden lg:flex gap-2 justify-evenly text-white items-center w-[500px] h-14 bg-black rounded-full shadow-md group">
      <Link
        href="/"
        className="hover:border-b group-hover:opacity-50 hover:!opacity-100 transition-opacity"
      >
        Home
      </Link>
      <Link
        href="https://docs.xrplevm.org/pages/users"
        target="_blank"
        className="hover:border-b group-hover:opacity-50 hover:!opacity-100 transition-opacity"
      >
        XRPL Docs
      </Link>
      <Link
        href="#faq"
        className="hover:border-b group-hover:opacity-50 hover:!opacity-100 transition-opacity"
      >
        FAQ
      </Link>
      <Link
        href="#contact"
        className="hover:border-b group-hover:opacity-50 hover:!opacity-100 transition-opacity"
      >
        Contact
      </Link>
    </div>
  );
}
