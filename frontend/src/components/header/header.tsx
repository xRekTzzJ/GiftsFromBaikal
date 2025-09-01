"use client";
import { Button } from "@/components/ui/button";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { useTheme } from "@/src/store";
import { IconBrightnessHalf } from "@tabler/icons-react";

export function Header() {
  const { toggleTheme } = useTheme();
  return (
    <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
      <SidebarTrigger className="cursor-pointer " />
      <Button className="ml-auto cursor-pointer" onClick={toggleTheme}>
        <IconBrightnessHalf />
      </Button>
    </header>
  );
}
