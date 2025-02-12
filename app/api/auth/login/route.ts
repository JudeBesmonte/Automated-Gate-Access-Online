import { NextResponse, type NextRequest } from 'next/server'
import { createClient } from '@/utils/supabase/server'
import { loginFormSchema } from '@/schemas/auth'
import { ApiResponse, STATUS_CODES } from '@/utils/http'

export async function POST(req: NextRequest) {
  const body = await req.json()
  const form = loginFormSchema.safeParse(body)

  if (!form.success) {
    return ApiResponse.json({ user: null }, { status: STATUS_CODES.BAD_REQUEST })
  }

  const supabase = await createClient()
  const signed = await supabase.auth.signInWithPassword(form.data)

  if (signed.error) {
    return ApiResponse.json({ user: null }, { status: STATUS_CODES.BAD_REQUEST, statusText: signed.error.message })
  }

  return ApiResponse.json({ user: signed.data.user, message: 'You have successfully logged in' })
}
