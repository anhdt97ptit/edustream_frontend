"use client"

import React from "react"
import { useForm } from "react-hook-form"
import { z } from "@/lib/zod/zod-vi-error-map"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { PasswordInput } from "@/components/ui/shared/password-input"
import { zodResolver } from "@hookform/resolvers/zod"
import { useRouter, useSearchParams } from "next/navigation"
import AuthService from "@/services/AuthService"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"

// Types
interface ILoginFormProps {}

const formSchema = z.object({
  username: z.string().nonempty(),
  password: z.string().nonempty(),
})

const LoginForm = ({}: ILoginFormProps) => {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [error, setError] = React.useState(false)
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  })
  const isSubmitting = form.formState.isSubmitting
  async function onSubmit(data: z.infer<typeof formSchema>) {
    const callbackUrl = searchParams.get("callbackUrl") || "/"
    try {
      await AuthService.login(data)
      window.location.href = callbackUrl
    } catch (e) {
      setError(true)
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="flex flex-col gap-6">
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Tên Đăng Nhập</FormLabel>
                <FormControl>
                  <Input placeholder="Tên đăng nhập" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="grid gap-2">
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Mật Khẩu</FormLabel>
                  <FormControl>
                    <PasswordInput placeholder="Mật khẩu" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <a
              href="/forgot-password"
              className="text-right text-sm text-muted-foreground underline underline-offset-2 duration-200 hover:opacity-70"
            >
              Quên mật khẩu?
            </a>
          </div>
          <div>
            {error && (
              <p className="text-sm text-destructive">
                Tên tài khoản hoặc mật khẩu không đúng, vui lòng thử lại
              </p>
            )}
          </div>
          <Button
            type="submit"
            className="w-full dark:bg-primary dark:hover:opacity-90"
            loading={isSubmitting}
          >
            Đăng Nhập
          </Button>
        </div>
        <div className="mt-4 text-center text-sm text-muted-foreground">
          Bạn chưa có tài khoản? Hãy liên hệ với quản trị viên.
        </div>
      </form>
    </Form>
  )
}
export default LoginForm
