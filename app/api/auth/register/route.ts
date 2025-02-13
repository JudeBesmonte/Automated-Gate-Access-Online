import { NextResponse, type NextRequest } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { ApiResponse, STATUS_CODES } from '@/lib/http'

import { z } from 'zod'
import { registerFormSchema } from '@/schemas/auth'

type RegisterFormValues = z.infer<typeof registerFormSchema>

export async function POST(req: NextRequest) {
  const body = await req.json()
  const form = registerFormSchema.safeParse(body)

  if (!form.success) {
    return ApiResponse.json({ user: null }, { status: STATUS_CODES.BAD_REQUEST })
  }

  // ...

  return await signUpWithCredentials(form.data)
}

async function signUpWithCredentials(credentials: RegisterFormValues) {
  const supabase = await createClient()
  const {
    data: { user },
    error,
  } = await supabase.auth.signUp({ email: credentials.email, password: credentials.newPassword })

  if (error) {
    return ApiResponse.json({ user: null }, { status: STATUS_CODES.BAD_REQUEST, statusText: error.message })
  }

  return ApiResponse.json({ user, message: 'You have registered successfully' })
}
