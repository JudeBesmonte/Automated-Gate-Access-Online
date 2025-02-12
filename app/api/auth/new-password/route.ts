import { NextResponse, type NextRequest } from 'next/server'
import { createClient } from '@/utils/supabase/server'
import { ApiResponse, STATUS_CODES } from '@/utils/http'
import { newPasswordFormSchema } from '@/schemas/auth'
import { absoluteUrl } from '@/utils'

export async function POST(req: NextRequest) {
  const body = await req.json()
  const form = newPasswordFormSchema.safeParse(body)

  if (!form.success) {
    return ApiResponse.json(null, { status: STATUS_CODES.BAD_REQUEST })
  }

  const supabase = await createClient()
  const result = await supabase.auth.updateUser({
    password: form.data.newPassword,
  })

  if (result.error) {
    return ApiResponse.json(null, { status: STATUS_CODES.BAD_REQUEST, statusText: result.error.message })
  }

  return ApiResponse.json({ message: 'Your password has been changed.' })
}
