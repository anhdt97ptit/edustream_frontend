import React from "react";

// components
import LoginForm from "@/components/pages/Login/LoginForm";

// UI components
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Metadata } from "next";


export const metadata: Metadata = {
  title: "Đăng nhập tài khoản",
};

export default async function LoginPage() {
  return (
    <div className="flex flex-col h-screen justify-center items-center">
      <div className="xs:p-0 mx-auto w-full">
        <div className="flex flex-col gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">Đăng Nhâp</CardTitle>
              <CardDescription>Xin chào 👋! Vui lòng đăng nhập</CardDescription>
            </CardHeader>
            <hr className="mb-4" />
            <CardContent>
              <LoginForm />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
