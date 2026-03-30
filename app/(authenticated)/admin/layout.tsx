import React from "react";
import { SearchProvider } from "@/context/search-context";
import { Header } from "@/components/layout/menu/header";
import { Separator } from "@/components/ui/separator";
import { TopNav } from "@/components/layout/menu/top-nav";
import { Search } from "@/components/layout/menu/search";
import { ThemeSwitch } from "@/components/layout/menu/theme-switch";
import { ProfileDropdown } from "@/components/layout/menu/profile-dropdown";
import { Main } from "@/components/layout/main";
import { TeamSwitcher } from "@/components/layout/menu/team-switcher";

type UnauthenticatedLayoutProps = {
  children: React.ReactNode;
};

const topNav = [
  {
    title: "Tổng Quan",
    href: "/",
  },
  {
    title: "Video",
    href: "/admin/videos",
  }
];

export default async function AdminLayout({
  children,
}: UnauthenticatedLayoutProps) {
  return (
    <>
      <SearchProvider>
        <Header>
          <TeamSwitcher />
          <Separator orientation="vertical" className="h-6" />
          <TopNav links={topNav} />
          <div className="ml-auto flex items-center space-x-4">
            <Search placeholder="Tìm kiếm ..." />
            <ThemeSwitch />
            <ProfileDropdown />
          </div>
        </Header>
        <Main>{children}</Main>
      </SearchProvider>
    </>
  );
}
