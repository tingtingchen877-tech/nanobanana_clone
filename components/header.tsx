import Link from "next/link"
import { createClient } from "@/lib/supabase/server"
import { AuthButton } from "@/components/auth-button"

export async function Header() {
  const supabase = await createClient()
  const user = supabase ? (await supabase.auth.getUser()).data.user : null
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-2xl">🍌</span>
          <span className="text-xl font-bold text-foreground">Nano Banana</span>
        </div>

        <nav className="hidden md:flex items-center gap-6">
          <Link
            href="#editor"
            className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
          >
            Image Editor
          </Link>
          <Link
            href="#showcase"
            className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
          >
            Showcase
          </Link>
          <Link
            href="#pricing"
            className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
          >
            Pricing
          </Link>
          <Link
            href="#faq"
            className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
          >
            FAQ
          </Link>
        </nav>

        <AuthButton user={user} />
      </div>
    </header>
  )
}
