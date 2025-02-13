import { NextResponse, type NextRequest } from 'next/server'
import { createClient } from '@/lib/supabase/server'

import { z } from 'zod'
import { forgotPasswordFormSchema } from '@/schemas/auth'
import { ApiResponse, STATUS_CODES } from '@/lib/http'

type ForgotPasswordFormValues = z.infer<typeof forgotPasswordFormSchema>

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
  // const { error } = await supabase.auth.resetPasswordForEmail(form.data.email, {
  //   redirectTo: absoluteUrl('/auth/new-password'),
  // })

  // PKCE flow
  // - Your signup email template should contain the following HTML:
  // - <p><a href="{{ .SiteURL }}/api/auth/confirm?token_hash={{ .TokenHash }}&type=recovery&next=/auth/new-password">Reset Password</a></p>

  const supabase = await createClient()
  const { error } = await supabase.auth.resetPasswordForEmail(form.data.email)

  if (error) {
    return ApiResponse.json({ user: null }, { status: error?.status, statusText: error?.message })
  }

  return ApiResponse.json({ message: 'An email has been sent to reset your password.' })
}
