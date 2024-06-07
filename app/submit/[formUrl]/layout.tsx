import {Logo} from "@/components/Logo";
import {ThemeSwitcher} from "@/components/ThemeSwitcher";
import { Toaster } from "@/components/ui/toaster";
import { UserButton } from "@clerk/nextjs";
import { ReactNode } from "react";

export default function RootLayout({children}:{children:ReactNode}){
    return <div className="flex flex-col min-h-screen min-w-full max-h-screen h-screen">
        <nav className="flex justify-between border-b h-[60px] px-4 py-2 items-center">
            <Logo/>
            <ThemeSwitcher/>
        </nav>
        <main className="flex flex-grow w-full">
            {children}
            <Toaster />
        </main>
    </div>
}