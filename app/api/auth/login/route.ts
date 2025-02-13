import { NextResponse, type NextRequest } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { ApiResponse, STATUS_CODES } from '@/lib/http'

import { z } from 'zod'
import { loginFormSchema } from '@/schemas/auth'

type LoginFormValues = z.infer<typeof loginFormSchema>

export async function POST(req: NextRequest) {
  const body = await req.json()
  const form = loginFormSchema.safeParse(body)

  if (!form.success) {
    return ApiResponse.json({ user: null }, { status: STATUS_CODES.BAD_REQUEST })
  }

  const supabase = await createClient()
  const result = await supabase.auth.signInWithPassword(form.data)

  if (result.error) {
    return ApiResponse.json({ user: null }, { status: STATUS_CODES.BAD_REQUEST, statusText: result.error.message })
  }

  return ApiResponse.json({ user: result.data.user, message: 'You have successfully logged in' })
}
