"use client";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

import Link from "next/link";

const AdminMainNav = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) => {
  const links = [
    {
      label: "Categories",
      href: "/admin/categories",
    },
    {
      label: "Projects",
      href: "/admin/projects",
    },
  ];

  const pathname = usePathname();

  return (
    <nav
      className={cn("flex flex-col space-y-4 lg:space-y-6", className)}
      {...props}
    >
      {links.map((item) => (
        <Link
          key={item.label}
          href={item.href}
          className={cn(
            "text-sm font-medium transition-colors hover:text-primary",
            pathname.includes(item.href) ? "" : "text-muted-foreground"
          )}
        >
          {item.label}
        </Link>
      ))}
    </nav>
  );
};

export default AdminMainNav;
