"use client";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useEffect } from "react";

export default function ({error}:{error:Error}) {
    useEffect(()=>{
        console.log(error);
    },[error])
  return (
    <div className="flex flex-col w-full h-full items-center justify-center">
        <h2>Oops something went wrong</h2>
        <Button>
            <Link href={"/"}>Go to Home</Link>
        </Button>
    </div>
  );
}
