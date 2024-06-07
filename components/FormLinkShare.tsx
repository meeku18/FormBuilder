"use client";

import { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { ImShare } from "react-icons/im";
import { toast } from "./ui/use-toast";

export default function ({ shareUrl }: { shareUrl: string }) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);
  if (!mounted) return null;
  const shareLink = `${window.location.origin}/submit/${shareUrl}`;
  return (
    <div className="flex flex-grow gap-4 items-center">
      <Input value={shareLink} readOnly />
      <Button onClick={() => {navigator.clipboard.writeText(shareLink)
        toast({
            title:"Copied",
            description:"Link success"
        })
      }}>
        <ImShare className="mr-2 h-4 w-4" />
      </Button>
    </div>
  );
}
