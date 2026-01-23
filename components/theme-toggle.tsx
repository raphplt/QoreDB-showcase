"use client"

import * as React from "react"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"

import { Button } from "@/components/ui/button"


export function ThemeToggle() {
  const { theme, setTheme } = useTheme()

  return (
			<Button
				variant="ghost"
				size="icon"
				className="w-9 h-9"
				onClick={() => setTheme(theme === "light" ? "dark" : "light")}
			>
				<Sun className="h-6 w-6 rotate-0 scale-100 transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] dark:-rotate-180 dark:scale-0 hover:text-orange-400" />
				<Moon className="absolute h-6 w-6 rotate-180 scale-0 transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] dark:rotate-0 dark:scale-100 hover:text-blue-400" />
				<span className="sr-only">Toggle theme</span>
			</Button>
		);
}
