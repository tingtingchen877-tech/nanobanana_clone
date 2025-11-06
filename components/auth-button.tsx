"use client"

import { Button } from "@/components/ui/button"
import { LogOut, Github } from "lucide-react"
import { useState } from "react"
import { createClient } from "@/lib/supabase/client"
import type { User } from "@supabase/supabase-js"
import { useRouter } from "next/navigation"

interface AuthButtonProps {
  user: User | null
}

export function AuthButton({ user }: AuthButtonProps) {
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  const supabase = createClient()

  const handleSignIn = () => {
    window.location.href = '/api/auth/login'
  }

  const handleSignOut = async () => {
    setIsLoading(true)
    try {
      await fetch('/api/auth/logout', { method: 'POST' })
      router.refresh()
    } catch (error) {
      console.error('Error signing out:', error)
    } finally {
      setIsLoading(false)
    }
  }

  if (user) {
    return (
      <div className="flex items-center gap-3">
        <span className="text-sm text-muted-foreground hidden sm:inline">
          {user.email || user.user_metadata?.user_name || 'User'}
        </span>
        <Button
          variant="ghost"
          size="sm"
          onClick={handleSignOut}
          disabled={isLoading}
        >
          <LogOut className="w-4 h-4 mr-2" />
          Sign Out
        </Button>
      </div>
    )
  }

  return (
    <div className="flex items-center gap-3">
      <Button
        variant="ghost"
        size="sm"
        onClick={handleSignIn}
        disabled={isLoading}
      >
        <Github className="w-4 h-4 mr-2" />
        Sign In with GitHub
      </Button>
      <Button size="sm" className="bg-primary text-primary-foreground hover:bg-primary/90">
        Launch Now
      </Button>
    </div>
  )
}
