import { createClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url)
  const redirectTo = searchParams.get('redirectTo') || '/'
  const provider = searchParams.get('provider') || 'github'

  // Validate provider
  if (provider !== 'github' && provider !== 'google') {
    return NextResponse.redirect(`${origin}/?error=invalid_provider`)
  }

  const supabase = await createClient()

  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: provider as 'github' | 'google',
    options: {
      redirectTo: `${origin}/api/auth/callback?redirectTo=${encodeURIComponent(redirectTo)}`,
    },
  })

  if (error) {
    console.error(`Error initiating ${provider} OAuth:`, error)
    return NextResponse.redirect(`${origin}/auth/error`)
  }

  return NextResponse.redirect(data.url)
}
