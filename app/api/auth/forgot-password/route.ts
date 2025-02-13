import { NextResponse, type NextRequest } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { ApiResponse, STATUS_CODES } from '@/lib/http'
import { forgotPasswordFormSchema } from '@/schemas/auth'

export async function POST(req: NextRequest) {
  const body = await req.json()
  const form = forgotPasswordFormSchema.safeParse(body)

  if (!form.success) {
    return ApiResponse.json(null, { status: STATUS_CODES.BAD_REQUEST })
  }

  // Implicit flow
  // - This URL needs to be configured in your redirect URLs:
  // - http://localhost:3000/**
  // - Your signup email template should contain the following HTML:
  // - <p><a href="{{ .ConfirmationURL }}">Reset Password</a></p>

  // const supabase = await createClient()
  // const result = await supabase.auth.resetPasswordForEmail(form.data.email, {
  //   redirectTo: absoluteUrl('/auth/new-password'),
  // })

  // PKCE flow
  // - Your signup email template should contain the following HTML:
  // - <p><a href="{{ .SiteURL }}/api/auth/confirm?token_hash={{ .TokenHash }}&type=recovery&next=/auth/new-password">Reset Password</a></p>

  const supabase = await createClient()
  const result = await supabase.auth.resetPasswordForEmail(form.data.email)

  if (result.error) {
    return ApiResponse.json(null, { status: STATUS_CODES.BAD_REQUEST, statusText: result.error.message })
  }

  return ApiResponse.json({ message: 'An email has been sent to reset your password.' })
}
