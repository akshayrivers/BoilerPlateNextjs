'use client'
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import Link from "next/link"
import { useEffect, useState } from "react"
import { useDebounceCallback } from 'usehooks-ts'
import { useToast } from "@/hooks/use-toast"
import { useRouter } from "next/navigation"
import { signInSchema } from "@/app/schemas/signInSchema"
import axios, {AxiosError} from "axios";
import { ApiResponse } from "@/app/types/apiResponse"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Loader2 } from "lucide-react"
import { signIn } from "next-auth/react"





const page = () => {


  const { toast } = useToast();
  const router = useRouter();
  // zod implementation 
  const form = useForm({
    resolver: zodResolver(signInSchema),
    defaultValues:{
      identifier: '',
      password: ''
    }
  });


  const onSubmit = async (data:z.infer<typeof signInSchema>) => {
    const result = await signIn('credentials',{
        redirect:false,
        identifier: data.identifier,
        password:  data.password
    })
    if(result?.error){
        toast({
            title:"Login failed",
            description:"Incoreect username or password",
            variant:"destructive"
        })
    }
    if(result?.url){
      router.replace('/dashboard')
    }
  }
  return (
    <div className="flex justify-center items-center min-h-screen bg-slate-50">
      <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow-md">
        <div className="text-center">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-6">
            <FormField
              name="identifier"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email/Username</FormLabel>
                  <Input {...field} name="email/Username" />
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              name="password"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <Input type="password" {...field} name="password" />
                  <FormMessage />
                </FormItem>
              )}
            />
              <Button type="submit">
                Sign In
              </Button>
            </form>
          </Form>
          <div>
            <p className="text-black">
              Do not have an Account?{' '}
              <Link href="/sign-up" className="text-blue-500 hover:text-blue-700">Sign Up</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
export default page;