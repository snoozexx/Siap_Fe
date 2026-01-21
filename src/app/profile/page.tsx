"use client";

import React from 'react';
import {
    ChevronLeft,
    User,
    Lock,
    Calendar,
    FileText,
    Trophy,
    Settings,
    LogOut,
    ChevronRight,
} from 'lucide-react';
import { Card, CardContent } from "@/components/ui/card";
import { useProfileMe } from "@/application/hooks/profile/useProfileMe";
import { useAuthGuard } from '@/application/middleware/useAuthGuard';
import { useRouter } from "next/navigation";
import LoadingScreen from '@/components/LoadingScreen';
import Link from 'next/link';

export default function ProfilePage() {
    useAuthGuard();

    const router = useRouter();
    const { profile, isLoading } = useProfileMe();

    <LoadingScreen
        show={isLoading}
        imageSrc="/images/logo.png"
        text="Memuat data pengguna..."
    />

    if (!profile) return null;
    const menuItems = [
        {
            group: "Account Settings",
            items: [
                {
                    icon: <User className="w-5 h-5 text-purple-600" />,
                    label: "Edit Profile",
                    path: "/profile/edit"
                },
                {
                    icon: <Lock className="w-5 h-5 text-purple-600" />,
                    label: "Change Password",
                    path: "/profile/change-password"
                },
                {
                    icon: <Calendar className="w-5 h-5 text-purple-600" />,
                    label: "Manajemen SKP",
                    path: "/skp"
                },
                {
                    icon: <FileText className="w-5 h-5 text-slate-600" />,
                    label: "CV Builder",
                    path: "/cv"
                },
                {
                    icon: <Trophy className="w-5 h-5 text-slate-800" />,
                    label: "Gamification Loyalty",
                    path: "/loyalty"
                }
            ]
        },
        {
            group: "Other",
            items: [
                {
                    icon: <Settings className="w-5 h-5 text-purple-600" />,
                    label: "Settings",
                    path: "/settings"
                },
                {
                    icon: <LogOut className="w-5 h-5 text-purple-600" />,
                    label: "Logout",
                    action: "logout"
                }
            ]
        }
    ];

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("refreshToken");
        localStorage.removeItem("user");
        window.location.reload();
    };

    return (
        <div className="min-h-screen bg-slate-50 font-sans">
            <header className="bg-[#607D9B] text-white p-4 sticky top-0 z-50 shadow-md">
                <div className="max-w-6xl mx-auto flex items-center justify-between">
                    <button className="flex items-center gap-2 hover:bg-white/10 px-3 py-1 rounded-md transition">
                        <Link
                            href="/"
                            className="p-1 hover:bg-white/10 rounded-md transition"
                        >
                            <ChevronLeft className="w-6 h-6" />
                        </Link>
                        <span className="hidden sm:inline text-sm">Back</span>
                    </button>
                    <h1 className="font-bold text-lg tracking-wide">CV Builder</h1>
                    <div className="w-10 sm:hidden"></div>
                    <div className="hidden sm:block text-sm opacity-80">Account Dashboard</div>
                </div>
            </header>

            <main className="max-w-6xl mx-auto p-4 sm:p-8">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

                    <div className="lg:col-span-5 xl:col-span-4 lg:sticky lg:top-24">
                        <div className="relative rounded-sm overflow-hidden shadow-2xl bg-white">
                            <div className="h-[400px] sm:h-[500px] w-full bg-[#E5E5E5]">
                                <img
                                    src={`http://localhost:3001${profile.photoProfile}`}
                                    alt="Profile"
                                    className="h-full w-full object-cover object-top"
                                />
                            </div>

                            <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 w-[90%]">
                                <Card className="rounded-2xl border-none shadow-xl backdrop-blur-md bg-white/95">
                                    <CardContent className="flex justify-around p-4">
                                        <div className="text-center border-r border-slate-100 w-full">
                                            <p className="text-3xl font-black text-slate-800">90</p>
                                            <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">SKP Score</p>
                                        </div>
                                        <div className="text-center w-full">
                                            <p className="text-3xl font-black text-slate-800">90</p>
                                            <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">CV Score</p>
                                        </div>
                                    </CardContent>
                                </Card>
                            </div>
                        </div>

                        <div className="hidden lg:block mt-6 px-4">
                            <h2 className="text-2xl font-bold text-slate-800">Hi, {profile.firstName}</h2>
                            <p className="text-slate-500">Manage your profile and track your professional scores here.</p>
                        </div>
                    </div>

                    <div className="lg:col-span-7 xl:col-span-8 bg-white rounded-3xl shadow-sm border border-slate-100 p-6 sm:p-8">
                        <div className="space-y-10">
                            {menuItems.map((section, idx) => (
                                <div key={idx}>
                                    <h3 className="text-sm font-black text-slate-400 uppercase tracking-[0.2em] mb-4 ml-2">
                                        {section.group}
                                    </h3>
                                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 gap-2">
                                        {section.items.map((item, i) => (
                                            <button
                                                key={i}
                                                onClick={() => {
                                                    if (item.action === "logout") {
                                                        handleLogout();
                                                    }
                                                    if (item.path) {
                                                        router.push(item.path);
                                                    }
                                                }}
                                                className="w-full flex items-center justify-between p-4 rounded-xl hover:bg-slate-50 active:bg-slate-100 transition-all border border-transparent hover:border-slate-100 group"
                                            >
                                                <div className="flex items-center gap-4">
                                                    <div className="p-2 bg-slate-50 rounded-lg group-hover:bg-white transition-colors shadow-sm">
                                                        {item.icon}
                                                    </div>
                                                    <span className="text-[15px] font-bold text-slate-700">{item.label}</span>
                                                </div>
                                                <ChevronRight className="w-5 h-5 text-slate-300 group-hover:text-slate-900 group-hover:translate-x-1 transition-all" />
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="mt-12 pt-8 border-t border-slate-100 text-center lg:text-left">
                            <p className="text-xs text-slate-400">© 2026 CV Builder Pro. All rights reserved.</p>
                        </div>
                    </div>

                </div>
            </main>
        </div>
    );
};
