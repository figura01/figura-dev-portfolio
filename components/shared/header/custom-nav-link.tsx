"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";

const CustomNavLink = ({ href, text }: { href: string; text: string }) => {
  const active = "flex-1 text-blue-400 font-bold hover:no-underline";
  const base = "flex-1 border-radius-none hover:text-blue-400";
  const path = usePathname();
  console.log("path: ", path);
  console.log("href: ", href);
  return (
    <Button asChild variant="link" className={path === href ? active : base}>
      <Link href={href}>{text}</Link>
    </Button>
  );
};

export default CustomNavLink;
