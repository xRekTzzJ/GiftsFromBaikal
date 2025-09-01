"use client";
import { Button } from "@/components/ui/button";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { IconBrightnessHalf } from "@tabler/icons-react";

export function Header() {
  return (
    <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
      <SidebarTrigger className="-ml-1 cursor-pointer" />
      <Button className="ml-auto cursor-pointer" onClick={() => {}}>
        <IconBrightnessHalf />
      </Button>
    </header>
  );
}
