"use client"
import { verifySchema } from '@/app/schemas/verifySchema'
import { ApiResponse } from '@/app/types/apiResponse'
import { FormField, FormItem, FormLabel, FormControl, FormDescription, FormMessage, Form } from '@/components/ui/form'
import { useToast } from '@/hooks/use-toast'
import { zodResolver } from '@hookform/resolvers/zod'
import axios, { AxiosError } from 'axios'
import { useParams, useRouter } from 'next/navigation'
import { Input } from "@/components/ui/input"
import React from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { Button } from "@/components/ui/button"
const VerifyAccount =()=>{
    const router = useRouter()
    const param = useParams<{username: string}>()
    const {toast} = useToast()
    const form = useForm({
        resolver: zodResolver(verifySchema),
    });
    const onSubmit = async (data:z.infer<typeof verifySchema>)=>{
        
        try {
            const response = await axios.post('/api/verify-code',{
                username: param.username,
                code: data.code
            })

            toast({
                title:"Success",
                description: response.data.message
            })
            router.replace('sign-in')
        } catch (error) {
            console.error("Error in code verification",error);
            const axiosError= error as AxiosError<ApiResponse>;
            let errorMessage = axiosError.response?.data.message;
            toast({
                title: "Verification failed",
                description: errorMessage,
                variant: "destructive"
            })
        }
    }
    return (
        <div className='flex justify-center items-center min-h-screen bg-slate-50'>
            <div className='w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow-md'>
                <div className='text-center'>
                    <h1 className='text-4xl font-extrabold tracking-tight lg:text-5xl mb-6'>
                        Verify Your Account
                    </h1>
                    <p className='mb-4'>Enter the verification code sent to your email</p>
                </div>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                        <FormField
                        control={form.control}
                        name="code"
                        render={({ field }) => (
                            <FormItem>
                            <FormLabel>Verification Code</FormLabel>
                            <FormControl>
                                <Input placeholder="OTP" {...field} />
                            </FormControl>
                            <FormMessage />
                            </FormItem>
                        )}
                        />
                        <Button type="submit">Submit</Button>
                    </form>
                    </Form>
            </div>
        </div>
    )
}
export default VerifyAccount