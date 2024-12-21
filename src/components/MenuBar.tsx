import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";

import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import Link from "next/link";

export function MenuBar() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline">
          <Menu />
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Menu</SheetTitle>
        </SheetHeader>
        <div className="flex flex-col gap-4">
          <Link href="/" className="hover:border-b">
            Home
          </Link>
          <Link href="/register" className="hover:border-b">
            Register
          </Link>
          <Link href="/names" className="hover:border-b">
            My Names
          </Link>
          <Link href="https://docs.xrplevm.org/docs/evm-sidechain/get-started-evm-sidechain" className="hover:border-b">
            XRPL Docs
          </Link>
          <Link href="#contact" className="hover:border-b">
            Contact
          </Link>
          <Link href="#faq" className="hover:border-b">
            FAQ
          </Link>
        </div>
        <SheetFooter>
          <SheetClose asChild></SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
