"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";

export interface User {
  id: number;
  name: string;
  username: string;
  role: string;
}

interface SessionContextType {
  isLogin: boolean;
  user: User | null;
  setUser: (user: User | null) => void;
  isLoading: boolean;
}

const SessionContext = createContext<SessionContextType | undefined>(undefined);

export const SessionProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const router = useRouter();
  const pathname = usePathname();

  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isLogin, setIsLogin] = useState(false);

  // useEffect(() => {
  //   (async () => {
  //     try {
  //       const res = await http.get("api/auth/me");
  //       const isGuestUrl = GUEST_URL.some((url) =>
  //         pathname.startsWith(`/${url}`),
  //       );

  //       if (!!res.data && Object.keys(res.data).length !== 0) {
  //         setIsLogin(true);
  //         setUser(res.data);
  //         if (isGuestUrl) {
  //           router.push("/");
  //         }
  //       } else {
  //         if (!isGuestUrl) {
  //           router.push("/login");
  //         }
  //       }
  //     } finally {
  //       setIsLoading(false);
  //     }
  //   })();
  // }, []);

  return (
    <SessionContext.Provider value={{ isLogin, user, setUser, isLoading }}>
      {children}
    </SessionContext.Provider>
  );
};

export const useSession = () => {
  const context = useContext(SessionContext);
  if (!context) {
    throw new Error("useSession must be used within a SessionProvider");
  }
  return context;
};
