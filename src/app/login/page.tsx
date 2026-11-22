import Image from "next/image";
import Link from "next/link";
import { ArrowRight, LockKeyhole } from "lucide-react";

export default function LoginPage() {
  return (
    <main className="min-h-screen bg-paper px-4 py-4 sm:px-6 lg:p-8">
      <div className="mx-auto grid min-h-[calc(100vh-2rem)] max-w-[1480px] overflow-hidden rounded-2xl border border-line bg-white shadow-[0_24px_80px_rgb(0_20_47/0.12)] lg:min-h-[calc(100vh-4rem)] lg:grid-cols-[1.05fr_0.95fr]">
        <div className="relative min-h-[22rem] overflow-hidden bg-navy-950 lg:min-h-0">
          <Image src="/login/blackroid-workspace.png" alt="Blackroid team member working with a laptop" fill priority unoptimized sizes="(max-width: 1023px) 100vw, 52vw" className="object-cover object-center" />
          <div className="absolute inset-0 bg-gradient-to-t from-navy-950 via-navy-950/20 to-transparent" />
          <div className="absolute inset-x-6 bottom-7 text-white sm:inset-x-10 sm:bottom-10 lg:inset-x-14 lg:bottom-14">
            <p className="eyebrow text-white/70">Blackroid operations</p>
            <p className="mt-3 max-w-md text-2xl font-light leading-tight tracking-[-0.03em] sm:text-3xl">Engineering better businesses, together.</p>
            <p className="mt-3 max-w-md text-sm leading-6 text-white/75">One workspace for the services, work and outcomes your team is building with Blackroid.</p>
          </div>
        </div>
        <div className="flex items-center justify-center px-6 py-10 sm:px-12 lg:px-16 xl:px-24">
          <div className="w-full max-w-md">
            <Link href="/" className="text-lg font-semibold tracking-[-0.04em] text-accent">BLACKROID<span className="text-ink">.</span></Link>
            <div className="mt-12 flex size-11 items-center justify-center rounded bg-accent-wash text-accent"><LockKeyhole className="size-5" /></div>
            <h1 className="mt-6 text-3xl font-medium tracking-[-0.04em]">Sign in to your workspace</h1>
            <p className="mt-2 text-sm leading-6 text-muted">Use your Blackroid invitation email to access the portal. Supabase Auth will be connected here when credentials are configured.</p>
            <form className="mt-8 space-y-4">
              <label className="block text-sm font-medium">Work email<input type="email" required placeholder="you@company.co.za" className="mt-2 w-full rounded border border-line px-3 py-3 text-sm" /></label>
              <label className="block text-sm font-medium">Password<input type="password" required placeholder="••••••••" className="mt-2 w-full rounded border border-line px-3 py-3 text-sm" /></label>
              <button type="button" className="flex w-full items-center justify-center gap-2 rounded bg-accent px-4 py-3 text-sm font-medium text-white transition-colors hover:bg-accent-deep">Continue <ArrowRight className="size-4" /></button>
            </form>
            <div className="mt-8 border-t border-line pt-5 text-center text-xs text-muted"><p>Preview access</p><div className="mt-3 flex justify-center gap-4"><Link href="/portal" className="font-medium text-accent">Client workspace</Link><Link href="/admin" className="font-medium text-accent">Admin workspace</Link></div></div>
          </div>
        </div>
      </div>
    </main>
  );
}
