"use client";

import React from "react";
import { Bell, Calendar, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useProfileMe } from "@/application/hooks/profile/useProfileMe";
import { useRouter } from "next/navigation";
import LoadingScreen from "../LoadingScreen";

export function Navbar() {
  const { profile, isLoading } = useProfileMe();
  
  const router = useRouter(); 
  
  <LoadingScreen
      show={isLoading}
      imageSrc="/images/logo.png"
      text="Memuat data pengguna..."
  />
  return (
    <header className="bg-white p-4 flex items-center justify-between sticky top-0 z-50 shadow-sm">
      <div className="flex items-center gap-2">
        <div className="bg-[#1B2B36] p-2 rounded-lg">
          <span className="text-white font-bold text-xl">N</span>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <Button variant="ghost" size="icon" className="bg-blue-50 rounded-full text-blue-600">
          <Calendar className="w-5 h-5" />
        </Button>
        <Button variant="ghost" size="icon" className="bg-blue-50 rounded-full text-blue-600">
          <Bell className="w-5 h-5" />
        </Button>

        {/* Avatar clickable menggunakan router */}
        {profile !== null ? (
          <Avatar
            className="w-10 h-10 border-2 border-white shadow-sm rounded-full overflow-hidden cursor-pointer"
            onClick={() => router.push("/profile")}
          >
            {profile.photoProfile ? (
              <AvatarImage
                src={`http://localhost:3001${profile.photoProfile}`}
                className="w-full h-full object-cover"
              />
            ) : (
              <AvatarFallback className="flex items-center justify-center">
                {profile.firstName?.[0]}
                {profile.lastName?.[0]}
              </AvatarFallback>
            )}
          </Avatar>
        ) : (
          <Avatar className="w-10 h-10 border-2 border-white shadow-sm rounded-full overflow-hidden">
            <AvatarFallback>JD</AvatarFallback>
          </Avatar>
        )}

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon">
              <Menu className="w-6 h-6" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56 font-bold text-[#1B2B36]">
            <DropdownMenuItem onClick={() => router.push("/")}>HOME</DropdownMenuItem>
            <DropdownMenuItem onClick={() => router.push("/profile")}>PROFILE</DropdownMenuItem>
            <DropdownMenuItem onClick={() => router.push("/forum")}>FORUM</DropdownMenuItem>
            <DropdownMenuItem onClick={() => router.push("/event")}>EVENT</DropdownMenuItem>
            <DropdownMenuItem onClick={() => router.push("/cv-builder")}>CV BUILDER</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
