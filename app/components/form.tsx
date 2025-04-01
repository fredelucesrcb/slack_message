"use client"
import React, { useState } from 'react'

import { ToastContainer, toast } from 'react-toastify';

import { convertToSeconds } from '../lib/time';

import { Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage, } from '@/components/ui/form';
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from "@/components/ui/button"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"

import { z } from "zod"

const UnitEnum = z.enum(["second", "minute", "hour"])

type UnitEnum = z.infer<typeof UnitEnum>

const formSchema = z.object({
    message: z.string().min(1).max(50),
    number: z.coerce.number().gt(0, 'must be greater than 0'),
    slackUrl: z.string().min(1),
    unit: UnitEnum

  })

const Forms = () => {

    const [numVal, setNumval] = useState(0);
    const [selectedOption, setSelectedOption] = useState('');


    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
          message: "",
        },
      })

    async function onSubmit(values: z.infer<typeof formSchema>) {

        const { message, number, slackUrl, unit} = values;

        setTimeout(async () =>  {
            try {
                const res = await fetch("http://localhost:3000/api", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify( {
                        "message": message,
                        "slackUrl": slackUrl,
                    } )
                });    
                if (res.ok) {
                    toast.success('Message has been sent');
                } else {
                    toast.warn('failed');
                }
            } catch (error) {
               console.error(error)
            }
        }, convertToSeconds(number,unit));
    }

    const buttonText = `in ${numVal != 0 ? numVal : ''} ${selectedOption != '' ? selectedOption+"(s)" : ''}`

  return (
    <>
        <ToastContainer />
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <FormField
                control={form.control}
                name="message"
                render={({ field }) => (
                    <FormItem>
                    <FormLabel>Username</FormLabel>
                    <FormControl>
                        <Input {...field} />
                    </FormControl>
                    <FormDescription>
                        Message you want to send
                    </FormDescription>
                    <FormMessage />
                    </FormItem>
                )}
                />
                <FormField
                control={form.control}
                name="slackUrl"
                render={({ field }) => (
                    <FormItem>
                    <FormLabel>Slack URL</FormLabel>
                    <FormControl>
                        <Input  {...field} />
                    </FormControl>
                    <FormDescription>
                        URL of slack webhook
                    </FormDescription>
                    <FormMessage />
                    </FormItem>
                )}
                />
                <FormField
                control={form.control}
                name="number"
                render={({ field }) => (
                    <FormItem>
                    <FormLabel>Number</FormLabel>
                    <FormControl>
                        <Input {...field} type='number' onChangeCapture={(e) => setNumval(parseInt(e.currentTarget.value))}/>
                    </FormControl>
                    <FormDescription>
                        Input the number parameter
                    </FormDescription>
                    <FormMessage />
                    </FormItem>
                )}
                />
                <FormField
                control={form.control}
                name="unit"
                render={({ field }) => (
                    <FormItem>
                    <FormLabel>Unit</FormLabel>
                    <Select 
                    onValueChange={(value) => {
                        setSelectedOption(value)
                        field.onChange(UnitEnum.parse(value))
                    }
                    }
                    >
                        <FormControl>
                        <SelectTrigger>
                            <SelectValue placeholder="Select a unit" />
                        </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                        <SelectItem value="second">Seconds</SelectItem>
                        <SelectItem value="minute">Minutes</SelectItem>
                        <SelectItem value="hour">Hours</SelectItem>
                        </SelectContent>
                    </Select>
                    </FormItem>
                )}
                />
                <Button type="submit">
                    Send { numVal != 0 && selectedOption != '' ? buttonText : ''}
                </Button>
            </form>
        </Form>
        
        
        
        {/*  
        <form className="w-full max-w-sm" onSubmit={sendMessage}>
            <div className="flex items-center border-b border-teal-500 py-2">
            <input className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none" name="message" type="text" placeholder="Message" aria-label="Full name" />
            <input className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none" type="number" name="minutes" placeholder="Minutes" aria-label="Full name" />
            <button className="flex-shrink-0 bg-teal-500 hover:bg-teal-700 border-teal-500 hover:border-teal-700 text-sm border-4 text-white py-1 px-2 rounded" type="submit">
                Send Message
            </button>
            </div>
        </form>

        */}
    
    </>
  )
}

export default Forms