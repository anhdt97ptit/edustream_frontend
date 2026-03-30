"use client";

import React, { useMemo } from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Menu } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { TopNavItem } from "@/components/layout/data/types";
import { cn } from "@/lib/utils";

interface TopNavProps extends React.HTMLAttributes<HTMLElement> {
  role?: string;
  links: TopNavItem[];
}

export function TopNav({ className, links, ...props }: TopNavProps) {
  const pathname = usePathname();
  const linksPrepare = useMemo(
    () =>
      links.map((link) => ({
        ...link,
        isActive:
          (pathname === `/` || link.href !== `/`) &&
          pathname.startsWith(link.href),
      })),
    [links, pathname],
  );
  return (
    <>
      <div className="lg:hidden">
        <DropdownMenu modal={false}>
          <DropdownMenuTrigger asChild>
            <Button size="icon" variant="outline">
              <Menu />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent side="bottom" align="start">
            {linksPrepare.map(({ title, href, isActive }) => (
              <DropdownMenuItem key={`${title}-${href}`} asChild>
                <Link
                  href={href}
                  className={cn("text-muted-foreground", {
                    "underline decoration-sky-500 underline-offset-4 text-foreground":
                      isActive,
                  })}
                >
                  {title}
                </Link>
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <nav
        className={cn(
          "hidden items-center space-x-4 lg:flex lg:space-x-4",
          className,
        )}
        {...props}
      >
        {linksPrepare.map(({ title, href, isActive }) => (
          <Link
            key={`${title}-${href}`}
            href={href}
            className={cn(
              "text-base font-medium transition-colors hover:opacity-80 text-muted-foreground",
              {
                "underline decoration-sky-500 underline-offset-4 text-foreground":
                  isActive,
              },
            )}
          >
            {title}
          </Link>
        ))}
      </nav>
    </>
  );
}
