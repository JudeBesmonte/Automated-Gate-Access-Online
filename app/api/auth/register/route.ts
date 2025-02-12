import { NextResponse, type NextRequest } from 'next/server'
import { createClient } from '@/utils/supabase/server'
import { ApiResponse, STATUS_CODES } from '@/utils/http'
import { registerFormSchema } from '@/schemas/auth'

export async function POST(req: NextRequest) {
  const body = await req.json()
  const form = registerFormSchema.safeParse(body)

  if (!form.success) {
    return ApiResponse.json({ user: null }, { status: STATUS_CODES.BAD_REQUEST })
  }

  const supabase = await createClient()
  const result = await supabase.auth.signUp({ email: form.data.email, password: form.data.newPassword })

  if (result.error) {
    return ApiResponse.json({ user: null }, { status: STATUS_CODES.BAD_REQUEST, statusText: result.error.message })
  }

  return ApiResponse.json({ user: result.data.user, message: 'You have registered successfully' })
}
