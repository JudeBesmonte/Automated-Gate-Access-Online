import { NextResponse, type NextRequest } from 'next/server'
import { createClient } from '@/utils/supabase/server'
import { loginFormSchema } from '@/schemas/auth'

export async function POST(req: NextRequest) {
  const body = await req.json()
  const form = loginFormSchema.safeParse(body)

  if (!form.success) {
    return NextResponse.json({ user: null, success: false, message: null }, { status: 400 })
  }

  const supabase = await createClient()
  const signed = await supabase.auth.signInWithPassword(form.data)

  if (signed.error) {
    return NextResponse.json({ user: null, success: false, message: signed.error.message })
  }

  return NextResponse.json({ user: signed.data.user, success: true, message: null })
}
