"use client";

import { useScrollTop } from "@/hooks/use-scroll-top"
import { SignInButton, SignUpButton, UserButton } from "@clerk/clerk-react"
import { cn } from "@/lib/utils";
import { Logo } from "./logo";
import { ModeToggle } from "@/components/mode-toggle";

import { useConvexAuth } from "convex/react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Spinner } from "@/components/spinner";

export const Navbar = () => {
    const { isAuthenticated, isLoading } = useConvexAuth();
    const scrolled = useScrollTop();
    return (
        <div className={cn("z-50 bg-background dark:bg-[#1f1f1f] fixed top-0 flex items-center w-full p-6",
            scrolled && "border-b shadow-sm"
        )}>
            <Logo />
            <div className="flex w-full items-center justify-between gap-x-2 md:ml-auto md:justify-end">
                {isLoading && (
                    <Spinner />
                )}
                {!isAuthenticated && !isLoading && (
                    <>
                        <SignInButton mode="modal">
                            <Button variant="ghost" size="sm">
                                Log In
                            </Button>
                        </SignInButton>
                        <SignUpButton mode="modal">
                            <Button variant="ghost" size="sm">
                                Get Jotion free
                            </Button>
                        </SignUpButton>
                    </>
                )}
                {isAuthenticated && !isLoading && (
                    <>
                        <Button variant="ghost" size="sm" asChild>
                            <Link href={"/documents"}>Enter Jotion</Link>
                        </Button>
                        <UserButton afterSignOutUrl="/" />
                    </>
                )}
                <ModeToggle />
            </div>
        </div>
    )
}

