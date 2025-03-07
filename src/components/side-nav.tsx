"use client";

import Link from "next/link";
import { ModeToggle } from "@/components/mode-toggle";

export function SideNav() {
  return (
    <div className="w-64 border-r min-h-screen bg-card p-4 flex flex-col">
      <div className="flex items-center justify-center mb-8">
        <img 
          src="https://is1-ssl.mzstatic.com/image/thumb/Purple211/v4/7c/6a/f4/7c6af427-7e3a-623b-0d07-94149ea183da/AppIcon-0-0-1x_U007emarketing-0-11-0-85-220.png/1024x1024bb.jpg" 
          alt="SuperOne Logo" 
          className="w-16 h-16 rounded-md"
        />
        <div className="ml-3">
          <h2 className="text-lg font-semibold">SuperOne</h2>
          <p className="text-xs text-muted-foreground">ASO Dashboard</p>
        </div>
      </div>
      
      {/* Removed redundant navigation links */}
      <div className="flex-1">
        <div className="text-xs text-muted-foreground mt-2 mb-4 px-2">
          SuperOne Fan Battle - iOS
        </div>
      </div>
      
      <div className="mt-auto pt-4 border-t flex items-center justify-between">
        <span className="text-xs text-muted-foreground">v1.0.0</span>
        <ModeToggle />
      </div>
    </div>
  );
}