"use client";

import React from "react";

import {
  ChevronsUpDown,
  ExternalLink,
  GalleryVerticalEnd,
  ListChecks,
  Plus,
  UserPlus,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export function TeamSwitcher() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" style={{ padding: 0 }}>
          <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
            <GalleryVerticalEnd className="size-4" />
          </div>
          <div className="flex-1 text-left leading-tight hidden lg:grid">
            <span className="truncate font-semibold text-lg">Thông Tin</span>
            <span className="truncate text-xs text-red">
              {process.env.NEXT_PUBLIC_CENTER_NAME || "Auto Smart"}
            </span>
          </div>
          <ChevronsUpDown className="ml-auto" />
        </Button>
      </DropdownMenuTrigger>
      {/* <DropdownMenuContent align="start" sideOffset={4}>
        <DropdownMenuLabel className="text-xs text-muted-foreground">
          Dịch vụ
        </DropdownMenuLabel>
        <DropdownMenuItem className="gap-2 p-2" asChild>
          <Link
            target="_blank"
            href={process.env.NEXT_PUBLIC_PORTAL_URL || "#"}
          >
            <div className="flex size-6 items-center justify-center rounded-sm border">
              <ListChecks className="size-4 shrink-0" />
            </div>
            Quản Lý Điểm Danh
            <DropdownMenuShortcut>
              <ExternalLink className="size-3" />
            </DropdownMenuShortcut>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="gap-2 p-2" asChild>
          <Link
            target="_blank"
            href={process.env.NEXT_PUBLIC_ADMISSION_URL || "#"}
          >
            <div className="flex size-6 items-center justify-center rounded-sm border">
              <UserPlus className="size-4 shrink-0" />
            </div>
            Quản Lý Tuyển Sinh
            <DropdownMenuShortcut>
              <ExternalLink className="size-3" />
            </DropdownMenuShortcut>
          </Link>
        </DropdownMenuItem>
      </DropdownMenuContent> */}
    </DropdownMenu>
  );
}
