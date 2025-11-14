import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import ModeToggle from "./mode-toggle";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { usePathname } from "next/navigation";

import { EllipsisVertical } from "lucide-react";
import UserButton from "@/components/shared/header/user-button";
import CustomNavLink from "./custom-nav-link";
// import UserButton from "@/components/shared/header/user-button";

const Menu = () => {
  // const path = usePathname();

  return (
    <div className="flex justify-end gap-3">
      <nav className="hidden md:flex w-full items-center max-w-xs gap-&">
        <CustomNavLink href="/" text="Accueil" />

        <CustomNavLink href="/about" text="A-Propos" />
        <CustomNavLink href="/projects" text="Projets" />

        <CustomNavLink href="/contact" text="Contact" />

        <ModeToggle />
        <UserButton />
        {/* <UserButton /> */}
      </nav>
      <nav className="md:hidden">
        <Sheet>
          <SheetTrigger asChild className="align-middle">
            <EllipsisVertical />
          </SheetTrigger>
          <SheetContent side="right" className="flex flex-col items-start">
            <SheetHeader>
              <SheetTitle>Menu</SheetTitle>
              <SheetDescription></SheetDescription>
            </SheetHeader>
            <ModeToggle />
            {/* <UserButton /> */}
          </SheetContent>
        </Sheet>
      </nav>
    </div>
  );
};

export default Menu;
