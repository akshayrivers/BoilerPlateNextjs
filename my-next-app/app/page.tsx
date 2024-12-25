"use client"
import Image from "next/image";
import { Button } from "@/components/ui/button"
import * as React from "react"
import { Moon, MoonIcon, Sun } from "lucide-react"
import { useTheme } from "next-themes"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

function ModeToggle() {
  const { setTheme } = useTheme()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon">
          <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => setTheme("light")}>
          Light
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("dark")}>
          Dark
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("system")}>
          System
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default function Home() {
  return (
    <div >
      <h1 className="text-6xl text-center font-mono pt-20 pb-10 underline" > Main Content contained here: </h1>
      <div className=" flex justify-normal pl-40 ">
        <div className="text-balance pt-2 pr-2 font-semibold">CHANGE THEME :</div>
        <ModeToggle></ModeToggle></div>
      <h1 className="text-5xl font-mono text-center underline">Features</h1>
      <div className="text-center font-mono">
      <li>working boilerplate backend</li>
      <li>working boilerplate frontend</li>
      </div>

      <div className="pt-12">
        <h1 className="text-5xl font-mono text-center underline">Tech Stack</h1>
        <div className="text-center font-mono">
          <li>Next.js</li>
          <li>Prisma</li>
          <li>Postgres</li>
          <li>React</li>
          <li>Typescript</li>
          <li>Tailwind CSS</li>
          <li>ShadCn UI</li>
          <li>Next Auth</li>
          <li>Zod</li>
        </div>
      </div>
      <div className="flex justify-center pt-3">
        <button className="bg-teal-700 hover:bg-teal-500 text-white font-bold py-2 px-4 rounded " > WORKING AUTHENTICATION</button>
      </div>
      <div className="flex justify-center pt-3">
        <button className="bg-teal-700 hover:bg-teal-500 text-white font-bold py-2 px-4 rounded " >LANDING PAGE</button>
      </div>
      <div className="flex justify-center pt-3">
        <button className="bg-teal-700 hover:bg-teal-500 text-white font-bold py-2 px-4 rounded " >ADDITIONAL FEATURES</button>
      </div>


      
      </div>
  );
}
