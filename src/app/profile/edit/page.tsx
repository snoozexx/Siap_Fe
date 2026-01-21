"use client";

import React, { useEffect, useState } from "react";
import {
    ChevronLeft,
    Mail,
    CalendarIcon,
    Pencil,
    Globe,
} from "lucide-react";
import Link from "next/link";
import { format } from "date-fns";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Calendar } from "@/components/ui/calendar";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";

import { useProfileMe } from "@/application/hooks/profile/useProfileMe";
import { usePutProfileMeForm } from "@/application/hooks/profile/usePutProfileMeForm";
import { useAuthGuard } from "@/application/middleware/useAuthGuard";
import { toast } from "sonner";
import LoadingScreen from "@/components/LoadingScreen";
import Image from "next/image";

export default function EditProfilePage() {
    useAuthGuard();

    const { profile, isLoading } = useProfileMe();
    const { mutate, isPending } = usePutProfileMeForm();

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [country, setCountry] = useState("");
    const [date, setDate] = useState<Date | undefined>();
    const [photoFile, setPhotoFile] = useState<File | null>(null);

    useEffect(() => {
        if (!profile) return;
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setFirstName(profile.firstName ?? "");
        setLastName(profile.lastName ?? "");
        setEmail(profile.email ?? "");
        setCountry(profile.country ?? "");
        setDate(profile.dob ? new Date(profile.dob) : undefined);
    }, [profile]);

    if (isLoading || isPending) {
        return (
            <LoadingScreen
                show
                imageSrc="/images/logo.png"
                text="Memuat data pengguna..."
            />
        );
    }

    if (!profile) return null;

    const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files || e.target.files.length === 0) return;
        setPhotoFile(e.target.files[0]);
    };

    const handleSubmit = () => {
        mutate({
            firstName,
            lastName,
            country,
            dob: date?.toISOString(),
            photoProfile: photoFile ?? undefined,
        });
        toast.success("success updatefully", {
            description: <span className="text-black">success update profile</span>,
            icon: <Image src="/images/logo.png" alt="logo" width={24} height={12} className="object-contain" />,
            className: "p-4",
        });
    };

    return (
        <div className="min-h-screen bg-[#F8FAFC] font-sans">
            <header className="bg-[#607D9B] text-white p-4 sticky top-0 z-50 shadow-md">
                <div className="max-w-6xl mx-auto flex items-center justify-between relative">
                    <Link
                        href="/profile"
                        className="p-1 hover:bg-white/10 rounded-md transition"
                    >
                        <ChevronLeft className="w-6 h-6" />
                    </Link>

                    <h1 className="font-bold text-sm lg:text-lg absolute left-1/2 -translate-x-1/2">
                        Editing Profile
                    </h1>

                    <div className="hidden lg:block text-xs font-bold uppercase tracking-widest opacity-70">
                        User Settings
                    </div>
                </div>
            </header>

            <main className="max-w-6xl mx-auto p-4 lg:p-10">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

                    {/* LEFT */}
                    <div className="lg:col-span-4 space-y-6">
                        <div className="bg-white rounded-sm p-8 shadow-sm border border-slate-100 flex flex-col items-center">
                            <div className="relative group cursor-pointer">
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={handlePhotoChange}
                                    className="absolute inset-0 opacity-0 cursor-pointer z-10"
                                />

                                <Avatar className="w-32 h-32 lg:w-40 lg:h-40 border-4 border-slate-50 shadow-inner">
                                    <AvatarImage
                                        src={
                                            photoFile
                                                ? URL.createObjectURL(photoFile)
                                                : `http://localhost:3001${profile.photoProfile}`
                                        }
                                        alt="Profile"
                                        className="w-full h-full object-cover"
                                    />
                                    <AvatarFallback>
                                        {profile.firstName?.[0]}
                                        {profile.lastName?.[0]}
                                    </AvatarFallback>
                                </Avatar>

                                <div className="absolute bottom-1 right-1 lg:bottom-2 lg:right-2 p-2 bg-[#0066FF] rounded-full text-white border-4 border-white shadow-lg">
                                    <Pencil className="w-4 h-4 lg:w-5 lg:h-5" />
                                </div>
                            </div>

                            <div className="mt-6 text-center">
                                <h2 className="text-xl font-black text-slate-800">
                                    {profile.firstName} {profile.lastName}
                                </h2>
                                <p className="text-slate-400 text-sm font-medium">
                                    {profile.email}
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* RIGHT */}
                    <div className="lg:col-span-8 bg-white rounded-sm p-6 lg:p-10 shadow-sm border border-slate-100">
                        <h3 className="text-lg font-black text-slate-800 mb-8">
                            General Information
                        </h3>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <Label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">
                                    First Name
                                </Label>
                                <Input
                                    value={firstName}
                                    onChange={(e) => setFirstName(e.target.value)}
                                    className="rounded-2xl h-14 bg-slate-50/50 border-slate-100 font-semibold"
                                />
                            </div>

                            <div className="space-y-2">
                                <Label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">
                                    Last Name
                                </Label>
                                <Input
                                    value={lastName}
                                    onChange={(e) => setLastName(e.target.value)}
                                    className="rounded-2xl h-14 bg-slate-50/50 border-slate-100 font-semibold"
                                />
                            </div>

                            <div className="space-y-2">
                                <Label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">
                                    Date of Birth
                                </Label>
                                <Popover>
                                    <PopoverTrigger asChild>
                                        <Button
                                            variant="outline"
                                            className={cn(
                                                "w-full h-14 justify-start text-left font-semibold rounded-2xl bg-slate-50/50 border-slate-100",
                                                !date && "text-muted-foreground"
                                            )}
                                        >
                                            <CalendarIcon className="mr-3 h-4 w-4 text-slate-400" />
                                            {date ? format(date, "dd/MM/yyyy") : "Pick a date"}
                                        </Button>
                                    </PopoverTrigger>
                                    <PopoverContent className="w-auto p-0 rounded-2xl overflow-hidden border-none shadow-2xl">
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
                                <Label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">
                                    Email Address
                                </Label>
                                <div className="relative">
                                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-300" />
                                    <Input
                                        value={email}
                                        disabled
                                        className="pl-12 rounded-2xl h-14 bg-slate-50/50 border-slate-100 font-semibold"
                                    />
                                </div>
                            </div>

                            <div className="space-y-2 md:col-span-2">
                                <Label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">
                                    Country
                                </Label>
                                <Select value={country} onValueChange={setCountry}>
                                    <SelectTrigger className="h-14 rounded-2xl bg-slate-50/50 border-slate-100 font-semibold">
                                        <div className="flex items-center gap-2">
                                            <Globe className="w-4 h-4 text-slate-300" />
                                            <SelectValue placeholder="Select Country" />
                                        </div>
                                    </SelectTrigger>
                                    <SelectContent className="rounded-2xl">
                                        <SelectItem value="Indonesia">Indonesia</SelectItem>
                                        <SelectItem value="United States">United States</SelectItem>
                                        <SelectItem value="United Kingdom">United Kingdom</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>

                        <div className="mt-12">
                            <Button
                                onClick={handleSubmit}
                                className="w-full h-14 bg-[#0066FF] hover:bg-blue-700 text-white rounded-sm font-black text-base shadow-lg shadow-blue-100"
                            >
                                Update Profile
                            </Button>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
