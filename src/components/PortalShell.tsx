"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowLeft, Bell, CalendarDays, ClipboardList, FileText, LayoutDashboard, LogOut, Menu, Users, X } from "lucide-react";
import { useState } from "react";
import { adminNavigation, portalNavigation } from "@/lib/portal";
import { cn } from "@/lib/cn";

type Mode = "admin" | "client";

export function PortalShell({ mode, children }: { mode: Mode; children: React.ReactNode }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const items = mode === "admin" ? adminNavigation : portalNavigation;
  const home = mode === "admin" ? "/admin" : "/portal";
  const iconFor = (label: string) => label === "Today" || label === "Overview" ? LayoutDashboard : label === "Clients" || label === "My services" ? Users : label === "Documents" ? FileText : label === "Work queue" || label === "Requests" ? ClipboardList : CalendarDays;

  return (
    <div className="min-h-screen bg-paper text-ink">
      <aside className={cn("fixed inset-y-0 left-0 z-40 w-64 border-r border-line bg-white px-5 py-6 transition-transform lg:translate-x-0", open ? "translate-x-0" : "-translate-x-full")}>
        <div className="flex items-center justify-between">
          <Link href={home} className="text-lg font-semibold tracking-[-0.04em] text-accent">BLACKROID<span className="text-ink">.</span></Link>
          <button className="rounded p-2 lg:hidden" aria-label="Close navigation" onClick={() => setOpen(false)}><X className="size-5" /></button>
        </div>
        <p className="mt-1 text-xs text-muted">{mode === "admin" ? "Operations workspace" : "Client workspace"}</p>
        <nav className="mt-10 space-y-1" aria-label="Portal navigation">
          {items.map((item) => <Link key={item.href} href={item.href} onClick={() => setOpen(false)} className={cn("block rounded px-3 py-2.5 text-sm", pathname === item.href ? "bg-accent text-white" : "text-ink-soft hover:bg-accent-wash hover:text-accent")}>{item.label}</Link>)}
        </nav>
        <div className="absolute inset-x-5 bottom-6 border-t border-line pt-5">
          <Link href="/" className="flex items-center gap-2 text-xs text-muted hover:text-accent"><ArrowLeft className="size-3.5" /> Back to Blackroid</Link>
        </div>
      </aside>
      {open && <button className="fixed inset-0 z-30 bg-ink/30 lg:hidden" aria-label="Close navigation" onClick={() => setOpen(false)} />}
      <div className="lg:pl-64">
        <header className="sticky top-0 z-20 flex h-16 items-center justify-between border-b border-line bg-white/95 px-5 backdrop-blur lg:px-10">
          <button className="rounded p-2 lg:hidden" aria-label="Open navigation" onClick={() => setOpen(true)}><Menu className="size-5" /></button>
          <div className="hidden text-sm font-medium text-ink-soft lg:block">{mode === "admin" ? "Blackroid operations" : "Mosaic Insurance Group"}</div>
          <div className="ml-auto flex items-center gap-4"><button className="relative rounded p-2 text-muted hover:bg-accent-wash hover:text-accent" aria-label="Notifications"><Bell className="size-4" /><span className="absolute right-1 top-1 size-1.5 rounded-full bg-accent" /></button><div className="hidden text-right sm:block"><p className="text-sm font-medium">{mode === "admin" ? "Lerato Dlamini" : "Alex Mthembu"}</p><p className="text-xs text-muted">{mode === "admin" ? "Operations manager" : "Client administrator"}</p></div><button className="rounded p-2 text-muted hover:bg-accent-wash hover:text-accent" aria-label="Sign out"><LogOut className="size-4" /></button></div>
        </header>
        <main className="mx-auto max-w-[1440px] px-5 pb-24 pt-8 lg:px-10 lg:py-12">{children}</main>
        <nav className="fixed inset-x-3 bottom-3 z-20 flex items-center justify-around rounded-2xl border border-line bg-white/95 px-2 py-2 shadow-[0_12px_40px_rgb(0_20_47/0.16)] backdrop-blur lg:hidden" aria-label="Quick navigation">
          {items.slice(0, 4).map((item) => { const Icon = iconFor(item.label); return <Link key={item.href} href={item.href} className={cn("flex min-w-16 flex-col items-center gap-1 rounded-xl px-2 py-1.5 text-[10px]", pathname === item.href ? "bg-accent-wash font-medium text-accent" : "text-muted")}><Icon className="size-4" /><span>{item.label === "Overview" ? "Home" : item.label}</span></Link>; })}
        </nav>
      </div>
    </div>
  );
}

export function StatusPill({ children, tone = "blue" }: { children: React.ReactNode; tone?: "blue" | "amber" | "green" | "grey" }) {
  return <span className={cn("inline-flex rounded-full px-2.5 py-1 text-xs font-medium", tone === "blue" && "bg-accent-wash text-accent", tone === "amber" && "bg-amber-50 text-amber-700", tone === "green" && "bg-emerald-50 text-emerald-700", tone === "grey" && "bg-slate-100 text-slate-600")}>{children}</span>;
}
