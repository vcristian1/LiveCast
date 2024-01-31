"use client";

import qs from "query-string";
import { useState } from "react";
import { SearchIcon, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export const Search = () => {
    console.log("I am logged here")
    return (
        <form className="relative w-full lg:w-[400px] flex items-center">
            <Input placeholder="Search"/>
            <Button type="submit" size="sm" variant="secondary" className="rounded-l-none hover:opacity-75 transition duration-500">
                <SearchIcon className="h-5 w-5 text-muted-foreground"/>
            </Button>
        </form>
    )
}

