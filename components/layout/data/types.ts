import React from "react";

interface BaseNavItem {
  title: string;
  badge?: string;
  icon?: React.ElementType;
}

type NavLink = BaseNavItem & {
  url: string;
  items?: never;
};

type NavCollapsible = BaseNavItem & {
  items: (BaseNavItem & { url: string })[];
  url?: never;
};

type NavItem = NavCollapsible | NavLink;

interface Team {
  name: string;
  logo: React.ElementType;
  plan: string;
}

interface NavGroup {
  title: string;
  items: NavItem[];
}

interface TopNavItem {
  title: string;
  href: string;
  role?: string;
}

export type { NavGroup, NavItem, NavCollapsible, NavLink, TopNavItem };
