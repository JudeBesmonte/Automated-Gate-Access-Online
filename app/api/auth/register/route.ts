import { NextResponse, type NextRequest } from 'next/server'
import { createClient } from '@/utils/supabase/server'
import { registerFormSchema } from '@/schemas/auth'

export async function POST(req: NextRequest) {
    const body = await req.json()
    const form = registerFormSchema.safeParse(body)
  
    if (!form.success) {
      return NextResponse.json({ user: null, success: false, message: null }, { status: 400 })
    }    

    const supabase = await createClient()
    const signed = await supabase.auth.signUp({ email: form.data.email, password: form.data.newPassword })
  
    if (signed.error) {
      return NextResponse.json({ user: null, success: false, message: signed.error.message })
    }
  
    return NextResponse.json({ user: signed.data.user, success: true, message: null })
}
