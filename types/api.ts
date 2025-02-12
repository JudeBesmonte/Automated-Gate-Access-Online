import type { User } from '@prisma/client'

export interface API {
  status: string
  message: string
  success: boolean
  data: any
}

export interface LoginAPI extends API {
  data: { user: User | null }
}

export interface RegisterAPI extends API {
  data: { user: User | null }
}

export interface ForgotPasswordAPI extends API {
  data: null
}

export interface NewPasswordAPI extends API {
  data: null
}
