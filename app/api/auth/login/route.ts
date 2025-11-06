import { createClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url)
  const redirectTo = searchParams.get('redirectTo') || '/'

  const supabase = await createClient()

  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: 'github',
    options: {
      redirectTo: `${origin}/api/auth/callback?redirectTo=${encodeURIComponent(redirectTo)}`,
    },
  })

  if (error) {
    console.error('Error initiating GitHub OAuth:', error)
    return NextResponse.redirect(`${origin}/auth/error`)
  }

  return NextResponse.redirect(data.url)
}
