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
          <a
            href="#"
            className="hover:border-b"
          >
            Home
          </a>
          <a
            href="#"
            className="hover:border-b"
          >
            XRPL Docs
          </a>
          <a
            href="#"
            className="hover:border-b"
          >
            FAQ
          </a>
          <a
            href="#"
            className="hover:border-b"
          >
            Contact
          </a>
        </div>
        <SheetFooter>
          <SheetClose asChild></SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
