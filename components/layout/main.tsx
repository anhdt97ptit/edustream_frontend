import React from "react";
import { cn } from "@/lib/utils";

interface MainProps extends React.HTMLAttributes<HTMLElement> {
  fixed?: boolean;
  ref?: React.Ref<HTMLElement>;
}

export const Main = ({ fixed, ...props }: MainProps) => {
  return (
    <main
      className={cn(
        "peer-[.header-fixed]/header:mt-8",
        "mt-2 pb-8 md:mt-4 md:pb-8",
        fixed && "fixed-main flex grow flex-col overflow-hidden",
      )}
      {...props}
    />
  );
};

Main.displayName = "Main";
