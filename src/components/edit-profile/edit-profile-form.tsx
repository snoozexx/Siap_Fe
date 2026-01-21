"use client";

import React, { useState } from "react";
import { CalendarIcon, Mail, Pencil } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";

export function EditProfileForm() {
  const [date, setDate] = useState<Date | undefined>(new Date(2000, 8, 10));

  return (
    <div className="space-y-8">
      {/* Avatar Section */}
      <div className="flex justify-center">
        <div className="relative">
          <Avatar className="w-24 h-24 border-2 border-white shadow-sm">
            <AvatarImage src="/api/placeholder/100/100" alt="Hasan Mahmud" />
            <AvatarFallback>HM</AvatarFallback>
          </Avatar>
          <button className="absolute bottom-0 right-0 p-1.5 bg-[#0066FF] rounded-full text-white border-2 border-white shadow-md hover:bg-blue-700 transition-colors">
            <Pencil className="w-3.5 h-3.5 fill-current" />
          </button>
        </div>
      </div>

      {/* Form Fields */}
      <div className="space-y-5">
        <div className="space-y-2">
          <Label className="text-sm font-black text-slate-800">First Name</Label>
          <Input defaultValue="Hasan" className="rounded-xl h-12 bg-white" />
        </div>

        <div className="space-y-2">
          <Label className="text-sm font-black text-slate-800">Last Name</Label>
          <Input defaultValue="Mahmud" className="rounded-xl h-12 bg-white" />
        </div>

        <div className="space-y-2">
          <Label className="text-sm font-black text-slate-800">Date of Birth</Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={cn(
                  "w-full h-12 justify-start text-left font-normal rounded-xl bg-white",
                  !date && "text-muted-foreground"
                )}
              >
                <CalendarIcon className="mr-3 h-4 w-4 text-slate-400" />
                {date ? format(date, "dd/MM/yyyy") : <span>Pick a date</span>}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0 rounded-xl" align="start">
              <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                initialFocus
              />
            </PopoverContent>
          </Popover>
        </div>

        <div className="space-y-2">
          <Label className="text-sm font-black text-slate-800">Email</Label>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <Input 
              type="email" 
              defaultValue="example@gmail.com" 
              className="pl-10 rounded-xl h-12 bg-white" 
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label className="text-sm font-black text-slate-800">Country</Label>
          <Select defaultValue="us">
            <SelectTrigger className="h-12 rounded-xl bg-white">
              <SelectValue placeholder="Select Country" />
            </SelectTrigger>
            <SelectContent className="rounded-xl">
              <SelectItem value="us">United States</SelectItem>
              <SelectItem value="id">Indonesia</SelectItem>
              <SelectItem value="uk">United Kingdom</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Submit Button */}
      <div className="pt-4">
        <Button className="w-full h-14 bg-[#0066FF] hover:bg-blue-700 text-white rounded-2xl font-bold text-base shadow-lg shadow-blue-200">
          Update
        </Button>
      </div>
    </div>
  );
}